import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { SliderService } from 'src/app/shared/services/slider.service';
import { Article } from 'src/interfaces/Article';


@Component({
	selector: 'app-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {

	itemsOnPage: number = 0;
	itemsGroups: Article[][] = [];

	currentIndex = 0;

	constructor(public sliderService: SliderService,
		public breakpointObserver: BreakpointObserver) { }

	ngOnInit(): void {
		const desktop: string = '(min-width: 1024px)';
		const tabletInterval: string = '(min-width: 576px) and (max-width: 1023px)';
		const mobile: string = '(max-width: 575px)';

		this.breakpointObserver
			.observe([desktop, tabletInterval, mobile])
			.subscribe(() => {
				if (this.breakpointObserver.isMatched(desktop)) {
					this.itemsOnPage = 3;
				} else if(this.breakpointObserver.isMatched(tabletInterval)){
					this.itemsOnPage = 2;
				} else if(this.breakpointObserver.isMatched(mobile)){
					this.itemsOnPage = 1;
				} 

				this.createGroups();
			});
	}

	flipping(index: number) {
		this.currentIndex = index;
	}

	private createGroups(): void {
		const items = this.sliderService.articles;
		const n = items.length;

		this.itemsGroups = [];

		for(let i = 0; i < n; i += this.itemsOnPage) {
			this.itemsGroups.push(items.slice(i, i + this.itemsOnPage))
		}
	}

}
