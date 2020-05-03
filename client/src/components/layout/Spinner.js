import React, { Fragment } from 'react';
import spiner from './spinner.gif';

const Spinner = ()=>{
    return (
        <Fragment>
            <img src={spiner} alt="Loadingg" style={{ width : '200px', display : 'block', margin : 'auto' }} />
        </Fragment>
    )
}

export default Spinner;