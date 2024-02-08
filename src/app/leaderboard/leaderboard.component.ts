import { Component, Input, OnInit } from '@angular/core';

import { AverageVote } from '../models/averageVote.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent implements OnInit {
  @Input() averageVotes!: AverageVote[];

  ngOnInit(): void {
    fetch('http://localhost:5000/api/vote/avg')
      .then((response) => response.json())
      .then((data) => {
        this.averageVotes = JSON.parse(data.data);
      })
      .catch((error) => {});
  }
}
