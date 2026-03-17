'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface RealtimeContextType {
  userId: string | null;
  xp: number;
  streak: number;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
}

export function RealtimeProvider({
  children,
  userId,
  initialXp,
  initialStreak,
}: {
  children: React.ReactNode;
  userId: string;
  initialXp: number;
  initialStreak: number;
}) {
  const [xp, setXp] = useState(initialXp);
  const [streak, setStreak] = useState(initialStreak);

  useEffect(() => {
    if (!userId) return;

    const supabase = createClient();

    // Subscribe to changes on the profiles table for this specific user
    const channel = supabase
      .channel(`profile_changes_${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          const newDoc = payload.new as { total_xp?: number; current_streak?: number };
          if (newDoc.total_xp !== undefined) {
            setXp(newDoc.total_xp);
          }
          if (newDoc.current_streak !== undefined) {
            setStreak(newDoc.current_streak);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return (
    <RealtimeContext.Provider value={{ userId, xp, streak }}>
      {children}
    </RealtimeContext.Provider>
  );
}
