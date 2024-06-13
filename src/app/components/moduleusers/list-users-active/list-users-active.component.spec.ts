import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersActiveComponent } from './list-users-active.component';

describe('ListUsersActiveComponent', () => {
  let component: ListUsersActiveComponent;
  let fixture: ComponentFixture<ListUsersActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsersActiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsersActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
