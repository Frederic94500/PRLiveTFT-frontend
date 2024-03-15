import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@/services/api.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SongModel } from '@/models/song.model';
import { on } from 'events';
import { transformURL } from '@/services/song.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class VoteComponent implements OnInit {
  apiService = new ApiService();
  numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  allVoted!: boolean;
  selectSongs!: SongModel[];
  song!: SongModel | null;

  constructor(
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.selectSongs = this.route.snapshot.data['data'];
    this.reset(false);
  }

  async reset(onReload: boolean): Promise<void> {
    if (onReload) {
      this.selectSongs = await this.apiService.getNotVoted();
    }
    if (this.selectSongs.length === 0) {
      this.allVoted = true;
    }
    if (!this.allVoted) {
      this.song = transformURL(
        this.selectSongs[Math.floor(Math.random() * this.selectSongs.length)]
      );
    }
  }

  onSongSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedSongId = target.value;
    const selectedSong = this.selectSongs.find(
      (song) => song._id === selectedSongId
    );
    if (selectedSong) {
      this.song = transformURL(selectedSong);
    }
  }

  onRandomButtonClick(): void {
    this.reset(false);
  }  

  async onCastVoteButtonClick(score: number): Promise<void> {
    if (score >= 1 && score <= 10) {
      const response = await this.apiService.castVote(this.song!._id, score);
      if (response.code === 201) {
        this.snackBar.open(`${this.song?.title} voted!`, 'Close', {
          duration: 2000,
        });
        this.reset(true);
      } else {
        this.snackBar.open('Error voting', 'Close', { duration: 2000 });
      }
    }
  }
}
