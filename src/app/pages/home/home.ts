import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { Features } from '../../components/features/features';
import { Hero } from '../../components/hero/hero';
import { EventsSection, EventItem } from '../../components/events-section/events-section';
import { GallerySection } from '../../components/gallery-section/gallery-section';

@Component({
	imports: [
		Hero,
		Features,
		EventsSection,
		GallerySection
	],
	templateUrl: './home.html',
	styleUrl: './home.css',
})
export class Home {
	private http = inject(HttpClient);
	
	featuredItems = toSignal(
		this.http.get<any[]>('/data/events.json').pipe(
			map((data) =>
				data.slice(0, 3).map((item) => ({
					id: item.id,
					name: item.title,
					description: item.description,
					category: item.category,
					date: item.date,
					imageUrl: item.image,
				}))
			)
		),
		{ initialValue: [] as EventItem[] }
	);
}
