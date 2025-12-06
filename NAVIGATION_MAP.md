# 🗺️ SplitWise Navigation & Feature Map

## Application Routes

```
http://localhost:3000
│
├── / (Home Page)
│   ├── Hero Section
│   ├── Features Showcase (6 cards)
│   └── Call-to-Action
│
├── /groups (Groups Management)
│   ├── Sidebar: Group List
│   ├── Main: Group Details
│   │   ├── Group Header
│   │   ├── Members Display
│   │   ├── Balance Summary
│   │   └── Expense List
│   └── Modals:
│       ├── Create Group
│       └── Add Expense
│
└── /reports (Analytics)
    ├── Group Selector
    ├── Summary Cards (3)
    ├── Category Breakdown
    └── Member Breakdown
```

---

## 🎯 Feature Map

### Home Page (/)
**Purpose**: Introduce the app and highlight features

**Components**:
```
┌─────────────────────────────────────┐
│         Navbar (Fixed)              │
│  💰 SplitWise | Home | Groups | Reports
├─────────────────────────────────────┤
│                                     │
│      💰 Split Expenses              │
│      Effortlessly                   │
│                                     │
│    [Get Started Button]             │
│                                     │
├─────────────────────────────────────┤
│         Key Features (6 Cards)      │
│  🤖 Auto | 💡 Dynamic | 👥 Groups  │
│  📊 Reports | 🔔 Reminders | 📱 UPI│
├─────────────────────────────────────┤
│      Ready to simplify?             │
│      [Create Group Button]          │
└─────────────────────────────────────┘
```

### Groups Page (/groups)
**Purpose**: Manage groups and expenses

**Layout**:
```
┌──────────────────────────────────────────────────────────────┐
│  Navbar (Fixed)                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Groups        [+ Create Group Button]                       │
│                                                              │
│ ┌─────────────────┐  ┌─────────────────────────────────┐   │
│ │  Your Groups    │  │  Group Details                  │   │
│ │ (Sidebar)       │  │                                 │   │
│ ├─────────────────┤  │ ┌──────────────────────────────┐│   │
│ │ > Hostel Friends│  │ │ Hostel Friends      [+ Add] ││   │
│ │   4 members     │  │ │ Type: hostel                ││   │
│ │   hostel        │  │ │ Members: A, B, C, D         ││   │
│ │                 │  │ └──────────────────────────────┘│   │
│ │ > Apartment     │  │ ┌──────────────────────────────┐│   │
│ │   2 members     │  │ │ Total: ₹2,450               ││   │
│ │   roommates     │  │ │ A: +₹100 (Owed to)         ││   │
│ │                 │  │ │ B: -₹800 (Owes)             ││   │
│ │ > Trip          │  │ │ C: -₹200 (Owes)             ││   │
│ │   3 members     │  │ │ D: +₹900 (Owed to)         ││   │
│ │   trip          │  │ └──────────────────────────────┘│   │
│ └─────────────────┘  │                                 │   │
│                      │ Settlements:                    │   │
│                      │ B → A: ₹100                     │   │
│                      │ C → A: ₹200                     │   │
│                      │                                 │   │
│                      │ Recent Expenses:                │   │
│                      │ • Pizza - ₹300 (Food)          │   │
│                      │ • Milk - ₹50 (Utilities)       │   │
│                      │ • Transport - ₹120 (Auto)      │   │
│                      └─────────────────────────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Reports Page (/reports)
**Purpose**: View analytics and spending patterns

**Layout**:
```
┌──────────────────────────────────────────────────────────────┐
│  Navbar (Fixed)                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Reports & Analytics                                         │
│                                                              │
│  Select Group: [Dropdown: Choose group...]                   │
│                                                              │
│  ┌──────────────┬──────────────┬──────────────┐             │
│  │ Total Exp    │ Count        │ Average      │             │
│  │ ₹2,450       │ 20 expenses  │ ₹122.50      │             │
│  └──────────────┴──────────────┴──────────────┘             │
│                                                              │
│  Expenses by Category:                                       │
│  🍕 Food        ₹1,200 (49%)  ━━━━━━━━━━━━━━━━ 49%         │
│  🏠 Rent        ₹800 (33%)    ━━━━━━━━ 33%                 │
│  ⚡ Utilities   ₹300 (12%)    ━━━ 12%                       │
│  🚗 Transport   ₹150 (6%)     ━ 6%                         │
│                                                              │
│  Expenses by Member:                                         │
│  Alice          ₹1,200 (49%)  ━━━━━━━━━━━━━━━━ 49%         │
│  Bob            ₹800 (33%)    ━━━━━━━ 33%                  │
│  Charlie        ₹450 (18%)    ━━━━ 18%                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎨 Modal Dialogs

### Create Group Modal
```
┌───────────────────────────┐
│ Create Group              │ [X]
├───────────────────────────┤
│                           │
│ Group Name:               │
│ [Hostel Friends    ]      │
│                           │
│ Group Type:               │
│ [Roommates][Trip][Hostel][General]
│                           │
│ Members:                  │
│ ☑ Alice                   │
│ ☑ Bob                     │
│ ☑ Charlie                 │
│ [ + Add Member ]          │
│                           │
│ [Cancel]  [Create]        │
└───────────────────────────┘
```

### Add Expense Modal
```
┌───────────────────────────────┐
│ Add Expense                   │ [X]
├───────────────────────────────┤
│                               │
│ Description:                  │
│ [Pizza for lunch        ]     │
│                               │
│ Amount (₹):                   │
│ [300                    ]     │
│                               │
│ Paid By:                      │
│ [Alice                  ]     │
│                               │
│ Category: [Auto: Food]        │
│ [🍕 Food][🏠 Rent][⚡Utils]   │
│ [🚗 Transport][🎬 Entertain]  │
│                               │
│ Split Among:                  │
│ ☑ Alice                       │
│ ☑ Bob                         │
│ ☑ Charlie                     │
│                               │
│ [Cancel]  [Add Expense]       │
└───────────────────────────────┘
```

---

## 🎭 User Interface Elements

### Color Coding
```
Category        Color         Icon
─────────────────────────────────
Rent            Blue          🏠
Food            Orange        🍕
Utilities       Yellow        ⚡
Transportation  Green         🚗
Entertainment   Purple        🎬
Other           Gray          📦
```

### Balance Status Colors
```
Positive Balance (Owed to you):   Green/Plus
Negative Balance (You owe):       Red/Minus
Neutral Balance (Settled):        Gray
```

### Button Types
```
Primary Action      Blue      (Create, Add, Submit)
Secondary Action    Gray      (Cancel, Close)
Danger Action       Red       (Delete, Remove)
Success Action      Green     (Add Expense)
```

---

## 📊 Data Display

### Expense Card
```
┌─────────────────────────────────┐
│ 🍕 Pizza for lunch              │
│ Paid by Alice on Dec 5, 2025     │
│                                 │
│ Alice: ₹100                     │
│ Bob: ₹100                       │
│ Charlie: ₹100                   │
│                          ₹300   │
│ [Food Tag]                      │
└─────────────────────────────────┘
```

### Balance Summary Card
```
┌──────────────────────────┐
│ Alice                ₹200 │  (Green - Owed to you)
│ Bob                 -₹100 │  (Red - You owe)
│ Charlie              +₹50 │  (Green - Owed to you)
└──────────────────────────┘
```

### Settlement Card
```
┌──────────────────────────┐
│ Bob → Alice: ₹100        │
│ Charlie → Alice: ₹50     │
│ (Settled with 2 txns)    │
└──────────────────────────┘
```

---

## 📱 Responsive Views

### Mobile (< 640px)
```
Single Column Layout:
┌──────────────────┐
│ [Navbar         ]│
├──────────────────┤
│ Groups           │
│ [Create Btn]     │
├──────────────────┤
│ [Your Groups]    │
│ Groups List:     │
│ • Hostel Friends │
│ • Apartment      │
│ • Trip           │
├──────────────────┤
│ Group Details    │
│ Full Width Card  │
├──────────────────┤
│ Balance Summary  │
│ Full Width Card  │
├──────────────────┤
│ Expenses List    │
│ Full Width Cards │
└──────────────────┘
```

### Tablet (640px - 1024px)
```
Two Column Layout:
┌────────────────────────────────┐
│ [Navbar                        ]│
├────────────────────────────────┤
│ Groups    [Create Btn        ]  │
├─────────────────┬──────────────┤
│ Your Groups     │ Group Details│
│ • Hostel        │ Full card    │
│ • Apartment     │              │
│ • Trip          ├──────────────┤
│                 │ Balance Sum  │
│                 ├──────────────┤
│                 │ Expenses List│
└─────────────────┴──────────────┘
```

### Desktop (> 1024px)
```
Three Column Layout:
┌─────────────────────────────────────────────┐
│ [Navbar                                     ]│
├─────────────────────────────────────────────┤
│ Groups          [Create Btn               ]  │
├──────────┬────────────────┬─────────────────┤
│          │                │                 │
│ Your     │ Group Details  │ Balance Summary │
│ Groups   │ • Name         │ • Balances      │
│ • Hostel │ • Type         │ • Settlements   │
│ • Apart. │ • Members      │                 │
│ • Trip   │                │ Expenses List   │
│          │                │ (side panel)    │
│          │                │                 │
└──────────┴────────────────┴─────────────────┘
```

---

## 🔄 User Interaction Flow

### Create & View Expenses
```
Home Page
    ↓ (Get Started)
Groups Page
    ↓ (Create Group)
Create Group Modal
    ↓ (Fill & Create)
Groups Page (Group Selected)
    ↓ (Add Expense)
Add Expense Modal
    ↓ (Fill & Add)
Groups Page (Updated with Expense)
    ↓ (View Details)
See Balances & Settlements
```

### View Analytics
```
Home Page
    ↓ (Reports)
Reports Page
    ↓ (Select Group)
Group Analytics
    ↓ (View breakdown)
Category & Member Insights
```

---

## 🎯 Feature Usage Matrix

| Feature | Page | Component | Modal |
|---------|------|-----------|-------|
| Create Group | Groups | Sidebar | ✓ |
| Add Expense | Groups | - | ✓ |
| View Balances | Groups | BalanceSummary | - |
| View Expenses | Groups | ExpenseList | - |
| View Reports | Reports | Main | - |
| Browse Categories | - | AddExpenseModal | ✓ |
| Select Members | - | AddExpenseModal/CreateGroupModal | ✓ |

---

## 📐 Spacing & Layout

### Padding
```
Card Padding:     1.5rem (p-6)
Section Padding:  1rem (p-4)
Button Padding:   0.5rem (px-4 py-2)
```

### Gaps
```
Between Cards:    1.5rem (gap-6)
Form Fields:      1rem (gap-4)
Buttons:          0.5rem (gap-2)
```

### Breakpoints
```
Mobile:   < 640px  (sm)
Tablet:   640-1024 (md)
Desktop:  > 1024px (lg)
```

---

## 🎨 Typography

```
Headings:
H1 (Hero):     3.75rem (text-6xl)
H2 (Section):  2.25rem (text-4xl)
H3 (Card):     1.25rem (text-xl)

Body:
Large:         1.125rem (text-lg)
Normal:        1rem (text-base)
Small:         0.875rem (text-sm)
Tiny:          0.75rem (text-xs)
```

---

This map provides a complete visual guide to navigate and understand the SplitWise application structure!
