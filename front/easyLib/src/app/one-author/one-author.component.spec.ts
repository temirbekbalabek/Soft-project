import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneAuthorComponent } from './one-author.component';

describe('OneAuthorComponent', () => {
  let component: OneAuthorComponent;
  let fixture: ComponentFixture<OneAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
