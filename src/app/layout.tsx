import type { Metadata } from 'next';
import { ExpenseProvider } from '@/context/ExpenseContext';
import { Navbar } from '@/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'SplitWise - Smart Expense Splitter',
  description: 'Split expenses easily with friends and roommates',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ExpenseProvider>
          <Navbar />
          {children}
        </ExpenseProvider>
      </body>
    </html>
  );
}
