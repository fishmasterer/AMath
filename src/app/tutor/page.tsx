'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TutorLoginPage() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const router = useRouter();

  const handleNumberClick = (num: string) => {
    if (passcode.length < 4) {
      const newPasscode = passcode + num;
      setPasscode(newPasscode);

      // Auto-submit when 4 digits entered
      if (newPasscode.length === 4) {
        setTimeout(() => verifyPasscode(newPasscode), 100);
      }
    }
  };

  const handleBackspace = () => {
    setPasscode(passcode.slice(0, -1));
    setError('');
  };

  const verifyPasscode = (code: string) => {
    if (code === '1234') {
      // Store in sessionStorage
      sessionStorage.setItem('tutorAuth', 'true');
      router.push('/tutor/dashboard');
    } else {
      setError('Incorrect passcode');
      setIsShaking(true);
      setTimeout(() => {
        setPasscode('');
        setIsShaking(false);
        setError('');
      }, 500);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Tutor Access</h1>
          <p className="text-slate-400">Enter your 4-digit passcode</p>
        </div>

        {/* Passcode Display */}
        <div className={`mb-8 transition-transform ${isShaking ? 'animate-shake' : ''}`}>
          <div className="flex justify-center gap-4 mb-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 flex items-center justify-center transition-all ${
                  passcode.length > i
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-slate-700 bg-slate-900/50'
                } backdrop-blur-xl`}
              >
                {passcode.length > i && (
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
          {error && (
            <p className="text-center text-red-400 text-sm">{error}</p>
          )}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="h-16 sm:h-20 rounded-xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 text-white text-2xl font-semibold hover:border-cyan-500/50 hover:bg-cyan-500/10 active:scale-95 transition-all"
            >
              {num}
            </button>
          ))}
          <div></div>
          <button
            onClick={() => handleNumberClick('0')}
            className="h-16 sm:h-20 rounded-xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 text-white text-2xl font-semibold hover:border-cyan-500/50 hover:bg-cyan-500/10 active:scale-95 transition-all"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="h-16 sm:h-20 rounded-xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 text-slate-400 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 active:scale-95 transition-all flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
            </svg>
          </button>
        </div>

        {/* Back to Home */}
        <button
          onClick={() => router.push('/')}
          className="w-full py-3 text-slate-400 hover:text-slate-300 transition-colors text-sm"
        >
          ← Back to Home
        </button>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </main>
  );
}
