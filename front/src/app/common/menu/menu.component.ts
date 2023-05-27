import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.less']
})
export class MenuComponent {
	constructor(public router: Router) {}
}
