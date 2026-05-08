import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function CheckEmail() {
    const params = useParams();
    const token = params.mailid;
    const navigate = useNavigate();
    
    return (
        <div className="flex min-h-screen flex-col bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-100">
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

            <main className="container-page flex flex-1 items-center justify-center py-12">
                <section className="card-surface max-w-md p-10 text-center reveal is-visible">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                        <i className="fa-regular fa-envelope text-3xl"></i>
                    </div>
                    <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-ink-100">Check Your Email</h1>
                    <p className="mt-4 text-ink-600 dark:text-ink-300">
                        We've sent an email to <span className="font-semibold text-brand-600 dark:text-brand-400">{token}</span> with a link to set your password. Please check your inbox and follow the instructions in the email.
                    </p>
                </section>
            </main>
        </div>
    );
}

export default CheckEmail;