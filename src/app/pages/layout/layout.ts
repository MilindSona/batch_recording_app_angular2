import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GLOBAL_CONSTANT } from '../../constants/global.constant';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
currentUserData:any;
router=inject(Router);

constructor(){
  const localData=localStorage.getItem(GLOBAL_CONSTANT.LOCAL_KEY_LOGIN)
  if(localData!=null){
    this.currentUserData=JSON.parse(localData);
  }
}

logout(){
  localStorage.removeItem(GLOBAL_CONSTANT.LOCAL_KEY_LOGIN);
  this.router.navigate(['login']); // navigate expects array 
}
}
