import { CommonModule, DecimalPipe } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NgbdSortableHeader, compare } from '@/services/sort.service';
import { SortColumn, SortEvent } from '@/interfaces/sort.interface';

import { ActivatedRoute } from '@angular/router';
import { AverageVote } from '@/interfaces/averageVote.interface';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, DecimalPipe, NgbdSortableHeader],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent implements OnInit {
  @Input() averageVotes!: AverageVote[];
  defaultAverageVotes: AverageVote[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.averageVotes = this.route.snapshot.data['data'];
    this.defaultAverageVotes = this.averageVotes;
    this.onSort({ column: 'average' as SortColumn, direction: 'desc' });
  }

  @ViewChildren(NgbdSortableHeader) headers:
    | QueryList<NgbdSortableHeader>
    | undefined;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    for (const header of this.headers || []) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }

    // sorting countries
    if (direction === '' || column === '') {
      this.averageVotes = this.defaultAverageVotes;
    } else {
      this.averageVotes = [...this.defaultAverageVotes].sort((a, b) => {
        const res = compare(
          a[column as keyof AverageVote],
          b[column as keyof AverageVote]
        );
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
