import { Component, inject, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { IRoom } from '../models/i-room';
import {DatePipe} from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './hotel-list.html',
  styleUrls: ['./hotel-list.css'],
  standalone: true,
})
export class HotelList implements OnInit {
  roomList: IRoom[] = [];
  roomsService = inject(HotelService);

  ngOnInit(): void {
    this.roomList = this.roomsService.getRooms();
    console.log(this.roomList);
  }

  deleteRoom(room: IRoom): void {
    this.roomsService.deleteRoom(room.id)
    this.roomList = this.roomsService.getRooms();
  }
}
