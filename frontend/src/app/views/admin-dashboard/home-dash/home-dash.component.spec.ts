import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDashComponent } from './home-dash.component';

describe('HomeDashComponent', () => {
  let component: HomeDashComponent;
  let fixture: ComponentFixture<HomeDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
