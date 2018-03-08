import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAdjComponent } from './tipo-adj.component';

describe('TipoAdjComponent', () => {
  let component: TipoAdjComponent;
  let fixture: ComponentFixture<TipoAdjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoAdjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAdjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
