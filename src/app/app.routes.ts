import { Routes } from '@angular/router';
import { HomePageComponent as HomePage } from './components/home-page/home-page';

export const routes: Routes = [
    {path: "home", component: HomePage },
    {path: '', redirectTo: 'home', pathMatch: 'full' }
];
