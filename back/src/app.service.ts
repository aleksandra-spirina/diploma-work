import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	data: any;

	constructor() {
		this.data = "start";
	}

	getData(): string {
		return this.data;
	}

	test(tmp: any): void {
		this.data = tmp;
	}
}
