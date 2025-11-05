import React from 'react';

export default function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <>
      <div style={styles.backdrop} onClick={onClose} />
      <div style={styles.modalContainer}>
        <div style={styles.modal}>
          <button onClick={onClose} style={styles.closeButton}>X</button>
          <div style={styles.modalContent}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  modalContainer: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1001,
    padding: '20px',
    overflowY: 'auto',
  },
  modal: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '90%',
    width: '600px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '20px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  modalContent: {
    marginTop: '30px',
  }
};
