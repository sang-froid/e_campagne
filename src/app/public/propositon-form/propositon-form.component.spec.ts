import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositonFormComponent } from './propositon-form.component';

describe('PropositonFormComponent', () => {
  let component: PropositonFormComponent;
  let fixture: ComponentFixture<PropositonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropositonFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropositonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
