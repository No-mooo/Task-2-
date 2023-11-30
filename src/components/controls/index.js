import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({ action }) {
  return (
    <div className='Controls' onClick={action}>
      <button>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  action: PropTypes.func,
};

Controls.defaultProps = {
  action: () => {
  },
}

export default React.memo(Controls);
