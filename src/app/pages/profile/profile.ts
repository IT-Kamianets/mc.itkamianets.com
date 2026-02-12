import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
	private http = inject(HttpClient);
	
	product = signal<EventDetails | null>(null);
	loading = signal(true);

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			const idStr = params.get('id');
			const id = idStr ? Number(idStr) : null;
			this.loading.set(true);
			
			this.http.get<any[]>('/data/events.json').subscribe({
				next: (data) => {
					const event = data.find(e => String(e.id) === idStr);
					if (event) {
						this.product.set({
							id: event.id,
							name: event.title,
							description: event.description,
							category: event.category,
							date: event.date,
							time: event.time || '10:00', // Default if missing
							location: event.location || 'Молодіжний центр', // Default if missing
							icon: '📅',
							image: event.image
						});
					} else {
						this.product.set(null);
					}
					this.loading.set(false);
				},
				error: (err) => {
					console.error('Error loading event details:', err);
					this.loading.set(false);
					this.product.set(null);
				}
			});
		});
	}
}