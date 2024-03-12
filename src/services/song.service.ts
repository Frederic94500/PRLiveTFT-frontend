import { SongModel } from '@/models/song.model';

export const transformURL = (song: SongModel) => {
  const url = new URL(song.url);
  const params = new URLSearchParams(url.search);
  const videoId = params.get('v');
  return {
    _id: song._id,
    artist: song.artist,
    title: song.title,
    url: `https://www.youtube.com/embed/${videoId}`,
  };
};
