import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTableSupervisorComponent } from './ticket-table-supervisor.component';

describe('TicketTableSupervisorComponent', () => {
  let component: TicketTableSupervisorComponent;
  let fixture: ComponentFixture<TicketTableSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketTableSupervisorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketTableSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
