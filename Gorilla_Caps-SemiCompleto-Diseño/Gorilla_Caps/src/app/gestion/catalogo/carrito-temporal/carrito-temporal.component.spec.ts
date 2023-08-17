import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoTemporalComponent } from './carrito-temporal.component';

describe('CarritoTemporalComponent', () => {
  let component: CarritoTemporalComponent;
  let fixture: ComponentFixture<CarritoTemporalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoTemporalComponent]
    });
    fixture = TestBed.createComponent(CarritoTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
