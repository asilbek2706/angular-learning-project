import { Routes } from '@angular/router';
import { Hotel } from './hotel/hotel';
import { HotelForm } from './hotel-form/hotel-form';
import { HotelList } from './hotel-list/hotel-list';

const routes: Routes = [
  {
    path: '',
    component: Hotel,
    title: 'Hotel',
  },
  {
    path: 'new',
    component: HotelForm,
    title: 'Create Hotel',
  },
  {
    path: 'edit/:id',
    component: HotelForm,
    title: 'Create Hotel',
  },
  {
    path: 'list',
    component: HotelList,
    title: 'Hotel List',
  },
];

export default routes;
