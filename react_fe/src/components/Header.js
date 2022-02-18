import React from 'react'
import Button from './Button'

/***** Passing Integer  *****/
// const Header = (props) => {
//     return (
//         <header>
//             <h2>Task Watcher</h2>
//             <h2>Hello, {props.title}</h2>
//             <h2>Your age integer is {8 + props.ageInt}</h2>
//             <h2>Your age string is {8 + props.ageChar}</h2>
//         </header>
//     )
// }

/***** Passing Integer  *****/
// const Header = ({ title }) => {
//     return (
//         <header>
//             <h2 style={heading}>Task Watcher</h2>
//             <h2>Hello, {title}</h2>
//         </header>
//     )
// }

// const heading = {
//     color: 'white',
//     backgroundColor: 'lightblue',
//     textAlign: 'center'
// }

/***** Passing Integer  *****/
const Header = ({ title, onAdd, showAdd }) => {

    return (
        <header className='header'>
            <h2>Hello, {title}</h2>
            <Button
                color={showAdd ? 'red' : 'green'}
                name={showAdd ? 'Close' : 'Add'}
                onClick={onAdd}
            />
        </header>
    )
}

Header.defaultProps = {
    title: "Task Watcher"
}

export default Header;
