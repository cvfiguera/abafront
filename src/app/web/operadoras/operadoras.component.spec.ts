import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorasComponent } from './operadoras.component';

describe('OperadorasComponent', () => {
  let component: OperadorasComponent;
  let fixture: ComponentFixture<OperadorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperadorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
