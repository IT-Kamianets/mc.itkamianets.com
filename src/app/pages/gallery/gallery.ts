import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface GalleryItem {
	id: number;
	title: string;
	description: string;
	category: string;
	imageUrl: string;
	tags: string[];
}

@Component({
	selector: 'app-gallery',
	imports: [CommonModule],
	templateUrl: './gallery.html',
	styleUrl: './gallery.css',
})
export class Gallery {
	items = signal<GalleryItem[]>([
		{
			id: 1,
			title: 'Wireless Headphones',
			description: 'Premium noise-cancelling over-ear headphones',
			category: 'Electronics',
			imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
			tags: ['headphones', 'audio', 'wireless'],
		},
		{
			id: 2,
			title: 'Smart Watch',
			description: 'Modern smartwatch with health tracking features',
			category: 'Electronics',
			imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
			tags: ['smartwatch', 'wearable', 'tech'],
		},
		{
			id: 3,
			title: 'Running Shoes',
			description: 'Lightweight performance running shoes',
			category: 'Sports',
			imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
			tags: ['shoes', 'running', 'fitness'],
		},
		{
			id: 4,
			title: 'Leather Backpack',
			description: 'Handcrafted leather backpack for everyday carry',
			category: 'Accessories',
			imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
			tags: ['backpack', 'leather', 'bag'],
		},
		{
			id: 5,
			title: 'Coffee Beans',
			description: 'Single-origin specialty coffee beans',
			category: 'Lifestyle',
			imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=600&fit=crop',
			tags: ['coffee', 'beans', 'food'],
		},
		{
			id: 6,
			title: 'Mechanical Keyboard',
			description: 'RGB mechanical keyboard with custom switches',
			category: 'Electronics',
			imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=600&fit=crop',
			tags: ['keyboard', 'mechanical', 'gaming'],
		},
		{
			id: 7,
			title: 'Sunglasses',
			description: 'Polarized aviator sunglasses with UV protection',
			category: 'Accessories',
			imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop',
			tags: ['sunglasses', 'eyewear', 'fashion'],
		},
		{
			id: 8,
			title: 'Yoga Mat',
			description: 'Non-slip eco-friendly premium yoga mat',
			category: 'Sports',
			imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop',
			tags: ['yoga', 'mat', 'fitness'],
		},
		{
			id: 9,
			title: 'Skincare Set',
			description: 'Essential skincare routine kit with natural ingredients',
			category: 'Lifestyle',
			imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
			tags: ['skincare', 'beauty', 'wellness'],
		},
		{
			id: 10,
			title: 'Wireless Earbuds',
			description: 'Compact true wireless earbuds with charging case',
			category: 'Electronics',
			imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop',
			tags: ['earbuds', 'audio', 'wireless'],
		},
		{
			id: 11,
			title: 'Wrist Watch',
			description: 'Classic analog wristwatch with leather strap',
			category: 'Accessories',
			imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop',
			tags: ['watch', 'classic', 'luxury'],
		},
		{
			id: 12,
			title: 'Scented Candle',
			description: 'Hand-poured soy wax candle with essential oils',
			category: 'Lifestyle',
			imageUrl: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&h=600&fit=crop',
			tags: ['candle', 'home', 'aromatherapy'],
		},
	]);

	selectedCategory = signal<string | null>(null);
	selectedItem = signal<GalleryItem | null>(null);

	getCategories(): string[] {
		return [...new Set(this.items().map((item) => item.category))];
	}

	getFilteredItems(): GalleryItem[] {
		if (!this.selectedCategory()) {
			return this.items();
		}
		return this.items().filter((item) => item.category === this.selectedCategory());
	}

	selectItem(item: GalleryItem) {
		this.selectedItem.set(item);
	}

	closeModal() {
		this.selectedItem.set(null);
	}

	nextItem() {
		const current = this.selectedItem();
		if (!current) return;

		const filtered = this.getFilteredItems();
		const currentIndex = filtered.findIndex((item) => item.id === current.id);
		const nextIndex = (currentIndex + 1) % filtered.length;
		this.selectedItem.set(filtered[nextIndex]);
	}

	prevItem() {
		const current = this.selectedItem();
		if (!current) return;

		const filtered = this.getFilteredItems();
		const currentIndex = filtered.findIndex((item) => item.id === current.id);
		const prevIndex = currentIndex === 0 ? filtered.length - 1 : currentIndex - 1;
		this.selectedItem.set(filtered[prevIndex]);
	}
}
