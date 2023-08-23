import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProvidersComponent } from './order-providers.component';

describe('OrderProvidersComponent', () => {
  let component: OrderProvidersComponent;
  let fixture: ComponentFixture<OrderProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProvidersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
