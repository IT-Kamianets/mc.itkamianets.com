import { Component, input, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 1. Імпорт Router
import { ListItem } from '../list-item/list-item';

export interface ListItemData {
	id: number;
	name: string;
	description: string;
	category: string;
	date: string;
	icon: string;
	image: string;
}

@Component({
	selector: 'app-list-items-section',
	standalone: true,
	imports: [CommonModule, ListItem],
	templateUrl: './list-items-section.html',
	styleUrl: './list-items-section.css',
})
export class ListItemsSection {
	items = input<ListItemData[]>([]);
	title = input<string>('Items');
	showSearch = input<boolean>(true);
	itemsPerRow = input<number>(3);
	maxItems = input<number>(0);
	showViewAllButton = input<boolean>(false);

	// 2. Інжектимо Router для навігації
	private router = inject(Router);

	searchQuery = signal('');

	// Обчислюємо відфільтровані елементи (пошук)
	filteredItems = computed(() => {
		const query = this.searchQuery().toLowerCase();
		const allItems = this.items();
		if (!query) return allItems;
		return allItems.filter(item => 
			item.name.toLowerCase().includes(query) || 
			item.description.toLowerCase().includes(query)
		);
	});

	// Обчислюємо елементи для відображення (ліміт maxItems)
	displayItems = computed(() => {
		const items = this.filteredItems();
		const limit = this.maxItems();
		if (limit > 0) {
			return items.slice(0, limit);
		}
		return items;
	});

	clearSearch() {
		this.searchQuery.set('');
	}

	// 3. Метод, що викликається при кліку на кнопку "View All"
	onViewAllClick() {
		this.router.navigate(['/list']);
	}
}