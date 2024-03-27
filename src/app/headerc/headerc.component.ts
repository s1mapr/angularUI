import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../user";
import {AppModule} from "../app.module";
import {AppComponent} from "../app.component";
import {environment} from "../environment";

@Component({
  selector: 'app-headerc',
  templateUrl: './headerc.component.html',
  styleUrls: ['./headerc.component.css']
})
export class HeadercComponent {

  user: User | undefined = AppComponent.getUser();

  constructor(private httpclient: HttpClient, private router: Router) {
  }

  logOut() {
    this.httpclient.get<any>(`${environment.serverUrl}/auth/logout`, {withCredentials: true}).subscribe(user => {
      localStorage.setItem("user", "");
      this.router.navigate(['/titles']);
    });
    document.location.reload();
  }
}
