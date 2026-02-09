import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-faq',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './faq.html',
	styleUrl: './faq.css',
})
export class Faq {}
