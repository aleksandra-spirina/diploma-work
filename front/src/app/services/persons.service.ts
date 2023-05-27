import { Injectable } from "@angular/core";
import { PersonData } from "src/interfaces/PersonData";

const data: PersonData[] = [
	{
		name: 'Hanna Karpenko',
		role: 'supervisor of project',
		imgUrl: 'url(\'/assets/img/hanna-photo.png\')',
		email: '',
		linkedin: '',
		github: ''
	},
	{
		name: 'Aleksandra Spirina',
		role: 'Web-developer',
		imgUrl: 'url(\'/assets/img/aleksandra-photo.png\')',
		email: '',
		linkedin: '',
		github: ''
	},
	{
		name: 'Timofey Voitko',
		role: 'ML-developer',
		imgUrl: 'url(\'/assets/img/timofey-photo.png\')',
		email: '',
		linkedin: '',
		github: ''
	},
]

@Injectable({ providedIn: 'root' })
export class PersonsService {
	private _persons: PersonData[] = [];

	constructor() {
		this._persons = data;
	}

	get persons(): PersonData[] {
		return this._persons;
	}
}