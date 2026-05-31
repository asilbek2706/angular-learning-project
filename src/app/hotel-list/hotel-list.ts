import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { IRoom } from '../models/i-room';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './hotel-list.html',
  styleUrls: ['./hotel-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelList {
  protected readonly roomsService = inject(HotelService);
  protected roomList: IRoom[] = this.roomsService.getRooms();

  deleteRoom(room: IRoom): void {
    this.roomsService.deleteRoom(room.id);
    this.roomList = this.roomsService.getRooms();
  }
}
