import * as pdfjsLib from 'pdfjs-dist';

import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const convertPdfToImage = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1); // Get the first page

    const viewport = page.getViewport({ scale: 2.0 }); // Scale up for better quality
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('Could not get canvas context');
    }

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
        canvasContext: context,
        viewport: viewport,
        canvas: canvas as any, // Cast to any to satisfy type definition if needed, or just pass the canvas
    }).promise;

    return canvas.toDataURL('image/png');
};
