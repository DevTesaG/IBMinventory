import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormChildComponent } from './reactive-form-child.component';

describe('ReactiveFormChildComponent', () => {
  let component: ReactiveFormChildComponent;
  let fixture: ComponentFixture<ReactiveFormChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
