import React, { useState, useRef, useEffect } from 'react';

interface Selection {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface SinglePhotoSelectorProps {
    imageUrl: string | null;
    onSetSelection: (selection: Selection) => void;
}

export const SinglePhotoSelector: React.FC<SinglePhotoSelectorProps> = ({ imageUrl, onSetSelection }) => {
    const [selection, setSelection] = useState<Selection | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const getNormalizedCoordinates = (e: React.MouseEvent) => {
        if (!imageRef.current || !containerRef.current) return null;

        const rect = imageRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        return {
            x: Math.max(0, Math.min(1, x)),
            y: Math.max(0, Math.min(1, y))
        };
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!imageUrl) return;
        e.preventDefault();
        const coords = getNormalizedCoordinates(e);
        if (coords) {
            setStartPos(coords);
            setIsDragging(true);
            setSelection({ x: coords.x, y: coords.y, width: 0, height: 0 });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !imageUrl) return;

        const coords = getNormalizedCoordinates(e);
        if (coords) {
            const width = Math.abs(coords.x - startPos.x);
            const height = Math.abs(coords.y - startPos.y);
            const x = Math.min(coords.x, startPos.x);
            const y = Math.min(coords.y, startPos.y);

            setSelection({ x, y, width, height });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isDragging) setIsDragging(false);
        };
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }, [isDragging]);

    if (!imageUrl) {
        return (
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500">Upload an image to start</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="relative select-none" ref={containerRef}>
                <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Upload"
                    className="max-w-full h-auto border border-gray-300"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    draggable={false}
                />
                {selection && (
                    <div
                        className="absolute border-2 border-blue-500 bg-blue-200 bg-opacity-30 pointer-events-none"
                        style={{
                            left: `${selection.x * 100}%`,
                            top: `${selection.y * 100}%`,
                            width: `${selection.width * 100}%`,
                            height: `${selection.height * 100}%`,
                        }}
                    />
                )}
            </div>

            <button
                onClick={() => selection && onSetSelection(selection)}
                disabled={!selection || selection.width === 0}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Set Photo Selection
            </button>
        </div>
    );
};
