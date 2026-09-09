'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, MembershipTier, BookingRecord } from '@/lib/types';
import { auth, googleProvider, db } from '@/lib/firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  isMember: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (e: string, p: string) => Promise<void>;
  signUpWithEmail: (e: string, p: string, name: string) => Promise<void>;
  signInWithDemo: () => Promise<void>;
  logout: () => Promise<void>;
  upgradeTier: (tier: MembershipTier) => Promise<void>;
  addBooking: (booking: Omit<BookingRecord, 'id' | 'createdAt'>) => Promise<void>;
  bookings: BookingRecord[];
}

const DEFAULT_USER: UserProfile = {
  uid: 'demo-vip-member-777',
  email: 'vip.member@atlasclub.com',
  displayName: 'Alex Harrison',
  memberId: 'ATLAS-9824-VIP',
  role: 'vip',
  tier: 'gold',
  membershipStatus: 'active',
  validUntil: 'Dec 31, 2026',
  lifetimeSavings: 1480,
  totalBookings: 6,
  createdAt: '2025-01-15',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Start as null so public visitors experience the sign-up conversion gates
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: 'bk-9120',
      userId: 'demo-vip-member-777',
      hotelId: 'bellagio-vegas',
      hotelName: 'The Grand Bellagio & Casino Resort',
      hotelImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      hotelCity: 'Las Vegas, NV',
      roomId: 'deluxe-king',
      roomName: 'Deluxe Fountain View King Suite',
      checkInDate: '2026-09-12',
      checkOutDate: '2026-09-15',
      nights: 3,
      guests: 2,
      totalPublicPrice: 1167,
      totalMemberPaid: 594,
      totalSaved: 573,
      status: 'confirmed',
      confirmationCode: 'HC-NV-882941',
      createdAt: '2026-08-10',
    }
  ]);

  useEffect(() => {
    // Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          // Fetch from Firestore
          const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data() as UserProfile);
          } else {
            // New user registration
            const newUser: UserProfile = {
              uid: fbUser.uid,
              email: fbUser.email || '',
              displayName: fbUser.displayName || 'Member',
              photoURL: fbUser.photoURL || undefined,
              memberId: `HC-${Math.floor(1000 + Math.random() * 9000)}-MEM`,
              role: 'member',
              tier: 'silver',
              membershipStatus: 'active',
              validUntil: 'Dec 31, 2026',
              lifetimeSavings: 0,
              totalBookings: 0,
              createdAt: new Date().toISOString().split('T')[0],
            };
            await setDoc(doc(db, 'users', fbUser.uid), newUser);
            setUser(newUser);
          }
        } catch (e) {
          console.warn('Firestore fallback to local state:', e);
          // Retain state
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.warn('Google sign in simulated:', err);
      // Demo fallback
      setUser(DEFAULT_USER);
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      console.warn('Email sign in simulated fallback:', err);
      setUser({
        ...DEFAULT_USER,
        email,
      });
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const newUser: UserProfile = {
        uid: res.user.uid,
        email,
        displayName: name,
        memberId: `HC-${Math.floor(1000 + Math.random() * 9000)}-MEM`,
        role: 'member',
        tier: 'gold',
        membershipStatus: 'active',
        validUntil: 'Dec 31, 2026',
        lifetimeSavings: 0,
        totalBookings: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      try {
        await setDoc(doc(db, 'users', res.user.uid), newUser);
      } catch (e) {
        // ignore
      }
      setUser(newUser);
    } catch (err) {
      console.warn('Sign up fallback to local state:', err);
      setUser({
        ...DEFAULT_USER,
        email,
        displayName: name,
      });
    } finally {
      setLoading(false);
    }
  };

  const signInWithDemo = async () => {
    setLoading(true);
    setTimeout(() => {
      setUser(DEFAULT_USER);
      setLoading(false);
    }, 200);
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
    } catch (err) {
      // ignore
    }
    setUser(null);
  };

  const upgradeTier = async (newTier: MembershipTier) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      tier: newTier,
      membershipStatus: 'active',
      role: newTier === 'platinum' || newTier === 'gold' ? 'vip' : 'member',
    };
    setUser(updated);
    if (firebaseUser) {
      try {
        await updateDoc(doc(db, 'users', firebaseUser.uid), {
          tier: newTier,
          membershipStatus: 'active',
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const addBooking = async (bookingData: Omit<BookingRecord, 'id' | 'createdAt'>) => {
    const newRecord: BookingRecord = {
      ...bookingData,
      id: `bk-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBookings((prev) => [newRecord, ...prev]);
    if (user) {
      const updatedUser: UserProfile = {
        ...user,
        lifetimeSavings: user.lifetimeSavings + bookingData.totalSaved,
        totalBookings: user.totalBookings + 1,
      };
      setUser(updatedUser);
    }
  };

  const isMember = user !== null && user.membershipStatus === 'active';

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        isMember,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signInWithDemo,
        logout,
        upgradeTier,
        addBooking,
        bookings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
