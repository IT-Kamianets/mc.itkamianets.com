import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface EventItem {
	id: number;
	name: string;
	description: string;
	category: string;
	date: string;
	imageUrl: string;
}

@Component({
	selector: 'app-events-section',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './events-section.html',
	styleUrl: './events-section.css',
})
export class EventsSection {
	items = input<EventItem[]>([]);
	title = input<string>('Найближчі події');
}
