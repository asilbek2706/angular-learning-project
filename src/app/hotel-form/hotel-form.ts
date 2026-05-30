import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-form',
  imports: [ReactiveFormsModule],
  templateUrl: './hotel-form.html',
  styleUrls: ['./hotel-form.css'],
  standalone: true,
})
export class HotelForm {
  hotelService = inject(HotelService);

  rentedRooms: FormGroup = new FormGroup({
    checkIn: new FormControl('', [Validators.required]),
    checkOut: new FormControl('', [Validators.required]),
    roomType: new FormControl('', [Validators.required]),
    guestsCount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(7)]),
    fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9}$')]),
  });

  onSubmit() {
    const data = { ...this.rentedRooms.value, id: Date.now() };
    this.hotelService.addRooms(data);
    this.rentedRooms.reset();
  }
}
