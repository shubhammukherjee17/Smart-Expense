import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <div>
              <div className="font-semibold text-slate-900">SplitWise</div>
              <div className="text-sm text-slate-600">Smart expense splitting for friends & roommates</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <nav className="flex gap-4">
              <Link href="/" className="text-sm text-slate-700 hover:text-slate-900">Home</Link>
              <Link href="/groups" className="text-sm text-slate-700 hover:text-slate-900">Groups</Link>
              <Link href="/reports" className="text-sm text-slate-700 hover:text-slate-900">Reports</Link>
            </nav>
            <div className="text-sm text-slate-500">© {new Date().getFullYear()} SplitWise</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
