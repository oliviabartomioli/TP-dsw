import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users';
import { ProfessionalComponents } from './components/professional/professional';
import { CategoryComponents } from './components/category/category';
import { ProvinceComponent } from './components/province/province';
import { CityComponent } from './components/city/city';
import { ServicesComponents } from './components/services/services';

export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'professional', component: ProfessionalComponents },
  { path: 'category', component: CategoryComponents },
  { path: 'province', component: ProvinceComponent },
  { path: 'city', component: CityComponent },
  { path: 'services', component: ServicesComponents },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];