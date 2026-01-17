import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { BatchService } from '../../core/services/batch/batch-service';
import { GlobalConstant } from '../../constants/global.constant';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  isSidebarCollapsed = false;
  loggedUserData: any;
  router = inject(Router)
  batchSr = inject(BatchService)

  constructor() {
    const localData = localStorage.getItem(GlobalConstant.LOCAL_KEY_LOGIN);
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    }
  }

  onLogOff() {
    localStorage.removeItem(GlobalConstant.LOCAL_KEY_LOGIN);
    this.router.navigate(['login'])
  }
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
