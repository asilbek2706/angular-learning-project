import { Routes } from '@angular/router';
import { Hotel } from './hotel/hotel';
import { HotelForm } from './hotel-form/hotel-form';
import { HotelList } from './hotel-list/hotel-list';

const routes: Routes = [
  {
    path: '',
    component: Hotel,
    title: 'Home',
  },
  {
    path: 'new',
    component: HotelForm,
    title: 'New Booking',
  },
  {
    path: 'edit/:id',
    component: HotelForm,
    title: 'Edit Booking',
  },
  {
    path: 'list',
    component: HotelList,
    title: 'Room List',
  },
];

export default routes;
