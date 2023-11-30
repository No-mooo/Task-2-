import React from "react";
import PropTypes, { number } from "prop-types";
import './style.css';

function Item(props) {
  const callbacks = {
    action: (e) => {
      e.stopPropagation();
      props.action(props.item.code);
    }
  }

  return (
    <div className='ItemBasket'>
      <div className='ItemBasket-code'>{props.item.code}</div>
      <div className='ItemBasket-title'>
        {props.item.title}
      </div>
      <span className="ItemBasket__price">
        {props.item.price} ₽
      </span>
      <span className="ItemBasket__count">
        { props.item.countInBasket } шт
      </span>
      <div className='ItemBasket-actions'>
        <button onClick={callbacks.action}>
          Удалить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    countInBasket: PropTypes.number,
  }).isRequired,
  action: PropTypes.func,
};

Item.defaultProps = {
  action: () => {
  },
}

export default React.memo(Item);
