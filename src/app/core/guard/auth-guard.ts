import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GLOBAL_CONSTANT } from '../../constants/global.constant';

//Upto angular v15 services were used for guards
//From angular v16 we can use functions for guards
export const authGuard: CanActivateFn = (route, state) => {
  debugger;
  const router=inject(Router);
  const localData = localStorage.getItem(GLOBAL_CONSTANT.LOCAL_KEY_LOGIN);
  if(localData!=null){ // you have check null ceck only not undefined !!!
    return true
  }else{
    router.navigateByUrl('/login');
    return false;
  }
  
};
