import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '@/lib/firebase/firebase';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setUser } from '@/lib/redux/auth/slice';

interface UseAuthProps {
  isModal?: boolean;
  closeModal?: () => void;
}

export function useAuth({ isModal, closeModal }: UseAuthProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(
        setUser({
          name: user.displayName || 'User',
          email: user.email || '',
          id: user.uid,
        })
      );

      if (isModal && closeModal) {
        closeModal();
      } else {
        router.replace('/');
      }

      toast.success(`Welcome back, ${user.displayName || 'User'}!`);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const registerWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(
        setUser({
          name: user.displayName || 'User',
          email: user.email || '',
          id: user.uid,
        })
      );

      if (isModal && closeModal) {
        closeModal();
      } else {
        router.replace('/');
      }

      toast.success(
        `Account created successfully, ${user.displayName || 'User'}!`
      );
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Try again.');
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      if (isModal && closeModal) closeModal();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(
        setUser({
          name: user.displayName || 'User',
          email: user.email || '',
          id: user.uid,
        })
      );

      if (!isModal) router.replace('/');

      toast.success(`Welcome back, ${user.displayName || 'User'}!`);
    } catch (error) {
      console.error('Google Sign-In error:', error);
      toast.error('Google Sign-In failed. Try again.');
    }
  };

  return { signInWithEmail, registerWithEmail, signInWithGoogle };
}
