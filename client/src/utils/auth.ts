import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try{
      // Attempt to decode the provided token using jwtDecode, expecting a JwtPayload type
      const decoded = jwtDecode<JwtPayload>(token);
      console.log(decoded);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp ? decoded.exp < currentTime : true;
  } catch (error) {
    console.error('Failed to decode token', error);
    return true;
  }
}

  getToken(): string {
    // TODO: return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // TODO: redirect to the login page
    window.location.assign('/login');
  }
}

export default new AuthService();
