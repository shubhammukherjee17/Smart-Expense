import type { Metadata } from 'next';
import GetStartedCTA from '@/components/GetStartedCTA';

export const metadata: Metadata = {
  title: 'Home | SplitWise',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
+            <GetStartedCTA />
            {/* GetStartedCTA is a client component that opens a modal to pick Personal or Group flow */}
            <div id="hero-placeholder" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Auto-Categorization
              </h3>
              <p className="text-gray-600">
                Expenses are automatically categorized (rent, food, transport, etc.) based on description.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Dynamic Splitting
              </h3>
              <p className="text-gray-600">
                Split expenses based on who consumed what, with flexible percentage adjustments.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Group Management
              </h3>
              <p className="text-gray-600">
                Create multiple groups for roommates, trips, hostels, and manage each separately.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Monthly Reports
              </h3>
              <p className="text-gray-600">
                Get detailed reports of expenses by category, person, and trends over time.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Smart Reminders
              </h3>
              <p className="text-gray-600">
                Get notified about pending payments and settlement reminders automatically.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                UPI Integration
              </h3>
              <p className="text-gray-600">
                Quick payment links via UPI for easy settlement between friends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 bg-blue-600 text-white rounded-lg p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to simplify your expenses?</h2>
          <p className="text-lg opacity-90">
            Create your first group and start splitting expenses today.
          </p>
          <a
            href="/groups"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Create Group
          </a>
        </div>
      </section>
    </div>
  );
}
