import React, { useState } from 'react';
import { GeneralButton, ToggleButton } from './components';
import './index.css'

const App: React.FC = () => {

    const [disabled, setDisabled] = useState(false)

    return (
        <div className='p-20'>
            <h1 className='mb-20'>Everyday Components Test</h1>

            <GeneralButton variant="primary" size='xl' throttleMs={1000} className='rounded-full' onClick={() => setDisabled(!disabled)}>Disable</GeneralButton>

            <GeneralButton disabled={disabled} noOutlines customPrimaryColor='#02E23A' customSecondaryColor='#F10808' variant="primary" size='sm' className='ml-5' iconRight='✏️'>
                Result
            </GeneralButton>

            <ToggleButton offLabel='Turn Off' isToggled={disabled} size='base'>Turn On</ToggleButton>
        </div>
    );
};

export default App;