import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">💰</span>
              <div>
                <h3 className="text-lg font-bold">SplitWise</h3>
                <p className="text-xs text-slate-400">Smart Expense Splitter</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              Make splitting expenses easy, fair, and transparent.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link href="/" className="block text-sm text-slate-300 hover:text-white transition">Home</Link>
              <Link href="/personal" className="block text-sm text-slate-300 hover:text-white transition">Personal Tracker</Link>
              <Link href="/groups" className="block text-sm text-slate-300 hover:text-white transition">Groups</Link>
              <Link href="/reports" className="block text-sm text-slate-300 hover:text-white transition">Reports</Link>
            </nav>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-base mb-4">Features</h4>
            <ul className="space-y-2">
              <li className="text-sm text-slate-300 hover:text-white transition cursor-pointer">Auto-Categorization</li>
              <li className="text-sm text-slate-300 hover:text-white transition cursor-pointer">Dynamic Splitting</li>
              <li className="text-sm text-slate-300 hover:text-white transition cursor-pointer">Smart Analytics</li>
              <li className="text-sm text-slate-300 hover:text-white transition cursor-pointer">CSV Export</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-base mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href="https://x.com/ItsShubhamDev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
              >
                <span>𝕏 (Twitter)</span>
              </a>
              <p className="text-sm text-slate-400">
                Follow for updates and insights
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700"></div>

        {/* Bottom Section */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-slate-300">
              Made with <span className="text-red-500">❤️</span> by{' '}
              <a
                href="https://x.com/ItsShubhamDev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-blue-400 transition"
              >
                Shubham Mukherjee
              </a>
            </p>
          </div>
          <p className="text-sm text-slate-400">
            © {currentYear} SplitWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
