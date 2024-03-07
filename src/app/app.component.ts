import { Component, OnInit } from '@angular/core';
import {
  NgbDropdownModule,
  NgbModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgbModule,
    NgbNavModule,
    NgbDropdownModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'PRLiveTFT-frontend';
  apiService = new ApiService();
  logged!: boolean;

  ngOnInit(): void {
    this.apiService.getWhoAmI().then((response) => {
      if (response.status === 200) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
  }
}
