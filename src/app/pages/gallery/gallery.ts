import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { GALLERY_ITEMS } from '../../data/gallery';

export interface GalleryItem {
	id: number;
	title: string;
	description: string;
	category: string;
	images: string[];
	tags: string[];
}

@Component({
	selector: 'app-gallery',
	imports: [CommonModule],
	templateUrl: './gallery.html',
	styleUrl: './gallery.css',
})
export class Gallery {
	items = signal<GalleryItem[]>(GALLERY_ITEMS);

	selectedCategory = signal<string | null>(null);
	selectedItem = signal<GalleryItem | null>(null);
	currentImageIndex = signal<number>(0);

	getCategories(): string[] {
		const unique = new Set(this.items().map((item) => item.category));
		return Array.from(unique);
	}

	getFilteredItems(): GalleryItem[] {
		if (!this.selectedCategory()) {
			return this.items();
		}
		return this.items().filter((item) => item.category === this.selectedCategory());
	}

	selectItem(item: GalleryItem) {
		this.selectedItem.set(item);
		this.currentImageIndex.set(0);
		document.body.style.overflow = 'hidden';
		document.documentElement.classList.add('modal-open');
	}

	closeModal() {
		this.selectedItem.set(null);
		document.body.style.overflow = '';
		document.documentElement.classList.remove('modal-open');
	}

	nextImage(event?: Event) {
		if (event) event.stopPropagation();
		const item = this.selectedItem();
		if (!item) return;

		const nextIndex = (this.currentImageIndex() + 1) % item.images.length;
		this.currentImageIndex.set(nextIndex);
	}

	prevImage(event?: Event) {
		if (event) event.stopPropagation();
		const item = this.selectedItem();
		if (!item) return;

		const prevIndex = this.currentImageIndex() === 0 ? item.images.length - 1 : this.currentImageIndex() - 1;
		this.currentImageIndex.set(prevIndex);
	}

	setCurrentImage(index: number) {
		this.currentImageIndex.set(index);
	}
}
