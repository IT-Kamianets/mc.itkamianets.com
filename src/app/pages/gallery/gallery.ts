import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface GalleryItem {
	id: number;
	title: string;
	description: string;
	category: string;
	imageUrl: string;
	tags: string[];
}

@Component({
	selector: 'app-gallery',
	imports: [CommonModule],
	templateUrl: './gallery.html',
	styleUrl: './gallery.css',
})
export class Gallery implements OnInit {
	private http = inject(HttpClient);
	items = signal<GalleryItem[]>([]);

	selectedCategory = signal<string | null>(null);
	selectedItem = signal<GalleryItem | null>(null);

	ngOnInit() {
		this.http.get<GalleryItem[]>('/data/gallery.json').subscribe(data => {
			this.items.set(data);
		});
	}

	getCategories(): string[] {
		return [...new Set(this.items().map((item) => item.category))];
	}

	getFilteredItems(): GalleryItem[] {
		if (!this.selectedCategory()) {
			return this.items();
		}
		return this.items().filter((item) => item.category === this.selectedCategory());
	}

	selectItem(item: GalleryItem) {
		this.selectedItem.set(item);
	}

	closeModal() {
		this.selectedItem.set(null);
	}

	nextItem() {
		const current = this.selectedItem();
		if (!current) return;

		const filtered = this.getFilteredItems();
		const currentIndex = filtered.findIndex((item) => item.id === current.id);
		const nextIndex = (currentIndex + 1) % filtered.length;
		this.selectedItem.set(filtered[nextIndex]);
	}

	prevItem() {
		const current = this.selectedItem();
		if (!current) return;

		const filtered = this.getFilteredItems();
		const currentIndex = filtered.findIndex((item) => item.id === current.id);
		const prevIndex = currentIndex === 0 ? filtered.length - 1 : currentIndex - 1;
		this.selectedItem.set(filtered[prevIndex]);
	}
}