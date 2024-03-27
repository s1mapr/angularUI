import {Component} from '@angular/core';
import {Category, PossibleContent, Serial, Tag, Title} from "../title";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment";

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.css']
})
export class TitlesComponent {
  titles: Title[] = []

  allPossible: PossibleContent | undefined;
  categories: Category[] = [];
  serials: Serial[] = [];
  tags: Tag[] = [];

  hideCats: boolean = true
  hideTags: boolean = true
  hideSerials: boolean = true

  constructor(protected httpclient: HttpClient) {
    this.loadTitlesList();
    this.loadContents();
  }


  ngOnInit(): void {

  }

  parseDate(date: Date): Date {
    return new Date(date);
  }

  getCreatingDate(date: Date): string {
    date = this.parseDate(date);
    return date.toLocaleTimeString() +" "+ date.toLocaleDateString()
  }

  private loadTitlesList() {
    this.httpclient.get<Title[]>(`${environment.serverUrl}/titles/`).subscribe(titles => this.titles = titles)
  }

  reset() {
    this.loadTitlesList();
  }

  filterList() {
    this.httpclient.post<Title[]>(`${environment.serverUrl}/titles/filter/`, {
      content: {
        categories: this.categories,
        tags: this.tags,
        serials: this.serials,
      }
    }).subscribe(titles => this.titles = titles);
  }

  private loadContents() {
    this.httpclient.get<PossibleContent>(`${environment.serverUrl}/titles/content-all`).subscribe(all => this.allPossible = all);
    this.titles = []
  }

  addToArr($event: any, obj: Category | Tag | Serial, arr: any[]) {
    if ($event.target.checked) {
      arr.push(obj);
      return;
    }
    removeFromArr(arr, obj);

    function removeFromArr(arr: any[], obj: Category | Tag | Serial) {
      if (arr.includes(obj)) {
        const index = arr.indexOf(obj, 0);
        if (index > -1) {
          arr.splice(index, 1);
        }
      }
    }
  }
}
