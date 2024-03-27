import {Component} from '@angular/core';
import {Image, Title} from "../title";
import {environment} from "../environment";
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-images-view',
  templateUrl: './images-view.component.html',
  styleUrls: ['./images-view.component.css']
})
export class ImagesViewComponent {

  user: User | undefined;
  images: Image[] = []

  constructor(private httpclient: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.loadImagesByID().subscribe(x => this.images = x);
  }

  private loadImagesByID() {
    let id = this.route.snapshot.paramMap.get('id');
    return this.httpclient.get<Image[]>(`${environment.serverUrl}/titles/${id}/images`);
  }
}
