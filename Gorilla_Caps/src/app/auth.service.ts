export class AuthService {
    
    setToken(token: string): void {
      localStorage.setItem('token', token);
    }
  
    getToken(): string | null {
      return localStorage.getItem('token');
    }
  
    clearToken(): void {
      localStorage.removeItem('token');
    }

    setID(id: string): void {
      localStorage.setItem('id', id);
    }

    getID(): string | null {
      return localStorage.getItem('id');
    }

    clearID(): void {
      localStorage.removeItem('id');
    }
    
  }
  