import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { delay, Observable, tap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService } from '../../services/user.service';
import { Result } from '../../shared/models/user.model';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  standalone: true,
  imports: [CommonModule, LoaderComponent, MatButtonModule, MatCardModule, MatProgressSpinnerModule, RouterLink],
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  public showSpinner = true;
  public users$!: Observable<Result[]>;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers().pipe(
      delay(1700),
      tap(() => (this.showSpinner = false))
    );
  }
}
