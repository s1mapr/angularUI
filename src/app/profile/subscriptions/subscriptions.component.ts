import {Component} from '@angular/core';
import {Subscription, User} from "../../user";
import {environment} from "../../environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {
  subscriptions: Subscription[] | undefined

  constructor(private httpclient: HttpClient, private router: Router) {
    this.getSubscriptions();
  }

  getSubscriptions() {
    this.httpclient.get<Subscription[]>(`${environment.serverUrl}/account/subscriptions`).subscribe(subscriptions => {
      this.subscriptions = subscriptions;
    });
  }

  parseDate(date: Date): Date {
    return new Date(date);
  }
}
