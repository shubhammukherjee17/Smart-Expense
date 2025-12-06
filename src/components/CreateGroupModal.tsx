'use client';

import React, { useState } from 'react';
import { useExpense } from '@/context/ExpenseContext';
import { Group } from '@/types';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const { createGroup } = useExpense();
  const [groupName, setGroupName] = useState('');
  const [groupType, setGroupType] = useState<Group['type']>('roommates');
  const [members, setMembers] = useState<{ id: string; name: string; email: string }[]>([
    { id: '1', name: '', email: '' },
  ]);

  if (!isOpen) return null;

  const handleAddMember = () => {
    setMembers([
      ...members,
      { id: Date.now().toString(), name: '', email: '' },
    ]);
  };

  const handleRemoveMember = (id: string) => {
    if (members.length > 1) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  const handleUpdateMember = (id: string, field: string, value: string) => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupName) {
      alert('Please enter a group name');
      return;
    }

    const validMembers = members.filter((m) => m.name.trim());
    if (validMembers.length === 0) {
      alert('Please add at least one member');
      return;
    }

    createGroup(groupName, groupType, validMembers);
    setGroupName('');
    setGroupType('roommates');
    setMembers([{ id: '1', name: '', email: '' }]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Create Group</h2>
          <button
            onClick={onClose}
            className="text-xl font-bold hover:text-blue-100"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Group Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Hostel Friends"
            />
          </div>

          {/* Group Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['roommates', 'trip', 'hostel', 'general'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setGroupType(type as Group['type'])}
                  className={`p-3 rounded-lg border-2 transition font-medium capitalize ${
                    groupType === type
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Members */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Members
            </label>
            <div className="space-y-2 max-h-56 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {members.map((member, idx) => (
                <div key={member.id} className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) =>
                        handleUpdateMember(member.id, 'name', e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Name"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(member.id)}
                    disabled={members.length === 1}
                    className="px-2 py-1 text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddMember}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              + Add Member
            </button>
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
