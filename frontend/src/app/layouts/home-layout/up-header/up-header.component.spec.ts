import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpHeaderComponent } from './up-header.component';

describe('UpHeaderComponent', () => {
  let component: UpHeaderComponent;
  let fixture: ComponentFixture<UpHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
