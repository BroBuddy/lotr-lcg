import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlossaryModalComponent } from './glossary-modal.component';

describe('GlossaryModalComponent', () => {
  let component: GlossaryModalComponent;
  let fixture: ComponentFixture<GlossaryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlossaryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlossaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
