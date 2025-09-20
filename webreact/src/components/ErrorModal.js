import React from 'react';
import { useAppContext } from '../context/AppContext';

const ErrorModal = () => {
  const { state, dispatch } = useAppContext();
  const { error } = state;

  const handleClose = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  if (!error) {
    return null;
  }

  return (
    <div id="errorModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>
            <i className="fas fa-exclamation-triangle"></i>
            Error
          </h3>
          <button className="modal-close" onClick={handleClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p id="errorMessage">{error}</p>
        </div>
        <div className="modal-footer">
          <button id="errorButtonOk" className="btn btn-primary" onClick={handleClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
