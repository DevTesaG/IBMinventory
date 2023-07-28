import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMaterialsComponent } from './product-materials.component';

describe('ProductMaterialsComponent', () => {
  let component: ProductMaterialsComponent;
  let fixture: ComponentFixture<ProductMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMaterialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
