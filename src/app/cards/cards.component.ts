import { Component, OnInit } from "@angular/core";
import { DataService } from "../data/data.service";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ImageZoomService } from "../image-zoom/image-zoom.service";

const deckCards = {
  enemy: [],
  location: [],
  treachery: [],
  objective: [],
  quest: [],
};

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styles: [
    `
      table {
        width: 100%;
      }
    `,
  ],
})
export class CardsComponent implements OnInit {
  public cards$: Observable<{
    enemy: any[];
    location: any[];
    treachery: any[];
    objective: any[];
    quest: any[];
  }>;

  constructor(
    private dataService: DataService,
    public zoomService: ImageZoomService
  ) {}

  ngOnInit(): void {
    this.cards$ = this.dataService.cycles$.pipe(
      map((cards: any) => {
        const cycles = cards.value;

        for (let c = 0; c < cycles.length; c++) {
          const scenarios = cycles[c].scenarios;

          for (let s = 0; s < scenarios.length; s++) {
            const pack = scenarios[s];

            if (pack.activeLocation) {
              deckCards.location.push(pack.activeLocation);
            }

            if (pack.discardPile.length >= 1) {
              for (let dp = 0; dp < pack.discardPile.length; dp++) {
                const card = pack.discardPile[dp];
                this.pushCardInArray(card);
              }
            }

            if (pack.encounterDeck.length >= 1) {
              for (let ed = 0; ed < pack.encounterDeck.length; ed++) {
                const card = pack.encounterDeck[ed];
                this.pushCardInArray(card);
              }
            }

            if (pack.stagingArea.length >= 1) {
              for (let sa = 0; sa < pack.stagingArea.length; sa++) {
                const card = pack.stagingArea[sa];
                this.pushCardInArray(card);
              }
            }
          }
        }

        return deckCards;
      })
    );
  }

  pushCardInArray(card: any) {
    if (!card) return;

    if (card.type === "enemy") {
      deckCards.enemy.push(card);
    } else if (card.type === "location") {
      deckCards.location.push(card);
    } else if (card.type === "treachery") {
      deckCards.treachery.push(card);
    } else if (card.type === "objective") {
      deckCards.objective.push(card);
    } else {
      deckCards.quest.push(card);
    }
  }

  trackByFn(index: number): number {
    return index;
  }
}
