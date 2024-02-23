import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  private api = 'http://localhost:5000/api';

  public getWhoAmI() {
    return fetch(`${this.api}/auth/whoami`, {
      credentials: 'include',
    });
  }

  public async getNotVoted() {
    const response = await fetch(`${this.api}/song/getnotvoted`, {
      credentials: 'include',
    });
    const data = await response.json();
    return data.data;
  }

  public async castVote(songId: string, score: number) {
    const response = await fetch(`${this.api}/vote/cast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        songId: songId,
        score: score,
      }),
    });
    const data = await response.json();
    return data.data;
  }
}
