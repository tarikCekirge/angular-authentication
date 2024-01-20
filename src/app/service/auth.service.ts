import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor() { }
  http = inject(HttpClient);

  apiUrl = environment.apiUrl

  getAll() {
    return this.http.get(`${this.apiUrl}/user`);
  }
  getAllRole() {
    return this.http.get(`${this.apiUrl}/role`);
  }
  getByCode(code: any) {
    return this.http.get(`${this.apiUrl}/user/${code}`);
  }
  proceedRegister(inputData: any) {
    return this.http.post(`${this.apiUrl}/user/`, inputData)
  }

  updateUser(code: any, inputData: any) {
    return this.http.put(`${this.apiUrl}/user/${code}`, inputData)
  }

  isLogginIn() {
    const userCredentialsString = sessionStorage.getItem('userCredentials');
    if (userCredentialsString) {
      const userCredentials = JSON.parse(userCredentialsString);
      const expirationTime = userCredentials?.expirationTime || 0;
      const currentTime = new Date().getTime();

      return currentTime < expirationTime;
    }
    return false;
  }

  getUserRole(): string | null {
    const userCredentialsString = sessionStorage.getItem('userCredentials');
    if (userCredentialsString) {
      const userCredentials = JSON.parse(userCredentialsString);
      return userCredentials?.userId || null;
    }

    return null;
  }

}
