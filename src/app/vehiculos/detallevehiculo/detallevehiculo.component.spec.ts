import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallevehiculoComponent } from './detallevehiculo.component';

describe('DetallevehiculoComponent', () => {
  let component: DetallevehiculoComponent;
  let fixture: ComponentFixture<DetallevehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallevehiculoComponent]
    });
    fixture = TestBed.createComponent(DetallevehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
