import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
currentUserData:any;
router=inject(Router);

constructor(){
  const localData=localStorage.getItem('batchuser')
  if(localData!=null){
    this.currentUserData=JSON.parse(localData);
  }
}

logout(){
  localStorage.removeItem('batchuser');
  this.router.navigate(['login']);
}
}
