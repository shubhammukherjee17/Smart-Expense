'use client';

import React from 'react';
import { useExpense } from '@/context/ExpenseContext';
import { EXPENSE_CATEGORIES, formatCurrency, formatDate } from '@/utils/calculations';

export function ExpenseList() {
  const { currentGroup, getGroupExpenses } = useExpense();

  if (!currentGroup) return null;

  const expenses = getGroupExpenses(currentGroup.id);

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">No expenses yet</p>
        <p className="text-sm">Add an expense to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((expense) => {
        const paidByMember = currentGroup.members.find((m) => m.id === expense.paidBy);
        const category = EXPENSE_CATEGORIES[expense.category];

        return (
          <div
            key={expense.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{category.icon}</span>
                  <h3 className="font-medium text-gray-900">{expense.description}</h3>
                </div>
                <p className="text-sm text-gray-500">
                  Paid by <span className="font-medium">{paidByMember?.name}</span> on {formatDate(expense.date)}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {expense.splits.map((split) => {
                    const member = currentGroup.members.find((m) => m.id === split.personId);
                    return (
                      <span
                        key={split.personId}
                        className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {member?.name}: {formatCurrency(split.amount)}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{formatCurrency(expense.amount)}</p>
                <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${category.color}`}>
                  {category.label}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
