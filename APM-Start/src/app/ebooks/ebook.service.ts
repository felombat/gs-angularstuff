import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { IEbook } from './ebook';


@Injectable({
  providedIn: 'root'
})
export class EbookService {
  // props
  // 'api/ebooks/ebooks-eLib.json';
  private ebookUrl = 'http://fueldemoapp.test/api/ebooklib/ebooks'; 

  
  // Constructor -- inject external/internal Modules
  constructor(private http: HttpClient) { }

  //Service call : pull ebooks from server
  getEbooks(folder:string = 'new'): Observable<IEbook[]> {
    let _folder = folder || 'new'; 
     return this.http.get<IEbook[]>(this.ebookUrl + '?folder='+_folder)
      .pipe(
        tap(data => console.log('Ebooks: ', JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  // Get one product
  // Since we are working with a json file, we can only retrieve all products
  // So retrieve all products and then find the one we want using 'map'
  getEbook(id: number): Observable<any | undefined> {
    let books:any = {}; //{"files" : [], "folder" :''};
    return this.getEbooks()
      .pipe(
        // tap({
        //   next: (data) => books = data.,
        //   error: (error) => this.handleError( error) 
        //   }),
            map((books) => books.find(p => p.ebookId === id) )
            
          );
  }

  // Error handle
  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


}
