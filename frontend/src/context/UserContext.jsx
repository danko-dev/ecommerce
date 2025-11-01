import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = async (email, password) => {
    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    const named = data?.name && data.name.trim().length > 0 ? data : { ...data, name: data.email?.split("@")[0] || "User" };
    setUser(named);
    localStorage.setItem("user", JSON.stringify(named));
    return named;
  };

  const signup = async (name, email, password) => {
    const res = await fetch("http://localhost:8080/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    const named = data?.name && data.name.trim().length > 0 ? data : { ...data, name: data.email?.split("@")[0] || "User" };
    setUser(named);
    localStorage.setItem("user", JSON.stringify(named));
    return named;
  };

  const updateUser = async (updates) => {
    if (!user?.id) return;
    const res = await fetch(`http://localhost:8080/api/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    const merged = { ...user, ...data };
    setUser(merged);
    localStorage.setItem("user", JSON.stringify(merged));
    return merged;
  };

  const changePassword = async (oldPassword, newPassword) => {
    if (!user?.id) return;
    const res = await fetch(`http://localhost:8080/api/users/${user.id}/password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    return res.json();
  };

  const deleteUser = async () => {
    if (!user?.id) return;
    await fetch(`http://localhost:8080/api/users/${user.id}`, { method: "DELETE" });
    setUser(null);
    localStorage.removeItem("user");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = useMemo(() => ({ user, login, signup, updateUser, changePassword, deleteUser, logout }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);


