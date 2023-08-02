import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarUsuariosComponent } from './eliminar-usuarios.component';

describe('EliminarUsuariosComponent', () => {
  let component: EliminarUsuariosComponent;
  let fixture: ComponentFixture<EliminarUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarUsuariosComponent]
    });
    fixture = TestBed.createComponent(EliminarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
