import {Component, OnInit} from '@angular/core';
import {environment} from "../../environment";
import {User} from "../../user";
import {AppComponent} from "../../app.component";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Image} from "../../title";

@Component({
  selector: 'app-prof-edit',
  templateUrl: './prof-edit.component.html',
  styleUrls: ['../auth-page.component.css', '../../publish/publish.component.css', '../../title-view/title-view.component.css']
})
export class ProfEditComponent  {
  name: string | undefined
  firstName: string | undefined
  lastName: string | undefined
  img: any = ''

  userExist: boolean = false
  emptyName: boolean = false

  user: User | undefined = AppComponent.getUser();
  constructor(private httpclient: HttpClient, private router: Router) {
  }

  validation() {
    if (!this.name) {
      this.emptyName = true;
      return;
    }

    this.emptyName = false;
    this.userExist = false;
    this.changeProfileInfo();
  }

  changeProfileInfo() {
    this.httpclient.post<User>(`${environment.serverUrl}/account/edit`, {
      nickName: this.name,
      firstName: this.firstName,
      lastName: this.lastName,
    }).subscribe(() => {this.router.navigate(['/profile'])});
  }
}
