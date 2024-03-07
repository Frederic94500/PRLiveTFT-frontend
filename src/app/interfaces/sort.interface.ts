import { AverageVote } from './averageVote.interface';
import { UserModel } from '../models/user.model';

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
export type SortColumn = keyof UserModel | keyof AverageVote | '';
export type SortDirection = 'asc' | 'desc' | '';
