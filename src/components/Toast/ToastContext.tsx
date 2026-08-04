import { createContext, useContext, useState, useCallback } from 'react';

export type ToastVariant = 'success' | 'info' | 'warning' | 'danger';

export type Toast = {
    id: string;
    variant: ToastVariant;
    message: string;
    title?: string;
    duration?: number;
    dismissible?: boolean;
};

type ToastContextValue = {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => string;
    removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    
    const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
        const id = 'toast-${Date.now()}-${Math.random().toString(36).slice(2)}';
        setToasts((prev) => [...prev, { ...toast, id }]);
        return id;
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
};