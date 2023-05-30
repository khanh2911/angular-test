import { Component } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
  
  logout(): void {
    this.storageService.signOut();
    window.location.reload();
  }
}
