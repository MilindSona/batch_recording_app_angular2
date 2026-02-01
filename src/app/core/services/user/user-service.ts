import { Injectable } from '@angular/core';
import { GlobalConstant } from '../../../constants/global.constant';
import { CandidateModel } from '../../../Models/class/candidate.Model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    loggedUserData:CandidateModel=new CandidateModel();
    onSearchChange: Subject< string> = new Subject<string>;
    constructor() {
     
    }

    readLoggedUserData() {
      const localData = localStorage.getItem(GlobalConstant.LOCAL_KEY_LOGIN);
      if (localData != null) {
        this.loggedUserData = JSON.parse(localData);
      }
    }
  }