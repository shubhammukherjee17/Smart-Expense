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
    <section className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Personal Expense Tracker</h2>
          <p className="text-sm text-slate-600 mt-1">Monitor your spending and track expenses over time</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <ProfileSelector onChange={(id) => setSelectedPersonId(id)} />

          <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-slate-200">
            {(['day', 'week', 'month', 'year', 'all'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tf.charAt(0).toUpperCase() + tf.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition">
          <div className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">💸 Total Paid</div>
          <div className="text-3xl font-bold text-blue-600">₹{totals.totalPaid.toFixed(2)}</div>
          <p className="text-xs text-slate-500 mt-1">Amount you spent</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm border border-amber-100 hover:shadow-md transition">
          <div className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">💳 Your Share</div>
          <div className="text-3xl font-bold text-amber-600">₹{totals.totalShare.toFixed(2)}</div>
          <p className="text-xs text-slate-500 mt-1">Amount you owe</p>
        </div>
        <div className={`p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition ${
          totals.net >= 0 ? 'border-green-100' : 'border-red-100'
        }`}>
          <div className={`text-sm font-medium mb-2 flex items-center gap-2 ${
            totals.net >= 0 ? 'text-green-700' : 'text-red-700'
          }`}>{totals.net >= 0 ? '✅' : '❌'} Net Balance</div>
          <div className={`text-3xl font-bold ${
            totals.net >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>₹{totals.net.toFixed(2)}</div>
          <p className="text-xs text-slate-500 mt-1">{totals.net >= 0 ? 'You are owed' : 'You owe'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">📋 Recent Activity</h3>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
            {personExpensesInRange.length === 0 && <div className="text-sm text-slate-400 text-center py-8">No activity in this timeframe.</div>}
            {personExpensesInRange.map((e) => (
              <div key={e.id} className="p-3 bg-gradient-to-r from-blue-50 to-transparent rounded-md border-l-3 border-blue-400">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{e.description}</div>
                    <div className="text-xs text-slate-500 mt-1">{new Date(e.date).toLocaleString()}</div>
                  </div>
                  <div className="text-sm font-semibold text-blue-600">₹{e.amount.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">📈 Spending Trends</h3>
          <div className="mb-4 text-sm text-slate-600 font-medium">Last {timeframe === 'month' ? '6 months' : timeframe === 'day' ? '1 day' : '7 days'}</div>
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
          <div className="mt-4 flex justify-end">
            <button onClick={() => {
              const rows: string[] = [];
              const header = ['expenseId', 'date', 'description', 'totalAmount', 'paidBy', 'paidByName', 'groupId', 'groupName', 'splitPersonId', 'splitPersonName', 'splitAmount', 'category'];
              rows.push(header.join(','));
              // build lookups
              const nameMap = new Map<string, string>();
              members.forEach((m) => nameMap.set(m.id, m.name));
              const groupMap = new Map<string, string>();
              groups.forEach((g) => groupMap.set(g.id, g.name));
              personExpensesInRange.forEach((e) => {
                if (e.splits.length === 0) {
                  // fallback: one row if no splits
                  const row = [
                    e.id,
                    new Date(e.date).toISOString(),
                    `"${(e.description || '').replace(/"/g, '""')}"`,
                    e.amount.toString(),
                    e.paidBy,
                    `"${nameMap.get(e.paidBy) ?? e.paidBy}"`,
                    e.groupId,
                    `"${groupMap.get(e.groupId) ?? 'N/A'}"`,
                    '',
                    '',
                    '',
                    e.category,
                  ];
                  rows.push(row.join(','));
                } else {
                  // one row per split
                  e.splits.forEach((s) => {
                    const row = [
                      e.id,
                      new Date(e.date).toISOString(),
                      `"${(e.description || '').replace(/"/g, '""')}"`,
                      e.amount.toString(),
                      e.paidBy,
                      `"${nameMap.get(e.paidBy) ?? e.paidBy}"`,
                      e.groupId,
                      `"${groupMap.get(e.groupId) ?? 'N/A'}"`,
                      s.personId,
                      `"${nameMap.get(s.personId) ?? s.personId}"`,
                      s.amount.toString(),
                      e.category,
                    ];
                    rows.push(row.join(','));
                  });
                }
              });
              const csv = rows.join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `personal-expenses-${selectedPersonId ?? 'all'}.csv`;
              a.click();
              URL.revokeObjectURL(url);
            }} className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition">📥 Export CSV</button>
          </div>
        </div>
      </div>
    </section>
  );
}
