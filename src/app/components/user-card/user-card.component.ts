import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { delay, Observable, tap } from 'rxjs';

import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { UserService } from '../../services/user.service';
import { Result } from '../../shared/models/user.model';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  imports: [CommonModule, LoaderComponent, MatButtonModule, MatCardModule, MatProgressSpinnerModule, RouterLink],
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit {
  public user$!: Observable<Result[]>;
  public showSpinner = true;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUser().pipe(
      delay(1700),
      tap(() => (this.showSpinner = false))
    );
  }
}
