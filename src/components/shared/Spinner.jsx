import React from 'react';
import spinner from '../assets/pink-spinner.gif';

function Spinner() {
    return (
        <img src={spinner} alt='Loading...' style={
        {width: '50px', margin: 'auto', display: 'block'}}/>                                   
    )
}

export default Spinner
