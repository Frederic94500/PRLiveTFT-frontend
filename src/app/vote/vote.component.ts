import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { SongModel } from '../models/song.model';

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

  constructor(public sanitizer: DomSanitizer) {
    this.selectSongs = [];
    this.song = {
      _id: '',
      artist: '',
      title: '',
      url: '',
    };
  }

  async ngOnInit(): Promise<void> {
    this.apiService.getNotVoted().then((data) => {
      if (data.length === 0) {
        this.allVoted = true;
      } else {
        this.selectSongs = data;
      }
    });
    if (!this.allVoted) {
      this.apiService.getSong().then((data) => {
        this.song = data;
      });
    }
  }

  onSongSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedSongId = target.value;
    const selectedSong = this.selectSongs.find(
      (song) => song._id === selectedSongId
    );
    if (selectedSong) {
      this.song = selectedSong;
      const url = new URL(selectedSong.url);
      const params = new URLSearchParams(url.search);
      const videoId = params.get('v');
      this.song.url = `https://www.youtube.com/embed/${videoId}`;
    }
  }

  onCastVoteButtonClick(score: number): void {
    if (score >= 1 && score <= 10) {
      const response = this.apiService.castVote(this.song!._id, score);
      location.reload();
    }
  }
}
