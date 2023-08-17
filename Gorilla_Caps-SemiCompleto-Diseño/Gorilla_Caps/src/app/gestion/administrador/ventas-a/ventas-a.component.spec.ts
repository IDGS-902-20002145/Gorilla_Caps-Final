import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasAComponent } from './ventas-a.component';

describe('VentasAComponent', () => {
  let component: VentasAComponent;
  let fixture: ComponentFixture<VentasAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentasAComponent]
    });
    fixture = TestBed.createComponent(VentasAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
