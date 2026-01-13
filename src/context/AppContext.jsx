import { Spin } from "antd";
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

const AppContext = createContext();

const getInitialUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const getInitialToken = () =>
  localStorage.getItem("userToken") || localStorage.getItem("token") || null;

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const AppProvider = ({ children }) => {
  const baseURL = import.meta.env.VITE_API_BASE || "https://backend-for-my-blog-app.onrender.com/api/v1";
  const [user, setUser] = useState(() => getInitialUser());
  const [userToken, setUserToken] = useState(() => getInitialToken());
  const [loadingUser, setLoadingUser] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => getInitialTheme());

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  //Sync theme with localStorage and Document class
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Fetch the current user from the API. Accepts an optional AbortSignal.
  const fetchCurrentUser = useCallback(
    async (signal) => {
      if (!userToken) return;
      setLoadingUser(true);
      try {
        const res = await fetch(`${baseURL}/users/me`, {
          headers: { Authorization: `Bearer ${userToken}` },
          signal,
        });

        if (signal?.aborted) return;

        let data = null;
        try {
          data = await res.json();
        } catch {
          data = null;
        }

        if (res.ok && data?.user) setUser(data.user);
        else {
          // Treat non-ok as unauthenticated and clear user/token
          setUser(null);
          setUserToken(null);
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("fetchCurrentUser error:", err);
        setUser(null);
        setUserToken(null);
      } finally {
        setLoadingUser(false);
      }
    },
    [userToken, baseURL]
  );

  useEffect(() => {
    try {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
    } catch {}
  }, [user]);

  useEffect(() => {
    if (userToken) {
      localStorage.setItem("userToken", userToken);
      localStorage.setItem("token", userToken);
    } else {
      localStorage.removeItem("userToken");
      localStorage.removeItem("token");
    }
  }, [userToken]);

  // Initialization effect: fetch current user once when token is present.
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    (async () => {
      if (userToken && !user) {
        await fetchCurrentUser(controller.signal);
      }
      if (mounted) setInitializing(false);
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [userToken, user, fetchCurrentUser]);

  const login = ({ user: userObj, token }) => {
    setUser(userObj);
    setUserToken(token);
  };

  const logout = () => {
    setUser(null);
    setUserToken(null);
  };

  const isAuthenticated = !!userToken && !!user;
  const hasRole = (role) => !!user && user.role === role;
  const isAdmin = () => hasRole("admin");

  const value = useMemo(
    () => ({
      user,
      setUser,
      userToken,
      setUserToken,
      baseURL,
      login,
      logout,
      isAuthenticated,
      hasRole,
      isAdmin,
      loadingUser,
      fetchCurrentUser,
      isDarkMode,
      toggleTheme,
    }),
    [user, userToken, baseURL, loadingUser, fetchCurrentUser, isDarkMode, toggleTheme]
  );

  if (initializing) {
    return (
      <AppContext.Provider value={value}>
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <div className="text-center">
            <Spin size="large" tip="Loading user..." />
          </div>
        </div>
      </AppContext.Provider>
    );
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
