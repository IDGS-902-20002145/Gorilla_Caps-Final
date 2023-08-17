import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasCComponent } from './ventas-c.component';

describe('VentasCComponent', () => {
  let component: VentasCComponent;
  let fixture: ComponentFixture<VentasCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentasCComponent]
    });
    fixture = TestBed.createComponent(VentasCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
