import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiService } from './services/api.service';
import { AuthGuard } from './guards/auth.guard';
import { IndexComponent } from './index/index.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginRedirectComponent } from './login-redirect/login-redirect.component';
import { VoteComponent } from './vote/vote.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginRedirectComponent },
  {
    path: 'vote',
    canActivate: [() => inject(AuthGuard).canActivate()],
    resolve: { data: () => inject(ApiService).getNotVoted() },
    component: VoteComponent,
  },
  {
    path: 'leaderboard',
    resolve: { data: () => inject(ApiService).avgVote() },
    component: LeaderboardComponent,
  },
];
