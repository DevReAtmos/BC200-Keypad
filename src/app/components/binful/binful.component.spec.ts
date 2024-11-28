import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinfulComponent } from './binful.component';

describe('BinfulComponent', () => {
  let component: BinfulComponent;
  let fixture: ComponentFixture<BinfulComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BinfulComponent]
    });
    fixture = TestBed.createComponent(BinfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
