'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning' | 'xp';
  message: string;
  xpAmount?: number;
}

interface ToastContextType {
  showToast: (type: Toast['type'], message: string, xpAmount?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useStudentToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useStudentToast must be used within a StudentToastProvider');
  }
  return context;
}

const toastIcons = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
  xp: '⭐',
};

const toastColors = {
  success: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  error: 'from-red-500/20 to-rose-500/20 border-red-500/30',
  info: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  warning: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30',
  xp: 'from-amber-500/20 to-yellow-500/20 border-amber-500/30',
};

const toastTextColors = {
  success: 'text-green-400',
  error: 'text-red-400',
  info: 'text-blue-400',
  warning: 'text-yellow-400',
  xp: 'text-amber-400',
};

export function StudentToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: Toast['type'], message: string, xpAmount?: number) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, type, message, xpAmount }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 md:top-6 md:right-6 pointer-events-none">
        <AnimatePresence mode="sync">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95, x: 50 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 50 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`pointer-events-auto bg-gradient-to-r ${toastColors[toast.type]} backdrop-blur-xl border rounded-xl p-4 shadow-xl min-w-[280px] max-w-sm`}
              onClick={() => removeToast(toast.id)}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring' }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    toast.type === 'xp' ? 'bg-amber-500/30' : `bg-slate-800`
                  }`}
                >
                  <span className={`text-xl ${toastTextColors[toast.type]}`}>
                    {toastIcons[toast.type]}
                  </span>
                </motion.div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{toast.message}</p>
                  {toast.type === 'xp' && toast.xpAmount && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-amber-400 font-bold text-lg"
                    >
                      +{toast.xpAmount} XP
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
