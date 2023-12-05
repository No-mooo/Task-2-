import React from "react";
import "./style.css";
import PropTypes from 'prop-types';

function Modal({ children, closeModal }) {
    function checkcloseModal(event) {
        if (event.target.classList.contains("Modal")) closeModal();
    }

    return (
        <div className="Modal" onClick={checkcloseModal}>
            { children }
        </div>
    )
}

Modal.propTypes = {
    children: PropTypes.element,
    closeModal: PropTypes.func,
};

export default React.memo(Modal);