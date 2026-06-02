import { supabase } from "./supabase/client";
import type { User } from "@supabase/supabase-js";

// Re-export supabase pour compatibilité avec l'API existante (onAuthStateChanged, etc.)
export { supabase };

// Type User pour compatibilité avec l'ancien code Firebase
export type { User };

export const registerUser = async (
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
): Promise<User | null> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName || "",
          last_name: lastName || "",
        },
      },
    });

    if (error) {
      console.error("Error registering user:", error.message);
      return null;
    }

    return data.user;
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
      return null;
    }

    return data.user;
  } catch (error) {
    console.error("Error logging in user:", error);
    return null;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

// Écouter les changements d'état d'authentification
export const onAuthStateChange = (
  callback: (user: User | null) => void
): (() => void) => {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
  return data.subscription.unsubscribe;
};

// Alias pour compatibilité Firebase — onAuthStateChanged
export const onAuthStateChanged = onAuthStateChange;
