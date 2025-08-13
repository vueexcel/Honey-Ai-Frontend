import { apiFetch } from "@/utils/api";

export const authService = {
  signup: async (email: string, password: string) => {
    return apiFetch("auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  login: async (email: string, password: string) => {
    const data = await apiFetch("auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.access_token) {
      localStorage.setItem("authToken", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    return Promise.resolve();
  },

  me: () => apiFetch("auth/me"),
};
