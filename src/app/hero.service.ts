import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operator';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private heroesUrl = 'api/heroes';
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

  constructor(
    private http: HttpClient,
    private log(message: string) {
      this.messageService.add('HeroService: ${message}');
    }
    private handleError<T>(operation = 'operation'), result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log('${operation} failed: $(error.message)');
        return of(result as T);
      };
    }
    ) { }

  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    // this.messageService.add('HeroService: fetched heroes');
    // const heroes = of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = '${this.heroesUrl}/${id}';
    // this.messageService.add('HeroService: fetched hero id=${id}');
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log('fetched hero id=${id}')),
      catchError(this.handleError<Hero>('getHero id=${id}'))
    );
    //  of(HEROES.find(hero => hero.id === id));
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log('updated hero id=${hero.id}')),
      catchError(this.handleError<any>('updateHero'))
    );
  }
}
