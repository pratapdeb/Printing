import React from 'react';

interface Selection {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface A4PreviewProps {
    title: string;
    imageUrl: string | null;
    selection: Selection | null;
}

export const A4Preview: React.FC<A4PreviewProps> = ({ title, imageUrl, selection }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <h3 className="font-semibold text-gray-700">{title}</h3>
            <div className="relative w-full a4-aspect bg-white shadow-md border border-gray-200 overflow-hidden h-[300px]">
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
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 p-4 text-center">
                        {imageUrl ? 'Select a region and set as ' + title : 'Upload an image first'}
                    </div>
                )}
            </div>
        </div>
    );
};
