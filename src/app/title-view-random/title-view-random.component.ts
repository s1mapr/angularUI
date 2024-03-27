import { Component } from '@angular/core';
import {Title} from "../title";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment";

@Component({
  selector: 'app-title-view-random',
  templateUrl: './title-view-random.component.html',
  styleUrls: ['./title-view-random.component.css']
})
export class TitleViewRandomComponent {
  title: Title | undefined

  constructor(private httpclient: HttpClient) {
    this.loadTitlesList();
  }


  ngOnInit(): void {

  }

  private loadTitlesList() {
    this.httpclient.get<Title>(`${environment.serverUrl}/titles/random`).subscribe(title => this.title = title)
  }
}
