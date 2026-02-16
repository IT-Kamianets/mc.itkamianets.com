import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EVENTS } from '../../data/events';

export interface EventDetails {
	id: number;
	name: string;
	description: string;
	category: string;
	date: string;
	time: string;
	location: string;
	icon: string;
	image: string;
}

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './profile.html',
	styleUrl: './profile.css',
})
export class Profile implements OnInit {
	public route = inject(ActivatedRoute);

	product = signal<EventDetails | null>(null);
	loading = signal(true);

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			const idStr = params.get('id');
			const id = idStr ? Number(idStr) : null;
			this.loading.set(true);

			const event = EVENTS.find(e => e.id === id);

			if (event) {
				this.product.set({
					id: event.id,
					name: event.title,
					description: event.description,
					category: event.category,
					date: event.date,
					time: event.time || '10:00',
					location: event.location || 'Молодіжний центр',
					icon: '📅',
					image: event.image
				});
			} else {
				this.product.set(null);
			}
			this.loading.set(false);
		});
	}
}