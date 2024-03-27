import { Component } from '@angular/core';
import {User} from "../../user";
import {Comment, Image, Title} from "../../title";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environment";

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css', '../profile.component.css', '../../title-view/title-view.component.css']
})
export class ProfileViewComponent {
  user: User | undefined;
  commentedTitles: Title[] | undefined
  isSubscribed: boolean = false


  constructor(private httpclient: HttpClient, private router: Router, private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('id');
    this.httpclient.get<User>(`${environment.serverUrl}/account/profile-view/${id}`).subscribe(user => {
      this.user = user
      this.checkSubscribe();
    });
  }

  parseDate(date: Date): Date {
    return new Date(date);
  }

  getCreatingDate(date: Date): string {
    date = this.parseDate(date);
    return date.toLocaleTimeString() +" "+ date.toLocaleDateString()
  }


  getLimitComments() {
    let id = this.route.snapshot.paramMap.get('id');
    this.httpclient.get<Title[]>(`${environment.serverUrl}/account/commented/${id}`).subscribe(titles => {
      this.commentedTitles = titles;
    });
  }

  subscribe() {
    let id = this.route.snapshot.paramMap.get('id');
    this.httpclient.post<number>(`${environment.serverUrl}/account/subscribe/${id}`, {}).subscribe(() => {
      document.location.reload();
    });
  }

  unSubscribe() {
    let id = this.route.snapshot.paramMap.get('id');
    this.httpclient.post<number>(`${environment.serverUrl}/account/unsubscribe/${id}`, {}).subscribe(() => {
      document.location.reload();
    });
  }


  checkSubscribe() {
    if (this.user) {
      let id = this.user.id
      this.httpclient.get<boolean>(`${environment.serverUrl}/account/check-sub/${id}`).subscribe(isSubscribed => {
        this.isSubscribed = isSubscribed;
      });
    }
  }

  getReleaseYear(u: User): string {
    return new Date(u.creationDate).toLocaleDateString();
  }

  ngOnInit(): void {
    this.getLimitComments();
  }

}
