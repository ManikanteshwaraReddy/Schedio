import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function StudentLogin({ setUserData }) {
    const year = new Date().getFullYear();
    const [term, setTerm] = useState('Employed');
    const [error, seterror] = useState();
    const navigate = useNavigate();

    const submit = async (event) => {
        event.preventDefault();
        try {
            const departmentvalue = term;
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/departments`,
                { department: departmentvalue }
            );
            if (response.data.message === 'user saved') {
                setUserData([response.data.email, 0, 0, departmentvalue]);
                navigate('/college-details');
            } else {
                seterror('Invalid status');
            }
        } catch (error) {
            console.error('Error navigating:', error);
        }
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
                            Choose your path and build with confidence.
                        </h1>
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
                        <h2 className='font-display text-2xl text-ink-900 dark:text-ink-100'>Choose your Employment status</h2>
                    </div>

                    {error && (
                        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    <form onSubmit={submit} className='mt-6 grid gap-4'>
                        <label className='grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200'>
                            Status
                            <select
                                name='options'
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                className='w-full rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                                required
                            >
                                <option value='Employed'>Employed</option>
                                <option value='Unemployed'>Unemployed</option>
                            </select>
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
