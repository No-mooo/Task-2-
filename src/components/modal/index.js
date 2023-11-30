import React from "react";
import "./style.css";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";

function Modal({ children, closeModal }) {
    function checkcloseModal(event) {
        if (event.target.classList.contains("Modal")) closeModal();
    }

    return (
        <>
            {createPortal(
                <div className="Modal" onClick={checkcloseModal}>
                    { children }
                </div>

            , document.body)}
        </>
    )
}

Modal.propTypes = {
    children: PropTypes.element,
    closeModal: PropTypes.func,
};

export default React.memo(Modal);