'use client'

import React, { useState, useRef } from 'react';

// Define a more specific type for the upload response
interface ZohoUploadResponse {
    id?: string;
    name?: string;
    size?: number;
    url?: string;
    status?: string;
    message?: string;
    [key: string]: unknown; // Allow additional properties in a type-safe way
}

interface ZohoFileUploadProps {
    entityId: string;
    module: string;
    onSuccess?: (data: ZohoUploadResponse) => void;
    onError?: (error: string) => void;
}

const ZohoFileUpload: React.FC<ZohoFileUploadProps> = ({
    entityId,
    module,
    onSuccess,
    onError,
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            onError?.('Please select a file first');
            return;
        }

        try {
            setIsLoading(true);
            setUploadProgress(10);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('entityId', entityId);
            formData.append('module', module);

            setUploadProgress(30);

            const response = await fetch('/api/zoho/upload', {
                method: 'POST',
                body: formData,
            });

            setUploadProgress(90);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to upload file');
            }

            const data = await response.json() as ZohoUploadResponse;
            setUploadProgress(100);

            // Reset the file input
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            onSuccess?.(data);
        } catch (error) {
            console.error('Upload error:', error);
            onError?.(error instanceof Error ? error.message : 'Unknown error occurred');
        } finally {
            setIsLoading(false);
            // Reset progress after a delay
            setTimeout(() => setUploadProgress(0), 1000);
        }
    };

    const handleCancel = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
                {file ? (
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm font-semibold">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm font-medium">Drag & drop a file here, or click to select</p>
                        <p className="text-xs text-gray-500 mt-1">Supported files: PDF, DOC, DOCX, JPG, PNG</p>
                    </div>
                )}
            </div>

            {uploadProgress > 0 && (
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-center mt-1 text-gray-500">
                        {uploadProgress === 100 ? 'Upload complete!' : `Uploading: ${uploadProgress}%`}
                    </p>
                </div>
            )}

            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={handleCancel}
                    disabled={!file || isLoading}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    onClick={handleUpload}
                    disabled={!file || isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {isLoading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </div>
    );
};

export default ZohoFileUpload;
