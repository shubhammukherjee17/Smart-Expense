/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpenseCategory } from '@/types';

export const EXPENSE_CATEGORIES: Record<ExpenseCategory, { label: string; color: string; icon: string }> = {
  rent: { label: 'Rent', color: 'bg-blue-100 text-blue-700', icon: '🏠' },
  food: { label: 'Food', color: 'bg-orange-100 text-orange-700', icon: '🍕' },
  utilities: { label: 'Utilities', color: 'bg-yellow-100 text-yellow-700', icon: '⚡' },
  transportation: { label: 'Transport', color: 'bg-green-100 text-green-700', icon: '🚗' },
  entertainment: { label: 'Entertainment', color: 'bg-purple-100 text-purple-700', icon: '🎬' },
  other: { label: 'Other', color: 'bg-gray-100 text-gray-700', icon: '📦' },
};

export function formatCurrency(amount: number): string {
  return `₹${amount.toFixed(2)}`;
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function categorizeExpense(description: string): ExpenseCategory {
  const lowerDesc = description.toLowerCase();

  if (lowerDesc.includes('rent')) return 'rent';
  if (
    lowerDesc.includes('food') ||
    lowerDesc.includes('lunch') ||
    lowerDesc.includes('dinner') ||
    lowerDesc.includes('breakfast') ||
    lowerDesc.includes('pizza') ||
    lowerDesc.includes('restaurant')
  )
    return 'food';
  if (lowerDesc.includes('electric') || lowerDesc.includes('water') || lowerDesc.includes('wifi'))
    return 'utilities';
  if (
    lowerDesc.includes('auto') ||
    lowerDesc.includes('fuel') ||
    lowerDesc.includes('cab') ||
    lowerDesc.includes('metro')
  )
    return 'transportation';
  if (
    lowerDesc.includes('movie') ||
    lowerDesc.includes('game') ||
    lowerDesc.includes('entertainment') ||
    lowerDesc.includes('party')
  )
    return 'entertainment';

  return 'other';
}

export function calculateTotalBalance(groupId: string, userBalances: any[]): number {
  return userBalances.reduce((sum, balance) => sum + balance.balance, 0);
}
