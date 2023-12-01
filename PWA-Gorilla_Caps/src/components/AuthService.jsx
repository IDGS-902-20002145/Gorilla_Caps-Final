const AuthService = {
  setToken: (token) => {
    localStorage.setItem("token", token);
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  clearToken: () => {
    localStorage.removeItem("token");
  },

  setID: (id) => {
    localStorage.setItem("id", id);
  },

  getID: () => {
    return localStorage.getItem("id");
  },

  clearID: () => {
    localStorage.removeItem("id");
  },
};

export default AuthService;
