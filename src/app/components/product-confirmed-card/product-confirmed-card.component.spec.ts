import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfirmedCardComponent } from './product-confirmed-card.component';

describe('ProductConfirmedCardComponent', () => {
  let component: ProductConfirmedCardComponent;
  let fixture: ComponentFixture<ProductConfirmedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductConfirmedCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductConfirmedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
