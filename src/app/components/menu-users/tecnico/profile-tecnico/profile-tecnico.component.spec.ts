import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTecnicoComponent } from './profile-tecnico.component';

describe('ProfileTecnicoComponent', () => {
  let component: ProfileTecnicoComponent;
  let fixture: ComponentFixture<ProfileTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileTecnicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
