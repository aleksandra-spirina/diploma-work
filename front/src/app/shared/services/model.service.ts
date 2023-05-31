import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { SendData } from "src/interfaces/SendData";

const postHost = "https://34.125.130.196:5000/api/send_latent";
const getHost = "https://34.125.130.196:5000/api/get_smiles"

@Injectable({ providedIn: 'root' })
export class ModelService {

	constructor(private httpClient: HttpClient) { }

	sendRequest(formattedData: SendData): Observable<void> {
		return this.httpClient.post<void>(postHost, JSON.stringify(formattedData), {
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