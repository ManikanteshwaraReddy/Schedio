import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function NewUser({ setUserData }) {
    const navigate = useNavigate();
    const params = useParams();
    const token = params.token;
    const [errorMessage, setErrorMessage] = useState('');
    const [error, seterror] = useState('');
    const [email, setemail] = useState('');
    useEffect(() => {
        const validateToken = async () => {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/validate-token/${token}`
            );
            if (response.data.message === 'Invalid token') {
                setErrorMessage(encodeURIComponent('Invalid Token'));
            } else if (response.data.message === 'Token expired') {
                setErrorMessage(encodeURIComponent('Token Expired'));
            } else {
                setemail(response.data.email);
            }
        };
        validateToken();
    }, [token]);
    useEffect(() => {
        if (errorMessage) {
            navigate(`/signup/${errorMessage}`);
        }
    }, [errorMessage, navigate]);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        cpassword: '',
    });
    useEffect(() => {
        setFormData((formData) => ({ ...formData, mail: email }));
    }, [email]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('i am here');
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/en/newuser`,
            formData
        );
        if (response.data.message === 'Mail already registered') {
            setErrorMessage('Mail already registered');
        } else if (response.data.message === 'Passwords are not same') {
            seterror('Passwords are not same');
        } else if (response.data.message === 'Username Taken') {
            seterror('Username Taken');
        } else {
            setUserData([response.data.email, 0, 0]);
            navigate('/department');
        }
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-100">
            <header className="border-b border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900">
                <div className="container-page flex h-16 items-center justify-between gap-3">
                    <div className='flex items-center gap-3'>
                        <img
                            src='../../Plogo.png'
                            alt='Schedio logo'
                            className='h-9 w-9 cursor-pointer'
                            onClick={() => navigate('/')}
                        />
                        <button
                            type='button'
                            className='font-display text-lg font-semibold text-ink-800 dark:text-ink-100'
                            onClick={() => navigate('/')}
                        >
                            Schedio
                        </button>
                    </div>
                </div>
            </header>

            <main className='container-page grid gap-10 py-12 lg:grid-cols-[1.05fr_1fr]'>
                <section className='card-surface relative overflow-hidden p-8'>
                    <div className='absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-white dark:from-ink-800 dark:via-ink-900 dark:to-ink-800' />
                    <div className='relative'>
                        <p className='text-xs font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-200'>
                            Set Password
                        </p>
                        <h1 className='mt-4 font-display text-3xl text-ink-900 dark:text-ink-100'>
                            Secure your account.
                        </h1>
                        <p className='mt-4 text-lg text-ink-600 dark:text-ink-300'>
                            Create a strong password to protect your projects, data, and interactions on the Schedio platform.
                        </p>
                        <div className='mt-6 grid gap-3 text-sm text-ink-700 dark:text-ink-200'>
                            {[
                                'Must be at least 8 characters long',
                                'Include at least one uppercase letter',
                                'Include at least one lowercase letter',
                                'Include at least one number and special character'
                            ].map((item) => (
                                <div key={item} className='flex items-center gap-3'>
                                    <span className='flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400'>
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                    </span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className='card-surface p-8'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                            Final Step
                        </p>
                        <h2 className='font-display text-2xl text-ink-900 dark:text-ink-100'>Create your account</h2>
                    </div>
                    
                    {(errorMessage || error) && (
                        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                            {errorMessage || error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='mt-6 grid gap-4'>
                        <label className='grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200'>
                            Username
                            <input
                                type='text'
                                name='username'
                                placeholder='Choose a username'
                                value={formData.username}
                                onChange={handleInputChange}
                                minLength={3}
                                required
                                autoComplete='name'
                                className='w-full rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                            />
                        </label>
                        <label className='grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200'>
                            Password
                            <input
                                type='password'
                                name='password'
                                placeholder='Create a strong password'
                                pattern='(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}'
                                value={formData.password}
                                onChange={handleInputChange}
                                minLength={8}
                                required
                                autoComplete='new-password'
                                title='Should contain at least 1 capital, 1 small, 1 special char, 1 number, and a total of 8 chars minimum'
                                className='w-full rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                            />
                        </label>
                        <label className='grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200'>
                            Confirm Password
                            <input
                                type='password'
                                name='cpassword'
                                placeholder='Confirm your password'
                                pattern='(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}'
                                value={formData.cpassword}
                                onChange={handleInputChange}
                                minLength={8}
                                required
                                autoComplete='new-password'
                                className='w-full rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                            />
                        </label>
                        <button type='submit' className='btn-primary w-full justify-center'>
                            Continue
                        </button>
                    </form>
                    <div className='mt-6 border-t border-ink-200 pt-4 text-xs text-ink-500 dark:border-ink-700 dark:text-ink-400'>
                        By creating an account, you are accepting our{' '}
                        <Link to='/t&c' className='font-semibold text-ink-700 dark:text-ink-200'>
                            Terms and conditions
                        </Link>.
                    </div>
                </section>
            </main>
        </div>
    );
}
