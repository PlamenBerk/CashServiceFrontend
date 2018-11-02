import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateProtocolCustomDialogComponent } from './generate-protocol-custom-dialog.component';

describe('GenerateProtocolCustomDialogComponent', () => {
  let component: GenerateProtocolCustomDialogComponent;
  let fixture: ComponentFixture<GenerateProtocolCustomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateProtocolCustomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateProtocolCustomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
