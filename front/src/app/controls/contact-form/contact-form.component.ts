import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-contact-form',
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.less']
})
export class ContactFormComponent {
	form: FormGroup = {} as FormGroup;
	
	constructor() {
		this.form = new FormGroup({
			name: new FormControl<string>('', [Validators.required]),
			email: new FormControl<string>('', [Validators.required]),
			message: new FormControl<string>('', [Validators.required])
		});
	}

}
