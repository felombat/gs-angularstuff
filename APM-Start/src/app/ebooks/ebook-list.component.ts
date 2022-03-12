import { Component, OnInit,  OnDestroy  } from "@angular/core";
import { Subscription } from "rxjs";
import { IEbook } from "./ebook";
import { EbookService } from "./ebook.service";


@Component({
  selector: 'pm-ebooks',
  templateUrl: './ebook-list.component.html'

})

export class EbookListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Ebook List';

  imageWidth: number = 50;
  imageMargin: number = 2;

  _currentFolder:string= "eLib"; 

  // Prop to keep the state after an event 
  showImage: boolean = true;
  // error handling
  errorMessage: string = "";
  //sub!: Subscription; // alt : sub : Subscription | undefiened
  subEbook!: Subscription;

  ebooks: any = { 'files': [], 'folder': '' };
  ebooklist: IEbook[] = this.ebooks.files;

  // Filter Method
  filteredEbooks: IEbook[] = [];

  // Constructor
  constructor(
    // private productService: ProductService,
    private ebookService: EbookService) {


  }

  // Filter 
  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  };

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('in setter: ', value)
    this.filteredEbooks = this.performFilter(value);
  }; 

  get currentFolder(): string {
    return this._currentFolder;
  }

  set currentFolder(value: string) {
    this._currentFolder = value;
    console.log('in folder: ', value)
    //this.filteredProducts = this.performFilter(value);
  }

  performFilter(filterBy: string): IEbook[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.ebooklist.filter((ebook: IEbook) =>
      ebook.title.toLocaleLowerCase().includes(filterBy) ||
      ebook.author.toLocaleLowerCase().includes(filterBy));
  }

  // updateFolder(folder: string): IEbook[] {
    
  // }

  // Method Demo
  toggleImage(): void {
    this.showImage = !this.showImage;
    console.info('Clicked');
  }

  onRatingClicked(msg: string): void {
    // console.log(msg);
    this.pageTitle = "Ebook List: " + " " + msg;
  }

  ngOnInit(): void {
    console.info("App init !!! ");
    this.listFilter = 'angular';

    // @Var : Subscription 

    // ebooks
    this.subEbook = this.ebookService.getEbooks().subscribe({
      //next: products => this.products = this.filteredEbooks = products, /// Alt !!
      next: ebooks => {
        this.ebooks = ebooks;
        this.ebooklist = this.ebooks;
        // let idx:number = 1;
        // this.ebooklist.forEach(function (elt){
        //   elt.ebookId = idx++; 
        // })
        this.filteredEbooks = this.ebooklist;
      },
      error: err => this.errorMessage = err
    });
  }

  onImgError(event: { target: { src: string; }; }){
    event.target.src = '../assets/images/pdf02.png'
   //Do other stuff with the event.target
   }
 
  ngOnDestroy() {
    //this.sub.unsubscribe();
    this.subEbook.unsubscribe();
  }
}
