import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProductosComponent } from './eliminar-productos.component';

describe('EliminarProductosComponent', () => {
  let component: EliminarProductosComponent;
  let fixture: ComponentFixture<EliminarProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarProductosComponent]
    });
    fixture = TestBed.createComponent(EliminarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
