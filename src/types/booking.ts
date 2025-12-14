// src/types/booking.ts
export interface BookingItem {
    id: string;
    type: 'tour' | 'experience' | 'event';
    title: string;
    image: string;
    duration?: string;
    price?: string;
    date?: string;
    location?: string;
  }
  
  export interface BookingFormData {
    item: BookingItem;
    preferredDate: string;
    numberOfTravelers: number;
    fullName: string;
    email: string;
    phoneCountryCode: string;
    phoneNumber: string;
    additionalNotes: string;
  }