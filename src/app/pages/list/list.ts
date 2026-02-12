import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-list',
	imports: [CommonModule, RouterLink],
	templateUrl: './list.html',
	styleUrl: './list.css',
})
export class List {
	private http = inject(HttpClient);
	
	items = toSignal(
		this.http.get<any[]>('/data/events.json').pipe(
			map((data) =>
				data.map((item) => ({
					id: item.id,
					name: item.title,
					description: item.description,
					category: item.category,
					date: item.date,
					icon: '📅',
					imageUrl: item.image,
				}))
			)
		),
		{ initialValue: [] }
	);

	selectedItem = signal<any | null>(null);
	filteredCategory = signal<string>('Усі');

	categories = computed(() => {
		const items = this.items() as any[];
		return ['Усі', ...new Set(items.map((item) => item.category))];
	});

	selectItem(item: any): void {
		this.selectedItem.set(item);
	}

	clearSelection(): void {
		this.selectedItem.set(null);
	}

	filterByCategory(category: string): void {
		this.filteredCategory.set(category);
		this.clearSelection();
	}

	getFilteredItems(): any[] {
		const cat = this.filteredCategory();
		const allItems = this.items() as any[];
		const filtered = cat === 'Усі' ? allItems : allItems.filter((item) => item.category === cat);
		return filtered.sort((a, b) => b.id - a.id); // Новіші спочатку за ID
	}
}
