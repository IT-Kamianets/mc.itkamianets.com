import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeDensity, ThemeMode, ThemeRadius, ThemeService } from 'wacom';

@Component({
	selector: 'app-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink, RouterLinkActive],
	templateUrl: './header.html',
	styleUrl: './header.css',
})
export class Header {
	protected readonly theme = inject(ThemeService);

	protected readonly modes: (ThemeMode | string)[] = ['light', 'dark', 'itkp'];
	protected readonly densities: ThemeDensity[] = ['comfortable', 'compact'];
	protected readonly radii: ThemeRadius[] = ['rounded', 'square'];

	protected showThemeMenu = signal<boolean>(false);

	protected toggleThemeMenu() {
		this.showThemeMenu.update((v: boolean) => !v);
	}

	protected setMode(mode: ThemeMode | string) {
		this.theme.setMode(mode as ThemeMode);
	}

	protected setDensity(density: ThemeDensity) {
		this.theme.setDensity(density);
	}

	protected setRadius(radius: ThemeRadius) {
		this.theme.setRadius(radius);
	}
}
