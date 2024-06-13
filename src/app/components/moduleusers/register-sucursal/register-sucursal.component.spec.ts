import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSucursalComponent } from './register-sucursal.component';

describe('RegisterSucursalComponent', () => {
  let component: RegisterSucursalComponent;
  let fixture: ComponentFixture<RegisterSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSucursalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
