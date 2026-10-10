const AUTH_BASE_URL =
  process.env.NEXT_PUBLIC_NEON_AUTH_URL ||
  "https://ep-soft-union-b3p097ai.neonauth.c-4.ap-southeast-1.aws.neon.tech/neondb/auth";

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
  async signUp(email: string, password: string, name?: string): Promise<AuthResponse<{ user: AuthUser }>> {
    try {
      const res = await fetch(`${AUTH_BASE_URL}/sign-up/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, name: name || email.split("@")[0] }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: { message: data.message || "Failed to sign up", code: data.code } };
      }
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err?.message || "Network error" } };
    }
  },

  async signIn(email: string, password: string): Promise<AuthResponse<{ user: AuthUser }>> {
    try {
      const res = await fetch(`${AUTH_BASE_URL}/sign-in/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: { message: data.message || "Invalid credentials", code: data.code } };
      }
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err?.message || "Network error" } };
    }
  },

  async getSession(): Promise<AuthResponse<{ user: AuthUser; session: any }>> {
    try {
      const res = await fetch(`${AUTH_BASE_URL}/get-session`, {
        method: "GET",
        headers: {
          Origin: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
        },
        credentials: "include",
      });

      if (!res.ok) {
        return { data: null, error: { message: "No active session" } };
      }
      const data = await res.json();
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err?.message || "Network error" } };
    }
  },

  async signOut(): Promise<void> {
    try {
      await fetch(`${AUTH_BASE_URL}/sign-out`, {
        method: "POST",
        headers: {
          Origin: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
        },
        credentials: "include",
      });
    } catch {
      // ignore
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("sakana_user_email");
      localStorage.removeItem("sakana_user_id");
    }
  },
};
