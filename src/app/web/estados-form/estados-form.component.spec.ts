import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosFormComponent } from './estados-form.component';

describe('EstadosFormComponent', () => {
  let component: EstadosFormComponent;
  let fixture: ComponentFixture<EstadosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
