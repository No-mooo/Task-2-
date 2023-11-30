import React from "react";
import "./style.css";
import List from "../list";
import itemBasket from "../item-basket";
import PropTypes from 'prop-types';


function ModalBasket({ basket, totalSumBasket, delBasketItem, closeModal }) {
    return (
        <div className="modal-basket">

            <div className="modal-basket__head">
                <span>Корзина</span> <button onClick={closeModal}>Закрыть</button>
            </div>
            <List 
                Item={itemBasket}
                list={basket}
                actionItem={delBasketItem}
            />
            <div className="modal-basket__total">
                Итого <span>{ totalSumBasket } ₽</span>
            </div>
         
        </div>
    )
}

ModalBasket.propTypes = {
    basket: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number
    })).isRequired,
    totalSumBasket: PropTypes.number,
    delBasketItem: PropTypes.func,
    closeModal: PropTypes.func,
};

ModalBasket.defaultProps = {
    delBasketItem: () => {
    },
    closeModal: () => {
    }
}

export default React.memo(ModalBasket);