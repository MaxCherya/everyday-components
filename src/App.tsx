import React from 'react';
import { GeneralButton } from './components/btns/GeneralButton';
import './index.css'

const App: React.FC = () => {
    return (
        <div className='p-20'>
            <h1 className='mb-20'>Everyday Components Test</h1>

            <GeneralButton variant="primary" size='xl' iconLeft='😆'>Primary</GeneralButton>

            <GeneralButton customPrimaryColor='#3e3e66' variant="primary" size='sm' className='ml-5' iconRight='✏️'>
                Secondary
            </GeneralButton>
        </div>
    );
};

export default App;