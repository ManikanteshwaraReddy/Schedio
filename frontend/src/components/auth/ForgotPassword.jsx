import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../../settings/axiosInstance';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import { faCircleCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function ForgotPassword() {
    const year = new Date().getFullYear();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
    });
    const { errorMessage: initialErrorMessage } = useParams();
    const [errorMessage, setErrorMessage] = useState(
        initialErrorMessage ? decodeURIComponent(initialErrorMessage) : ''
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/fpassword`,
                formData
            );
            if (response.data.message === 'User does not exist') {
                setErrorMessage('User does not exist');
            } else {
                navigate('/Check-email');
            }
        } catch (error) {
            console.error('Password reset error:', error);
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleTitleClick = () => {
        navigate('/');
    };

    return (
        <div className='min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-100'>
            <header className='border-b border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900'>
                <div className='container-page flex h-16 items-center justify-between gap-3'>
                    <div className='flex items-center gap-3'>
                        <img
                            src='../Plogo.png'
                            alt='Schedio logo'
                            className='h-9 w-9 cursor-pointer'
                            onClick={handleLogoClick}
                        />
                        <button
                            type='button'
                            className='font-display text-lg font-semibold text-ink-800 dark:text-ink-100'
                            onClick={handleTitleClick}
                        >
                            Schedio
                        </button>
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            <main className='container-page grid gap-10 py-12 lg:grid-cols-[1.05fr_1fr]'>
                <section className='card-surface relative overflow-hidden p-8'>
                    <div className='absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-white dark:from-ink-800 dark:via-ink-900 dark:to-ink-800' />
                    <div className='relative'>
                        <p className='text-xs font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-200'>
                            Restore access
                        </p>
                        <h1 className='mt-4 font-display text-3xl text-ink-900 dark:text-ink-100'>
                            Forgotten your credentials? We've got you covered.
                        </h1>
                        <p className='mt-4 text-lg text-ink-600 dark:text-ink-300'>
                            Enter your registered email below, and we'll send you instructions to reset your password.
                        </p>
                        <div className='mt-6 grid gap-3 text-sm text-ink-700 dark:text-ink-200'>
                            {[
                                'Secure recovery process',
                                'Direct link to your inbox',
                                'Quick and simple verification',
                                'Back to building in no time'
                            ].map((item) => (
                                <div key={item} className='flex items-center gap-3'>
                                    <span className='flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-600'>
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
                            Recovery
                        </p>
                        <h2 className='font-display text-2xl text-ink-900 dark:text-ink-100'>Forgot Password</h2>
                        <p className='text-sm text-ink-600 dark:text-ink-300'>Enter your registered email address.</p>
                    </div>
                    <form onSubmit={handleSubmit} className='mt-6 grid gap-4'>
                        <label className='grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200'>
                            Email address
                            <input
                                className='w-full rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                                type='email'
                                name='username'
                                placeholder='you@example.com'
                                minLength={3}
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                autoComplete='username'
                            />
                        </label>
                        <button type='submit' className='btn-primary w-full justify-center gap-2'>
                            Next <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </form>

                    {errorMessage && (
                        <div className='mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/40 dark:bg-red-500/10'>
                            {errorMessage}
                        </div>
                    )}

                    <div className='mt-6 flex flex-col gap-2 text-sm text-ink-600 dark:text-ink-300'>
                        <p>
                            Remembered your password? <Link to='/SignIn' className='font-semibold text-brand-600 dark:text-brand-200'>Log in</Link>
                        </p>
                        <p>
                            New to project? <Link to='/' className='font-semibold text-brand-600 dark:text-brand-200'>Sign up</Link>
                        </p>
                    </div>

                    <div className='mt-6 border-t border-ink-200 pt-4 text-xs text-ink-500 dark:border-ink-700 dark:text-ink-400'>
                        <Link to='/t&c' className='font-semibold text-ink-700 dark:text-ink-200'>Terms and conditions</Link>
                    </div>
                    <div className='mt-4 text-xs text-ink-400 dark:text-ink-500'>Copyright © {year}</div>
                </section>
            </main>
        </div>
    );
}
