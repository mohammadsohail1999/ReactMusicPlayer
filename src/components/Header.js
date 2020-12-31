import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Header = ({open,setOpen}) => {
    

    
    
    return (
        <nav>
            <h1>Waves</h1>
            <button onClick={()=>setOpen(!open)}>
               Library<FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    )
}

export default Header
