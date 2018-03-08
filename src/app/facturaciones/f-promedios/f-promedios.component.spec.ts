import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FPromediosComponent } from './f-promedios.component';

describe('FPromediosComponent', () => {
  let component: FPromediosComponent;
  let fixture: ComponentFixture<FPromediosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FPromediosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FPromediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
