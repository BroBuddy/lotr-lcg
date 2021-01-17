import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, MatPaginator} from '@angular/material';

import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import Packs from './packs-data.json';

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styles: [`table {
    width: 100%;
  }`]
})
export class PacksComponent implements OnInit, AfterViewInit {

  public packs: any = [];
  public packsSize: number;
  public columns: string[] = ['id', 'name', 'code', 'available'];

  @ViewChild(MatPaginator, { static: false } as any) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false } as any) sort: MatSort;

  ngOnInit(): void {
    this.fetchPacks()
        .pipe(map(results => results.sort()))
        .subscribe(data => {
          this.packs = new MatTableDataSource(data);
          this.packsSize = data.length;
        });
  }

  ngAfterViewInit() {
    this.packs.paginator = this.paginator;
    this.packs.sort = this.sort;
  }

  fetchPacks(): Observable<any> {
    return of(Packs);
  }

}
