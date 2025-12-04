import { useState } from 'react';
import { UploadPanel } from '../UploadPanel';
import { SinglePhotoSelector } from '../SinglePhotoSelector';

interface Selection {
    x: number;
    y: number;
    width: number;
    height: number;
}

type PhotoType = 'passport' | 'joint';

interface PhotoDimensions {
    width: string;
    height: string;
}

const PHOTO_DIMENSIONS: Record<PhotoType, PhotoDimensions> = {
    passport: { width: '3.5cm', height: '4.5cm' },
    joint: { width: '4.5cm', height: '3.5cm' },
};

export const PassportPhotoTab = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [photoSelection, setPhotoSelection] = useState<Selection | null>(null);
    const [photoCount, setPhotoCount] = useState<number>(4);
    const [photoType, setPhotoType] = useState<PhotoType>('passport');

    const handleImageSelect = (url: string) => {
        setImageUrl(url);
        setPhotoSelection(null);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden no-print">
                {/* Left Side: Upload & Selection */}
                <div className="w-1/2 flex flex-col border-r border-gray-200 bg-white overflow-y-auto">
                    <UploadPanel onImageSelect={handleImageSelect} />
                    <div className="p-4 flex-1">
                        <h2 className="text-lg font-semibold mb-4">2. Select Photo Region</h2>
                        <SinglePhotoSelector
                            imageUrl={imageUrl}
                            onSetSelection={setPhotoSelection}
                        />
                    </div>
                </div>

                {/* Right Side: Settings & Preview */}
                <div className="w-1/2 bg-gray-50 p-6 overflow-y-auto">
                    <div className="max-w-md mx-auto space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-4">3. Configure Photos</h2>

                            <div className="mb-4">
                                <label htmlFor="photoType" className="block text-sm font-medium text-gray-700 mb-2">
                                    Photo Type
                                </label>
                                <select
                                    id="photoType"
                                    value={photoType}
                                    onChange={(e) => setPhotoType(e.target.value as PhotoType)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="passport">Passport (3.5cm × 4.5cm)</option>
                                    <option value="joint">Joint (4.5cm × 3.5cm)</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="photoCount" className="block text-sm font-medium text-gray-700 mb-2">
                                    Number of Photos
                                </label>
                                <input
                                    id="photoCount"
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={photoCount}
                                    onChange={(e) => setPhotoCount(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Preview */}
                        {photoSelection && photoSelection.width > 0 && (
                            <div className="border-t pt-6">
                                <h3 className="text-md font-semibold mb-3">Preview</h3>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <div
                                        style={{
                                            width: PHOTO_DIMENSIONS[photoType].width,
                                            height: PHOTO_DIMENSIONS[photoType].height
                                        }}
                                        className="relative border border-gray-300 overflow-hidden mx-auto"
                                    >
                                        {imageUrl && (
                                            <img
                                                src={imageUrl}
                                                alt="Preview"
                                                className="absolute origin-top-left max-w-none"
                                                style={{
                                                    left: `-${(photoSelection.x * 100) / photoSelection.width}%`,
                                                    top: `-${(photoSelection.y * 100) / photoSelection.height}%`,
                                                    width: `${100 / photoSelection.width}%`,
                                                    height: `${100 / photoSelection.height}%`,
                                                }}
                                            />
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 text-center mt-2">
                                        {PHOTO_DIMENSIONS[photoType].width} × {PHOTO_DIMENSIONS[photoType].height}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Print Button */}
                        <button
                            onClick={handlePrint}
                            disabled={!photoSelection || photoSelection.width === 0}
                            className="w-full bg-purple-600 text-white py-3 px-6 rounded shadow hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print {photoCount} Photo{photoCount !== 1 ? 's' : ''}
                        </button>
                    </div>
                </div>
            </main>

            {/* Print Layout - Visible only when printing */}
            <div className="print-only hidden">
                <div className="w-full min-h-screen p-4">
                    <div className="flex flex-wrap gap-2">
                        {imageUrl && photoSelection && photoSelection.width > 0 &&
                            Array.from({ length: photoCount }).map((_, index) => (
                                <div
                                    key={index}
                                    style={{
                                        width: PHOTO_DIMENSIONS[photoType].width,
                                        height: PHOTO_DIMENSIONS[photoType].height
                                    }}
                                    className="relative border border-gray-300 overflow-hidden"
                                >
                                    <img
                                        src={imageUrl}
                                        alt={`Photo ${index + 1}`}
                                        className="absolute origin-top-left max-w-none"
                                        style={{
                                            left: `-${(photoSelection.x * 100) / photoSelection.width}%`,
                                            top: `-${(photoSelection.y * 100) / photoSelection.height}%`,
                                            width: `${100 / photoSelection.width}%`,
                                            height: `${100 / photoSelection.height}%`,
                                        }}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
