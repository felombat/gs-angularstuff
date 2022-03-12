import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { IEbook } from './ebooks/ebook';
import { EbookListComponent } from './ebooks/ebook-list.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { RouterModule } from '@angular/router';
import { EbookDetailComponent } from './ebooks/ebook-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    EbookListComponent,
    EbookDetailComponent,
    WelcomeComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'products',   component:  ProductListComponent},
      { path: 'products/:id',   component:  ProductDetailComponent},
      { path: 'ebooks',   component:  EbookListComponent},
      { path: 'ebooks/:id',   component:  EbookDetailComponent},
      { path: 'welcome',   component:  WelcomeComponent},
      { path: '', redirectTo: 'welcome',   pathMatch:  'full'},
      { path: '**',   component:  PageNotFoundComponent}
      
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
