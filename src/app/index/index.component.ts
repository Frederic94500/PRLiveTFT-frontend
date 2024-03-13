import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WhoAmI } from '@/interfaces/whoami.interface';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  text!: string;
  avatarUrl!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const data: WhoAmI = this.route.snapshot.data['data'];
    if (data.code === 200) {
      if (typeof data.data !== 'string') {
        this.text = `Welcome ${data.data.username}`;
        this.avatarUrl = `https://cdn.discordapp.com/avatars/${data.data.id}/${data.data.avatar}.png`;
      } else {
        this.text = 'To vote, please connect with Discord.';
        this.avatarUrl = '';
      }
    } else {
      this.text = 'To vote, please connect with Discord.';
      this.avatarUrl = '';
    }
  }
}
