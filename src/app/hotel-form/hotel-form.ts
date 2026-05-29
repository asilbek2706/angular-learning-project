import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-form',
  imports: [ReactiveFormsModule],
  templateUrl: './hotel-form.html',
  styleUrl: './hotel-form.css',
  standalone: true,
})
export class HotelForm {
  hotelService = inject(HotelService);

  rentedRooms: FormGroup = new FormGroup({
    checkIn: new FormControl('', [Validators.required]),
    checkOut: new FormControl('', [Validators.required]),
    roomType: new FormControl('', [Validators.required]),
    guestsCount: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const data = {...this.rentedRooms.value, id: Date.now()};
    this.hotelService.addRooms(data)
    this.rentedRooms.reset();
  }
}
