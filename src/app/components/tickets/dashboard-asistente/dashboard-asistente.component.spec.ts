import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAsistenteComponent } from './dashboard-asistente.component';

describe('DashboardAsistenteComponent', () => {
  let component: DashboardAsistenteComponent;
  let fixture: ComponentFixture<DashboardAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAsistenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
