import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { SendData } from "src/interfaces/SendData";

const getHost = "http://34.125.130.196:5000/api/send_latent";

@Injectable({ providedIn: 'root' })
export class ModelService {

	constructor(private httpClient: HttpClient) { }

	sendRequest(file: File) : Observable<void> {
		return this.httpClient.post<void>(getHost, this.formatting(file));
	}
	

	private formatting(file: File): Promise<string | void> {
		const reader = new FileReader();
		const fileReaderPromise = new Promise(resolve => reader.onload = resolve);
		reader.readAsText(file);
		return fileReaderPromise.then(() => {
			let parseData: number[] = reader.result!.toString().split(' ').map((x) => parseFloat(x));
				let send: SendData = {
					latent: `[${parseData.slice(0, 128).join(', ')}]`,
					energy: parseData[128].toString()
				}
			return JSON.stringify(send)
		});
	}
}