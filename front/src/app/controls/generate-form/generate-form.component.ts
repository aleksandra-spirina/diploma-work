import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

const host = "http://34.125.130.196:5000/api/send_latent";

interface SendData {
	latent: string;
	energy: string;
}

@Component({
	selector: 'app-generate-form',
	templateUrl: './generate-form.component.html',
	styleUrls: ['./generate-form.component.less']
})
export class GenerateFormComponent {
	fileUpload: boolean = true;
	private reader = new FileReader();
	fileName = '';

	constructor(httpClient: HttpClient) {
		this.reader.addEventListener(
			"load", () => {
				let parseData: number[] = this.reader.result!.toString().split(' ').map((x) => parseFloat(x));
				let send: SendData = {
					latent: `[${parseData.slice(0, 128).join(', ')}]`,
					energy: parseData[128].toString()
				}

				console.log(JSON.stringify(send));
				httpClient.post(host, JSON.stringify(send), {
					headers: {
						'Content-type': 'application/json',
						'Accept': 'application/json'
					}
				}).subscribe(res => console.log(res))
			},
			false
		);
	}

	onFileSelected(event: any) {
		const file: File = event.target.files[0];
		if (file) {
			this.fileName = file.name;
			this.reader.readAsText(file);
		}
	}

	toggle(): void {
		this.fileUpload = !this.fileUpload;
	}
}
