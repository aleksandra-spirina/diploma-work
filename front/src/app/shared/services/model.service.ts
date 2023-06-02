import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

// const postHost = "http://34.125.34.30:5000/api/send_latent";
// const getHost = "http://34.125.34.30:5000/api/get_smiles"

const postHost = "https://model-api-ximjvvnn3q-nw.a.run.app/api/send_latent";
const getHost = "https://model-api-ximjvvnn3q-nw.a.run.app/api/get_smiles";

@Injectable({ providedIn: 'root' })
export class ModelService {

	constructor(private httpClient: HttpClient) { }

	sendRequest(formattedData: string): Observable<void> {
		return this.httpClient.post<void>(postHost, formattedData, {
			headers: {
				'Content-type': 'application/json',
				'Accept': 'application/json'
			}
		});
	}

	getAnswer() : Observable<string> {
		return this.httpClient.get<string>(getHost);
	}
}