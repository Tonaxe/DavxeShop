import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraofertaPopupComponent } from './contraoferta-popup.component';

describe('ContraofertaPopupComponent', () => {
  let component: ContraofertaPopupComponent;
  let fixture: ComponentFixture<ContraofertaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContraofertaPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContraofertaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
