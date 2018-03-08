import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FOperadorasComponent } from './f-operadoras.component';

describe('FOperadorasComponent', () => {
  let component: FOperadorasComponent;
  let fixture: ComponentFixture<FOperadorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FOperadorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FOperadorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
