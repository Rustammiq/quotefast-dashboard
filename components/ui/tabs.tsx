import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, className = '' }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  return (
    <div className={`tabs ${className}`}>
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTabId === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs.find((tab) => tab.id === activeTabId)?.content}
      </div>
    </div>
  );
};

export const TabsList = () => {
  return <div className="tabs-list">List Placeholder</div>;
};

export const TabsTrigger = () => {
  return <div className="tabs-trigger">Trigger Placeholder</div>;
};

export const TabsContent = () => {
  return <div className="tabs-content">Content Placeholder</div>;
};
