import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
export default function Company({ setUserData }) {
    const year = new Date().getFullYear();
    const [errorMessage, setErrorMessage] = useState('');
    const [term1, setTerm1] = useState('');
    const [suggestions1, setSuggestions1] = useState([]);

    const navigate = useNavigate();
    const handleInputChange = async (event) => {
        const inputValue = event.target.value;
        setTerm1(inputValue);
        if (inputValue.length === 0) {
            setSuggestions1([]);
            return;
        }

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/company-details?term1=${term1}`
            );
            const data = response.data;
            setSuggestions1(data);
        } catch (error) {
            console.error('Error fetching autocomplete data:', error);
        }
    };
    const submit = async () => {
        try {
            const collegevalue = term1;
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/company-details`,
                { college: collegevalue }
            );
            if (response.data.message === 'user saved') {
                setUserData([response.data.email, 2, 1]);
                navigate('/hrmain');
            } else {
                setErrorMessage('Orgnization doesnt exist in our Database');
            }
        } catch (error) {
            console.error('Error navigating:', error);
        }
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleTitleClick = () => {
        navigate('/');
    };

    const handleSuggestionClick = (suggestion1) => {
        setTerm1(suggestion1);
        setSuggestions1([]);
    };

    return (
        <div className="min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-100">
            <header className="border-b border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900">
                <div className="container-page flex h-16 items-center justify-between gap-3">
                    <div className='flex items-center gap-3'>
                        <img
                            src='../Plogo.png'
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
                            From concept to completion
                        </p>
                        <h1 className='mt-4 font-display text-3xl text-ink-900 dark:text-ink-100'>
                            Select your Company.
                        </h1>
                        <p className='mt-4 text-lg text-ink-600 dark:text-ink-300'>
                            Connecting with your company helps you find the right talent and showcase your organization.
                        </p>
                        <div className='mt-6 grid gap-3 text-sm text-ink-700 dark:text-ink-200'>
                            {[
                                'Code empowers evolution',
                                'Where Imagination meets Achievement',
                                'From Cool Concepts to Epic Realities',
                                'Innovate through scripting'
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
                            Profile Setup
                        </p>
                        <h2 className='font-display text-2xl text-ink-900 dark:text-ink-100'>Enter your Company name</h2>
                    </div>

                    {errorMessage && (
                        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={(e) => { e.preventDefault(); submit(); }} className='mt-6 grid gap-4'>
                        <label className='grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200'>
                            Company Name
                            <div className='relative'>
                                <input
                                    name='college'
                                    type='text'
                                    placeholder='Start typing your company name...'
                                    value={term1}
                                    onChange={handleInputChange}
                                    minLength='3'
                                    required
                                    className='w-full rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                                />
                                {suggestions1.length > 0 && (
                                    <ul className='absolute left-0 top-full z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-ink-200 bg-white shadow-lg dark:border-ink-700 dark:bg-ink-800'>
                                        {suggestions1.map((suggestion1, index) => (
                                            <li
                                                key={index}
                                                className='cursor-pointer px-4 py-2 text-sm text-ink-800 hover:bg-brand-50 hover:text-brand-700 dark:text-ink-100 dark:hover:bg-ink-700'
                                                onClick={() => handleSuggestionClick(suggestion1)}
                                            >
                                                {suggestion1}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </label>
                        <button type='submit' className='btn-primary w-full justify-center'>
                            Next
                        </button>
                    </form>
                    <div className='mt-6 border-t border-ink-200 pt-4 text-xs text-ink-500 dark:border-ink-700 dark:text-ink-400'>
                        By signing up you are accepting{' '}
                        <Link to='/t&c' className='font-semibold text-ink-700 dark:text-ink-200'>
                            Terms and conditions
                        </Link>.
                    </div>
                    <div className='mt-4 text-xs text-ink-400 dark:text-ink-500'>Copyright © {year}</div>
                </section>
            </main>
        </div>
    );
}
