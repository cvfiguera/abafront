import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcursosFormComponent } from './concursos-form.component';

describe('ConcursosFormComponent', () => {
  let component: ConcursosFormComponent;
  let fixture: ComponentFixture<ConcursosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcursosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcursosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
