import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemsSection, ListItemData } from './list-items-section';

describe('ListItemsSection', () => {
  let component: ListItemsSection;
  let fixture: ComponentFixture<ListItemsSection>;

  const mockItems: ListItemData[] = [
    {
      id: 1,
      name: 'Test Item 1',
      description: 'Test Description 1',
      category: 'Electronics',
      date: '2024-01-01',
      icon: '📱',
    },
    {
      id: 2,
      name: 'Test Item 2',
      description: 'Test Description 2',
      category: 'Accessories',
      date: '2024-01-02',
      icon: '🎧',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemsSection);
    component = fixture.componentInstance;
    component.items = mockItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all items initially', () => {
    expect(component.filteredItems.length).toBe(2);
  });

  it('should filter items by name', () => {
    component.searchQuery.set('Test Item 1');
    expect(component.filteredItems.length).toBe(1);
    expect(component.filteredItems[0].name).toBe('Test Item 1');
  });

  it('should filter items by description', () => {
    component.searchQuery.set('Description 2');
    expect(component.filteredItems.length).toBe(1);
    expect(component.filteredItems[0].id).toBe(2);
  });

  it('should filter items by category', () => {
    component.searchQuery.set('Electronics');
    expect(component.filteredItems.length).toBe(1);
    expect(component.filteredItems[0].category).toBe('Electronics');
  });

  it('should return empty array when no matches found', () => {
    component.searchQuery.set('NonExistent');
    expect(component.filteredItems.length).toBe(0);
  });

  it('should select and deselect items', () => {
    component.onItemSelect(mockItems[0]);
    expect(component.isItemSelected(mockItems[0].id)).toBe(true);

    component.onItemSelect(mockItems[0]);
    expect(component.isItemSelected(mockItems[0].id)).toBe(false);
  });

  it('should clear search query', () => {
    component.searchQuery.set('test');
    component.clearSearch();
    expect(component.searchQuery()).toBe('');
  });

  it('should format ID with leading zeros', () => {
    expect(component.formatId(1)).toBe('0001');
    expect(component.formatId(123)).toBe('0123');
    expect(component.formatId(9999)).toBe('9999');
  });

  it('should return correct category color', () => {
    expect(component.getCategoryColor('Electronics')).toBe('bg-blue-100 text-blue-800');
    expect(component.getCategoryColor('Accessories')).toBe('bg-green-100 text-green-800');
    expect(component.getCategoryColor('Tools')).toBe('bg-amber-100 text-amber-800');
    expect(component.getCategoryColor('Unknown')).toBe('bg-gray-100 text-gray-800');
  });
});
