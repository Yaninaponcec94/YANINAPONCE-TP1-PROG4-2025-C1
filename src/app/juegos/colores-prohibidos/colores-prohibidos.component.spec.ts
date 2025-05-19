import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoresProhibidosComponent } from './colores-prohibidos.component';

describe('ColoresProhibidosComponent', () => {
  let component: ColoresProhibidosComponent;
  let fixture: ComponentFixture<ColoresProhibidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColoresProhibidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColoresProhibidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
