import { Component, OnInit } from '@angular/core';
import {
  NgbDropdownModule,
  NgbModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '@/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [NgbModule, NgbNavModule, NgbDropdownModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  apiService = new ApiService();
  msgButton: string = '';
  link: string = '';

  ngOnInit(): void {
    this.apiService
      .getWhoAmI()
      .then((response) => {
        if (response.code === 200) {
          this.msgButton = 'Logout';
          this.link = 'https://prlivetft-api.frederic94500.net/api/auth/logout';
        } else {
          this.msgButton = 'Login';
          this.link =
            'https://prlivetft-api.frederic94500.net/api/auth/discord/login';
        }
      })
      .catch((error) => {
        this.msgButton = 'Login';
        this.link =
          'https://prlivetft-api.frederic94500.net/api/auth/discord/login';
        console.log(error);
      });
  }
}
