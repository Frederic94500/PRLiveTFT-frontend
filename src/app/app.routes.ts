import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { Routes } from '@angular/router';
import { VoteComponent } from './vote/vote.component';

export const routes: Routes = [
  { path: 'vote', component: VoteComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
];
