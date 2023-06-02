import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { GeneratePageComponent } from './pages/generate-page/generate-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { MenuComponent } from './common/menu/menu.component';
import { LogoComponent } from './common/logo/logo.component';
import { SliderComponent } from './controls/slider/slider.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ArticleComponent } from './controls/slider/article/article.component';
import { PersonCardComponent } from './common/person-card/person-card.component';
import { ContactFormComponent } from './controls/contact-form/contact-form.component';
import { GenerateFormComponent } from './controls/generate-form/generate-form.component';
import { UploadFormComponent } from './controls/generate-form/upload-form/upload-form.component';
import { SelectFormComponent } from './controls/generate-form/select-form/select-form.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


@NgModule({
	declarations: [
		AppComponent,
		MainPageComponent,
		AboutPageComponent,
		TeamPageComponent,
		GeneratePageComponent,
		ContactsPageComponent,
		HeaderComponent,
		FooterComponent,
		MenuComponent,
		LogoComponent,
		SliderComponent,
		ArticleComponent,
		PersonCardComponent,
		ContactFormComponent,
		GenerateFormComponent,
		UploadFormComponent,
		SelectFormComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		LayoutModule,
		RouterModule.forRoot([]),
		ReactiveFormsModule,
		HttpClientModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideDatabase(() => getDatabase()),
		provideFirestore(() => getFirestore())
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
