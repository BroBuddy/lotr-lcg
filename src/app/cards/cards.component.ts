import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import Cards from './cards-data.json';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
    styles: [`table {
    width: 100%;
  }`]
})
export class CardsComponent implements OnInit, AfterViewInit {

    public cards: any = [];
    public cardsSize: number;
    public columns: string[] = ['name', 'sphere_code', 'type_code', 'threat', 'willpower', 'attack', 'defense', 'health', 'traits', 'pack_name'];

    @ViewChild(MatPaginator, { static: false } as any) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false } as any) sort: MatSort;

    ngOnInit(): void {
        this.fetchPacks()
            .pipe(map(results => results.sort()))
            .subscribe(data => {
                this.cards = new MatTableDataSource(data);
                this.cardsSize = data.length;
            });
    }

    ngAfterViewInit() {
        this.cards.paginator = this.paginator;
        this.cards.sort = this.sort;
    }

    fetchPacks(): Observable<any> {
        return of(Cards);
    }

}
