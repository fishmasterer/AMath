export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            AMath Tutor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Quiz & Learning Management System for Singapore O-Level Additional Mathematics
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
                For Students
              </h3>
              <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Take timed quizzes with instant feedback</li>
                <li>• Track your progress across topics</li>
                <li>• Review mistakes in your mistake journal</li>
                <li>• Master all A-Math topics (A1-A6, G1-G3, C1)</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-3">
                For Tutors
              </h3>
              <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Upload quizzes via JSON format</li>
                <li>• Monitor student progress in real-time</li>
                <li>• View detailed analytics and results</li>
                <li>• Manage homework assignments efficiently</li>
              </ul>
            </div>
          </div>

          {/* Topics */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Covered Topics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <strong>A1:</strong> Quadratic Functions
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <strong>A2:</strong> Equations & Inequalities
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <strong>A3:</strong> Surds
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <strong>A4:</strong> Polynomials
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <strong>A5:</strong> Binomial Expansions
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <strong>A6:</strong> Exponential & Log
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <strong>G1:</strong> Trigonometry
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <strong>G2:</strong> Coordinate Geometry
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <strong>G3:</strong> Proofs
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                <strong>C1:</strong> Calculus
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Application is deployed and running successfully!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Login and signup pages coming soon. Configure your Supabase credentials to enable authentication.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
