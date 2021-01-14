import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageZoomService {

  private show = new BehaviorSubject<boolean>(false);
  readonly show$ = this.show.asObservable();

  private card = new BehaviorSubject<any>(null);
  readonly card$ = this.card.asObservable();

  private path = new BehaviorSubject<string>(null);
  readonly path$ = this.path.asObservable();

  private position = new BehaviorSubject<string>(null);
  readonly position$ = this.position.asObservable();

  mouseover(path: string, card: any, position: string): void {
    this.showZoom(card, path, position);
  }

  showZoom(card: any, path: string, position: string): void {
    this.card.next(card);
    this.path.next(path);
    this.position.next(position);
    this.show.next(true);
  }

  mouseout(): void {
    this.hideZoom();
  }

  hideZoom(): void {
    this.show.next(false);
    this.card.next(null);
    this.path.next(null);
    this.position.next(null);
  }
}
