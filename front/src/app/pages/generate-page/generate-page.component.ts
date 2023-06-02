import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-generate-page',
	templateUrl: './generate-page.component.html',
	styleUrls: ['./generate-page.component.less']
})
export class GeneratePageComponent {
	fileUrl: SafeResourceUrl = 'assets/sources/LATENT_SPACE_DATA.csv';
	exampleFileUrl: SafeResourceUrl = 'assets/sources/example.txt';
}
