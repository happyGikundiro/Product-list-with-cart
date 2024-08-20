import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIncartCardComponent } from './product-incart-card.component';

describe('ProductIncartCardComponent', () => {
  let component: ProductIncartCardComponent;
  let fixture: ComponentFixture<ProductIncartCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductIncartCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductIncartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
