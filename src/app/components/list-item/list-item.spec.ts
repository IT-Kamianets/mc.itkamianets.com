import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItem, ListItemData } from './list-item';

describe('ListItem', () => {
  let component: ListItem;
  let fixture: ComponentFixture<ListItem>;

  const mockItem: ListItemData = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    category: 'Electronics',
    date: '2024-01-01',
    icon: '📱',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItem);
    component = fixture.componentInstance;
    component.item = mockItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display item name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test Product');
  });

  it('should emit itemSelected when clicked', (done: any) => {
    component.itemSelected.subscribe((item: ListItemData) => {
      expect(item).toEqual(mockItem);
      done();
    });

    component.onSelect();
  });

  it('should return correct category color', () => {
    expect(component.getCategoryColor('Electronics')).toBe('bg-blue-100 text-blue-800');
    expect(component.getCategoryColor('Accessories')).toBe('bg-green-100 text-green-800');
    expect(component.getCategoryColor('Tools')).toBe('bg-amber-100 text-amber-800');
    expect(component.getCategoryColor('Unknown')).toBe('bg-gray-100 text-gray-800');
  });

  it('should format ID with leading zeros', () => {
    expect(component.formatId(1)).toBe('0001');
    expect(component.formatId(123)).toBe('0123');
    expect(component.formatId(9999)).toBe('9999');
  });
});
