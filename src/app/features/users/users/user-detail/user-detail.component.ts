import { Component, Input } from '@angular/core';
import { userInterface } from '../../../../core/models/users/users.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  @Input() user: any;

  constructor() {

  }

  getInitials(name: string): string {
    return name.split(' ')[0][0] + name.split(' ')[1][0];
  } 
}
