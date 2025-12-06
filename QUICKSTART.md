# 🚀 Quick Start Guide

## Installation & Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

### Step 3: Explore the App

#### Home Page (`/`)
- Overview of the app
- Features showcase
- Quick links to get started

#### Groups Page (`/groups`)
1. Click "Create Group"
2. Enter group name (e.g., "My Roommates")
3. Select group type
4. Add members
5. Click "Create"

#### Add First Expense
1. Select your group from sidebar
2. Click "+ Add Expense"
3. Enter:
   - Description: e.g., "Pizza for dinner"
   - Amount: e.g., "500"
   - Who paid: Select from members
   - Category: Auto-suggested or select manually
   - Who consumed: Check members who should share
4. Click "Add Expense"

#### View Reports (`/reports`)
1. Navigate to Reports
2. Select a group
3. See breakdown by category and member

---

## 🎯 Example Usage

### Scenario 1: Hostel Friends Splitting Food
```
Group: "Hostel Friends" (type: hostel)
Members: Rahul, Priya, Arjun

Transaction:
- Rahul paid ₹300 for lunch
- Split among: Rahul, Priya, Arjun (₹100 each)

Result:
- Rahul: +200 (gets ₹100 from each)
- Priya: -100 (owes Rahul ₹100)
- Arjun: -100 (owes Rahul ₹100)
```

### Scenario 2: Roommate Rent Split
```
Group: "Apartment" (type: roommates)
Members: John, Jane, Jack

Transaction:
- Jane paid ₹12,000 for rent
- Split among: John, Jane, Jack (₹4,000 each)

Result:
- Jane: +8,000 (gets ₹4,000 from each)
- John: -4,000 (owes Jane ₹4,000)
- Jack: -4,000 (owes Jane ₹4,000)
```

---

## 🎨 UI Overview

### Navigation
- 💰 SplitWise (Logo/Brand)
- Home | Groups | Reports

### Colors & Icons
- 🏠 Rent (Blue)
- 🍕 Food (Orange)
- ⚡ Utilities (Yellow)
- 🚗 Transportation (Green)
- 🎬 Entertainment (Purple)
- 📦 Other (Gray)

### Buttons
- Blue: Primary actions (Create, Add)
- Green: Add Expense
- Orange: Settlements
- Red: Delete/Remove

---

## 💡 Features to Try

### Auto-Categorization
Try these descriptions and see auto-suggestion:
- "Pizza dinner" → Food ✓
- "Rent payment" → Rent ✓
- "Metro ticket" → Transportation ✓
- "Netflix subscription" → Entertainment ✓

### Dynamic Splitting
- Create expense with 3 people
- Check individual balances
- View settlement suggestions

### Reports
- Add multiple expenses
- Go to Reports page
- See category breakdown
- View spending by member

---

## 🛠️ Development

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npx eslint . --fix
```

### Available Scripts
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 📁 Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/app` | Page routes |
| `src/components` | React components |
| `src/context` | State management |
| `src/types` | TypeScript definitions |
| `src/utils` | Helper functions |
| `public` | Static assets |

---

## 🔍 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 npm run dev
```

### Module Not Found Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check types
npx tsc --noEmit
```

---

## 📱 Mobile Testing

Open app on mobile browser:
- http://192.168.31.95:3000 (replace IP with your machine's IP)

Or use Chrome DevTools:
- F12 → Toggle device toolbar (Ctrl+Shift+M)

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### AWS/GCP/Azure
Follow their Next.js deployment guides

---

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Context](https://react.dev/reference/react/useContext)

---

## 🎓 Code Structure Tips

### Adding New Page
1. Create `src/app/newpage/page.tsx`
2. Use 'use client' if using hooks
3. Wrap with layout automatically

### Adding New Component
1. Create `src/components/NewComponent.tsx`
2. Mark as 'use client' if interactive
3. Import in pages

### Extending State
1. Edit `ExpenseContext.tsx`
2. Add new function or state
3. Export hook

---

## ✨ Tips & Tricks

- Auto-categorization works with partial matches
- Settlement calculation minimizes transactions
- Responsive design tested on all screen sizes
- All data resets on page refresh (no persistence)
- TypeScript catches errors before runtime

---

## 🚀 Next Steps

1. **Add Backend**: Integrate with database
2. **User Auth**: Add login/signup
3. **Data Persist**: Save to database
4. **UPI**: Add payment integration
5. **Export**: Add PDF/CSV export

---

Happy splitting! 🎉

For issues or questions, check the PROJECT_SUMMARY.md file.
