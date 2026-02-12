import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-gallery-section',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './gallery-section.html',
	styleUrl: './gallery-section.css',
})
export class GallerySection {
	items = signal([
		{
			id: 1,
			title: 'Молодіжний форум 2025',
			description: 'Обговорювали майбутнє молодіжної політики міста',
			imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
			category: 'Форум'
		},
		{
			id: 2,
			title: 'Арт-терапія',
			description: 'Майстер-клас з живопису для зняття стресу',
			imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
			category: 'Творчість'
		},
		{
			id: 3,
			title: 'Волонтерський збір',
			description: 'Підготовка допомоги для наших захисників',
			imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
			category: 'Волонтерство'
		}
	]);
}
