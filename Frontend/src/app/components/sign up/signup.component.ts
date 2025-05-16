import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth-services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements AfterViewInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngAfterViewInit() {
    const form = document.getElementById('signupForm') as HTMLFormElement;

    const inputs = {
      username: document.getElementById('username') as HTMLInputElement,
      password: document.getElementById('password') as HTMLInputElement,
      email: document.getElementById('email') as HTMLInputElement,
      firstName: document.getElementById('firstName') as HTMLInputElement,
      lastName: document.getElementById('lastName') as HTMLInputElement,
      phoneNumber: document.getElementById('phoneNumber') as HTMLInputElement,
      birthDate: document.getElementById('birthDate') as HTMLInputElement
    };

    const errors = {
      username: document.getElementById('usernameError') as HTMLElement,
      password: document.getElementById('passwordError') as HTMLElement,
      email: document.getElementById('emailError') as HTMLElement,
      firstName: document.getElementById('firstNameError') as HTMLElement,
      lastName: document.getElementById('lastNameError') as HTMLElement,
      phoneNumber: document.getElementById('phoneNumberError') as HTMLElement,
      birthDate: document.getElementById('birthDateError') as HTMLElement
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let isValid = true;

      const user = {
        user_name: inputs.username.value.trim(),
        pass: inputs.password.value.trim(),
        email: inputs.email.value.trim(),
        firstName: inputs.firstName.value.trim(),
        lastName: inputs.lastName.value.trim(),
        phone: inputs.phoneNumber.value.trim(),
        birth: inputs.birthDate.value
      };

      // Perform validations for each field (similar to the initial code)
      if (!user.user_name) {
        errors.username.textContent = 'Username is required.';
        isValid = false;
      } else {
        errors.username.textContent = '';
      }

      if (!user.pass || user.pass.length < 6) {
        errors.password.textContent = 'Password must be at least 6 characters.';
        isValid = false;
      } else {
        errors.password.textContent = '';
      }

      if (!user.email || !this.isValidEmail(user.email)) {
        errors.email.textContent = 'Enter a valid email.';
        isValid = false;
      } else {
        errors.email.textContent = '';
      }

      if (!isValid) {
        return;
      }

      this.authService.signup(user).subscribe(
        () => {
          console.log('User registered successfully');
          this.router.navigate(['/feed']);
        },
        (error) => {
          console.error(error);
          errors.email.textContent = 'Email already exists.';
        }
      );
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
