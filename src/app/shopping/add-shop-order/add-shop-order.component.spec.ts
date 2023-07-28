import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopOrderComponent } from './add-shop-order.component';

describe('AddShopOrderComponent', () => {
  let component: AddShopOrderComponent;
  let fixture: ComponentFixture<AddShopOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShopOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShopOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
