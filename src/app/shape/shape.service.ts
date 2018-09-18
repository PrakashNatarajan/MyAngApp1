import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Shape } from './shape';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ShapeService {

  private shapesUrl = 'http://localhost:3000/shapes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET shapes from the server */
  getShapes (): Observable<Shape[]> {
    return this.http.get<Shape[]>(this.shapesUrl)
      .pipe(
        tap(shapes => this.log('fetched shapes')),
        catchError(this.handleError('getShapes', []))
      );
  }

  /** GET shape by id. Return `undefined` when id not found */
  getShapeNo404<Data>(id: number): Observable<Shape> {
    const url = `${this.shapesUrl}/?id=${id}`;
    return this.http.get<Shape[]>(url)
      .pipe(
        map(shapes => shapes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} shape id=${id}`);
        }),
        catchError(this.handleError<Shape>(`getshape id=${id}`))
      );
  }

  /** GET shape by id. Will 404 if id not found */
  getShape(id: number): Observable<Shape> {
    const url = `${this.shapesUrl}/${id}`;
    return this.http.get<Shape>(url).pipe(
      tap(_ => this.log(`fetched shape id=${id}`)),
      catchError(this.handleError<Shape>(`getshape id=${id}`))
    );
  }

  /* GET shapes whose title contains search term */
  searchshapes(term: string): Observable<Shape[]> {
    if (!term.trim()) {
      // if not search term, return empty shape array.
      return of([]);
    }
    return this.http.get<Shape[]>(`${this.shapesUrl}/?title=${term}`).pipe(
      tap(_ => this.log(`found shapes matching "${term}"`)),
      catchError(this.handleError<Shape[]>('searchshapes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new shape to the server */
  addShape (shape: Shape): Observable<Shape> {
    return this.http.post<Shape>(this.shapesUrl, shape, httpOptions).pipe(
      tap((shape: Shape) => this.log(`added shape w/ id=${shape.id}`)),
      catchError(this.handleError<Shape>('addshape'))
    );
  }

  /** DELETE: delete the shape from the server */
  deleteshape (shape: Shape | number): Observable<Shape> {
    const id = typeof shape === 'number' ? shape : shape.id;
    const url = `${this.shapesUrl}/${id}`;

    return this.http.delete<Shape>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted shape id=${id}`)),
      catchError(this.handleError<Shape>('deleteshape'))
    );
  }

  /** PUT: update the shape on the server */
  updateshape (shape: Shape): Observable<any> {
    const id = shape.id;
    const url = `${this.shapesUrl}/${id}`;
    return this.http.put(url, shape, httpOptions).pipe(
      tap(_ => this.log(`updated shape id=${id}`)),
      catchError(this.handleError<any>('updateshape'))
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

  /** Log a shapeService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`shapeService: ${message}`);
  }
}