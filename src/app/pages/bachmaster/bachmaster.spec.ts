import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bachmaster } from './bachmaster';

describe('Bachmaster', () => {
  let component: Bachmaster;
  let fixture: ComponentFixture<Bachmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bachmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bachmaster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
