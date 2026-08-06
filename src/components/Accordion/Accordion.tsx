import React, { createContext, useContext, useState, useId } from 'react';
import './Accordion.css';

// ── Context ──
interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  mode: 'single' | 'multiple';
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  disabled: boolean;
  triggerId: string;
  panelId: string;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('Accordion components must be used within <Accordion>');
  return context;
};

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) throw new Error('Accordion.Trigger and Accordion.Panel must be used within <Accordion.Item>');
  return context;
};

// ── Interfaces ──
interface AccordionProps {
  mode?: 'single' | 'multiple';
  defaultOpen?: string | string[];
  className?: string;
  children: React.ReactNode;
}

interface AccordionItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface AccordionTriggerProps {
  className?: string;
  children: React.ReactNode;
}

interface AccordionPanelProps {
  className?: string;
  children: React.ReactNode;
}

// ── Sub-components ──

const AccordionItem = ({
  value,
  disabled = false,
  className,
  children,
}: AccordionItemProps) => {
  const { openItems } = useAccordionContext();
  const id = useId().replace(/:/g, '');
  const triggerId = `accordion-trigger-${id}`;
  const panelId = `accordion-panel-${id}`;
  const isOpen = openItems.includes(value);

  return (
    <AccordionItemContext.Provider
      value={{ value, isOpen, disabled, triggerId, panelId }}
    >
      <div
        className={[
          'accordion__item',
          isOpen ? 'accordion__item--open' : '',
          disabled ? 'accordion__item--disabled' : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

const AccordionTrigger = ({ className, children }: AccordionTriggerProps) => {
  const { toggleItem } = useAccordionContext();
  const { value, isOpen, disabled, triggerId, panelId } = useAccordionItemContext();

  return (
    <h3 className="accordion__heading">
      <button
        id={triggerId}
        className={[
          'accordion__trigger',
          isOpen ? 'accordion__trigger--open' : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={disabled}
        onClick={() => toggleItem(value)}
      >
        <span className="accordion__trigger-label">{children}</span>
        <span className="accordion__icon" aria-hidden="true">
          &#8964;
        </span>
      </button>
    </h3>
  );
};

const AccordionPanel = ({ className, children }: AccordionPanelProps) => {
  const { isOpen, triggerId, panelId } = useAccordionItemContext();

  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      className={[
        'accordion__panel',
        isOpen ? 'accordion__panel--open' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="accordion__panel-inner">
        {children}
      </div>
    </div>
  );
};

// ── Main Component ──

export const Accordion = ({
  mode = 'single',
  defaultOpen = [],
  className,
  children,
}: AccordionProps) => {
  const initialOpen = Array.isArray(defaultOpen)
    ? defaultOpen
    : [defaultOpen];

  const [openItems, setOpenItems] = useState<string[]>(initialOpen);

  const toggleItem = (value: string) => {
    if (mode === 'single') {
      setOpenItems((prev) =>
        prev.includes(value) ? [] : [value]
      );
    } else {
      setOpenItems((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, mode }}>
      <div
        className={[
          'accordion',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.Item    = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Panel   = AccordionPanel;