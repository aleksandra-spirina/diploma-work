import { Component } from '@angular/core';
import { PersonsService } from 'src/app/shared/services/persons.service';

@Component({
	selector: 'app-contacts-page',
	templateUrl: './contacts-page.component.html',
	styleUrls: ['./contacts-page.component.less']
})
export class ContactsPageComponent {
	constructor(public personsService: PersonsService) {
	}
	
}
