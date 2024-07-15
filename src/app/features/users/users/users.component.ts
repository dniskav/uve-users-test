import { UsersService } from './../../../core/services/users/users.service';
import { userInterface } from './../../../core/models/users/users.model';
import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubSink } from 'subsink';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, UserDetailComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, OnDestroy {
  private subsink = new SubSink();
  allUsers = signal<userInterface[]>([]);
  searchText =  signal<string>('');
  filteredUsers = computed(() => 
    this.allUsers().filter(user => Object.values(user).some( value => 
      value.toString().toLowerCase().includes(this.searchText().toLocaleLowerCase())
    ))
  );


  constructor() {}
  public userService = inject(UsersService);

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.subsink.sink = this.userService.getUsers()
    .pipe(
      filter(users => users.length > 0)
    )
    .subscribe((data: any) => {
      this.allUsers.set(data);
    });
  }

  searchTerm(e: any) {
    const ev = e.target.value;
    this.searchText.set(ev);
  }
}
