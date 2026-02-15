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

	ngOnInit() {
		this.http.get<GalleryItem[]>('/data/gallery.json').subscribe({
			next: (data) => {
				// Беремо лише перші 3-6 елементів для головної сторінки
				this.items.set(data.slice(0, 3));
			},
			error: (err) => console.error('Error loading gallery data for section:', err)
		});
	}
}
