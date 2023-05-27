import { Injectable } from "@angular/core";
import { Article } from "src/interfaces/Article";

const data: Article[] = [
	{
		imgUrl: 'assets/img/article1.png',
		title: 'Title 1',
		description: 'description',
		reference: '#'
	},
	{
		imgUrl: 'assets/img/article2.png',
		title: 'Title 2',
		description: 'description',
		reference: '#'
	},
	{
		imgUrl: 'assets/img/article3.png',
		title: 'Title 3',
		description: 'description',
		reference: '#'
	},
	{
		imgUrl: '',
		title: 'Title 4',
		description: 'description',
		reference: '#'
	}
]

@Injectable({ providedIn: 'root' }) 
export class SliderService {
	private _articles: Article[] = [];

	constructor() {
		this._articles = data;
	}

	get articles(): Article[] {
		return this._articles;
	}

}