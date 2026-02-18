import { Routes } from '@angular/router';
import { Public } from './layouts/public/public';
import { Contacts } from './pages/contacts/contacts';
import { Gallery } from './pages/gallery/gallery';
import { Home } from './pages/home/home';
import { List } from './pages/list/list';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
	{
		path: '',
		component: Public,
		children: [
			{
				path: '',
				component: Home,
			},
			{
				path: 'list',
				component: List,
			},
			{
				path: 'profile/:id',
				component: Profile,
			},
			{
				path: 'gallery',
				component: Gallery,
			},
			{
				path: 'contacts',
				component: Contacts,
			},
		],
	},
	{
		path: '**',
		redirectTo: '',
	},
];
