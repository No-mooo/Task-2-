import React, { useState } from "react";
import "./style.css";
import {plural} from "../../utils";
import PropTypes from 'prop-types';
import Controls from "../controls";

import Modal from '../modal';
import ModalBasket from '../modal-basket';

function statusBasket({ basket, delBasketItem }) {
    const totalSum = basket.reduce((sum, next) => sum + next.price * next.countInBasket, 0);

    function getCurrentStatusBasket() {
        if (basket.length == 0) return "пусто";

        const usePlural = plural(basket.length, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
        });

        return `${basket.length} ${usePlural} / ${totalSum} ₽`;
    }

    function closeModal() {
        setShowModal(false);
    }

    function openModal() {
        setShowModal(true);
    }

    const [showModal, setShowModal] = useState(false);

    return (
        <div className="StatusBasket"> 
            В корзине:<span>{getCurrentStatusBasket()}</span><Controls action={openModal} />

            {showModal && 
                <Modal closeModal={closeModal}>
                    <ModalBasket
                        closeModal={closeModal}
                        delBasketItem={delBasketItem}
                        totalSumBasket={ totalSum }
                        basket={ basket }
                    />
                </Modal>
            }
        </div>
    )
}

statusBasket.propTypes = {
    basket: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number
    })).isRequired,
    delBasketItem: PropTypes.func,
};
  
statusBasket.defaultProps = {
    delBasketItem: () => {
    },
}

export default React.memo(statusBasket);