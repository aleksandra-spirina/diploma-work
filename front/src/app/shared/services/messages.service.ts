import { Injectable } from '@angular/core';
import { MessageData } from '../interfaces/message-data';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private firestore: Firestore) { }

	addToDatabase(data: MessageData): Observable<any> {
		const ref = doc(this.firestore, 'messages', data.id);
		return from(setDoc(ref, data));
	}
}
