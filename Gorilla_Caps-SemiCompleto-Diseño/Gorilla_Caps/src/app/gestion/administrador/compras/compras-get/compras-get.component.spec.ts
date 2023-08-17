import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasGETComponent } from './compras-get.component';

describe('ComprasGETComponent', () => {
  let component: ComprasGETComponent;
  let fixture: ComponentFixture<ComprasGETComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComprasGETComponent]
    });
    fixture = TestBed.createComponent(ComprasGETComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
