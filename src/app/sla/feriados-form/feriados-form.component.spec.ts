import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriadosFormComponent } from './feriados-form.component';

describe('FeriadosFormComponent', () => {
  let component: FeriadosFormComponent;
  let fixture: ComponentFixture<FeriadosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeriadosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeriadosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
