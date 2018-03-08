import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioSecComponent } from './calendario-sec.component';

describe('CalendarioSecComponent', () => {
  let component: CalendarioSecComponent;
  let fixture: ComponentFixture<CalendarioSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
