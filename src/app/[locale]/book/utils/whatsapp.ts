// src/app/[locale]/book/utils/whatsapp.ts
import type { BookingFormData } from '@/types/booking';

export function formatWhatsAppMessage(data: BookingFormData): string {
  const { item, preferredDate, numberOfTravelers, fullName, email, phoneCountryCode, phoneNumber, additionalNotes } = data;

  let message = `*NEW BOOKING REQUEST*\n\n`;
  
  // Item Details
  message += `*${item.type.toUpperCase()}:* ${item.title}\n`;
  if (item.duration) message += `*Duration:* ${item.duration}\n`;
  if (item.price) message += `*Price:* ${item.price}\n`;
  if (item.date) message += `*Event Date:* ${item.date}\n`;
  if (item.location) message += `*Location:* ${item.location}\n`;
  
  message += `\n`;
  
  // Travel Details
  message += `*TRAVEL DETAILS*\n`;
  message += `Preferred Date: ${preferredDate}\n`;
  message += `Number of Travelers: ${numberOfTravelers}\n`;
  
  message += `\n`;
  
  // Contact Information
  message += `*CONTACT INFORMATION*\n`;
  message += `Name: ${fullName}\n`;
  message += `Email: ${email}\n`;
  if (phoneNumber) {
    message += `Phone: ${phoneCountryCode} ${phoneNumber}\n`;
  }
  
  // Additional Notes
  if (additionalNotes.trim()) {
    message += `\n`;
    message += `*ADDITIONAL NOTES*\n`;
    message += `${additionalNotes}\n`;
  }
  
  message += `\n`;
  message += `---\n`;
  message += `Sent from: ByMarrakech.com`;

  return message;
}