import React, { useState, useRef, useId, createContext, useContext } from 'react';
import './Tabs.css';

type TabsVariant = 'line' | 'pill' | 'bordered';

// ── Context ──
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabsVariant;
  tabsId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs components must be used within <Tabs>');
  return context;
};

// ── Interfaces ──
interface TabsProps {
  defaultTab?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: TabsVariant;
  className?: string;
  children: React.ReactNode;
}

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

// ── Sub-components ──

const TabList = ({ children, className }: TabListProps) => {
  const { variant } = useTabsContext();
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const tabs = listRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]:not([disabled])'
    );
    if (!tabs || tabs.length === 0) return;

    const tabArray = Array.from(tabs);
    const currentIndex = tabArray.findIndex(
      (tab) => tab === document.activeElement
    );

    let nextIndex: number | null = null;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = (currentIndex + 1) % tabArray.length;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = tabArray.length - 1;
        break;
    }

    if (nextIndex !== null) {
      tabArray[nextIndex].focus();
      tabArray[nextIndex].click();
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      className={[
        'tabs__list',
        `tabs__list--${variant}`,
        className ?? '',
      ].filter(Boolean).join(' ')}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

const Tab = ({ value, disabled = false, children, className }: TabProps) => {
  const { activeTab, setActiveTab, variant, tabsId } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      id={`${tabsId}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${tabsId}-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(value)}
      className={[
        'tabs__tab',
        `tabs__tab--${variant}`,
        isActive ? 'tabs__tab--active' : '',
        disabled ? 'tabs__tab--disabled' : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  );
};

const TabPanel = ({ value, children, className }: TabPanelProps) => {
  const { activeTab, tabsId } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`${tabsId}-panel-${value}`}
      aria-labelledby={`${tabsId}-tab-${value}`}
      tabIndex={0}
      className={[
        'tabs__panel',
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
};

// ── Main Component ──

export const Tabs = ({
  defaultTab,
  value,
  onChange,
  variant = 'line',
  className,
  children,
}: TabsProps) => {
  const tabsId = useId().replace(/:/g, '');
  const [internalTab, setInternalTab] = useState(defaultTab ?? '');

  const activeTab = value ?? internalTab;

  const setActiveTab = (val: string) => {
    setInternalTab(val);
    onChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant, tabsId }}>
      <div className={['tabs', className ?? ''].filter(Boolean).join(' ')}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

Tabs.List  = TabList;
Tabs.Tab   = Tab;
Tabs.Panel = TabPanel;