'use client';

import React, { useMemo, useState } from 'react';
import { useExpense } from '@/context/ExpenseContext';
import { Expense, Person } from '@/types';
import ProfileSelector from '@/components/ProfileSelector';
import { Timeframe, filterExpensesByTimeframe, expensesForPerson, totalsForPerson, aggregateByDay, aggregateByMonth } from '@/utils/analytics';

// Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

export default function PersonalDashboard() {
  const { groups, expenses } = useExpense();
  // flatten unique members across groups
  const members: Person[] = useMemo(() => {
    const map = new Map<string, Person>();
    groups.forEach((g) => g.members.forEach((m) => map.set(m.id, m)));
    return Array.from(map.values());
  }, [groups]);

  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(members[0]?.id ?? null);
  const [timeframe, setTimeframe] = useState<Timeframe>('week');

  // when groups/members change, ensure selected person exists
  React.useEffect(() => {
    if (members.length > 0 && !selectedPersonId) setSelectedPersonId(members[0].id);
  }, [members, selectedPersonId]);

  const personExpensesAll = useMemo(() => {
    if (!selectedPersonId) return [] as Expense[];
    return expensesForPerson(expenses, selectedPersonId);
  }, [expenses, selectedPersonId]);

  const personExpensesInRange = useMemo(() => {
    return filterExpensesByTimeframe(personExpensesAll, timeframe);
  }, [personExpensesAll, timeframe]);

  const totals = useMemo(() => {
    if (!selectedPersonId) return { totalPaid: 0, totalShare: 0, net: 0 };
    return totalsForPerson(personExpensesInRange, selectedPersonId);
  }, [personExpensesInRange, selectedPersonId]);

  const byDay = useMemo(() => aggregateByDay(personExpensesInRange, timeframe === 'day' ? 1 : 7), [personExpensesInRange, timeframe]);
  const byMonth = useMemo(() => aggregateByMonth(personExpensesInRange, 6), [personExpensesInRange]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-semibold">Personal Dashboard</h2>
        <div className="flex items-center gap-3">
          <ProfileSelector onChange={(id) => setSelectedPersonId(id)} />

          <div className="flex items-center gap-2">
            {(['day', 'week', 'month', 'year', 'all'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-md text-sm ${timeframe === tf ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'}`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-slate-500">Total Paid</div>
          <div className="text-xl font-semibold">₹{totals.totalPaid.toFixed(2)}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-slate-500">Total Share (You Owe)</div>
          <div className="text-xl font-semibold">₹{totals.totalShare.toFixed(2)}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-slate-500">Net</div>
          <div className={`text-xl font-semibold ${totals.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>₹{totals.net.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-medium mb-2">Recent activity</h3>
          <div className="space-y-3 max-h-56 overflow-y-auto">
            {personExpensesInRange.length === 0 && <div className="text-sm text-slate-500">No activity in this timeframe.</div>}
            {personExpensesInRange.map((e) => (
              <div key={e.id} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{e.description}</div>
                  <div className="text-xs text-slate-500">{new Date(e.date).toLocaleString()}</div>
                </div>
                <div className="text-sm">₹{e.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-medium mb-2">Trends</h3>
          <div className="mb-2 text-sm text-slate-500">Last {timeframe === 'month' ? '6 months' : timeframe === 'day' ? '1 day' : '7 days'}</div>
          <div className="w-full" style={{ minHeight: 140 }}>
            {timeframe === 'month' ? (
              <Bar
                data={{
                  labels: byMonth.map((m) => m.label),
                  datasets: [{ label: 'Amount', data: byMonth.map((m) => m.total), backgroundColor: '#3b82f6' }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: true, position: 'top' }, tooltip: { mode: 'index', intersect: false } },
                }}
                height={140}
              />
            ) : (
              <Line
                data={{
                  labels: byDay.map((d) => d.date),
                  datasets: [{ label: 'Amount', data: byDay.map((d) => d.total), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.2)' }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: true }, tooltip: { mode: 'index', intersect: false } },
                }}
                height={140}
              />
            )}
          </div>
          <div className="mt-3 flex justify-end">
            <button onClick={() => {
              const rows: string[] = [];
              const header = ['id', 'date', 'description', 'amount', 'paidBy', 'paidByName', 'splits', 'category', 'groupId'];
              rows.push(header.join(','));
              // build a lookup for member names
              const nameMap = new Map<string, string>();
              members.forEach((m) => nameMap.set(m.id, m.name));
              personExpensesInRange.forEach((e) => {
                const splits = e.splits
                  .map((s) => `${s.personId}:${nameMap.get(s.personId) ?? s.personId}:${s.amount}`)
                  .join(';');
                const row = [
                  e.id,
                  new Date(e.date).toISOString(),
                  `"${(e.description || '').replace(/"/g, '""')}"`,
                  e.amount.toString(),
                  e.paidBy,
                  `"${nameMap.get(e.paidBy) ?? e.paidBy}"`,
                  `"${splits}"`,
                  e.category,
                  e.groupId,
                ];
                rows.push(row.join(','));
              });
              const csv = rows.join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `personal-expenses-${selectedPersonId ?? 'all'}.csv`;
              a.click();
              URL.revokeObjectURL(url);
            }} className="px-3 py-1 rounded-md bg-slate-800 text-white text-sm">Export CSV</button>
          </div>
        </div>
      </div>
    </section>
  );
}
