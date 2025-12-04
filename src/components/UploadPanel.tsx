import React, { useState } from 'react';
import { convertPdfToImage } from '../utils/pdfUtils';

interface UploadPanelProps {
    onImageSelect: (url: string) => void;
}

export const UploadPanel: React.FC<UploadPanelProps> = ({ onImageSelect }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setIsLoading(true);

            try {
                if (file.type === 'application/pdf') {
                    const imageUrl = await convertPdfToImage(file);
                    onImageSelect(imageUrl);
                } else {
                    const imageUrl = URL.createObjectURL(file);
                    onImageSelect(imageUrl);
                }
            } catch (error) {
                console.error('Error processing file:', error);
                alert(`Error processing file: ${error instanceof Error ? error.message : 'Unknown error'}`);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold mb-2">1. Upload Document</h2>
            <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                disabled={isLoading}
                className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {isLoading && <p className="text-sm text-blue-600 mt-2">Processing...</p>}
        </div>
    );
};
