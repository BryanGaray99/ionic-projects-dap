import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewItemPage } from './new-item.page';

describe('NewItemPage', () => {
  let component: NewItemPage;
  let fixture: ComponentFixture<NewItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
