import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit , OnDestroy {
  pageTitle: string = 'Product List';

  imageWidth: number = 50;
  imageMargin: number = 2;

  // Prop to keep the state after an event 
  showImage: boolean = true;
  // error handling
  errorMessage: string = "";
  sub!: Subscription; // alt : sub : Subscription | undefiened
  subEbook!: Subscription;

  // products: IProduct[] = [
  //   {
  //     "productId": 1,
  //     "productName": "Leaf Rake",
  //     "productCode": "GDN-0011",
  //     "releaseDate": "March 19, 2021",
  //     "description": "Leaf rake with 48-inch wooden handle.",
  //     "price": 19.95,
  //     "starRating": 3.2,
  //     "imageUrl": "assets/images/leaf_rake.png"
  //   },
  //   {
  //     "productId": 2,
  //     "productName": "Garden Cart",
  //     "productCode": "GDN-0023",
  //     "releaseDate": "March 18, 2021",
  //     "description": "15 gallon capacity rolling garden cart",
  //     "price": 32.99,
  //     "starRating": 4.2,
  //     "imageUrl": "assets/images/garden_cart.png"
  //   },
  //   {
  //     "productId": 5,
  //     "productName": "Hammer",
  //     "productCode": "TBX-0048",
  //     "releaseDate": "May 21, 2021",
  //     "description": "Curved claw steel hammer",
  //     "price": 8.9,
  //     "starRating": 4.8,
  //     "imageUrl": "assets/images/hammer.png"
  //   }];

  products: IProduct[] = [];


  // Filter Method
  filteredProducts: IProduct[] = [];

  // Constructor
  constructor(
    private productService: ProductService,
     ) {


  }

  // Filter 
  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('in setter: ', value)
    this.filteredProducts = this.performFilter(value);
  }




  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  // Method Demo
  toggleImage(): void {
    this.showImage = !this.showImage;
    console.info('Clicked');
  }

  onRatingClicked(msg: string): void {
    // console.log(msg);
    this.pageTitle = "Product List: " + " " + msg;
  }

  ngOnInit(): void {
    console.info("App init !!! ");
    this.listFilter = '';

    // @Var : Subscription 
    this.sub = this.productService.getProducts().subscribe({
      //next: products => this.products = this.filteredProducts = products, /// Alt !!
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });

     
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    //this.subEbook.unsubscribe();
  }
}
