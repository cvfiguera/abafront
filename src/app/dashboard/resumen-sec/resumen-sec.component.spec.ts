import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenSecComponent } from './resumen-sec.component';

describe('ResumenSecComponent', () => {
  let component: ResumenSecComponent;
  let fixture: ComponentFixture<ResumenSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
