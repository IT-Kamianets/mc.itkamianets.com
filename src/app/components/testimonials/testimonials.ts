import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-testimonials',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './testimonials.html',
	styleUrl: './testimonials.css',
})
export class Testimonials {}
