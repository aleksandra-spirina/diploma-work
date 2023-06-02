import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageData } from 'src/app/shared/interfaces/message-data';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
	selector: 'app-contact-form',
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.less']
})
export class ContactFormComponent {
	form: FormGroup = {} as FormGroup;
	
	constructor(private messagesService : MessagesService) {
		this.form = new FormGroup({
			name: new FormControl<string>('', [Validators.required]),
			email: new FormControl<string>('', [Validators.required]),
			message: new FormControl<string>('', [Validators.required])
		});
	}

	sendMessage(): void {
		const send: MessageData = {
			name: this.form.get('name')?.value,
			email: this.form.get('email')?.value,
			message: this.form.get('message')?.value,
			id: uuidv4()
		}

		this.messagesService.addToDatabase(send);
		this.form.reset();
	}

}
