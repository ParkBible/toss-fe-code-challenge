import { useEffect, useId, useRef, useState } from 'react';

interface ModalProps {
  closeForm: () => void;
  onSubmit: (value: string) => void;
  onExternalClick: (event: MouseEvent) => void;
}

export default function Modal({ closeForm, onSubmit }: ModalProps) {
  const [value, setValue] = useState({ name: '', email: '' });
  const modalTitleId = useId();
  const modalInputId = useId();
  const modalEmailId = useId();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(`이름: ${value.name}, 이메일: ${value.email}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      closeForm();
    }
  };

  const onExternalClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      closeForm();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
      tabIndex={-1}
      onClick={onExternalClick}
    >
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <header className="flex justify-between items-center mb-4">
          <h2
            id={modalTitleId}
            ref={titleRef}
            className="text-xl font-bold"
            tabIndex={-1}
          >
            사용자 정보 입력
          </h2>
          <button type="button" onClick={closeForm} aria-label="Close modal">
            &times;
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="h-[100px] hidden-scrollbar overflow-y-auto">
            <div className="mb-4 p-1">
              <label
                htmlFor={modalInputId}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                이름
              </label>
              <input
                id={modalInputId}
                type="text"
                name="name"
                value={value.name}
                onChange={(e) => handleChange(e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="이름을 입력하세요"
                required
              />
            </div>

            <div className="mb-4 p-1">
              <label
                htmlFor={modalEmailId}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                이메일
              </label>
              <input
                id={modalEmailId}
                type="email"
                name="email"
                value={value.email}
                onChange={(e) => handleChange(e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="이메일을 입력하세요"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeForm}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
