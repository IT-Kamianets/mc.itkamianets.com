import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-showcase',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './showcase.html',
	styleUrl: './showcase.css',
})
export class Showcase {}
