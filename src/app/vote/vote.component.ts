import { Component, Input, OnInit } from '@angular/core';

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
  loggedIn!: boolean;
  numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  allVoted!: boolean;
  selectSongs!: SongModel[];
  song!: SongModel;

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
    await this.isLogged();
    if (!this.loggedIn) {
      return;
    }
    fetch('http://localhost:5000/api/song/getnotvoted', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        this.selectSongs = data.data;
      })
      .catch((error) => {
        this.allVoted = true;
      });
    fetch(`http://localhost:5000/api/song/get`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        const tempSong = data.data;
        const url = new URL(tempSong.url);
        const params = new URLSearchParams(url.search);
        const videoId = params.get('v');
        this.song = {
          _id: tempSong._id,
          artist: tempSong.artist,
          title: tempSong.title,
          url: `https://www.youtube.com/embed/${videoId}`,
        };
      })
      .catch((error) => {
        this.allVoted = true;
      });
  }

  async isLogged(): Promise<void> {
    try {
      const response = await fetch('http://localhost:5000/api/auth/whoami', {
        credentials: 'include',
      });
      if (response.status === 403) {
        this.loggedIn = false;
      } else {      
        this.loggedIn = true;
      }
    } catch (error) {
      this.loggedIn = false;
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
      fetch(`http://localhost:5000/api/vote/cast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          songId: this.song._id,
          score: score,
        }),
      });
      location.reload();
    }
  }
}
