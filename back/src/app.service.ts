import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	data: string;

	constructor() {
		this.data = "hello world";
	}

	getData(): string {
		return this.data;
	}
}
