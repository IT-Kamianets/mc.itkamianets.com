import { Component, signal } from '@angular/core';
import { About } from '../../components/about/about';
import { Faq } from '../../components/faq/faq';
import { Features } from '../../components/features/features';
import { FinalCta } from '../../components/final-cta/final-cta';
import { Hero } from '../../components/hero/hero';
import { HowItWorks } from '../../components/how-it-works/how-it-works';
import { Pricing } from '../../components/pricing/pricing';
import { Showcase } from '../../components/showcase/showcase';
import { Testimonials } from '../../components/testimonials/testimonials';
import { TrustBar } from '../../components/trust-bar/trust-bar';
import { UseCases } from '../../components/use-cases/use-cases';
import { ListItemsSection, ListItemData } from '../../components/list-items-section/list-items-section';
@Component({
	imports: [
		Hero,
		TrustBar,
		About,
		Features,
		HowItWorks,
		Showcase,
		UseCases,
		Testimonials,
		Pricing,
		Faq,
		FinalCta,
		ListItemsSection,
	],
	templateUrl: './home.html',
	styleUrl: './home.css',
})
export class Home {
	// Додаємо дані для секції (можна скопіювати з List або взяти частину)
	featuredItems = signal<ListItemData[]>([
		{
			id: 1,
			name: 'Product Alpha',
			description: 'High-quality product with premium features',
			category: 'Electronics',
			date: '2026-02-01',
			icon: '⚡',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
		},
		{
			id: 2,
			name: 'Product Beta',
			description: 'Affordable solution for everyday needs',
			category: 'Accessories',
			date: '2026-01-28',
			icon: '🎁',
			image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop',
		},
		{
			id: 3,
			name: 'Product Gamma',
			description: 'Advanced technology meets elegant design',
			category: 'Electronics',
			date: '2026-01-25',
			icon: '✨',
			image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
		},
	]);
}
