import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FRbdsComponent } from './f-rbds.component';

describe('FRbdsComponent', () => {
  let component: FRbdsComponent;
  let fixture: ComponentFixture<FRbdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FRbdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FRbdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
