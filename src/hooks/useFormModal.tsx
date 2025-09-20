import { useRef, useState } from 'react';

export default function useFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const resolveRef = useRef<((value: string) => void) | null>(null);

  const openFormModal = (): Promise<string> => {
    setIsOpen(true);

    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const submitForm = (value: string) => {
    if (resolveRef.current) {
      resolveRef.current(value);
      resolveRef.current = null;
    }
    setIsOpen(false);
  };

  const closeForm = () => {
    if (resolveRef.current) {
      resolveRef.current = null;
    }
    setIsOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeForm();
    } else if (event.key === 'Enter') {
      submitForm(resolveRef.current ? 'Form Submitted' : '');
    }
  };

  return {
    isOpen,
    openFormModal,
    submitForm,
    closeForm,
    handleKeyDown,
  };
}
