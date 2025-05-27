import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { GeneralButton, ToggleButton, PasswordInput, TextInput, EmailInput } from './components';
import './index.css';
const App = () => {
    const [disabled, setDisabled] = useState(false);
    const [testText, setTestText] = useState('');
    const [testError, setTestError] = useState('');
    const [pass, setPass] = useState('');
    const [passEr, setPassEr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [email, setEmail] = useState('');
    return (_jsxs("div", { className: 'p-20', children: [_jsx("h1", { className: 'mb-20 text-3xl font-extrabold', children: "Everyday Components Test" }), _jsxs("div", { className: 'flex flex-row gap-4', children: [_jsx(GeneralButton, { variant: "primary", size: 'xl', debounceMs: 150, className: 'rounded-full', onClick: () => setDisabled(!disabled), children: "Disable" }), _jsx(GeneralButton, { disabled: disabled, noOutlines: true, customPrimaryColor: '#02E23A', variant: "primary", size: 'sm', className: 'ml-5', iconRight: '\u270F\uFE0F', children: "Result" }), _jsx(ToggleButton, { className: 'ml-20 rounded-2xl', customPrimaryColor: '#02E23A', noOutlines: true, onClick: () => setDisabled(!disabled), iconLeft: '\uD83E\uDD54', iconLeftAfter: '\uD83C\uDF5F', throttleMs: 3000, offLabel: 'Turn Off', isToggled: disabled, size: 'base', children: "Turn On" })] }), _jsxs("div", { className: 'flex flex-row gap-4 mt-20 w-full', children: [_jsx(TextInput, { debounceMs: 300, fullWidth: true, onChange: (e) => setTestText(e.target.value), errorPosition: 'bottom', regex: /^\d+$/, setError: setTestError, error: testError, placeholder: 'Test', label: 'Okay', required: true, size: 'lg', iconLeft: _jsx("span", { children: "\uD83D\uDD0D" }), iconRight: '\u270F\uFE0F', hint: 'Testing hint should be here', onFocus: () => console.log('focused'), onUnfocus: () => console.log('unfocussed'), variant: 'outlined' }), _jsx("p", { children: testText })] }), _jsxs("div", { className: 'flex flex-row gap-4 mt-20 w-full', children: [_jsx(PasswordInput, { displayStrengthLabel: false, debounceMs: 300, onChange: (e) => setPass(e.target.value), error: passEr, setError: setPassEr, fullWidth: true, errorPosition: 'bottom', placeholder: 'Password', label: 'Your pass', required: true, size: 'lg', hint: 'Enter your pass', variant: 'lowBorder' }), _jsxs("p", { children: ["Your pass: ", pass] })] }), _jsxs("div", { className: 'flex flex-row gap-4 mt-20 w-full', children: [_jsx(EmailInput, { debounceMs: 300, onChange: (e) => setEmail(e.target.value), error: emailErr, allowedDomains: ['hi.org'], setError: setEmailErr, fullWidth: true, errorPosition: 'bottom', placeholder: 'Email', label: 'Your email', required: true, size: 'lg', hint: 'Enter your email', variant: 'sideBorders' }), _jsxs("p", { children: ["Your email: ", email] })] })] }));
};
export default App;
