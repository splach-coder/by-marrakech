// src/app/[locale]/book/components/BookingForm.tsx
'use client';

import { useState } from 'react';
import type { BookingItem, BookingFormData } from '@/types/booking';
import { formatWhatsAppMessage } from '../utils/whatsapp';

interface BookingFormProps {
  item: BookingItem;
}

export default function BookingForm({ item }: BookingFormProps) {
  const [formData, setFormData] = useState<Omit<BookingFormData, 'item'>>({
    preferredDate: '',
    numberOfTravelers: 2,
    fullName: '',
    email: '',
    phoneCountryCode: '+212',
    phoneNumber: '',
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const fullBookingData: BookingFormData = {
      item,
      ...formData,
    };

    // Format WhatsApp message
    const message = formatWhatsAppMessage(fullBookingData);
    const whatsappNumber = '212XXXXXXXXX'; // Replace with your number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Clear booking data from localStorage
    localStorage.removeItem('bookingItem');

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  const updateField = <K extends keyof Omit<BookingFormData, 'item'>>(
    field: K,
    value: Omit<BookingFormData, 'item'>[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      <div className="space-y-8">
        {/* Section 1: Travel Details */}
        <div>
          <h3 className="text-xl font-bold text-primary mb-6 pb-3 border-b-2 border-primary/20">
            Travel Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preferred Date */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">
                Preferred Date <span className="text-primary">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.preferredDate}
                onChange={(e) => updateField('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                  errors.preferredDate
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-border focus:border-primary'
                }`}
              />
              {errors.preferredDate && (
                <p className="mt-1 text-sm text-red-500">{errors.preferredDate}</p>
              )}
            </div>

            {/* Number of Travelers */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">
                Number of Travelers <span className="text-primary">*</span>
              </label>
              <div className="flex items-center gap-4 h-[50px]">
                <button
                  type="button"
                  onClick={() =>
                    updateField('numberOfTravelers', Math.max(1, formData.numberOfTravelers - 1))
                  }
                  className="w-14 h-14 border-2 border-border rounded-lg font-bold text-xl hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  −
                </button>
                <span className="text-3xl font-bold text-text-primary w-16 text-center">
                  {formData.numberOfTravelers}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateField('numberOfTravelers', formData.numberOfTravelers + 1)
                  }
                  className="w-14 h-14 border-2 border-border rounded-lg font-bold text-xl hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Contact Information */}
        <div>
          <h3 className="text-xl font-bold text-primary mb-6 pb-3 border-b-2 border-primary/20">
            Contact Information
          </h3>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                  errors.fullName
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-border focus:border-primary'
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-border focus:border-primary'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">
                Phone Number (Optional)
              </label>
              <div className="flex gap-3">
                <select
                  value={formData.phoneCountryCode}
                  onChange={(e) => updateField('phoneCountryCode', e.target.value)}
                  className="w-32 px-3 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                >
                  <option value="+212">MA +212</option>
                  <option value="+1">US +1</option>
                  <option value="+44">UK +44</option>
                  <option value="+33">FR +33</option>
                  <option value="+49">DE +49</option>
                  <option value="+34">ES +34</option>
                  <option value="+971">AE +971</option>
                </select>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => updateField('phoneNumber', e.target.value)}
                  placeholder="612345678"
                  className="flex-1 px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Additional Notes */}
        <div>
          <h3 className="text-xl font-bold text-primary mb-6 pb-3 border-b-2 border-primary/20">
            Additional Information
          </h3>

          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => updateField('additionalNotes', e.target.value)}
              rows={5}
              placeholder="Any special requests, questions, or additional information..."
              className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none resize-none"
            />
            <p className="mt-2 text-sm text-text-tertiary">
              Feel free to mention dietary restrictions, accessibility needs, or any questions you have.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-lg transition-all hover:shadow-lg"
          >
            Continue to WhatsApp
          </button>
          <p className="mt-4 text-center text-sm text-text-tertiary">
            You'll be redirected to WhatsApp to complete your booking request
          </p>
        </div>
      </div>
    </form>
  );
}