import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnologiasFormComponent } from './tecnologias-form.component';

describe('TecnologiasFormComponent', () => {
  let component: TecnologiasFormComponent;
  let fixture: ComponentFixture<TecnologiasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnologiasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnologiasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
