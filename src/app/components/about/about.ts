import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-about',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './about.html',
	styleUrl: './about.css',
})
export class About {}
