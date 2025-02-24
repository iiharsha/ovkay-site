'use client';

import Loading from '@/components/common/Loading';
import { useState, FormEvent } from 'react';

export default function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>({
    Last_Name: '',
    Lead_Status: 'New',
    From: '',
    To: '',
    Bike_type: '',
    Lead_Source: 'Meta Ads',
    Email: '',
    Mobile: '',
    Expected_Shipment_Date: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const bikeTypes = ['61- 250CC', '250+CC', 'EV Bike', 'Premium', 'Non Working Bike']; // Add more bike types as needed
  const hearingSources = ['Google Search', 'Instagram', 'Facebook', 'Referral', 'Public Boards']; // Add more hearing sources as needed

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/zoho/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let responseData;
      try {
        const textData = await response.text();
        responseData = textData ? JSON.parse(textData) : null;
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(responseData?.error || 'Failed to create lead');
      }

      setSuccess(true);
      setFormData({
        Last_Name: '',
        Lead_Status: 'Website',
        From: '',
        To: '',
        Bike_type: '',
        Lead_Source: '',
        Email: '',
        Mobile: '',
        Expected_Shipment_Date: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-[#EFEEF1] rounded-lg shadow-lg font-mallory">
      <h1 className="text-[40px] text-center font-bold mb-6 font-mallory">Get Free Quote</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded border border-green-300">
          Thank You for you response Our Team will Contact You Right Away!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2 flex flex-col items-start justify-center">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={formData.Last_Name}
            onChange={(e) => setFormData({ ...formData, Last_Name: e.target.value })}
            className="w-full p-2 border rounded"
            required
            placeholder='Enter Full Name'
          />
        </div>

        <div>
          <label className="block mb-2">From Location</label>
          <input
            type="text"
            value={formData.From}
            onChange={(e) => setFormData({ ...formData, From: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">To Location</label>
          <input
            type="text"
            value={formData.To}
            onChange={(e) => setFormData({ ...formData, To: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Bike Type</label>
          <select
            value={formData.Bike_type}
            onChange={(e) => setFormData({ ...formData, Bike_type: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Bike Type</option>
            {bikeTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">How Did You Hear About Us?</label>
          <select
            value={formData.Lead_Source}
            onChange={(e) => setFormData({ ...formData, Lead_Source: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Bike Type</option>
            {hearingSources.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={formData.Email}
            onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Mobile *</label>
          <input
            type="tel"
            value={formData.Mobile}
            onChange={(e) => setFormData({ ...formData, Mobile: e.target.value })}
            className="w-full p-2 border rounded"
            required
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit mobile number"
          />
        </div>

        <div>
          <label className="block mb-2">Expected Shipment Date</label>
          <input
            type="date"
            value={formData.Expected_Shipment_Date}
            onChange={(e) => setFormData({ ...formData, Expected_Shipment_Date: e.target.value })}
            className="w-full p-2 border rounded"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded text-white ${isSubmitting
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
          {isSubmitting ? <Loading /> : 'Get A Quote Now'}
        </button>
      </form>
    </div>
  );
}
