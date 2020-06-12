import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpostCreateComponent } from './blogpost-create.component';

describe('BlogpostCreateComponent', () => {
  let component: BlogpostCreateComponent;
  let fixture: ComponentFixture<BlogpostCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogpostCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogpostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
