'use client';

import { useState } from 'react';

interface FormData {
    fromLocation: string;
    toLocation: string;
    bikeType: string;
    senderName: string;
    mobile: string;
    email: string;
    leadSource: string;
    estimatedPickupDate: string;
}

const BikeShipmentForm = () => {
    const [formData, setFormData] = useState<FormData>({
        fromLocation: '',
        toLocation: '',
        bikeType: '',
        senderName: '',
        mobile: '',
        email: '',
        leadSource: 'Website',
        estimatedPickupDate: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/submit-lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Lead submitted successfully!');
                // Reset form
                setFormData({
                    fromLocation: '',
                    toLocation: '',
                    bikeType: '',
                    senderName: '',
                    mobile: '',
                    email: '',
                    leadSource: 'Website',
                    estimatedPickupDate: '',
                });
            } else {
                alert('Error submitting lead');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting lead');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 space-y-4">
            <div>
                <label className="block mb-2">From Location</label>
                <input
                    type="text"
                    value={formData.fromLocation}
                    onChange={(e) => setFormData({ ...formData, fromLocation: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label className="block mb-2">To Location</label>
                <input
                    type="text"
                    value={formData.toLocation}
                    onChange={(e) => setFormData({ ...formData, toLocation: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label className="block mb-2">Bike Type</label>
                <select
                    value={formData.bikeType}
                    onChange={(e) => setFormData({ ...formData, bikeType: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Select Bike Type</option>
                    <option value="61-250cc">61-250cc</option>
                    <option value="250+cc">250+cc</option>
                    <option value="ev bike">EV Bike</option>
                    <option value="premium">Premium</option>
                    <option value="non-working bike">Non-working Bike</option>
                </select>
            </div>

            <div>
                <label className="block mb-2">Sender Name</label>
                <input
                    type="text"
                    value={formData.senderName}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label className="block mb-2">Mobile</label>
                <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label className="block mb-2">Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label className="block mb-2">Estimated Pickup Date</label>
                <input
                    type="date"
                    value={formData.estimatedPickupDate}
                    onChange={(e) => setFormData({ ...formData, estimatedPickupDate: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
};

export default BikeShipmentForm;

