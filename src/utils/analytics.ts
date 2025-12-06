import { Expense, ExpenseSplit } from '@/types';

export type Timeframe = 'day' | 'week' | 'month' | 'year' | 'all';

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function startOfWeek(d: Date) {
  const x = startOfDay(d);
  const day = x.getDay();
  const diff = x.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
  return startOfDay(new Date(x.setDate(diff)));
}

function startOfMonth(d: Date) {
  const x = new Date(d.getFullYear(), d.getMonth(), 1);
  return x;
}

function startOfYear(d: Date) {
  return new Date(d.getFullYear(), 0, 1);
}

export function filterExpensesByTimeframe(expenses: Expense[], timeframe: Timeframe) {
  const now = new Date();
  let start: Date | null = null;
  switch (timeframe) {
    case 'day':
      start = startOfDay(now);
      break;
    case 'week':
      start = startOfWeek(now);
      break;
    case 'month':
      start = startOfMonth(now);
      break;
    case 'year':
      start = startOfYear(now);
      break;
    case 'all':
      start = null;
      break;
  }

  if (!start) return expenses;
  return expenses.filter((e) => new Date(e.date) >= start);
}

export function expensesForPerson(expenses: Expense[], personId: string) {
  // expenses where person is payer or included in splits
  return expenses.filter((e) => e.paidBy === personId || e.splits.some((s) => s.personId === personId));
}

export function totalsForPerson(expenses: Expense[], personId: string) {
  let totalPaid = 0;
  let totalShare = 0; // what they owe (sum of split amounts where person is included)

  expenses.forEach((e) => {
    if (e.paidBy === personId) totalPaid += e.amount;
    e.splits.forEach((s: ExpenseSplit) => {
      if (s.personId === personId) totalShare += s.amount;
    });
  });

  const net = totalPaid - totalShare; // positive => they are owed money
  return { totalPaid, totalShare, net };
}

export function aggregateByDay(expenses: Expense[], days = 7) {
  // returns array of {date: string, total: number} for last `days` days ending today
  const result: { date: string; total: number }[] = [];
  const today = startOfDay(new Date());
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    result.push({ date: key, total: 0 });
  }

  const map = new Map(result.map((r) => [r.date, r]));

  expenses.forEach((e) => {
    const key = new Date(e.date).toISOString().slice(0, 10);
    if (map.has(key)) map.get(key)!.total += e.amount;
  });

  return result;
}

export function aggregateByMonth(expenses: Expense[], months = 6) {
  const result: { label: string; total: number }[] = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString(undefined, { month: 'short', year: 'numeric' });
    result.push({ label, total: 0 });
  }

  result.forEach((r) => (r.total = 0));

  expenses.forEach((e) => {
    const d = new Date(e.date);
    const label = d.toLocaleString(undefined, { month: 'short', year: 'numeric' });
    const entry = result.find((r) => r.label === label);
    if (entry) entry.total += e.amount;
  });

  return result;
}
