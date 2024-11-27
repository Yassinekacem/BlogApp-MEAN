import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfilComponent } from './view-profil.component';

describe('ViewProfilComponent', () => {
  let component: ViewProfilComponent;
  let fixture: ComponentFixture<ViewProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
