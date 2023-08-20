import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProveedorComponent } from './modificar-proveedor.component';

describe('ModificarProveedorComponent', () => {
  let component: ModificarProveedorComponent;
  let fixture: ComponentFixture<ModificarProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarProveedorComponent]
    });
    fixture = TestBed.createComponent(ModificarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
