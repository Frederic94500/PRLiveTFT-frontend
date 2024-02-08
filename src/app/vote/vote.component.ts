import { Component, Input, OnInit } from '@angular/core';

import { API_URL } from '../../config';
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
  numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  @Input() song!: SongModel;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    fetch('http://localhost:5000/api/song/get')
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
          url: this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${videoId}`
          ),
        };
      })
      .catch((error) => {});
  }

  onCastVoteButtonClick(vote: number): void {
    if (vote >= 1 && vote <= 10) {
      
    }
  }
}
