import { useState } from 'react';
import { UploadPanel } from '../UploadPanel';
import { PVCImageSelector } from '../PVCImageSelector';
import { PVCPreviewPanel } from '../PVCPreviewPanel';

interface Selection {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const PvcTab = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selection, setSelection] = useState<Selection | null>(null);

    const handleImageSelect = (url: string) => {
        setImageUrl(url);
        setSelection(null);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <style>
                {`
                    @media print {
                        @page {
                            size: 5.4cm 8.5cm;
                            margin: 0;
                        }
                    }
                `}
            </style>
            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden no-print">
                {/* Left Side: Upload & Selection */}
                <div className="w-1/2 flex flex-col border-r border-gray-200 bg-white overflow-y-auto">
                    <UploadPanel onImageSelect={handleImageSelect} />
                    <div className="p-4 flex-1">
                        <h2 className="text-lg font-semibold mb-4">2. Select Regions</h2>
                        <PVCImageSelector
                            imageUrl={imageUrl}
                            onSetSelection={setSelection}
                        />
                    </div>
                </div>

                {/* Right Side: Previews */}
                <div className="w-1/2 bg-gray-50">
                    <PVCPreviewPanel
                        imageUrl={imageUrl}
                        selection={selection}
                        onPrint={handlePrint}
                    />
                </div>
            </main>

            {/* Print Layout - Visible only when printing */}
            <div className="print-only hidden">
                <div className="w-full h-screen flex flex-row items-start justify-center">
                    {/* PVC Content */}
                    <div style={{ width: '5.4cm', height: '8.5cm' }} className="relative border border-gray-300 overflow-hidden">
                        {imageUrl && selection && (
                            <img
                                src={imageUrl}
                                alt="PVC Content"
                                className="absolute origin-top-left max-w-none"
                                style={{
                                    left: `-${(selection.x * 100) / selection.width}%`,
                                    top: `-${(selection.y * 100) / selection.height}%`,
                                    width: `${100 / selection.width}%`,
                                    height: `${100 / selection.height}%`,
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
