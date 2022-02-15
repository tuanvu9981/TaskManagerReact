import React from 'react'

const Button = (props) => {

    return (
        <button
            className='btn'
            style={{ backgroundColor: props.color }}
            onClick={props.onClick}
        >
            {props.name}
        </button>
    )
}

export default Button;
