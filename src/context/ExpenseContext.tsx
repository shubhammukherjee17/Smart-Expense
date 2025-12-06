'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Group, Expense, Person, Settlement, UserBalance } from '@/types';

interface ExpenseContextType {
  groups: Group[];
  currentGroup: Group | null;
  expenses: Expense[];
  createGroup: (name: string, type: Group['type'], members: Person[]) => void;
  setCurrentGroup: (groupId: string) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  getGroupExpenses: (groupId: string) => Expense[];
  getUserBalances: (groupId: string) => UserBalance[];
  getSettlements: (groupId: string) => Settlement[];
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [currentGroup, setCurrentGroupState] = useState<Group | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const createGroup = useCallback(
    (name: string, type: Group['type'], members: Person[]) => {
      const newGroup: Group = {
        id: Date.now().toString(),
        name,
        type,
        members,
        createdAt: new Date(),
      };
      setGroups((prev) => [...prev, newGroup]);
      setCurrentGroupState(newGroup);
    },
    []
  );

  const setCurrentGroup = useCallback((groupId: string) => {
    const group = groups.find((g) => g.id === groupId);
    if (group) setCurrentGroupState(group);
  }, [groups]);

  const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  }, []);

  const getGroupExpenses = useCallback(
    (groupId: string) => {
      return expenses.filter((e) => e.groupId === groupId);
    },
    [expenses]
  );

  const getUserBalances = useCallback(
    (groupId: string): UserBalance[] => {
      const groupExpenses = getGroupExpenses(groupId);
      const group = groups.find((g) => g.id === groupId);
      if (!group) return [];

      const balances: Record<string, number> = {};

      // Initialize balances
      group.members.forEach((member) => {
        balances[member.id] = 0;
      });

      // Calculate balances
      groupExpenses.forEach((expense) => {
        const totalAmount = expense.amount;

        // Credit to person who paid
        balances[expense.paidBy] += totalAmount;

        // Debit from each person in split
        expense.splits.forEach((split) => {
          balances[split.personId] -= split.amount;
        });
      });

      return group.members.map((member) => ({
        personId: member.id,
        personName: member.name,
        balance: balances[member.id],
      }));
    },
    [getGroupExpenses, groups]
  );

  const getSettlements = useCallback(
    (groupId: string): Settlement[] => {
      const balances = getUserBalances(groupId);
      const settlements: Settlement[] = [];

      const debtors = balances.filter((b) => b.balance < 0).sort((a, b) => a.balance - b.balance);
      const creditors = balances.filter((b) => b.balance > 0).sort((a, b) => b.balance - a.balance);

      let debtorIndex = 0;
      let creditorIndex = 0;

      while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
        const debtor = debtors[debtorIndex];
        const creditor = creditors[creditorIndex];

        const amount = Math.min(Math.abs(debtor.balance), creditor.balance);

        settlements.push({
          from: debtor.personId,
          to: creditor.personId,
          amount,
        });

        debtor.balance += amount;
        creditor.balance -= amount;

        if (debtor.balance === 0) debtorIndex++;
        if (creditor.balance === 0) creditorIndex++;
      }

      return settlements;
    },
    [getUserBalances]
  );

  const value: ExpenseContextType = {
    groups,
    currentGroup,
    expenses,
    createGroup,
    setCurrentGroup,
    addExpense,
    getGroupExpenses,
    getUserBalances,
    getSettlements,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within ExpenseProvider');
  }
  return context;
}
