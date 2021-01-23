import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatTrackerComponent } from './threat-tracker.component';

describe('ThreatTrackerComponent', () => {
  let component: ThreatTrackerComponent;
  let fixture: ComponentFixture<ThreatTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreatTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
