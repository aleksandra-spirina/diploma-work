import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.less']
})
export class MenuComponent {
	active: boolean = false;
	constructor(public router: Router) {}

	toggle(): void {
		this.active = !this.active;
	}
}
