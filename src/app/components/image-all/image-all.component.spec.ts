import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAllComponent } from './image-all.component';

describe('ImageAllComponent', () => {
  let component: ImageAllComponent;
  let fixture: ComponentFixture<ImageAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
