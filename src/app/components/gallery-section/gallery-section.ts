import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
	selector: 'app-gallery-section',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './gallery-section.html',
	styleUrl: './gallery-section.css',
})
export class GallerySection {
	items = signal<GalleryItem[]>(GALLERY_ITEMS.slice(0, 3));
	selectedItem = signal<GalleryItem | null>(null);
	currentImageIndex = signal<number>(0);

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
		this.currentImageIndex.set((this.currentImageIndex() + 1) % item.images.length);
	}

	prevImage(event?: Event) {
		if (event) event.stopPropagation();
		const item = this.selectedItem();
		if (!item) return;
		this.currentImageIndex.set(this.currentImageIndex() === 0 ? item.images.length - 1 : this.currentImageIndex() - 1);
	}

	setCurrentImage(index: number) {
		this.currentImageIndex.set(index);
	}
}
