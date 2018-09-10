import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGroupBasicExampleComponent } from './tab-group-basic-example.component';

describe('TabGroupBasicExampleComponent', () => {
  let component: TabGroupBasicExampleComponent;
  let fixture: ComponentFixture<TabGroupBasicExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabGroupBasicExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabGroupBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
