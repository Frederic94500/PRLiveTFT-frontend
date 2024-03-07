import { CommonModule, DecimalPipe } from '@angular/common';
import {
  Component,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { ApiService } from '../services/api.service';
import { AverageVote } from '../models/averageVote.model';

export type SortColumn = keyof AverageVote | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  standalone: true,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, DecimalPipe, NgbdSortableHeader],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent implements OnInit {
  private api = new ApiService();
  @Input() averageVotes!: AverageVote[];
  defaultAverageVotes: AverageVote[] = [];

  async ngOnInit(): Promise<void> {
    this.averageVotes = await this.api.avgVote();
    this.defaultAverageVotes = this.averageVotes;
    this.onSort({ column: 'average', direction: 'desc' });
  }

  @ViewChildren(NgbdSortableHeader) headers:
    | QueryList<NgbdSortableHeader>
    | undefined;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    for (const header of this.headers!) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }

    // sorting countries
    if (direction === '' || column === '') {
      this.averageVotes = this.defaultAverageVotes;
    } else {
      this.averageVotes = [...this.defaultAverageVotes].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
