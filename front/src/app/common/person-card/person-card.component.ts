import { Component, Input } from '@angular/core';
import { PersonData } from 'src/interfaces/PersonData';

@Component({
	selector: 'app-person-card',
	templateUrl: './person-card.component.html',
	styleUrls: ['./person-card.component.less']
})
export class PersonCardComponent {
	@Input() person: PersonData = {} as PersonData;
	@Input() notFlip: boolean = false;
	flipped = false;

	flipping(): void {
		if (!this.notFlip) {
			this.flipped = !this.flipped;
		}
	}
}
