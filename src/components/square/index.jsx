import React from 'react';
import PropTypes from 'prop-types';

const Square = props => {
    const { onClick, value } = props;
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}

Square.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

Square.defaultProps = {
};

export default Square;
