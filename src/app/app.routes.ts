import { ApiService } from '@/services/api.service';
import { AuthGuard } from '@/guards/auth.guard';
import { IndexComponent } from './index/index.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginRedirectComponent } from './login-redirect/login-redirect.component';
import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { VoteComponent } from './vote/vote.component';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    resolve: { data: () => inject(ApiService).getWhoAmI },
    component: IndexComponent,
  },
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
  {
    path: 'users',
    resolve: { data: () => inject(ApiService).getUsers() },
    component: UsersComponent,
  },
];
