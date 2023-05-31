import { Component } from '@angular/core';
import { PersonsService } from 'src/app/shared/services/persons.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.less']
})
export class TeamPageComponent {
	constructor(public personsService: PersonsService) {}
}
