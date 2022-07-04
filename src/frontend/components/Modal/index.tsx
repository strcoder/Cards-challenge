import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

type ModalProps = {
  show: boolean,
  onClose: Function,
  theme?: 'light' | 'dark',
  children: React.ReactElement,
  className?: string;
}

const Modal = ({
  show,
  onClose,
  children,
  className = '',
  theme = 'light',
}: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <section className={`Modal ${className}`}>
      <button
        type='button'
        onClick={handleCloseClick}
        className={`Modal__close ${theme}`}
      >
        Close
      </button>
      <div className={`ModalWrap ${theme}`}>
        <main className='ModalWrap__main'>
          {children}
        </main>
      </div>
    </section>
  ) : null;

  if (isBrowser && !document.getElementById('modal')) {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
    const el = document.createElement('div');
    modalRoot.appendChild(el);

    return ReactDOM.createPortal(
      modalContent,
      el,
    );
  }

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal'),
    );
  }
  return null;
};

export default Modal;
