import {Component, OnInit} from '@angular/core';
import {environment} from "../../environment";
import {HttpClient} from "@angular/common/http";
import {Router, Routes} from "@angular/router";
import {User} from "../../user";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth-page.component.css', '../../publish/publish.component.css', '../../title-view/title-view.component.css']
})
export class LoginComponent implements OnInit {

  email: string = ''
  password: string = ''
  emptyEmail: boolean = false
  emptyPass: boolean = false

  constructor(private httpclient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {

  }

  submit(): void {
    this.httpclient.post<string>(`${environment.serverUrl}/auth/login`, {
      email: this.email,
      password: this.password,
    }).subscribe(() => {
      this.getUser();
    });
  }

  getUser() {
    if (!this.email) {
      this.emptyEmail = true;
      return;
    }
    if (!this.password) {
      this.emptyPass = true;
      return;
    }

    this.httpclient.get<User>(`${environment.serverUrl}/auth/user`).subscribe(user => {
      localStorage.setItem("user", JSON.stringify(user));
      document.location.reload();
      this.router.navigate(['profile']).then(() => {});
    });
  }
}
