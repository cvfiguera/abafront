import { TestBed, async } from '@angular/core/testing';

import { App } from './app.component';

describe('App', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        App
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
