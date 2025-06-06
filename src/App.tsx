import React, { useState } from 'react';
import { GeneralButton, ToggleButton, PasswordInput, TextInput, EmailInput } from './components';
import './index.css'

const App: React.FC = () => {

    const [disabled, setDisabled] = useState(false);
    const [testText, setTestText] = useState('');
    const [testError, setTestError] = useState('');

    const [pass, setPass] = useState('');
    const [passEr, setPassEr] = useState('');

    const [emailErr, setEmailErr] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div className='p-20'>
            <h1 className='mb-20 text-3xl font-extrabold'>Everyday Components Test</h1>

            <div className='flex flex-row gap-4'>
                <GeneralButton variant="primary" size='xl' debounceMs={150} className='rounded-full' onClick={() => setDisabled(!disabled)}>Disable</GeneralButton>

                <GeneralButton disabled={disabled} noOutlines customPrimaryColor='#02E23A' variant="primary" size='sm' className='ml-5' iconRight='✏️'>
                    Result
                </GeneralButton>

                <ToggleButton className='ml-20 rounded-2xl' customPrimaryColor='#02E23A' noOutlines onClick={() => setDisabled(!disabled)} iconLeft='🥔' iconLeftAfter='🍟' throttleMs={3000} offLabel='Turn Off' isToggled={disabled} size='base'>Turn On</ToggleButton>
            </div>

            <div className='flex flex-row gap-4 mt-20 w-full'>
                <TextInput debounceMs={300} fullWidth onChange={(e) => setTestText(e.target.value)} errorPosition='bottom' regex={/^\d+$/} setError={setTestError} error={testError} placeholder='Test' label='Okay' required size='lg' iconLeft={<span>🔍</span>} iconRight='✏️' hint='Testing hint should be here' onFocus={() => console.log('focused')} onUnfocus={() => console.log('unfocussed')} variant='outlined' />
                <p>{testText}</p>
            </div>

            <div className='flex flex-row gap-4 mt-20 w-full'>
                <PasswordInput displayStrengthLabel={false} debounceMs={300} onChange={(e) => setPass(e.target.value)} error={passEr} setError={setPassEr} fullWidth errorPosition='bottom' placeholder='Password' label='Your pass' required size='lg' hint='Enter your pass' variant='lowBorder' />
                <p>Your pass: {pass}</p>
            </div>

            <div className='flex flex-row gap-4 mt-20 w-full'>
                <EmailInput debounceMs={300} onChange={(e) => setEmail(e.target.value)} error={emailErr} allowedDomains={['hi.org']} setError={setEmailErr} fullWidth errorPosition='bottom' placeholder='Email' label='Your email' required size='lg' hint='Enter your email' variant='sideBorders' />
                <p>Your email: {email}</p>
            </div>

        </div>
    );
};

export default App;