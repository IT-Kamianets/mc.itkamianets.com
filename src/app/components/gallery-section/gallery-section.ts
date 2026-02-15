import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface GalleryItem {
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
export class GallerySection implements OnInit {
	private http = inject(HttpClient);
	items = signal<GalleryItem[]>([]);
	selectedItem = signal<GalleryItem | null>(null);
	currentImageIndex = signal<number>(0);

	ngOnInit() {
		this.http.get<GalleryItem[]>('/data/gallery.json').subscribe({
			next: (data) => {
				this.items.set(data.slice(0, 3));
			},
			error: (err) => console.error('Error loading gallery data for section:', err)
		});
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
