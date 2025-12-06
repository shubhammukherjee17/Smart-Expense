/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useMemo } from 'react';
import { useExpense } from '@/context/ExpenseContext';
import { formatCurrency } from '@/utils/calculations';

export function BalanceSummary() {
  const { currentGroup, getUserBalances, getSettlements } = useExpense();

  if (!currentGroup) return null;

  const balances = getUserBalances(currentGroup.id);
  const settlements = getSettlements(currentGroup.id);

  const totalExpense = useMemo(() => {
    return balances.reduce((sum, b) => sum + Math.abs(b.balance), 0) / 2;
  }, [balances]);

  return (
    <div className="space-y-4">
      {/* Total Expense */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <p className="text-sm opacity-90">Total Expenses</p>
        <p className="text-3xl font-bold">{formatCurrency(totalExpense)}</p>
      </div>

      {/* Individual Balances */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-bold text-gray-900 mb-4">Individual Balances</h3>
        <div className="space-y-3">
          {balances.map((balance) => (
            <div key={balance.personId} className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">{balance.personName}</span>
              <span
                className={`font-bold ${
                  balance.balance > 0
                    ? 'text-green-600'
                    : balance.balance < 0
                      ? 'text-red-600'
                      : 'text-gray-600'
                }`}
              >
                {balance.balance > 0 ? '+' : ''}
                {formatCurrency(balance.balance)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Settlements */}
      {settlements.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold text-gray-900 mb-4">Who Pays Whom</h3>
          <div className="space-y-3">
            {settlements.map((settlement, idx) => {
              const fromMember = currentGroup.members.find((m) => m.id === settlement.from);
              const toMember = currentGroup.members.find((m) => m.id === settlement.to);

              return (
                <div key={idx} className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">{fromMember?.name}</span>
                      <span className="text-gray-500"> pays </span>
                      <span className="font-semibold">{toMember?.name}</span>
                    </p>
                  </div>
                  <p className="font-bold text-orange-600">{formatCurrency(settlement.amount)}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
