import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTableOperadorComponent } from './ticket-table-operador.component';

describe('TicketTableOperadorComponent', () => {
  let component: TicketTableOperadorComponent;
  let fixture: ComponentFixture<TicketTableOperadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketTableOperadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketTableOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
