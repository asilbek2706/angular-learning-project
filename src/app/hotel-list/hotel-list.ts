import { Component, inject } from '@angular/core';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-list',
  imports: [],
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.css',
  standalone: true,
})
export class HotelList {
  roomsService = inject(HotelService);

  constructor(){
    console.log(this.roomsService.getRooms());
  }
}
