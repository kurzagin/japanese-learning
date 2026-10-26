import { createClient } from "./supabase/client";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

export interface AuthResponse<T = any> {
  data: T | null;
  error: { message: string; code?: string } | null;
}

export const authClient = {
  async signUp(
    email: string,
    password: string,
    name?: string
  ): Promise<AuthResponse<{ user: AuthUser; session: any }>> {
    try {
      const supabase = createClient();
      const origin =
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_SITE_URL || "https://sakanajp.site";

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
          data: {
            display_name: name || email.split("@")[0],
          },
        },
      });

      if (error) {
        return { data: null, error: { message: error.message, code: error.code } };
      }

      if (!data.user) {
        return { data: null, error: { message: "Failed to create account" } };
      }

      const authUser: AuthUser = {
        id: data.user.id,
        email: data.user.email || email,
        name: data.user.user_metadata?.display_name || email.split("@")[0],
      };

      // Only store credentials if a live session was granted (i.e. email confirmation disabled)
      if (data.session && typeof window !== "undefined") {
        localStorage.setItem("sakana_user_email", authUser.email);
        localStorage.setItem("sakana_user_id", authUser.id);
      }

      return { data: { user: authUser, session: data.session }, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err?.message || "Network error" } };
    }
  },

  async signIn(email: string, password: string): Promise<AuthResponse<{ user: AuthUser; session: any }>> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { data: null, error: { message: error.message, code: error.code } };
      }

      if (!data.user) {
        return { data: null, error: { message: "Invalid credentials" } };
      }

      const authUser: AuthUser = {
        id: data.user.id,
        email: data.user.email || email,
        name: data.user.user_metadata?.display_name || email.split("@")[0],
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("sakana_user_email", authUser.email);
        localStorage.setItem("sakana_user_id", authUser.id);
      }

      return { data: { user: authUser, session: data.session }, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err?.message || "Network error" } };
    }
  },

  async getSession(): Promise<AuthResponse<{ user: AuthUser; session: any }>> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        return { data: null, error: { message: error?.message || "No active session" } };
      }

      const authUser: AuthUser = {
        id: data.session.user.id,
        email: data.session.user.email || "",
        name:
          data.session.user.user_metadata?.display_name ||
          data.session.user.email?.split("@")[0],
      };

      return { data: { user: authUser, session: data.session }, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err?.message || "Network error" } };
    }
  },

  async updatePassword(newPassword: string): Promise<AuthResponse<null>> {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { data: null, error: { message: error.message, code: error.code } };
      }

      return { data: null, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err?.message || "Network error" } };
    }
  },

  async updateEmail(newEmail: string): Promise<AuthResponse<null>> {
    try {
      const supabase = createClient();
      const origin =
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_SITE_URL || "https://sakanajp.site";

      const { error } = await supabase.auth.updateUser(
        { email: newEmail },
        { emailRedirectTo: `${origin}/auth/callback` }
      );

      if (error) {
        return { data: null, error: { message: error.message, code: error.code } };
      }

      return { data: null, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err?.message || "Network error" } };
    }
  },

  async signOut(): Promise<void> {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("sakana_user_email");
      localStorage.removeItem("sakana_user_id");
      localStorage.removeItem("sakana_progress");
      localStorage.removeItem("sakana_srs_records");

      // Clean up migration tracking flags
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("sakana_migrated_for_")) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    }
  },
};
