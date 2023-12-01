/* eslint-disable no-useless-catch */
import axios from "axios";
import AuthService from "./AuthService";

const API_BASE_URL = "http://localhost:5000/api";

const ApiService = {
  getProductos: async () => {
    const token = AuthService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(`${API_BASE_URL}/Catalogo`, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  findProducto: async (id) => {
    const token = AuthService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(`${API_BASE_URL}/Catalogo/${id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  agregarCarrito: async (id, fullP) => {
    const token = AuthService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.post(`${API_BASE_URL}/Pedidos`, fullP, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Login/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  find_UsernamePassword: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Login/authenticate`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  loginRegister: async (user) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/Login/Registrar`,
        user
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMisPedidos: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Pedidos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  pedidosPorUsuario: async (id) => {
    const token = AuthService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(`${API_BASE_URL}/Pedidos/${id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  eliminarProducto: async (id) => {
    const token = AuthService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.delete(`${API_BASE_URL}/Pedidos/${id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPagarTodo: async (id) => {
    const token = AuthService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        `${API_BASE_URL}/Pedidos/PagarTodo/${id}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  postPagarTodo: async (id) => {
    const token = AuthService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/Pedidos/PagarTodoP/${id}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  pagarEfectivo: async (id) => {
    const token = AuthService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.put(
        `${API_BASE_URL}/Pedidos/PagarAE/${id}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  pagar: async (id) => {
    const token = AuthService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.put(`${API_BASE_URL}/Pedidos/Pagar/${id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ApiService;
