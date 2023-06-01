import { Component } from '@angular/core';

@Component({
	selector: 'app-generate-form',
	templateUrl: './generate-form.component.html',
	styleUrls: ['./generate-form.component.less']
})
export class GenerateFormComponent {
	fileUpload: boolean = true;
	previousMode: string = 'upload-button';

	constructor() { }

	toggle(event: Event): void {
		const targetBtn = (event.target as HTMLElement).classList[0];
		if (targetBtn != this.previousMode) {
			this.fileUpload = !this.fileUpload;
			this.previousMode = targetBtn;
		}
	}


}
