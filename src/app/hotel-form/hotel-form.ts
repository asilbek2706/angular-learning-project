import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-hotel-form',
  imports: [ReactiveFormsModule],
  templateUrl: './hotel-form.html',
  styleUrl: './hotel-form.css',
})
export class HotelForm {
  rentedRooms: FormGroup = new FormGroup({
    checkIn: new FormControl('', [Validators.required]),
    checkOut: new FormControl('', [Validators.required]),
    roomType: new FormControl('', [Validators.required]),
    guestsCount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phoneNumber: new FormControl('', [Validators.required]),
    specialRequests: new FormControl(''),
  });

  onSubmit() {
    console.log(`Form submitted: ${JSON.stringify(this.rentedRooms.value)}`);
  }
}
