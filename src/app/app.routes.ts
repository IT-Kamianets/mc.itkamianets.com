import { Routes } from '@angular/router';
import { Public } from './layouts/public/public';
import { Contacts } from './pages/contacts/contacts';
import { Content } from './pages/content/content';
import { Form } from './pages/form/form';
import { Gallery } from './pages/gallery/gallery';
import { Home } from './pages/home/home';
import { List } from './pages/list/list';
import { Profile } from './pages/profile/profile';
import { Table } from './pages/table/table';

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
				path: 'form',
				component: Form,
			},
			{
				path: 'table',
				component: Table,
			},
			{
				path: 'gallery',
				component: Gallery,
			},
			{
				path: 'content',
				component: Content,
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
