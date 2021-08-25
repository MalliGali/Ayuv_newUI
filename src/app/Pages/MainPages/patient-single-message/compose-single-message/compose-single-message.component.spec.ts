import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeSingleMessageComponent } from './compose-single-message.component';

describe('ComposeSingleMessageComponent', () => {
  let component: ComposeSingleMessageComponent;
  let fixture: ComponentFixture<ComposeSingleMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeSingleMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeSingleMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
