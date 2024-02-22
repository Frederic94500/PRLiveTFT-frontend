import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  private api = 'http://localhost:5000/api';

  public getWhoAmI() {
    return fetch(`${this.api}/auth/whoami`, {
      credentials: 'include',
    });
  }

  public getNotVoted() {
    return fetch(`${this.api}/song/getnotvoted`, {
      credentials: 'include',
    });
  }

  public getSong() {
    return fetch(`${this.api}/song/get`, {
      credentials: 'include',
    });
  }
}
