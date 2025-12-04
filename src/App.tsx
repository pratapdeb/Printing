import { useState } from 'react';
import { UploadPanel } from './components/UploadPanel';
import { ImageSelector } from './components/ImageSelector';
import { PreviewPanel } from './components/PreviewPanel';


interface Selection {
  x: number;
  y: number;
  width: number;
  height: number;
}

function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [frontSelection, setFrontSelection] = useState<Selection | null>(null);
  const [backSelection, setBackSelection] = useState<Selection | null>(null);

  const handleImageSelect = (url: string) => {
    setImageUrl(url);
    setFrontSelection(null);
    setBackSelection(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 no-print">
        <h1 className="text-xl font-bold text-gray-800">React Document Crop-to-A4 Layout Assistant</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden no-print">
        {/* Left Side: Upload & Selection */}
        <div className="w-1/2 flex flex-col border-r border-gray-200 bg-white overflow-y-auto">
          <UploadPanel onImageSelect={handleImageSelect} />
          <div className="p-4 flex-1">
            <h2 className="text-lg font-semibold mb-4">2. Select Regions</h2>
            <ImageSelector
              imageUrl={imageUrl}
              onSetFront={setFrontSelection}
              onSetBack={setBackSelection}
            />
          </div>
        </div>

        {/* Right Side: Previews */}
        <div className="w-1/2 bg-gray-50">
          <PreviewPanel
            imageUrl={imageUrl}
            frontSelection={frontSelection}
            backSelection={backSelection}
            onPrint={handlePrint}
          />
        </div>
      </main>

      {/* Print Layout - Visible only when printing */}
      {/* Print Layout - Visible only when printing */}
      <div className="print-only hidden">
        <div className="w-full h-screen flex flex-row items-start justify-center gap-8 pt-12">
          {/* Front Card */}
          <div style={{ width: '8.5cm', height: '5.5cm' }} className="relative border border-gray-300 overflow-hidden">
            {imageUrl && frontSelection && (
              <img
                src={imageUrl}
                alt="Front"
                className="absolute origin-top-left max-w-none"
                style={{
                  left: `-${(frontSelection.x * 100) / frontSelection.width}%`,
                  top: `-${(frontSelection.y * 100) / frontSelection.height}%`,
                  width: `${100 / frontSelection.width}%`,
                  height: `${100 / frontSelection.height}%`,
                }}
              />
            )}
          </div>

          {/* Back Card */}
          <div style={{ width: '8.5cm', height: '5.5cm' }} className="relative border border-gray-300 overflow-hidden">
            {imageUrl && backSelection && (
              <img
                src={imageUrl}
                alt="Back"
                className="absolute origin-top-left max-w-none"
                style={{
                  left: `-${(backSelection.x * 100) / backSelection.width}%`,
                  top: `-${(backSelection.y * 100) / backSelection.height}%`,
                  width: `${100 / backSelection.width}%`,
                  height: `${100 / backSelection.height}%`,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
