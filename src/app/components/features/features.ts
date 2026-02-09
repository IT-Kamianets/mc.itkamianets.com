import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-features',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink],
	templateUrl: './features.html',
	styleUrl: './features.css',
})
export class Features {}
