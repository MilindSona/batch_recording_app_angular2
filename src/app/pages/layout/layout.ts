import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { BatchService } from '../../core/services/batch/batch-service';
import { GlobalConstant } from '../../constants/global.constant';
import { Roles } from '../../core/enums/role.enum';
import { UserService } from '../../core/services/user/user-service';

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
  userSrv=inject(UserService)
  roleEnum=Roles;
  
  constructor() {
  }

  onSearch(event:any) {
    
    const searchjText =  event.target.value;
    this.userSrv.onSearchChange.next(searchjText)
  }
  onLogOff() {
    localStorage.removeItem(GlobalConstant.LOCAL_KEY_LOGIN);
    this.router.navigate(['login'])
  }
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
