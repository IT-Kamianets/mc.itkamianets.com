import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

interface GalleryItem {
	id: number;
	title: string;
	description: string;
	category: string;
	imageUrl: string;
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
		this.http.get<GalleryItem[]>('/data/gallery.json').subscribe(data => {
			this.items.set(data.slice(0, 3));
		});
	}
}