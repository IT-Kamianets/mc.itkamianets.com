import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListItemsSection, ListItemData } from '../../components/list-items-section/list-items-section';

@Component({
	selector: 'app-list',
	imports: [CommonModule, ListItemsSection],
	templateUrl: './list.html',
	styleUrl: './list.css',
})
export class List implements OnInit {
	private http = inject(HttpClient);
	items = signal<ListItemData[]>([]);

	selectedItem = signal<ListItemData | null>(null);
	filteredCategory = signal<string>('Усі');
	categories = signal<string[]>(['Усі']);

	ngOnInit() {
		this.http.get<any[]>('data/events.json').subscribe({
			next: (data) => {
				const mappedData: ListItemData[] = data.map(item => ({
					id: item.id,
					name: item.title,
					description: item.description,
					category: item.category,
					date: item.date,
					icon: '📅',
					image: item.image
				}));
				this.items.set(mappedData);
				
				const uniqueCategories = ['Усі', ...new Set(mappedData.map(item => item.category))];
				this.categories.set(uniqueCategories);
			},
			error: (err) => console.error('Error loading events:', err)
		});
	}

	selectItem(item: ListItemData): void {
		this.selectedItem.set(item);
	}

	clearSelection(): void {
		this.selectedItem.set(null);
	}

	filterByCategory(category: string): void {
		this.filteredCategory.set(category);
		this.clearSelection();
	}

	getFilteredItems(): ListItemData[] {
		const cat = this.filteredCategory();
		const allItems = this.items();
		const filtered = cat === 'Усі' ? allItems : allItems.filter(item => item.category === cat);
		return filtered.sort((a, b) => b.id - a.id); // Новіші спочатку за ID
	}
}
