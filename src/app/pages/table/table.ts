import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, signal, computed, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// ============================================
// SCHEMA DEFINITIONS - Config-driven approach
// ============================================

type ColumnType = 'text' | 'number' | 'currency' | 'image' | 'badge' | 'date';
type SortDirection = 'asc' | 'desc' | null;

interface ColumnSchema {
	key: string;
	label: string;
	type: ColumnType;
	sortable?: boolean;
	filterable?: boolean;
	width?: string;
	align?: 'left' | 'center' | 'right';
	editable?: boolean;
	inputType?: 'text' | 'number' | 'select' | 'textarea';
	options?: { value: string; label: string; icon?: string }[];
	suffix?: string;
}

interface FilterOption {
	value: string;
	label: string;
	icon?: string;
}

interface FilterSchema {
	key: string;
	label: string;
	type: 'select' | 'search';
	options?: FilterOption[];
	placeholder?: string;
}

interface BadgeConfig {
	value: string;
	label: string;
	color: string;
}

interface ValidationRule {
	type: 'required' | 'min' | 'max' | 'minLength' | 'maxLength';
	value?: any;
	message: string;
}

interface FieldValidation {
	[key: string]: ValidationRule[];
}

interface TableConfig {
	title: string;
	subtitle: string;
	columns: ColumnSchema[];
	filters: FilterSchema[];
	badges: BadgeConfig[];
	addButtonLabel: string;
	editModalTitle: string;
	deleteModalTitle: string;
	currencySymbol: string;
	emptyMessage: string;
}

// ============================================
// DATA INTERFACE - Product Record
// ============================================

interface ProductRecord {
	id: number;
	productImage: string | null;
	productName: string;
	category: string;
	price: number;
	quantity: number;
	sku: string;
	description: string;
	status: string;
	createdAt: string;
	[key: string]: any;
}

@Component({
	selector: 'app-table',
	imports: [CommonModule, FormsModule],
	templateUrl: './table.html',
	styleUrl: './table.css',
})
export class Table implements OnInit {
	constructor(private router: Router) {}

	// ============================================
	// TABLE CONFIGURATION - Schema-driven rendering
	// ============================================

	tableConfig: TableConfig = {
		title: 'Product Database',
		subtitle: 'Manage your inventory with filtering, sorting, and CRUD operations',
		addButtonLabel: 'Add New Product',
		editModalTitle: 'Edit Product',
		deleteModalTitle: 'Delete Product',
		currencySymbol: '$',
		emptyMessage: 'No products found. Add your first product!',
		columns: [
			{ key: 'productImage', label: 'IMAGE', type: 'image', width: '80px', align: 'center', editable: true },
			{ key: 'productName', label: 'PRODUCT NAME', type: 'text', sortable: false, editable: true, inputType: 'text' },
			{ key: 'category', label: 'CATEGORY', type: 'badge', filterable: true, editable: true, inputType: 'select', options: [
				{ value: 'electronics', label: 'Electronics', icon: '💻' },
				{ value: 'clothing', label: 'Clothing', icon: '👕' },
				{ value: 'home', label: 'Home & Garden', icon: '🏠' },
				{ value: 'sports', label: 'Sports & Outdoors', icon: '⚽' },
				{ value: 'beauty', label: 'Beauty & Health', icon: '💄' },
				{ value: 'toys', label: 'Toys & Games', icon: '🎮' },
				{ value: 'food', label: 'Food & Beverages', icon: '🍕' },
				{ value: 'other', label: 'Other', icon: '📌' }
			]},
			{ key: 'price', label: 'PRICE', type: 'currency', sortable: true, align: 'right', editable: true, inputType: 'number' },
			{ key: 'quantity', label: 'STOCK', type: 'number', sortable: true, align: 'center', editable: true, inputType: 'number', suffix: 'units' },
			{ key: 'sku', label: 'SKU', type: 'text', editable: true, inputType: 'text' },
			{ key: 'status', label: 'STATUS', type: 'badge', filterable: true, editable: true, inputType: 'select', options: [
				{ value: 'active', label: 'Active', icon: '🟢' },
				{ value: 'draft', label: 'Draft', icon: '📝' },
				{ value: 'out_of_stock', label: 'Out of Stock', icon: '🔴' },
				{ value: 'discontinued', label: 'Discontinued', icon: '⛔' }
			]},
			{ key: 'createdAt', label: 'ADDED', type: 'date', sortable: true, align: 'center' }
		],
		filters: [
			{
				key: 'search',
				label: 'Search',
				type: 'search',
				placeholder: 'Search products...'
			},
			{
				key: 'category',
				label: 'Category',
				type: 'select',
				options: [
					{ value: '', label: 'All Categories' },
					{ value: 'electronics', label: '💻 Electronics' },
					{ value: 'clothing', label: '👕 Clothing' },
					{ value: 'home', label: '🏠 Home & Garden' },
					{ value: 'sports', label: '⚽ Sports & Outdoors' },
					{ value: 'beauty', label: '💄 Beauty & Health' },
					{ value: 'toys', label: '🎮 Toys & Games' },
					{ value: 'food', label: '🍕 Food & Beverages' },
					{ value: 'other', label: '📌 Other' }
				]
			},
			{
				key: 'status',
				label: 'Status',
				type: 'select',
				options: [
					{ value: '', label: 'All Statuses' },
					{ value: 'active', label: '🟢 Active' },
					{ value: 'draft', label: '📝 Draft' },
					{ value: 'out_of_stock', label: '🔴 Out of Stock' },
					{ value: 'discontinued', label: '⛔ Discontinued' }
				]
			}
		],
		badges: [
			// Categories
			{ value: 'electronics', label: 'Electronics', color: 'blue' },
			{ value: 'clothing', label: 'Clothing', color: 'purple' },
			{ value: 'home', label: 'Home & Garden', color: 'green' },
			{ value: 'sports', label: 'Sports & Outdoors', color: 'orange' },
			{ value: 'beauty', label: 'Beauty & Health', color: 'pink' },
			{ value: 'toys', label: 'Toys & Games', color: 'yellow' },
			{ value: 'food', label: 'Food & Beverages', color: 'red' },
			{ value: 'other', label: 'Other', color: 'gray' },
			// Statuses
			{ value: 'active', label: 'Active', color: 'green' },
			{ value: 'draft', label: 'Draft', color: 'gray' },
			{ value: 'out_of_stock', label: 'Out of Stock', color: 'red' },
			{ value: 'discontinued', label: 'Discontinued', color: 'dark' }
		]
	};

	// ============================================
	// VALIDATION CONFIGURATION
	// ============================================

	validationRules: FieldValidation = {
		productName: [
			{ type: 'required', message: 'Product name is required' },
			{ type: 'minLength', value: 3, message: 'Minimum 3 characters' }
		],
		category: [
			{ type: 'required', message: 'Category is required' }
		],
		price: [
			{ type: 'required', message: 'Price is required' },
			{ type: 'min', value: 0.01, message: 'Price must be greater than 0' }
		],
		quantity: [
			{ type: 'required', message: 'Quantity is required' },
			{ type: 'min', value: 0, message: 'Quantity cannot be negative' }
		],
		status: [
			{ type: 'required', message: 'Status is required' }
		]
	};

	// ============================================
	// SAMPLE DATA
	// ============================================

	sampleProducts: ProductRecord[] = [
		{ id: 1, productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop', productName: 'Wireless Headphones Pro', category: 'electronics', price: 149.99, quantity: 50, sku: 'WHP-001', description: 'Premium wireless headphones with noise cancellation', status: 'active', createdAt: '2026-01-15T10:30:00Z' },
		{ id: 2, productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop', productName: 'Smart Watch Series 5', category: 'electronics', price: 299.99, quantity: 25, sku: 'SWS-005', description: 'Advanced smartwatch with health monitoring', status: 'active', createdAt: '2026-01-20T14:15:00Z' },
		{ id: 3, productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop', productName: 'Running Shoes Ultra', category: 'sports', price: 89.99, quantity: 100, sku: 'RSU-010', description: 'Lightweight running shoes for marathon', status: 'active', createdAt: '2026-01-22T09:00:00Z' },
		{ id: 4, productImage: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=100&h=100&fit=crop', productName: 'Organic Face Cream', category: 'beauty', price: 34.99, quantity: 0, sku: 'OFC-020', description: 'Natural ingredients for healthy skin', status: 'out_of_stock', createdAt: '2026-01-25T11:45:00Z' },
		{ id: 5, productImage: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100&h=100&fit=crop', productName: 'Premium Coffee Beans', category: 'food', price: 24.99, quantity: 200, sku: 'PCB-100', description: 'Arabica beans from Colombia', status: 'active', createdAt: '2026-01-28T16:20:00Z' },
		{ id: 6, productImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=100&h=100&fit=crop', productName: 'Gaming Controller X', category: 'toys', price: 59.99, quantity: 15, sku: 'GCX-050', description: 'Wireless controller for all platforms', status: 'draft', createdAt: '2026-02-01T08:30:00Z' }
	];

	// ============================================
	// STATE MANAGEMENT
	// ============================================

	tableData = signal<ProductRecord[]>([]);

	// Filters
	searchQuery = signal('');
	filterValues = signal<Record<string, string>>({});

	// Sorting
	sortColumn = signal<string | null>(null);
	sortDirection = signal<SortDirection>(null);

	// Edit modal
	isEditModalOpen = signal(false);
	editingRecord = signal<ProductRecord | null>(null);
	editFormData = signal<Partial<ProductRecord>>({});
	editFormErrors = signal<Record<string, string>>({});
	editImagePreview = signal<string | null>(null);
	editImageError = signal<string | null>(null);

	// Delete confirmation
	isDeleteModalOpen = signal(false);
	deletingRecord = signal<ProductRecord | null>(null);

	// Notifications
	notification = signal<{ message: string; type: 'success' | 'error' } | null>(null);

	// ============================================
	// LIFECYCLE
	// ============================================

	private platformId = inject(PLATFORM_ID);

	ngOnInit() {
		this.loadProducts();
	}

	loadProducts() {
		if (isPlatformBrowser(this.platformId)) {
			const stored = localStorage.getItem('products');
			if (stored) {
				const products = JSON.parse(stored);
				this.tableData.set([...this.sampleProducts, ...products]);
			} else {
				this.tableData.set([...this.sampleProducts]);
			}
		} else {
			this.tableData.set([...this.sampleProducts]);
		}
	}

	// ============================================
	// COMPUTED VALUES
	// ============================================

	filteredAndSortedData = computed(() => {
		let data = [...this.tableData()];

		// Apply search filter
		const search = this.searchQuery().toLowerCase().trim();
		if (search) {
			data = data.filter(item =>
				item.productName.toLowerCase().includes(search) ||
				item.sku.toLowerCase().includes(search) ||
				item.description?.toLowerCase().includes(search)
			);
		}

		// Apply select filters
		const filters = this.filterValues();
		for (const key of Object.keys(filters)) {
			if (filters[key]) {
				data = data.filter(item => item[key as keyof ProductRecord] === filters[key]);
			}
		}

		// Apply sorting
		const column = this.sortColumn();
		const direction = this.sortDirection();
		if (column && direction) {
			data.sort((a, b) => {
				const aVal = a[column as keyof ProductRecord];
				const bVal = b[column as keyof ProductRecord];
				
				if (typeof aVal === 'number' && typeof bVal === 'number') {
					return direction === 'asc' ? aVal - bVal : bVal - aVal;
				}
				
				const aStr = String(aVal || '').toLowerCase();
				const bStr = String(bVal || '').toLowerCase();
				return direction === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
			});
		}

		return data;
	});

	totalRecords = computed(() => this.tableData().length);
	filteredRecords = computed(() => this.filteredAndSortedData().length);

	hasActiveFilters = computed(() => {
		return this.searchQuery().trim() !== '' || 
			Object.values(this.filterValues()).some(v => v !== '');
	});

	// ============================================
	// FILTER & SORT METHODS
	// ============================================

	updateSearch(value: string) {
		this.searchQuery.set(value);
	}

	updateFilter(key: string, value: string) {
		this.filterValues.update(f => ({ ...f, [key]: value }));
	}

	getFilterValue(key: string): string {
		return this.filterValues()[key] || '';
	}

	clearFilters() {
		this.searchQuery.set('');
		this.filterValues.set({});
	}

	toggleSort(column: string) {
		const currentColumn = this.sortColumn();
		const currentDirection = this.sortDirection();

		if (currentColumn !== column) {
			this.sortColumn.set(column);
			this.sortDirection.set('asc');
		} else if (currentDirection === 'asc') {
			this.sortDirection.set('desc');
		} else if (currentDirection === 'desc') {
			this.sortColumn.set(null);
			this.sortDirection.set(null);
		} else {
			this.sortDirection.set('asc');
		}
	}

	getSortIcon(column: string): string {
		if (this.sortColumn() !== column) return '↕';
		return this.sortDirection() === 'asc' ? '↑' : '↓';
	}

	// ============================================
	// HELPER METHODS - Template type-safe accessors
	// ============================================

	getRecordValue(record: ProductRecord, key: string): any {
		return record[key];
	}

	getEditFormValue(key: string): any {
		return this.editFormData()[key];
	}

	// ============================================
	// CRUD OPERATIONS
	// ============================================

	openEditModal(record: ProductRecord) {
		this.editingRecord.set(record);
		this.editFormData.set({ ...record });
		this.editFormErrors.set({});
		this.editImagePreview.set(record.productImage || null);
		this.editImageError.set(null);
		this.isEditModalOpen.set(true);
	}

	closeEditModal() {
		this.isEditModalOpen.set(false);
		this.editingRecord.set(null);
		this.editFormData.set({});
		this.editFormErrors.set({});
		this.editImagePreview.set(null);
		this.editImageError.set(null);
	}

	// Image editing handlers
	onEditImageSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (file) {
			this.setEditImage(file);
		}
	}

	setEditImage(file: File) {
		// Validate file size (5MB max)
		const maxSize = 5 * 1024 * 1024;
		if (file.size > maxSize) {
			this.editImageError.set('File is too large. Maximum size is 5MB.');
			return;
		}
		
		// Validate file type (only JPG and PNG)
		const allowedTypes = ['image/jpeg', 'image/png'];
		if (!allowedTypes.includes(file.type)) {
			this.editImageError.set('Only JPG and PNG formats are allowed.');
			return;
		}
		
		// Clear any previous error
		this.editImageError.set(null);
		
		// Create preview
		const reader = new FileReader();
		reader.onload = () => {
			const imageData = reader.result as string;
			this.editImagePreview.set(imageData);
			this.editFormData.update(data => ({ ...data, productImage: imageData }));
		};
		reader.readAsDataURL(file);
	}

	removeEditImage() {
		this.editImagePreview.set(null);
		this.editFormData.update(data => ({ ...data, productImage: null }));
		this.editImageError.set(null);
	}

	updateEditField(key: string, value: any) {
		this.editFormData.update(data => ({ ...data, [key]: value }));
		
		if (this.editFormErrors()[key]) {
			this.editFormErrors.update(errors => {
				const newErrors = { ...errors };
				delete newErrors[key];
				return newErrors;
			});
		}
	}

	validateField(key: string, value: any): string | null {
		const rules = this.validationRules[key];
		if (!rules) return null;

		for (const rule of rules) {
			switch (rule.type) {
				case 'required':
					if (value === null || value === undefined || value === '') return rule.message;
					break;
				case 'min':
					if (value !== null && value !== undefined && value < rule.value) return rule.message;
					break;
				case 'max':
					if (value !== null && value !== undefined && value > rule.value) return rule.message;
					break;
				case 'minLength':
					if (value && typeof value === 'string' && value.length < rule.value) return rule.message;
					break;
				case 'maxLength':
					if (value && typeof value === 'string' && value.length > rule.value) return rule.message;
					break;
			}
		}
		return null;
	}

	validateEditForm(): boolean {
		const errors: Record<string, string> = {};
		const data = this.editFormData();

		for (const key of Object.keys(this.validationRules)) {
			const error = this.validateField(key, data[key as keyof ProductRecord]);
			if (error) errors[key] = error;
		}

		this.editFormErrors.set(errors);
		return Object.keys(errors).length === 0;
	}

	hasFieldError(key: string): boolean {
		return !!this.editFormErrors()[key];
	}

	getFieldError(key: string): string {
		return this.editFormErrors()[key] || '';
	}

	saveRecord() {
		if (!this.validateEditForm()) return;

		const editedData = this.editFormData();
		const recordId = editedData.id;

		this.tableData.update(data => 
			data.map(item => item.id === recordId ? { ...item, ...editedData } as ProductRecord : item)
		);

		// Update localStorage
		this.syncToLocalStorage();

		this.closeEditModal();
		this.showNotification('Product updated successfully!', 'success');
	}

	addNewRecord() {
		this.router.navigate(['/form']);
	}

	openDeleteModal(record: ProductRecord) {
		this.deletingRecord.set(record);
		this.isDeleteModalOpen.set(true);
	}

	closeDeleteModal() {
		this.isDeleteModalOpen.set(false);
		this.deletingRecord.set(null);
	}

	confirmDelete() {
		const recordId = this.deletingRecord()?.id;
		if (recordId) {
			this.tableData.update(data => data.filter(item => item.id !== recordId));
			this.syncToLocalStorage();
			this.showNotification('Product deleted successfully!', 'success');
		}
		this.closeDeleteModal();
	}

	syncToLocalStorage() {
		if (isPlatformBrowser(this.platformId)) {
			const currentData = this.tableData();
			const customProducts = currentData.filter(p => !this.sampleProducts.find(s => s.id === p.id));
			localStorage.setItem('products', JSON.stringify(customProducts));
		}
	}

	// ============================================
	// HELPER METHODS
	// ============================================

	showNotification(message: string, type: 'success' | 'error') {
		this.notification.set({ message, type });
		setTimeout(() => this.notification.set(null), 3000);
	}

	formatCurrency(value: number): string {
		return `${this.tableConfig.currencySymbol}${value.toFixed(2)}`;
	}

	formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	getBadgeConfig(value: string): BadgeConfig | undefined {
		return this.tableConfig.badges.find(b => b.value === value);
	}

	getCategoryLabel(value: string): string {
		const column = this.tableConfig.columns.find(c => c.key === 'category');
		const option = column?.options?.find(o => o.value === value);
		return option?.label || value;
	}

	getStatusLabel(value: string): string {
		const column = this.tableConfig.columns.find(c => c.key === 'status');
		const option = column?.options?.find(o => o.value === value);
		return option?.label || value;
	}
}
