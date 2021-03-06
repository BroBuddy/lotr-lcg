import {Component, OnInit} from '@angular/core'

import {Observable} from 'rxjs';

import {ImageZoomService} from './image-zoom.service';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.scss']
})
export class ImageZoomComponent implements OnInit {

  public show$: Observable<boolean>;
  public standard$: Observable<boolean>;
  public card$: Observable<string>;
  public path$: Observable<string>;
  public position$: Observable<string>;
  public scrollY$: Observable<number>;

  constructor(private zoomService: ImageZoomService) {}

  ngOnInit(): void {
    this.show$ = this.zoomService.show$;
    this.standard$ = this.zoomService.standard$;
    this.card$ = this.zoomService.card$;
    this.path$ = this.zoomService.path$;
    this.position$ = this.zoomService.position$;
    this.scrollY$ = this.zoomService.scrollY$;
  }

}
