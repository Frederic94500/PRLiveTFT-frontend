import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbdSortableHeader } from '../services/sort.service';
import { SortEvent } from '../interfaces/sort.interface';
import { UserModel } from '../models/user.model';
import { compare } from '../services/sort.service';

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
        const res = compare(
          a[column as keyof UserModel],
          b[column as keyof UserModel]
        );
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
