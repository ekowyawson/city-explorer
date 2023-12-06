import React from 'react';
// import { If, Then, Else, When } from 'react-if';

// EXPORTS
function Errors(props) {

    return (
        <>
            <p className='error'>
                {props.error}
                &nbsp; &nbsp;<button onClick={props.clrErr}>Close</button>
            </p>
        </>
    )
}

export default Errors;