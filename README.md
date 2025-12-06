# 💰 SplitWise - AI-Powered Expense Splitter

A modern, minimal Next.js and TypeScript application for splitting expenses intelligently among friends, roommates, and trip groups. Built with automatic categorization, dynamic splitting, and smart settlement calculations.

## ⭐ Features

### Core Features
- **🤖 Auto-Categorization**: Automatically categorizes expenses (Rent, Food, Utilities, Transportation, Entertainment, Other) based on description
- **💡 Dynamic Splitting**: Split expenses flexibly based on who consumed what
- **👥 Group Management**: Create multiple groups for roommates, trips, hostels
- **📊 Monthly Reports**: Detailed analytics with expense breakdown by category
- **🔔 Smart Reminders**: Track who owes whom with automatic settlements
- **📱 Responsive Design**: Fully responsive UI for mobile, tablet, and desktop

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── globals.css             # Tailwind CSS
│   ├── page.tsx                # Home page
│   ├── groups/page.tsx         # Groups management
│   └── reports/page.tsx        # Analytics & reports
├── components/
│   ├── Navbar.tsx
│   ├── AddExpenseModal.tsx
│   ├── ExpenseList.tsx
│   ├── BalanceSummary.tsx
│   └── CreateGroupModal.tsx
├── context/
│   └── ExpenseContext.tsx      # Global state
├── types/
│   └── index.ts                # TypeScript interfaces
└── utils/
    └── calculations.ts         # Helper functions
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

## 📖 Usage

1. **Create a Group**: Click "Create Group", add name and members
2. **Add Expense**: Select group → "+ Add Expense" → fill details
3. **View Balances**: See who owes whom automatically calculated
4. **Check Reports**: Analytics by category and member

## 🎨 Design Highlights

- **Responsive**: Mobile-first design with Tailwind CSS
- **TypeScript**: Full type safety throughout
- **Context API**: Efficient state management
- **No Database**: In-memory state (can be integrated with backend)

## 🧮 Key Features

### Auto-Categorization
Intelligently suggests categories based on description:
- "pizza" → Food
- "rent" → Rent
- "uber" → Transportation

### Smart Settlements
Uses greedy algorithm to minimize payments needed to settle all debts

### Balance Calculation
- Credit who paid
- Debit each person in split
- Calculate net balance

## 🎯 Tech Stack

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Context** for state
- **No database** (in-memory storage)

## 📱 Responsive Breakpoints

- **Mobile**: Full-width layouts, touch-friendly
- **Tablet**: Improved spacing and grid
- **Desktop**: Side-by-side layouts, optimal UX

## 🚧 Future Enhancements

- Database integration
- User authentication
- UPI payment links
- Push notifications
- Dark mode
- Export to PDF/CSV

---

Built with ❤️ using Next.js and TypeScript
