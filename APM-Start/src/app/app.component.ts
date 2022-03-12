import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  // templateUrl: './app.component.html',
  template: `
  <div class="container"> 
    <div  class="row">

    <nav class='navbar navbar-expand navbar-light bg-light'>
        <a class='navbar-brand'>{{pageTitle}}</a>
        <ul class='nav nav-pills'>
          <li><a class='nav-link' routerLinkActive='active' routerLink='/welcome'>Home</a></li>
          <li><a class='nav-link' routerLinkActive='active' routerLink='/products'>Product List</a></li>
          <li><a class='nav-link' routerLinkActive='active' routerLink='/ebooks'>Ebook List</a></li>
        </ul>
    </nav>

    </div> 

    <div  class="row">
      <router-outlet></router-outlet>
      
      

    </div> 

  </div> 
   
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle: string = 'Angular: Getting Started';




}
