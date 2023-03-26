import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { DataService } from "../data/data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  public cycles$: Observable<any[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cycles$ = this.dataService.cycles$;
  }

  countCards(scenario: any): number {
    let cardAmount = scenario.activeLocation ? 1 : 0;

    cardAmount += scenario.discardPile.length;
    cardAmount += scenario.encounterDeck.length;
    cardAmount += scenario.stagingArea.length;

    return cardAmount;
  }

  trackByFn(index: number): number {
    return index;
  }
}
