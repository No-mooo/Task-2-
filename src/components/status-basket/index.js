import React from "react";
import "./style.css";
import {numberDecipher, plural} from "../../utils";
import PropTypes from 'prop-types';
import Controls from "../controls";

function statusBasket({ basket, openModal, totalSum }) {
    function getCurrentStatusBasket() {
        if (basket.length == 0) return "пусто";

        const usePlural = plural(basket.length, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
        });

        return `${basket.length} ${usePlural} / ${numberDecipher(totalSum)} ₽`;
    }

    return (
        <div className="StatusBasket"> 
            В корзине:<span>{getCurrentStatusBasket()}</span><Controls action={openModal} />
        </div>
    )
}

statusBasket.propTypes = {
    basket: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number
    })).isRequired,
    openModal: PropTypes.func,
    totalSum: PropTypes.number
};
  
statusBasket.defaultProps = {
    openModal: () => {
    },
}

export default React.memo(statusBasket);