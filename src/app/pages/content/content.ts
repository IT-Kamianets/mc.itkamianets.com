import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface BlogPost {
	id: number;
	title: string;
	excerpt: string;
	content: string;
	author: string;
	authorAvatar: string;
	date: string;
	readTime: number;
	category: string;
	tags: string[];
	image: string;
}

@Component({
	selector: 'app-content',
	imports: [CommonModule],
	templateUrl: './content.html',
	styleUrl: './content.css',
})
export class Content {
	posts = signal<BlogPost[]>([
		{
			id: 1,
			title: 'Top 5 Wireless Headphones of 2026',
			excerpt: 'We tested dozens of wireless headphones to find the best options for every budget and listening style.',
			content: `Wireless headphones have come a long way in 2026, with improvements in noise cancellation, battery life, and sound quality across every price range. In this roundup, we compare the top contenders — from premium over-ear models with spatial audio to budget-friendly earbuds that punch well above their weight. Whether you prioritize bass-heavy sound, crystal-clear calls, or all-day comfort, our expert picks will help you find the perfect pair.`,
			author: 'Alex Rivera',
			authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
			date: '2026-02-01',
			readTime: 10,
			category: 'Reviews',
			tags: ['headphones', 'audio', 'wireless'],
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop',
		},
		{
			id: 2,
			title: 'Smart Watch Buying Guide',
			excerpt: 'Everything you need to know before choosing your next smartwatch — features, compatibility, and value.',
			content: `The smartwatch market is more competitive than ever, with options ranging from fitness-focused trackers to full-featured wrist computers. This guide breaks down the key factors to consider: operating system compatibility, health sensors, battery life, build quality, and app ecosystems. We also compare the latest models side by side so you can make an informed decision that fits your lifestyle and budget.`,
			author: 'Maya Chen',
			authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
			date: '2026-01-28',
			readTime: 12,
			category: 'Guides',
			tags: ['smartwatch', 'wearables', 'tech'],
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop',
		},
		{
			id: 3,
			title: 'How to Choose Running Shoes',
			excerpt: 'A sports expert breaks down fit, cushioning, and terrain types to help you find the right running shoe.',
			content: `Choosing the right running shoe can make or break your training. In this guide, we cover the essentials: understanding pronation, selecting the right cushioning level, and matching shoe type to your running surface. From road runners to trail specialists, we explain what to look for in a shoe and highlight the top-performing models across different categories. Plus, tips on when to replace your shoes and how to extend their lifespan.`,
			author: 'Jordan Blake',
			authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
			date: '2026-01-25',
			readTime: 8,
			category: 'Guides',
			tags: ['running', 'shoes', 'fitness'],
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=400&fit=crop',
		},
		{
			id: 4,
			title: 'Skincare Essentials: What Actually Works',
			excerpt: 'Cut through the marketing hype — these are the skincare products backed by dermatologists.',
			content: `The skincare industry is flooded with miracle claims and trendy ingredients, but which products actually deliver results? We consulted dermatologists and reviewed clinical studies to identify the essentials every routine should include. From cleansers and sunscreens to serums and moisturizers, this article covers what works, what doesn't, and how to build a simple yet effective skincare regimen without breaking the bank.`,
			author: 'Sophia Laurent',
			authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
			date: '2026-01-20',
			readTime: 9,
			category: 'Reviews',
			tags: ['skincare', 'beauty', 'wellness'],
			image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=400&fit=crop',
		},
		{
			id: 5,
			title: "Coffee Lover's Guide to Premium Beans",
			excerpt: 'From single-origin to blends, discover how to pick the best coffee beans for your perfect cup.',
			content: `Great coffee starts with great beans, but navigating the world of specialty coffee can be overwhelming. This guide covers the fundamentals — roast levels, origin characteristics, and processing methods — so you can confidently choose beans that match your taste. We also share brewing tips for popular methods like pour-over, French press, and espresso, along with our top picks for online coffee subscriptions.`,
			author: 'Marco Espinoza',
			authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
			date: '2026-01-15',
			readTime: 7,
			category: 'Tips',
			tags: ['coffee', 'food', 'lifestyle'],
			image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=400&fit=crop',
		},
		{
			id: 6,
			title: 'Best Mechanical Keyboards for Every Budget',
			excerpt: 'From entry-level to enthusiast, these are the mechanical keyboards worth your money in 2026.',
			content: `Mechanical keyboards have exploded in popularity, and the options can be overwhelming. In this review, we break down our top picks across three price tiers — budget, mid-range, and premium. We evaluate switch types, build quality, keycap materials, and software features. Whether you're a gamer, programmer, or office worker, there's a perfect board out there for you. We also cover hot-swappable options for those who like to experiment with different switches.`,
			author: 'Alex Rivera',
			authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
			date: '2026-01-12',
			readTime: 11,
			category: 'Reviews',
			tags: ['keyboard', 'mechanical', 'gaming'],
			image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=400&fit=crop',
		},
		{
			id: 7,
			title: '10 Tips for Better Product Photography',
			excerpt: 'Simple techniques to make your product shots look professional — no expensive gear required.',
			content: `Great product photos can make or break an online listing. The good news? You don't need a professional studio to get stunning results. This article shares ten practical tips: from setting up natural lighting and choosing the right background to editing tricks that make colors pop. We also recommend affordable tools and apps that can elevate your photography game, whether you're shooting with a smartphone or a DSLR.`,
			author: 'Sophia Laurent',
			authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
			date: '2026-01-08',
			readTime: 6,
			category: 'Tips',
			tags: ['photography', 'ecommerce', 'marketing'],
			image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=400&fit=crop',
		},
		{
			id: 8,
			title: 'Backpack Essentials: What to Look For',
			excerpt: 'A complete guide to finding the right backpack for commuting, travel, or everyday use.',
			content: `A good backpack is an investment that pays off daily. But with hundreds of options on the market, how do you pick the right one? This guide walks you through the key features to consider: capacity, compartment layout, material durability, comfort systems, and water resistance. We compare popular styles — from sleek urban daypacks to rugged travel packs — and highlight the best options in each category for 2026.`,
			author: 'Jordan Blake',
			authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
			date: '2026-01-05',
			readTime: 8,
			category: 'Guides',
			tags: ['backpack', 'travel', 'accessories'],
			image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=400&fit=crop',
		},
		{
			id: 9,
			title: 'Home Fragrance: Candles vs Diffusers',
			excerpt: 'Which home scenting method is right for you? We compare cost, safety, and scent throw.',
			content: `Creating a pleasant atmosphere at home often starts with fragrance. But should you go with scented candles or reed diffusers? Each has its strengths and trade-offs. Candles offer a warm ambiance and stronger scent throw, while diffusers provide consistent, maintenance-free fragrance. We compare the two across multiple factors including safety, cost per hour, scent variety, and room coverage. Plus, our top product recommendations for each category.`,
			author: 'Maya Chen',
			authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
			date: '2026-01-02',
			readTime: 5,
			category: 'Tips',
			tags: ['candles', 'home', 'lifestyle'],
			image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&h=400&fit=crop',
		},
		{
			id: 10,
			title: 'Sunglasses Buying Guide: UV Protection Matters',
			excerpt: 'Not all sunglasses are equal — learn what lens features actually protect your eyes.',
			content: `Sunglasses are more than a fashion accessory — they're essential eye protection. But many shoppers focus on style and overlook the specs that matter most. This guide explains UV protection ratings, polarization, lens materials, and frame fit. We debunk common myths (like darker lenses being safer) and recommend the best sunglasses across different price points, from drugstore finds to premium designer options.`,
			author: 'Marco Espinoza',
			authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
			date: '2025-12-28',
			readTime: 7,
			category: 'Guides',
			tags: ['sunglasses', 'eyewear', 'fashion'],
			image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=400&fit=crop',
		},
	]);

	selectedPost = signal<BlogPost | null>(null);
	categories = signal<string[]>(['All', 'Guides', 'Reviews', 'Tips']);

	selectPost(post: BlogPost) {
		this.selectedPost.set(post);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	clearSelection() {
		this.selectedPost.set(null);
	}
}
