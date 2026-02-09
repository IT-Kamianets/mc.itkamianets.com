import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ListItemData } from '../../components/list-items-section/list-items-section';

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
	
	product = signal<ListItemData | null>(null);
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