import { createContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { PuffLoader } from 'react-spinners';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setUser, clearUser } from '@/lib/redux/auth/slice';

interface AuthContextType {
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName || 'Anonymous',
            email: user.email || '',
            id: user.uid,
          })
        );
      } else {
        dispatch(clearUser());
      }
      setLoading(false);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center min-h-dvh">
        <PuffLoader size={100} color="#fc832c" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ loading }}>{children}</AuthContext.Provider>
  );
}
