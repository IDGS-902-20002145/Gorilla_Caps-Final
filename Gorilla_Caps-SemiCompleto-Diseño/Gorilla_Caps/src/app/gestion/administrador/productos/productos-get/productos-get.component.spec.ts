import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosGetComponent } from './productos-get.component';

describe('ProductosGetComponent', () => {
  let component: ProductosGetComponent;
  let fixture: ComponentFixture<ProductosGetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosGetComponent]
    });
    fixture = TestBed.createComponent(ProductosGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
