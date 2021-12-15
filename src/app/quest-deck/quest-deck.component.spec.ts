import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestDeckComponent } from './quest-deck.component';

describe('QuestDeckComponent', () => {
  let component: QuestDeckComponent;
  let fixture: ComponentFixture<QuestDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
