import { Component, signal } from '@angular/core';
import { Features } from '../../components/features/features';
import { Hero } from '../../components/hero/hero';
import { EventsSection, EventItem } from '../../components/events-section/events-section';
import { GallerySection } from '../../components/gallery-section/gallery-section';
import { EVENTS } from '../../data/events';

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
	private readonly mappedItems = EVENTS.slice(0, 3).map((item) => ({
		id: item.id,
		name: item.title,
		description: item.description,
		category: item.category,
		date: item.date,
		imageUrl: item.image,
	}));

	featuredItems = signal<EventItem[]>(this.mappedItems);
}
