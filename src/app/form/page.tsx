'use client'

import ZohoFileUpload from '@/components/ZohoFileUpload';
import ZohoFirstForm from '@/components/ZohoFirstForm';

// Define the response type to match what we expect from the ZohoFileUpload component
interface ZohoUploadResponse {
  id?: string;
  name?: string;
  size?: number;
  url?: string;
  status?: string;
  message?: string;
  [key: string]: unknown;
}

export default function UploadPage() {
  const handleUploadSuccess = (data: ZohoUploadResponse) => {
    console.log('Upload successful:', data);
    // Show success notification or update UI
  };

  const handleUploadError = (error: string) => {
    console.error('Upload failed:', error);
    // Show error notification
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Zoho File Upload</h1>
      <ZohoFileUpload
        entityId="4457288000012457001" // Replace with actual entity ID (e.g., Lead ID)
        module="Leads" // or "Contacts", "Accounts", etc.
        onSuccess={handleUploadSuccess}
        onError={handleUploadError}
      />
      <div className="mt-8 text-sm text-gray-500">
        <p>* Files will be attached to the specified entity in Zoho CRM</p>
        <p>* Maximum file size: 20MB</p>
      </div>
      <ZohoFirstForm />
    </div>
  );
}
