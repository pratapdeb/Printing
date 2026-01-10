import React from 'react';

interface Selection {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface PVCPreviewProps {
    title: string;
    imageUrl: string | null;
    selection: Selection | null;
}

export const PVCPreview: React.FC<PVCPreviewProps> = ({ title, imageUrl, selection }) => {
    return (
        <div className="flex flex-col gap-2 items-center w-full">
            <h3 className="font-semibold text-gray-700">{title}</h3>
            {/* 5.4cm x 8.5cm aspect ratio preview */}
            <div
                className="relative bg-white shadow-lg border border-gray-200 overflow-hidden"
                style={{
                    width: '180px', // Scaling down for preview while maintaining aspect ratio
                    height: '283px', // (8.5 / 5.4) * 180 = 283.33
                }}
            >
                {imageUrl && selection && selection.width > 0 && selection.height > 0 ? (
                    <div className="w-full h-full relative">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="absolute origin-top-left max-w-none"
                            style={{
                                left: `-${(selection.x * 100) / selection.width}%`,
                                top: `-${(selection.y * 100) / selection.height}%`,
                                width: `${100 / selection.width}%`,
                                height: `${100 / selection.height}%`,
                            }}
                        />
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 p-4 text-center text-sm">
                        {imageUrl ? 'Select a region and set as ' + title : 'Upload an image first'}
                    </div>
                )}

                {/* Subtle overlay to simulate card edge/gloss */}
                <div className="absolute inset-0 pointer-events-none border border-black border-opacity-5 rounded-sm"></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">5.4 cm x 8.5 cm</p>
        </div>
    );
};
