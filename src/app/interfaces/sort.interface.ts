import { SongModel } from '../models/song.model';
import { UserModel } from '../models/user.model';

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
export type SortColumn = keyof UserModel | keyof SongModel | '';
export type SortDirection = 'asc' | 'desc' | '';
