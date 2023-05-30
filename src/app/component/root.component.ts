import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  template: '<app-menubar></app-menubar>',
  styles:[`
  .mat-toolbar.mat-dark {
      background: #000;
      color: #fff;
  }
  `]
})
export class RootComponent {
  title = 'angularmaterial';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;

    }else{
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.storageService.signOut();
    window.location.reload();
  }
}
