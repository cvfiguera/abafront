import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAdjFormComponent } from './tipo-adj-form.component';

describe('TipoAdjFormComponent', () => {
  let component: TipoAdjFormComponent;
  let fixture: ComponentFixture<TipoAdjFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoAdjFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAdjFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
