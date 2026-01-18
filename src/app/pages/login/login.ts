import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstant } from '../../constants/global.constant';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginObj = {
    email: '',
    password: ''
  };

  showPassword = false;

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    this.http.post("https://feestracking.freeprojectapi.com/api/BatchUser/login", this.loginObj).subscribe({
      next: (res: any) => {
        localStorage.setItem(GlobalConstant.LOCAL_KEY_LOGIN, JSON.stringify(res.data));
        this.router.navigateByUrl('dashboard');
      },
      error: (err) => {
        alert(err.error.message || 'Login failed!');
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
