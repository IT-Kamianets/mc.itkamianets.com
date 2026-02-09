import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-features',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './features.html',
	styleUrl: './features.css',
})
export class Features {}
