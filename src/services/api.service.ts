import { AverageVote } from '@/interfaces/averageVote.interface';
import { Injectable } from '@angular/core';
import { UserModel } from '@/models/user.model';
import { WhoAmI } from '@/interfaces/whoami.interface';

@Injectable()
export class ApiService {
  private api = 'https://prlivetft-api.frederic94500.net/api';

  public async getWhoAmI(): Promise<WhoAmI> {
    const response = await fetch(`${this.api}/auth/whoami`, {
      credentials: 'include',
    });
    return response.json();
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
        'Access-Control-Allow-Credentials': 'true',
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

  public async avgVote(): Promise<AverageVote[]> {
    const response = await fetch(`${this.api}/vote/avg`, {});
    const data = await response.json();
    return JSON.parse(data.data);
  }

  public async getUsers(): Promise<UserModel[]> {
    const response = await fetch(`${this.api}/user/getusers`, {});
    const data = await response.json();
    return data.data;
  }
}
