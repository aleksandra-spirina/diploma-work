import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { GeneratePageComponent } from './pages/generate-page/generate-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';

const routes: Routes = [
	{ path: '', component: MainPageComponent, pathMatch: 'full' },
	{ path: 'main', component: MainPageComponent, pathMatch: 'full' },
	{ path: 'about', component: AboutPageComponent, pathMatch: 'full' },
	{ path: 'team', component: TeamPageComponent, pathMatch: 'full' },
	{ path: 'generate', component: GeneratePageComponent, pathMatch: 'full' },
	{ path: 'contacts', component: ContactsPageComponent, pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
