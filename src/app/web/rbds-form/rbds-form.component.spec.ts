import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbdsFormComponent } from './rbds-form.component';

describe('RbdsFormComponent', () => {
  let component: RbdsFormComponent;
  let fixture: ComponentFixture<RbdsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbdsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbdsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
