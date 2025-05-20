import React, { useState } from 'react';
import { GeneralButton } from './components/btns/GeneralButton';
import './index.css'

const App: React.FC = () => {

    const [disabled, setDisabled] = useState(false)

    return (
        <div className='p-20'>
            <h1 className='mb-20'>Everyday Components Test</h1>

            <GeneralButton variant="primary" size='xl' iconLeft='😆' onClick={() => setDisabled(!disabled)}>Disable</GeneralButton>

            <GeneralButton disabled={disabled} customPrimaryColor='#02E23A' customSecondaryColor='#F10808' variant="primary" size='sm' className='ml-5' iconRight='✏️'>
                Secondary
            </GeneralButton>
        </div>
    );
};

export default App;