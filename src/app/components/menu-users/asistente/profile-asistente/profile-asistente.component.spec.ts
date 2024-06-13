import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAsistenteComponent } from './profile-asistente.component';

describe('ProfileAsistenteComponent', () => {
  let component: ProfileAsistenteComponent;
  let fixture: ComponentFixture<ProfileAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAsistenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
