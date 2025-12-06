'use client';

import React, { useState } from 'react';
import { useExpense } from '@/context/ExpenseContext';
import { AddExpenseModal } from '@/components/AddExpenseModal';
import { BalanceSummary } from '@/components/BalanceSummary';
import { ExpenseList } from '@/components/ExpenseList';
import { CreateGroupModal } from '@/components/CreateGroupModal';

export default function Groups() {
  const { groups, currentGroup, setCurrentGroup } = useExpense();
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Groups</h1>
          <button
            onClick={() => setIsCreateGroupOpen(true)}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            + Create Group
          </button>
        </div>

        {/* No Groups Message */}
        {groups.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">👥</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">No Groups Yet</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Create a group to start splitting expenses</p>
            <button
              onClick={() => setIsCreateGroupOpen(true)}
              className="bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition font-medium text-sm sm:text-base"
            >
              Create Your First Group
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Sidebar - Groups List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-24">
                <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="font-bold text-gray-900 text-sm sm:text-base">Your Groups</h2>
                </div>
                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {groups.map((group) => (
                    <button
                      key={group.id}
                      onClick={() => setCurrentGroup(group.id)}
                      className={`w-full text-left p-3 sm:p-4 transition text-sm ${
                        currentGroup?.id === group.id
                          ? 'bg-blue-50 border-l-4 border-blue-600'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium text-gray-900 truncate">{group.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
                      </div>
                      <div className="text-xs text-blue-600 mt-1 capitalize">{group.type}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content - Group Details */}
            {currentGroup ? (
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Group Header */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-3xl font-bold text-gray-900 truncate">
                        {currentGroup.name}
                      </h2>
                      <p className="text-gray-600 capitalize mt-1 text-sm">Type: {currentGroup.type}</p>
                    </div>
                    <button
                      onClick={() => setIsAddExpenseOpen(true)}
                      className="w-full sm:w-auto bg-green-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium text-sm whitespace-nowrap"
                    >
                      + Add Expense
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentGroup.members.map((member) => (
                      <span
                        key={member.id}
                        className="inline-block bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm truncate"
                      >
                        {member.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Balance Summary */}
                <BalanceSummary />

                {/* Expenses List */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Recent Expenses</h3>
                  <div className="overflow-x-auto">
                    <ExpenseList />
                  </div>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-2 flex items-center justify-center bg-white rounded-lg border border-gray-200 p-6 sm:p-12 text-center">
                <div>
                  <div className="text-4xl sm:text-5xl mb-4">👈</div>
                  <p className="text-gray-600 text-sm sm:text-base">Select a group to view details</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateGroupModal
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
      />
      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
      />
    </div>
  );
}
