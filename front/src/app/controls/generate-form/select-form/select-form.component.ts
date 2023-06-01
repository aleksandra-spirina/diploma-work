import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { catchError, of, switchMap } from 'rxjs';
import { ModelService } from 'src/app/shared/services/model.service';
import { RandomInputService } from 'src/app/shared/services/random-input.service';
import { SendData } from 'src/app/shared/interfaces/send-data';

interface Dist {
	distribution: string;
}

@Component({
	selector: 'app-select-form',
	templateUrl: './select-form.component.html',
	styleUrls: ['./select-form.component.less']
})
export class SelectFormComponent {
	generationAvailable: boolean = true;
	downloadAvailable: boolean = false;
	downloadInputAvailable: boolean = false;

	dist: Dist = {} as Dist;
	currentStatus = '';
	sendData: SendData = {} as SendData;

	inputFileUrl: SafeResourceUrl = '';
	resultFileUrl: SafeResourceUrl = '';

	form = new FormGroup({
		distType: new FormControl<string>('', [Validators.required]),
		energyValue: new FormControl<number>(-10, [Validators.required, Validators.max(-10), Validators.min(-14)])
	})

	constructor(private randomInputService: RandomInputService,
		private modelService: ModelService,
		private sanitizer: DomSanitizer) { }

	onSelected(value: string) {
		this.dist = {
			distribution: value
		}
		this.generationAvailable = true;
	}

	generate(): void {

		const energy = this.energyValue?.value;

		this.downloadAvailable = false;
		this.downloadInputAvailable = false;
		this.generationAvailable = false;

		this.randomInputService.sendRequest(JSON.stringify(this.dist)).pipe(
			catchError((error) => {
				if (error.status === 200) {
					return of('OK');
				}
				return of(void 0);
			}),
			switchMap(() => {
				this.currentStatus = 'generating input data';
				return this.randomInputService.getAnswer();
			}),
			switchMap(data => {
				const key = Object.keys(data[0])[0] as keyof typeof data[0];
				let send: SendData = {
					latent: `[${data[0][key].toString()}]`,
					energy: energy!.toString()
				}
				this.sendData = send;

				this.downloadInputAvailable = true;
				const blob = new Blob([JSON.stringify(send)], { type: 'application/octet-stream' });
				this.inputFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

				return of(void 0);
			}),
			switchMap(() => {
				this.currentStatus = 'the generation in progress';
				return this.modelService.sendRequest(JSON.stringify(this.sendData));
			}),
			catchError((error) => {
				if (error.status === 200) {
					return of('OK');
				}
				return of(void 0);
			}),
			switchMap(() => {
				return this.modelService.getAnswer();
			})
		).subscribe(result => {
			if (result) {
				this.currentStatus = 'response received';
				this.generationAvailable = true;
				this.downloadAvailable = true;
				const blob = new Blob([JSON.stringify(result!)], { type: 'application/octet-stream' });

				this.resultFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
			}
		});
	}

	downloadInput() {

	}

	downloadResult() {

	}

	get distType() {
		return this.form.get('distType');
	}

	get energyValue() {
		return this.form.get('energyValue');
	}
}
