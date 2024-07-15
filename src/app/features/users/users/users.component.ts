import { userInterface } from './../../../core/models/users/users.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../../core/services/users/users.service';
import { CommonModule } from '@angular/common';
import { SubSink } from 'subsink';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, UserDetailComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, OnDestroy {
  private subsink = new SubSink();
  allUsers: userInterface[] = [];
  filteredUsers: userInterface[] = [];
  searchText: string = '';

  constructor(private userService: UsersService) {}
  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.subsink.sink = this.userService.getUsers().subscribe((data: any) => {
      this.allUsers = data;
      this.filteredUsers = data;
      console.log(this.allUsers);
    });
  }

  searchTerm(e: any) {
    const value = e.target.value;

    this.filteredUsers = this.allUsers.filter((u) => u.name.includes(value));
  }
}
