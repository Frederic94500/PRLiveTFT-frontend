import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserModel } from '../models/user.model';

export type SortColumn = keyof UserModel | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

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
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, NgbdSortableHeader],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users!: UserModel[];
  defaultUsers!: UserModel[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.users = this.route.snapshot.data['data'];
    this.defaultUsers = this.users;
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
      this.users = this.defaultUsers;
    } else {
      this.users = [...this.defaultUsers].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
