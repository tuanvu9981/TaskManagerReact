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
const Header = ({ title }) => {

    const onClick = () => {
        console.log('Click')
    }

    return (
        <header className='header'>
            <h2>From Task Watcher : Hello, {title}</h2>
            <Button color='green' name='Add' onClick={onClick} />
        </header>
    )
}

Header.defaultProps = {
    title: "Task Watcher"
}

export default Header;
