import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoSecComponent } from './estado-sec.component';

describe('EstadoSecComponent', () => {
  let component: EstadoSecComponent;
  let fixture: ComponentFixture<EstadoSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
