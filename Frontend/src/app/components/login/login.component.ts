import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth-services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngAfterViewInit() {
    const form = document.getElementById('loginForm') as HTMLFormElement;
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const usernameError = document.getElementById('usernameError') as HTMLElement;
    const passwordError = document.getElementById('passwordError') as HTMLElement;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let isValid = true;

      const email = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email) {
        usernameError.textContent = 'Email is required.';
        isValid = false;
      } else if (!this.isValidEmail(email)) {
        usernameError.textContent = 'Enter a valid email.';
        isValid = false;
      } else {
        usernameError.textContent = '';
      }

      if (!password) {
        passwordError.textContent = 'Password is required.';
        isValid = false;
      } else {
        passwordError.textContent = '';
      }

      if (isValid) {
        console.log(password);
        this.authService.login({ email:email, pass: password }).subscribe(
          () => {
            this.router.navigate(['/feed']);
          },
          (error) => {
            passwordError.textContent = 'Incorrect Username or Password';
            console.error(error);
          }
        );
      }
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
