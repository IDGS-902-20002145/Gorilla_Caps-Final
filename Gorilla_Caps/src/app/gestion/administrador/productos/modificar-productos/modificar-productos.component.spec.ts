import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProductosComponent } from './modificar-productos.component';

describe('ModificarProductosComponent', () => {
  let component: ModificarProductosComponent;
  let fixture: ComponentFixture<ModificarProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarProductosComponent]
    });
    fixture = TestBed.createComponent(ModificarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
