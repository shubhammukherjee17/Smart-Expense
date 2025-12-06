/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useMemo } from 'react';
import { useExpense } from '@/context/ExpenseContext';
import { EXPENSE_CATEGORIES, categorizeExpense } from '@/utils/calculations';
import { ExpenseCategory } from '@/types';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddExpenseModal({ isOpen, onClose }: AddExpenseModalProps) {
  const { currentGroup, addExpense } = useExpense();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory>('other');
  const [splits, setSplits] = useState<Record<string, boolean>>({});

  const suggestedCategory = useMemo(
    () => categorizeExpense(description),
    [description]
  );

  if (!isOpen || !currentGroup) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !paidBy) {
      alert('Please fill all fields');
      return;
    }

    const selectedMembers = Object.entries(splits)
      .filter(([, selected]) => selected)
      .map(([memberId]) => memberId);

    if (selectedMembers.length === 0) {
      alert('Select at least one person to split with');
      return;
    }

    const splitAmount = parseFloat(amount) / selectedMembers.length;

    addExpense({
      description,
      amount: parseFloat(amount),
      category: selectedCategory,
      paidBy,
      splits: selectedMembers.map((memberId) => ({
        personId: memberId,
        amount: splitAmount,
        percentage: (splitAmount / parseFloat(amount)) * 100,
      })),
      date: new Date(),
      groupId: currentGroup.id,
    });

    // Reset form
    setDescription('');
    setAmount('');
    setPaidBy('');
    setSelectedCategory('other');
    setSplits({});
    onClose();
  };

  const handleToggleMember = (memberId: string) => {
    setSplits((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Add Expense</h2>
          <button
            onClick={onClose}
            className="text-xl font-bold hover:text-blue-100"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setSelectedCategory(categorizeExpense(e.target.value));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Pizza for dinner"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          {/* Paid By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Paid By
            </label>
            <select
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a person</option>
              {currentGroup.members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category {suggestedCategory !== selectedCategory && '(Auto-suggested)'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.entries(EXPENSE_CATEGORIES) as [ExpenseCategory, any][]).map(
                ([cat, { label, color, icon }]) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`p-3 rounded-lg text-center transition ${
                      selectedCategory === cat
                        ? 'ring-2 ring-blue-500 ' + color
                        : color + ' opacity-60'
                    }`}
                  >
                    <div className="text-xl">{icon}</div>
                    <div className="text-xs font-medium">{label}</div>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Members Split */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Split Among
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {currentGroup.members.map((member) => (
                <label
                  key={member.id}
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={splits[member.id] || false}
                    onChange={() => handleToggleMember(member.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{member.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
