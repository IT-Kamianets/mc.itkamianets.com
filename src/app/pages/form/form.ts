import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

// ============================================
// SCHEMA DEFINITIONS - Config-driven approach
// ============================================

type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'file';

interface ValidationRule {
	type: 'required' | 'minLength' | 'maxLength' | 'min' | 'max' | 'pattern' | 'fileSize' | 'fileType';
	value?: any;
	message: string;
}

interface SelectOption {
	value: string;
	label: string;
	icon?: string;
}

interface FieldSchema {
	key: string;
	type: FieldType;
	label: string;
	placeholder?: string;
	validation?: ValidationRule[];
	options?: SelectOption[];
	accept?: string;
	rows?: number;
	icon?: string;
	hint?: string;
	suffix?: string;
}

interface FormConfig {
	title: string;
	subtitle: string;
	submitButtonLabel: string;
	successMessage: string;
	fields: FieldSchema[];
}

// ============================================
// PRODUCT DATA INTERFACE
// ============================================

interface ProductData {
	productImage: File | null;
	productName: string;
	category: string;
	price: number | null;
	quantity: number | null;
	sku: string;
	description: string;
	status: string;
}

@Component({
	selector: 'app-form',
	imports: [CommonModule, FormsModule, RouterLink],
	templateUrl: './form.html',
	styleUrl: './form.css',
})
export class Form {
	constructor(private router: Router) {}

	// Expose Math for template
	Math = Math;

	// Platform detection for SSR
	private platformId = inject(PLATFORM_ID);

	// ============================================
	// FORM CONFIGURATION - Schema-driven rendering
	// ============================================

	formConfig: FormConfig = {
		title: 'Add New Product',
		subtitle: 'Fill in the product details to add it to your inventory',
		submitButtonLabel: 'Add Product',
		successMessage: 'Product added successfully!',
		fields: [
			{
				key: 'productImage',
				type: 'file',
				label: 'Product Image',
				accept: 'image/jpeg,image/png',
				hint: 'Recommended: 800x800px, max 5MB (JPG or PNG)',
				icon: '🖼️',
				validation: [
					{ type: 'fileSize', value: 5 * 1024 * 1024, message: 'Image must be less than 5MB' },
					{ type: 'fileType', value: ['image/jpeg', 'image/png'], message: 'Only JPG and PNG formats allowed' }
				]
			},
			{
				key: 'productName',
				type: 'text',
				label: 'Product Name',
				placeholder: 'Enter product name',
				icon: '📦',
				validation: [
					{ type: 'required', message: 'Product name is required' },
					{ type: 'minLength', value: 3, message: 'At least 3 characters required' },
					{ type: 'maxLength', value: 100, message: 'Maximum 100 characters' }
				]
			},
			{
				key: 'category',
				type: 'select',
				label: 'Category',
				placeholder: 'Select a category',
				icon: '📂',
				options: [
					{ value: 'electronics', label: 'Electronics', icon: '💻' },
					{ value: 'clothing', label: 'Clothing', icon: '👕' },
					{ value: 'home', label: 'Home & Garden', icon: '🏠' },
					{ value: 'sports', label: 'Sports & Outdoors', icon: '⚽' },
					{ value: 'beauty', label: 'Beauty & Health', icon: '💄' },
					{ value: 'toys', label: 'Toys & Games', icon: '🎮' },
					{ value: 'food', label: 'Food & Beverages', icon: '🍕' },
					{ value: 'other', label: 'Other', icon: '📌' }
				],
				validation: [
					{ type: 'required', message: 'Please select a category' }
				]
			},
			{
				key: 'price',
				type: 'number',
				label: 'Price',
				placeholder: '0.00',
				icon: '💰',
				suffix: 'USD',
				validation: [
					{ type: 'required', message: 'Price is required' },
					{ type: 'min', value: 0.01, message: 'Price must be greater than 0' },
					{ type: 'max', value: 999999.99, message: 'Price too high' }
				]
			},
			{
				key: 'quantity',
				type: 'number',
				label: 'Stock Quantity',
				placeholder: '0',
				icon: '📊',
				suffix: 'units',
				validation: [
					{ type: 'required', message: 'Quantity is required' },
					{ type: 'min', value: 0, message: 'Quantity cannot be negative' }
				]
			},
			{
				key: 'sku',
				type: 'text',
				label: 'SKU (Stock Keeping Unit)',
				placeholder: 'e.g., PROD-001',
				icon: '🏷️',
				hint: 'Unique identifier for inventory tracking',
				validation: [
					{ type: 'pattern', value: '^[A-Za-z0-9-]+$', message: 'Only letters, numbers and dashes allowed' }
				]
			},
			{
				key: 'status',
				type: 'select',
				label: 'Status',
				placeholder: 'Select status',
				icon: '✅',
				options: [
					{ value: 'active', label: 'Active', icon: '🟢' },
					{ value: 'draft', label: 'Draft', icon: '📝' },
					{ value: 'out_of_stock', label: 'Out of Stock', icon: '🔴' },
					{ value: 'discontinued', label: 'Discontinued', icon: '⛔' }
				],
				validation: [
					{ type: 'required', message: 'Please select a status' }
				]
			},
			{
				key: 'description',
				type: 'textarea',
				label: 'Description',
				placeholder: 'Enter product description...',
				icon: '📝',
				rows: 4,
				hint: 'Describe the product features, materials, dimensions, etc.',
				validation: [
					{ type: 'maxLength', value: 1000, message: 'Maximum 1000 characters' }
				]
			}
		]
	};

	// ============================================
	// STATE MANAGEMENT
	// ============================================

	formData = signal<ProductData>({
		productImage: null,
		productName: '',
		category: '',
		price: null,
		quantity: null,
		sku: '',
		description: '',
		status: ''
	});

	// Image error message
	imageError = signal<string | null>(null);

	errors = signal<Record<string, string>>({});
	touched = signal<Record<string, boolean>>({});
	submitted = signal(false);
	isSubmitting = signal(false);
	
	// Image preview
	imagePreview = signal<string | null>(null);
	dragOver = signal(false);

	// Computed values
	progress = computed(() => {
		const data = this.formData();
		const requiredFields = ['productName', 'category', 'price', 'quantity', 'status'];
		let filled = 0;
		for (const key of requiredFields) {
			const value = data[key as keyof ProductData];
			if (key === 'status') {
				// Status counts only if not empty (user selected something)
				if (value && value !== '') filled++;
			} else if (key === 'price' || key === 'quantity') {
				// Numbers count only if they have actual value
				if (value !== null && value !== undefined && value !== '' && !isNaN(Number(value))) filled++;
			} else {
				// Strings count only if not empty
				if (value !== '' && value !== null && value !== undefined) filled++;
			}
		}
		return Math.round((filled / requiredFields.length) * 100);
	});

	isValid = computed(() => Object.keys(this.errors()).length === 0);

	// ============================================
	// VALIDATION LOGIC
	// ============================================

	validateField(field: FieldSchema, value: any): string | null {
		if (!field.validation) return null;

		for (const rule of field.validation) {
			switch (rule.type) {
				case 'required':
					if (value === null || value === undefined || value === '') return rule.message;
					break;
				case 'minLength':
					if (value && typeof value === 'string' && value.length < rule.value) return rule.message;
					break;
				case 'maxLength':
					if (value && typeof value === 'string' && value.length > rule.value) return rule.message;
					break;
				case 'min':
					if (value !== null && value !== undefined && value < rule.value) return rule.message;
					break;
				case 'max':
					if (value !== null && value !== undefined && value > rule.value) return rule.message;
					break;
				case 'pattern':
					if (value && typeof value === 'string' && value.length > 0 && !new RegExp(rule.value).test(value)) return rule.message;
					break;
				case 'fileSize':
					if (value instanceof File && value.size > rule.value) return rule.message;
					break;
				case 'fileType':
					if (value instanceof File && !rule.value.includes(value.type)) return rule.message;
					break;
			}
		}
		return null;
	}

	validateForm(): boolean {
		const newErrors: Record<string, string> = {};
		
		for (const field of this.formConfig.fields) {
			const value = this.formData()[field.key as keyof ProductData];
			const error = this.validateField(field, value);
			if (error) newErrors[field.key] = error;
		}

		this.errors.set(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	// ============================================
	// FORM HANDLERS
	// ============================================

	updateField(key: keyof ProductData, value: any) {
		this.formData.update((data: ProductData) => ({ ...data, [key]: value }));
		this.touched.update((t: Record<string, boolean>) => ({ ...t, [key]: true }));
		
		// Clear error on change
		if (this.errors()[key]) {
			this.errors.update((err: Record<string, string>) => {
				const newErr = { ...err };
				delete newErr[key];
				return newErr;
			});
		}
	}

	// Image upload handlers
	onImageDrop(event: DragEvent) {
		event.preventDefault();
		this.dragOver.set(false);
		const file = event.dataTransfer?.files[0];
		if (file && file.type.startsWith('image/')) {
			this.setImage(file);
		}
	}

	onImageSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (file) {
			this.setImage(file);
		}
	}

	setImage(file: File) {
		// Validate file size (5MB max)
		const maxSize = 5 * 1024 * 1024;
		if (file.size > maxSize) {
			this.imageError.set(`File is too large (${this.formatFileSize(file.size)}). Maximum size is 5MB.`);
			return;
		}
		
		// Validate file type (only JPG and PNG)
		const allowedTypes = ['image/jpeg', 'image/png'];
		if (!allowedTypes.includes(file.type)) {
			this.imageError.set('Only JPG and PNG formats are allowed.');
			return;
		}
		
		// Clear any previous error
		this.imageError.set(null);
		this.updateField('productImage', file);
		
		// Create preview
		const reader = new FileReader();
		reader.onload = () => {
			this.imagePreview.set(reader.result as string);
		};
		reader.readAsDataURL(file);
	}

	removeImage() {
		this.updateField('productImage', null);
		this.imagePreview.set(null);
	}

	// Form actions
	submitForm() {
		if (!this.validateForm()) {
			// Scroll to first error field
			if (isPlatformBrowser(this.platformId)) {
				const errorKeys = Object.keys(this.errors());
				if (errorKeys.length > 0) {
					const firstErrorField = document.querySelector(`[data-field="${errorKeys[0]}"]`);
					if (firstErrorField) {
						firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
					}
				}
			}
			return;
		}

		this.isSubmitting.set(true);

		// Simulate API call
		setTimeout(() => {
			this.isSubmitting.set(false);
			this.submitted.set(true);
			
			// Store product data for table page (in real app, this would be an API call)
			if (isPlatformBrowser(this.platformId)) {
				const products = JSON.parse(localStorage.getItem('products') || '[]');
				const newProduct = {
					id: Date.now(),
					...this.formData(),
					productImage: this.imagePreview(),
					createdAt: new Date().toISOString()
				};
				products.push(newProduct);
				localStorage.setItem('products', JSON.stringify(products));

				// Scroll to top to show success message
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}

			// Reset after success - show for 5 seconds
			setTimeout(() => {
				this.submitted.set(false);
				this.resetForm();
			}, 5000);
		}, 1500);
	}

	resetForm() {
		this.formData.set({
			productImage: null,
			productName: '',
			category: '',
			price: null,
			quantity: null,
			sku: '',
			description: '',
			status: ''
		});
		this.errors.set({});
		this.touched.set({});
		this.imagePreview.set(null);
		this.imageError.set(null);
	}

	// Helper methods
	getFieldConfig(key: string): FieldSchema | undefined {
		return this.formConfig.fields.find(f => f.key === key);
	}

	formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}
}
