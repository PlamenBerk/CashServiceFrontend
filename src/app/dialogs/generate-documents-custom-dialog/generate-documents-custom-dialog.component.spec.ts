import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDocumentsCustomDialogComponent } from './generate-documents-custom-dialog.component';

describe('GenerateDocumentsCustomDialogComponent', () => {
  let component: GenerateDocumentsCustomDialogComponent;
  let fixture: ComponentFixture<GenerateDocumentsCustomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateDocumentsCustomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateDocumentsCustomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
