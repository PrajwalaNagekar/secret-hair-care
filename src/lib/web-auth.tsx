import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type WebUser = {
  name: string;
  email: string;
};

type AuthValue = {
  user: WebUser | null;
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  register: (name: string, email: string, password: string) => { ok: true } | { ok: false; error: string };
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

const STORAGE_KEY = "secret-web-user";
const USERS_KEY = "secret-web-users";

type StoredUser = WebUser & { password: string };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<WebUser | null>(null);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const value = useMemo<AuthValue>(() => {
    const readUsers = (): StoredUser[] => {
      try {
        const raw = typeof window !== "undefined" ? window.localStorage.getItem(USERS_KEY) : null;
        return raw ? (JSON.parse(raw) as StoredUser[]) : [];
      } catch {
        return [];
      }
    };
    const writeUsers = (next: StoredUser[]) => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(USERS_KEY, JSON.stringify(next));
      }
    };
    return {
      user,
      login: (email, password) => {
        const trimmed = email.trim().toLowerCase();
        const found = readUsers().find((u) => u.email.toLowerCase() === trimmed);
        if (!found) return { ok: false, error: "No account found with that email." };
        if (found.password !== password) return { ok: false, error: "Incorrect password." };
        setUser({ name: found.name, email: found.email });
        return { ok: true };
      },
      register: (name, email, password) => {
        const trimmed = email.trim().toLowerCase();
        if (!name.trim() || !trimmed || !password) {
          return { ok: false, error: "All fields are required." };
        }
        if (password.length < 6) {
          return { ok: false, error: "Password must be at least 6 characters." };
        }
        const users = readUsers();
        if (users.some((u) => u.email.toLowerCase() === trimmed)) {
          return { ok: false, error: "An account with that email already exists." };
        }
        const next: StoredUser = { name: name.trim(), email: trimmed, password };
        writeUsers([...users, next]);
        setUser({ name: next.name, email: next.email });
        return { ok: true };
      },
      logout: () => setUser(null),
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
