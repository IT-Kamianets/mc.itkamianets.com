import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-use-cases',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './use-cases.html',
	styleUrl: './use-cases.css',
})
export class UseCases {}
