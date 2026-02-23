import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../../settings/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function SignIn({ setUserData }) {
    const year = new Date().getFullYear();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(formData);
            const response = await axiosInstance.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/signin`,
                formData
            );
            console.log('res[ponse is', response);
            if (response.data.message === 'User Not found') {
                setErrorMessage("User Doesn't exist");
            } else if (response.data.message === 'Wrong Password') {
                setErrorMessage('Wrong Password');
            } else if (response.data.checkstudent === 0) {
                setUserData([response.data.user.username, 0, 1]);
                navigate('/main');
            } else if (response.data.checkstudent === 1) {
                setUserData([response.data.user.username, 1, 1]);
                navigate('/clgmain');
            } else if (response.data.checkstudent === 2) {
                setUserData([response.data.user.username, 2, 1]);
                navigate('/hrmain');
            } else {
                console.log(response.data.user.username);
            }
        } catch (error) {
            console.log('catch working');
            console.log('Login error:', error);
            setErrorMessage('Login failed. Please check your credentials.');
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
                            From concept to completion
                        </p>
                        <h1 className='mt-4 font-display text-3xl text-ink-900 dark:text-ink-100'>
                            Welcome back. Keep shipping brilliant work.
                        </h1>
                        <p className='mt-4 text-lg text-ink-600 dark:text-ink-300'>
                            Manage projects, highlight impact, and stay connected with your community.
                        </p>
                        <div className='mt-6 grid gap-3 text-sm text-ink-700 dark:text-ink-200'>
                            {[
                                'Code empowers evolution',
                                'Where imagination meets achievement',
                                'From cool concepts to epic realities',
                                'Innovate through scripting'
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
                            Sign in
                        </p>
                        <h2 className='font-display text-2xl text-ink-900 dark:text-ink-100'>Log in to your account</h2>
                        <p className='text-sm text-ink-600 dark:text-ink-300'>Use your email and password to continue.</p>
                    </div>
                    <form onSubmit={handleSubmit} className='mt-6 grid gap-4'>
                        <label className='grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200'>
                            Email
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
                        <label className='grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200'>
                            Password
                            <input
                                className='w-full rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                                type='password'
                                name='password'
                                placeholder='Enter your password'
                                minLength={8}
                                pattern='(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}'
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                autoComplete='current-password'
                                title='should atleast conatin 1 capital 1 small 1 special char 1 number total of 8 char minimum'
                            />
                        </label>
                        <button type='submit' className='btn-primary w-full justify-center'>
                            Log in
                        </button>
                    </form>

                    {errorMessage && (
                        <div className='mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/40 dark:bg-red-500/10'>
                            {errorMessage}
                        </div>
                    )}

                    <div className='mt-6 flex flex-col gap-2 text-sm text-ink-600 dark:text-ink-300'>
                        <p>
                            New to project? <Link to='/' className='font-semibold text-brand-600 dark:text-brand-200'>Sign up</Link>
                        </p>
                        <Link to='/forgot-password' className='font-semibold text-brand-600 dark:text-brand-200'>
                            Forgot Password
                        </Link>
                    </div>

                    <div className='mt-6 border-t border-ink-200 pt-4 text-xs text-ink-500 dark:border-ink-700 dark:text-ink-400'>
                        By logging in you are accepting <Link to='/t&c' className='font-semibold text-ink-700 dark:text-ink-200'>Terms and conditions</Link>.
                    </div>
                    <div className='mt-4 text-xs text-ink-400 dark:text-ink-500'>Copyright © {year}</div>
                </section>
            </main>
        </div>
    );
}
