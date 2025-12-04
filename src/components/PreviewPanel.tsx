import React from 'react';
import { A4Preview } from './A4Preview';

interface Selection {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface PreviewPanelProps {
    imageUrl: string | null;
    frontSelection: Selection | null;
    backSelection: Selection | null;
    onPrint: () => void;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
    imageUrl,
    frontSelection,
    backSelection,
    onPrint,
}) => {
    return (
        <div className="flex flex-col gap-6 h-full overflow-y-auto p-4 bg-gray-50">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Previews</h2>
                <button
                    onClick={onPrint}
                    className="bg-purple-600 text-white py-2 px-6 rounded shadow hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8 max-w-md mx-auto w-full">
                <A4Preview
                    title="Front Preview"
                    imageUrl={imageUrl}
                    selection={frontSelection}
                />
                <A4Preview
                    title="Back Preview"
                    imageUrl={imageUrl}
                    selection={backSelection}
                />
            </div>
        </div>
    );
};
