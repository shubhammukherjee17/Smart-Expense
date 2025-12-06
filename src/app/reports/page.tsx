'use client';

import React, { useMemo } from 'react';
import { useExpense } from '@/context/ExpenseContext';
import { EXPENSE_CATEGORIES, formatCurrency } from '@/utils/calculations';

export default function Reports() {
  const { groups, currentGroup, setCurrentGroup, getGroupExpenses } = useExpense();

  const expenses = useMemo(() => {
    if (!currentGroup) return [];
    return getGroupExpenses(currentGroup.id);
  }, [currentGroup, getGroupExpenses]);

  const categoryBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    expenses.forEach((expense) => {
      breakdown[expense.category] = (breakdown[expense.category] || 0) + expense.amount;
    });
    return breakdown;
  }, [expenses]);

  const memberBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    expenses.forEach((expense) => {
      const member = currentGroup?.members.find((m) => m.id === expense.paidBy);
      if (member) {
        breakdown[member.name] = (breakdown[member.name] || 0) + expense.amount;
      }
    });
    return breakdown;
  }, [expenses, currentGroup]);

  const totalExpense = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Page Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Reports & Analytics</h1>

        {groups.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4 text-sm sm:text-base">No groups yet. Create a group to see reports.</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* Group Selector */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Group
              </label>
              <select
                value={currentGroup?.id || ''}
                onChange={(e) => {
                  const groupId = e.target.value;
                  if (groupId) setCurrentGroup(groupId);
                }}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="">Choose a group...</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            {currentGroup && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Total Expenses</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {formatCurrency(totalExpense)}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Number of Expenses</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{expenses.length}</p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Average Per Expense</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {expenses.length > 0
                        ? formatCurrency(totalExpense / expenses.length)
                        : formatCurrency(0)}
                    </p>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Expenses by Category</h2>
                  {Object.keys(categoryBreakdown).length === 0 ? (
                    <p className="text-gray-500">No expenses yet</p>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(categoryBreakdown)
                        .sort(([, a], [, b]) => b - a)
                        .map(([category, amount]) => {
                          const cat = EXPENSE_CATEGORIES[category as keyof typeof EXPENSE_CATEGORIES];
                          const percentage = ((amount / totalExpense) * 100).toFixed(1);
                          return (
                            <div key={category}>
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{cat.icon}</span>
                                  <span className="font-medium text-gray-700">{cat.label}</span>
                                </div>
                                <span className="font-bold text-gray-900">
                                  {formatCurrency(amount)} ({percentage}%)
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${cat.color.replace('bg-', 'bg-').split(' ')[0]}`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>

                {/* Member Breakdown */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Expenses by Member</h2>
                  {Object.keys(memberBreakdown).length === 0 ? (
                    <p className="text-gray-500">No expenses yet</p>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(memberBreakdown)
                        .sort(([, a], [, b]) => b - a)
                        .map(([member, amount]) => {
                          const percentage = ((amount / totalExpense) * 100).toFixed(1);
                          return (
                            <div key={member}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-gray-700">{member}</span>
                                <span className="font-bold text-gray-900">
                                  {formatCurrency(amount)} ({percentage}%)
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full bg-blue-500"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
