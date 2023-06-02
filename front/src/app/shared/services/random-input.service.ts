import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const postHost = "https://model-api-ximjvvnn3q-nw.a.run.app/api/send_distribution";
const getHost = "https://model-api-ximjvvnn3q-nw.a.run.app/api/get_distribution";

@Injectable({
  providedIn: 'root'
})
export class RandomInputService {

	constructor(private httpClient: HttpClient) { }

	sendRequest(distType: string): Observable<void> {
		return this.httpClient.post<void>(postHost, distType, {
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
