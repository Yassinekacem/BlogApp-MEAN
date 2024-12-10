import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeUsersComponent } from './mange-users.component';

describe('MangeUsersComponent', () => {
  let component: MangeUsersComponent;
  let fixture: ComponentFixture<MangeUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangeUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
