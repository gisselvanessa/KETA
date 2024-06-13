import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOptComponent } from './settings-opt.component';

describe('SettingsOptComponent', () => {
  let component: SettingsOptComponent;
  let fixture: ComponentFixture<SettingsOptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsOptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsOptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
