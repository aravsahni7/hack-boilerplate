import React from 'react';
import Typical from 'react-typical';

export default function AboutPage() {
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center">
      <div className="w-full max-w-4xl px-6 py-12">
        {/* Header */}
        <h1 className="text-6xl font-extrabold mb-8 text-center">
          About{' '}
          <span className="text-blue-400">
            <Typical
              steps={['Studdy', 2000]}
              loop={Infinity}
              wrapper="span"
            />
          </span>
        </h1>

        {/* Main content */}
        <div className="space-y-8">
          <section className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">
              Smart Study-Buddy Scheduler
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Your personal AI-powered study companion that transforms how you manage your academic journey.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-6">
            <section className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">
                Syllabus Analysis
              </h3>
              <p className="text-gray-300">
                Simply upload your syllabus and let our AI break down course requirements, deadlines, and key topics into manageable chunks.
              </p>
            </section>

            <section className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">
                Calendar Integration
              </h3>
              <p className="text-gray-300">
                Seamlessly integrates with your personal calendar to find the perfect study slots that work with your schedule.
              </p>
            </section>

            <section className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">
                Smart Study Plans
              </h3>
              <p className="text-gray-300">
                Generates personalized study schedules with built-in breaks to maximize your learning efficiency and prevent burnout.
              </p>
            </section>

            <section className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">
                Timely Reminders
              </h3>
              <p className="text-gray-300">
                Receive gentle notifications when it's time to study specific topics, helping you stay on track with your academic goals.
              </p>
            </section>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}