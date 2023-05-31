import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { catchError, concatMap, of, switchMap } from 'rxjs';
import { ModelService } from 'src/app/shared/services/model.service';
import { SendData } from 'src/interfaces/SendData';

const fileNamePass = 'Select a file...';

@Component({
	selector: 'app-generate-form',
	templateUrl: './generate-form.component.html',
	styleUrls: ['./generate-form.component.less']
})
export class GenerateFormComponent {
	fileUpload: boolean = true;
	generationAvailable: boolean = false;
	downloadAvailable: boolean = false;
	isError: boolean = false;

	previousMode: string = 'upload-button';
	private reader = new FileReader();
	sendData: SendData = {} as SendData;

	fileName = fileNamePass;
	currentStatus = 'no file selected';
	fileUrl: SafeResourceUrl = '';

	constructor(private modelService: ModelService, private sanitizer: DomSanitizer) {
		this.reader.addEventListener(
			"load", () => {
				let parseData: number[] = this.reader.result!.toString().split(' ').map((x) => parseFloat(x));
				if (parseData.length === 129) {
					let send: SendData = {
						latent: `[${parseData.slice(0, 128).join(', ')}]`,
						energy: parseData[128].toString()
					}
					this.sendData = send
				}
			},
			false
		);
	}

	onFileSelected(event: any) {
		const file: File = event.target.files[0];
		if (file) {
			this.generationAvailable = true;
			this.fileName = file.name;
			this.currentStatus = `${this.fileName} is selected`
			this.reader.readAsText(file);
		}
	}

	toggle(event: Event): void {
		const targetBtn = (event.target as HTMLElement).classList[0];
		if (targetBtn != this.previousMode) {
			this.fileUpload = !this.fileUpload;
			this.previousMode = targetBtn;
		}
	}

	startGenerating(): void {
		this.generationAvailable = false;
		this.currentStatus = 'the request is being processed';

		this.modelService.sendRequest(this.sendData).pipe(
			catchError((error) => {
				if (error.status === 200) {
					return of('OK');
				}

				if (error.status === 500) {
					this.currentStatus = 'incorrect data in the file';
					return of(void 0);
				}

				this.currentStatus = 'invalid request';
				return of(void 0);
			}),
			switchMap(status => {
				if (status === 'OK') {
					this.currentStatus = 'the generation in progress';
					return this.modelService.getAnswer();
				} else {
					return of(void 0);
				}
			})
		).subscribe(result => {
			if (result) {
				this.currentStatus = 'response received';
				this.downloadAvailable = true;
				const blob = new Blob([JSON.stringify(result!)], { type: 'application/octet-stream' });

				this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
			}
		})
	}

	download(): void {
		this.currentStatus = 'no file selected';
		this.fileName = fileNamePass;
		this.generationAvailable = false;
	}

	onSelected(value: string) {
		console.log(value);
	}
}
