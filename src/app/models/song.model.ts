import { SafeUrl } from '@angular/platform-browser';

export class SongModel {
  _id!: string;
  artist!: string;
  title!: string;
  url!: SafeUrl;
}
