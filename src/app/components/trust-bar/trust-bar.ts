import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-trust-bar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './trust-bar.html',
	styleUrl: './trust-bar.css',
})
export class TrustBar {}
