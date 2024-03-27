import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category, Image, PossibleContent, Serial, Tag} from "../title";
import {environment} from "../environment";
import {Router} from "@angular/router";
import {AppComponent} from "../app.component";
import {User} from "../user";

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {
  url: any;
  urls: any[] = [];
  msg = "";
  public edited = false;
  user: User | undefined = AppComponent.getUser();

  imgInputHelper: HTMLElement | any;
  imgInputHelperLabel: HTMLElement | any;
  imgContainer: HTMLElement | any;
  imgFiles = [];
  addImgHandler: any;
  imgInputHelperMain: HTMLElement | any;
  imgInputHelperLabelMain: HTMLElement | any;
  imgContainerMain: HTMLElement | any;
  imgFilesMain = [];
  addImgHandlerMain: any;

  public titleNameEmpty: boolean = false;
  public descriptionEmpty: boolean = false;
  public titleImageEmpty: boolean = false;
  public tagsEmpty: boolean = false;
  public categoriesEmpty: boolean = false;
  public contentImagesEmpty: boolean = false;

  public titleName: string = '';
  public originalAuthor: string;
  public description: string = '';
  public titleImg: any = '';
  public type: string = '';


  public allPossible: PossibleContent | undefined;
  public categories: Category[] = [];
  public serials: Serial[] = [];
  public tags: Tag[] = [];
  public images: Image[] = [];

  constructor(private httpclient: HttpClient, private router: Router) {
    this.originalAuthor = this.user !== undefined ? this.user.nickName : '';
    this.loadContents().subscribe(cot => {
      this.allPossible = cot
      this.type = this.allPossible.types[0].typeName
    });
  }

  validation(): boolean {
    if (!this.titleName) {
      this.titleNameEmpty = true;
      return false;
    }

    if (!this.description) {
      this.descriptionEmpty = true;
      return false;
    }

    if (!this.titleImg) {
      this.titleImageEmpty = true;
      return false;
    }

    if (!this.tags) {
      this.tagsEmpty = true;
      return false;
    }

    if (!this.categories) {
      this.categoriesEmpty = true;
      return false;
    }

    if (!this.images) {
      this.contentImagesEmpty = true;
      return false;
    }

    this.titleNameEmpty = false;
    this.descriptionEmpty = false;
    this.titleImageEmpty = false;
    this.tagsEmpty = false;
    this.categoriesEmpty = false;
    this.contentImagesEmpty = false;

    return true;
  }

  ngOnInit(): void {
    this.imgInputHelper = document.getElementById("add-single-img");
    this.imgInputHelperLabel = document.getElementById("add-img-label");
    this.imgContainer = document.querySelector(".custom-image-container");
    this.imgFiles = [];

    this.addImgHandler = () => {
      const file = this.imgInputHelper.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newImg = document.createElement("img");
        newImg.style.width = "45%";
        newImg.style.height = "220px";
        newImg.style.border = "solid 1px black";
        newImg.style.borderRadius = "5px";
        newImg.style.objectFit = "cover";
        if (typeof reader.result === "string") {
          newImg.src = reader.result;
        }
        this.imgContainer.insertBefore(newImg, this.imgInputHelperLabel);
      };
      // @ts-ignore
      this.imgFiles.push(file);
      this.imgInputHelper.value = "";
      return;
    };
    this.imgInputHelper.addEventListener("change", this.addImgHandler);

    const getImgFileList = (imgFiles: any[]) => {
      const imgFilesHelper = new DataTransfer();
      imgFiles.forEach((imgFile) => imgFilesHelper.items.add(imgFile));
      return imgFilesHelper.files;
    };

    const customFormSubmitHandler = (ev: any) => {
      ev.preventDefault();
      const firstImgInput = document.getElementById("image-input");
      // @ts-ignore
      if (firstImgInput !== null) firstImgInput.files = getImgFileList(imgFiles);
    };
    // @ts-ignore
    document.querySelector(".custom-form").addEventListener("submit", customFormSubmitHandler);


    this.imgInputHelperMain = document.getElementById("add-single-img-main");
    this.imgInputHelperLabelMain = document.getElementById("add-img-label-main");
    this.imgContainerMain = document.querySelector(".custom-image-container-main");
    this.imgFilesMain = [];

    this.addImgHandlerMain = () => {
      const file = this.imgInputHelperMain.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newImg = document.createElement("img");
        newImg.style.width = "320px";
        newImg.style.height = "420px";
        newImg.style.border = "solid 1px black";
        newImg.style.borderRadius = "5px";
        newImg.style.objectFit = "cover";
        if (typeof reader.result === "string") {
          newImg.src = reader.result;
        }
        this.imgContainerMain.insertBefore(newImg, this.imgInputHelperLabelMain);
        this.imgInputHelperLabelMain.remove();
      };
      // @ts-ignore
      this.imgFilesMain.push(file);
      this.imgInputHelperMain.value = "";
      return;
    };
    this.imgInputHelperMain.addEventListener("change", this.addImgHandlerMain);
  }


  private loadContents() {
    return this.httpclient.get<PossibleContent>(`${environment.serverUrl}/titles/content-all`);
  }

  selectTitleImg(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    let mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
      this.titleImg = reader.result;
    }

    this.edited = true
  }

  addNewFile(event: any) {
    let mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.urls.push(reader.result);
      this.images.push(new Image(0, String(reader.result)));
    }
  }

  addPost() {
    if (!this.user) {
      return;
    }
    if (!this.validation()) return;

    this.httpclient.post<any>(`${environment.serverUrl}/titles/`, {
      titleName: this.titleName,
      originalAuthor: this.originalAuthor,
      authorId: this.user.id,
      author: this.user,
      typeName: this.type,
      description: this.description,
      creationDate: new Date(),
      titleImg: this.titleImg,
      content: {
        likes: [],
        views: 0,
        images: this.images
      },
      categories: this.categories,
      tags: this.tags,
      serials: this.serials
    }).subscribe(x => {
      this.router.navigate(["/titles/" + x.id]);
    });
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
