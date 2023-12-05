import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { numberDecipher } from "../../utils";

function Item(props) {

  const callbacks = {
    action: (e) => {
      e.stopPropagation();
      props.action(props.item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <span className="Item__price">{ numberDecipher(props.item.price) } ₽</span>
      <div className='Item-actions'>
        <button onClick={callbacks.action}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  action: PropTypes.func,
};

Item.defaultProps = {
  action: () => {
  },
}

export default React.memo(Item);
