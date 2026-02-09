import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GallerySection } from '../../components/gallery-section/gallery-section';
import { Features } from '../../components/features/features';
import { Hero } from '../../components/hero/hero';
import { ListItemsSection, ListItemData } from '../../components/list-items-section/list-items-section';

@Component({
	imports: [
		Hero,
		GallerySection,
		Features,
		ListItemsSection,
	],
	templateUrl: './home.html',
	styleUrl: './home.css',
})
export class Home implements OnInit {
	private http = inject(HttpClient);
	featuredItems = signal<ListItemData[]>([]);

	ngOnInit() {
		this.http.get<any[]>('/data/events.json').subscribe({
			next: (data) => {
				const mappedData: ListItemData[] = data.slice(0, 3).map(item => ({
					id: item.id,
					name: item.title,
					description: item.description,
					category: item.category,
					date: item.date,
					icon: '📅',
					image: item.image
				}));
				this.featuredItems.set(mappedData);
			},
			error: (err) => console.error('Error loading events:', err)
		});
	}
}
