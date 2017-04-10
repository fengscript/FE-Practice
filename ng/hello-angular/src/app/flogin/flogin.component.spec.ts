import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloginComponent } from './flogin.component';

describe('FloginComponent', () => {
  let component: FloginComponent;
  let fixture: ComponentFixture<FloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
