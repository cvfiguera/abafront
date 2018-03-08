import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaseFormComponent } from './listase-form.component';

describe('ListaseFormComponent', () => {
  let component: ListaseFormComponent;
  let fixture: ComponentFixture<ListaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
