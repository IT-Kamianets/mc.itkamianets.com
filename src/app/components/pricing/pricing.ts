import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-pricing',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './pricing.html',
	styleUrl: './pricing.css',
})
export class Pricing {}
