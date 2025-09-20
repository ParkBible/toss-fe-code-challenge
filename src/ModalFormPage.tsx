import { useEffect, useRef } from 'react';
import Modal from './components/modal/Modal';
import useFormModal from './hooks/useFormModal';

const ModalFormPage = () => {
  const { isOpen, openFormModal, closeForm, handleKeyDown, submitForm } =
    useFormModal();
  const modalButtonRef = useRef<HTMLButtonElement>(null);

  const openForm = async () => {
    try {
      const result = await openFormModal();
      alert(`폼 제출됨: ${result}`);
    } catch (error) {
      console.log('폼이 닫혔습니다.');
    }
  };

  const onTest = () => {
    setTimeout(() => {
      openForm();
    }, 1000);
  };

  useEffect(() => {
    if (!isOpen) {
      modalButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className="flex items-center">
      <div className="flex flex-col gap-4 h-[2000px] justify-between">
        <button
          ref={modalButtonRef}
          type="button"
          className="bg-blue-500 text-white p-2 rounded"
          onClick={openFormModal}
          aria-label="Open modal"
        >
          모달 열기
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded"
          onClick={onTest}
          aria-label="Fuctional Test modal"
        >
          함수 선언적 모달 테스트
        </button>
      </div>
      {isOpen && (
        <Modal
          closeForm={closeForm}
          handleKeyDown={handleKeyDown}
          onSubmit={submitForm}
        />
      )}
    </div>
  );
};

export default ModalFormPage;
