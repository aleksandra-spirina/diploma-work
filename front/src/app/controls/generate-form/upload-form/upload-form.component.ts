import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { catchError, of, switchMap } from 'rxjs';
import { ModelService } from 'src/app/shared/services/model.service';

const fileNamePass = 'Select a file...';

@Component({
	selector: 'app-upload-form',
	templateUrl: './upload-form.component.html',
	styleUrls: ['./upload-form.component.less']
})
export class UploadFormComponent {
	generationAvailable: boolean = false;
	downloadAvailable: boolean = false;
	currentStatus = 'no file selected';

	private reader = new FileReader();
	sendData: string = '';

	fileName = fileNamePass;
	fileUrl: SafeResourceUrl = '';

	constructor(private modelService: ModelService,
		private sanitizer: DomSanitizer
	) {
		this.reader.addEventListener(
			'load', () => {
				this.sendData = this.reader.result!.toString();
			},
			false
		);
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

	onFileSelected(event: any) {
		const file: File = event.target.files[0];
		if (file) {
			this.generationAvailable = true;
			this.fileName = file.name;
			this.currentStatus = `${this.fileName} is selected`
			this.reader.readAsText(file);
		}
	}

}
