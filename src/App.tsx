import { useState } from 'react';
import { CardTab } from './components/tabs/CardTab';
import { PassportPhotoTab } from './components/tabs/PassportPhotoTab';

type TabType = 'passport' | 'card';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('card');

  const tabs = [
    { id: 'passport' as TabType, label: 'Photo' },
    { id: 'card' as TabType, label: 'Card' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm no-print">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Document Crop-to-A4 Layout Assistant</h1>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-4" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Tab Content */}
      {activeTab === 'passport' && <PassportPhotoTab />}
      {activeTab === 'card' && <CardTab />}
    </div>
  );
}

export default App;
