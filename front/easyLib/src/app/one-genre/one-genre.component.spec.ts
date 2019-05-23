import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneGenreComponent } from './one-genre.component';

describe('OneGenreComponent', () => {
  let component: OneGenreComponent;
  let fixture: ComponentFixture<OneGenreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneGenreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
