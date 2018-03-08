import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorasFormComponent } from './operadoras-form.component';

describe('OperadorasFormComponent', () => {
  let component: OperadorasFormComponent;
  let fixture: ComponentFixture<OperadorasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperadorasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadorasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
