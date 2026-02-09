import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
	selector: 'app-public',
	imports: [Footer, Header, RouterOutlet],
	templateUrl: './public.html',
	styleUrl: './public.css',
})
export class Public {}
