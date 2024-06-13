import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTableAsistenteComponent } from './ticket-table-asistente.component';

describe('TicketTableAsistenteComponent', () => {
  let component: TicketTableAsistenteComponent;
  let fixture: ComponentFixture<TicketTableAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketTableAsistenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketTableAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
