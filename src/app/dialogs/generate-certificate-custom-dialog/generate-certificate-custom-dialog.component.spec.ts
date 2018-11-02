import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCertificateCustomDialogComponent } from './generate-certificate-custom-dialog.component';

describe('GenerateCertificateCustomDialogComponent', () => {
  let component: GenerateCertificateCustomDialogComponent;
  let fixture: ComponentFixture<GenerateCertificateCustomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateCertificateCustomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCertificateCustomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
