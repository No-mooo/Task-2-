import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, actionItem, Item}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} action={actionItem} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  Item: PropTypes.elementType,
  actionItem: PropTypes.func,
};

List.defaultProps = {
  actionItem: () => {
  },
}

export default React.memo(List);
