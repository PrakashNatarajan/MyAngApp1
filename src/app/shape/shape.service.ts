import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Shape } from './shape';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ShapeService {

  private shapesUrl = 'http://localhost:12345/shapes';  // URL to web api

  constructor(
    private http: HttpClient,
  ) { }

  /** GET shapes from the server */
  getShapes (): Observable<Shape[][]> {
    return this.http.get<Shape[][]>(this.shapesUrl)
      .pipe(
        tap(multiShapes => this.log('fetched shapes successfully')),
        catchError(this.handleError('getShapes', []))
      );
  }

  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - title of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a shapeService message with the ShapeService */
  private log(message: string) {
    //this.messageService.add(`shapeService: ${message}`);
    console.log(message)
  }  

  private getMultidimensionalArray(arr: Shape[], rows: number, cols: number): Shape[][] {
    var multimatrix = [];
    if (rows * cols === arr.length) {
      for(var i = 0; i < arr.length; i+= cols) {
        multimatrix.push(arr.slice(i, cols + i));
      }
    }
    return multimatrix
  }

/*var a = [0, 1, 2, 3, 4, 5, 6, 7, 8];
getMultidimensionalArray(a, 3, 3);
*/
  
}