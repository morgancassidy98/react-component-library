import { useToastContext } from './ToastContext';
import type { ToastVariant } from './ToastContext';

type ToastOptions = {
  title?: string;
  duration?: number;
  dismissible?: boolean;
};

export const useToast = () => {
  const { addToast, removeToast } = useToastContext();

  const show = (
    variant: ToastVariant,
    message: string,
    options: ToastOptions = {}
  ) => {
    return addToast({
      variant,
      message,
      duration: 4000,
      dismissible: true,
      ...options,
    });
  };

  return {
    toast: {
      success: (message: string, options?: ToastOptions) =>
        show('success', message, options),
      info: (message: string, options?: ToastOptions) =>
        show('info', message, options),
      warning: (message: string, options?: ToastOptions) =>
        show('warning', message, options),
      danger: (message: string, options?: ToastOptions) =>
        show('danger', message, options),
    },
    removeToast,
  };
};