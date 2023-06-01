import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const postHost = "http://34.125.34.30:5000/api/send_distribution";
const getHost = "http://34.125.34.30:5000/api/get_distribution";

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