import { ApiService } from '@/services/api.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard {
  constructor(private router: Router) {}

  async canActivate() {
    if ((await new ApiService().getWhoAmI()).status !== 200) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
