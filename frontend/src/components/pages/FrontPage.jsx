import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';

const FrontPage = () => {
    const [data, setdata] = useState([]);
    const getdata = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/en/count`
        );
        setdata(response.data);
    };
    useEffect(() => {
        getdata();
    }, []);
    const navigate = useNavigate();
    useEffect(() => {
        const sections = document.querySelectorAll('[data-reveal]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle('is-visible', entry.isIntersecting);
                });
            },
            { threshold: 0.25 }
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleTitleClick = () => {
        navigate('/');
    };

    return (
        <div className='min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-100'>
            <header className='sticky top-0 z-30 border-b border-ink-200 bg-ink-50/80 backdrop-blur dark:border-ink-700 dark:bg-ink-900/80'>
                <div className='container-page flex h-16 items-center justify-between'>
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
                    <div className='flex items-center gap-3'>
                        <ThemeToggle />
                        <button
                            className='inline-flex items-center justify-center rounded-full border border-brand-200 bg-white px-5 py-2 text-sm font-semibold text-brand-700 shadow-soft-sm transition hover:border-brand-300 hover:bg-brand-50 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-200 dark:hover:bg-ink-700'
                            onClick={() => navigate('/SignIn')}
                            name='signin'
                        >
                            Sign In
                        </button>
                        <button
                            className='btn-primary'
                            onClick={() => navigate('/wru')}
                            name='signup'
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

            <main>
                <section className='relative overflow-hidden'>
                    <div className='absolute inset-0'>
                        <video
                            autoPlay
                            muted
                            loop
                            className='h-full w-full object-cover opacity-15'
                        >
                            <source src='../Frontpage.mp4' type='video/mp4' />
                            Your browser does not support the video tag.
                        </video>
                        <div className='absolute inset-0 bg-gradient-to-br from-white via-white/90 to-brand-50/60 dark:from-ink-900 dark:via-ink-900/90 dark:to-ink-800/70' />
                    </div>
                    <div className='container-page relative py-20 lg:py-28'>
                        <div className='max-w-2xl'>
                            <p className='text-xs font-semibold uppercase tracking-[0.35em] text-brand-600 dark:text-brand-200'>
                                Build. Share. Grow.
                            </p>
                            <h1 className='mt-4 font-display text-4xl font-semibold text-ink-900 dark:text-ink-100 sm:text-5xl lg:text-6xl'>
                                Join the community of creators shaping the next wave of projects.
                            </h1>
                            <p className='mt-4 text-lg text-ink-600 dark:text-ink-300'>
                                Schedio helps you launch, showcase, and collaborate on real-world work with a clean, modern workspace.
                            </p>
                            <div className='mt-8 flex flex-wrap gap-3'>
                                <button
                                    className='btn-primary'
                                    onClick={() => navigate('/wru')}
                                >
                                    Create your space
                                </button>
                                <button
                                    className='btn-ghost'
                                    onClick={() => navigate('/SignIn')}
                                >
                                    Explore dashboards
                                </button>
                            </div>
                        </div>

                        <div className='mt-12 grid gap-4 sm:grid-cols-3'>
                            {[
                                { label: 'Individuals', value: data[0] },
                                { label: 'Organizations', value: data[1] },
                                { label: 'Recruiters', value: data[2] }
                            ].map((stat) => (
                                <div key={stat.label} className='card-surface p-5'>
                                    <p className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                                        {stat.label}
                                    </p>
                                    <p className='mt-3 text-3xl font-semibold text-ink-800 dark:text-ink-100'>
                                        {stat.value ?? 0}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className='container-page py-16'>
                    <div className='grid items-center gap-10 lg:grid-cols-2'>
                        <div data-reveal className='reveal order-2 lg:order-1'>
                            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-200'>
                                Create
                            </p>
                            <h2 className='mt-4 font-display text-3xl text-ink-900 dark:text-ink-100'>
                                Turn ideas into tangible projects, faster.
                            </h2>
                            <p className='mt-4 text-lg text-ink-600 dark:text-ink-300'>
                                Start with a clean project canvas, document progress, and keep everything in one place so your work is easy to share.
                            </p>
                        </div>
                        <div data-reveal className='reveal order-1 lg:order-2'>
                            <img
                                src='https://miro.medium.com/v2/resize:fit:1100/1*YExY4y9dZvm_ZNH4QiRCgg.png'
                                alt='Coding journey'
                                className='h-full w-full rounded-xl2 object-cover shadow-soft'
                            />
                        </div>
                    </div>
                </section>

                <section className='bg-white py-16 dark:bg-ink-800'>
                    <div className='container-page grid items-center gap-10 lg:grid-cols-2'>
                        <div data-reveal className='reveal'>
                            <img
                                src='../Deploying.jpg'
                                alt='Deploy projects'
                                className='h-full w-full rounded-xl2 object-cover shadow-soft'
                            />
                        </div>
                        <div data-reveal className='reveal'>
                            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-200'>
                                Deploy
                            </p>
                            <h2 className='mt-4 font-display text-3xl text-ink-900 dark:text-ink-100'>
                                Showcase work with a polished presence.
                            </h2>
                            <p className='mt-4 text-lg text-ink-600 dark:text-ink-300'>
                                Publish your projects with clarity and confidence. Highlight outcomes, share links, and keep recruiters in the loop.
                            </p>
                        </div>
                    </div>
                </section>

                <section className='container-page py-16'>
                    <div className='grid items-center gap-10 lg:grid-cols-2'>
                        <div data-reveal className='reveal'>
                            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-200'>
                                Grow
                            </p>
                            <h2 className='mt-4 font-display text-3xl text-ink-900 dark:text-ink-100'>
                                Let teams and mentors discover your work.
                            </h2>
                            <p className='mt-4 text-lg text-ink-600 dark:text-ink-300'>
                                Make your portfolio searchable, highlight depth, and connect with the right collaborators.
                            </p>
                        </div>
                        <div data-reveal className='reveal'>
                            <img
                                src='../Project-Management.jpg'
                                alt='Project management'
                                className='h-full w-full rounded-xl2 object-cover shadow-soft'
                            />
                        </div>
                    </div>
                </section>

                <section className='bg-ink-900 py-16 text-white dark:bg-ink-950'>
                    <div className='container-page flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-brand-200'>
                                Ready to start
                            </p>
                            <h2 className='mt-4 font-display text-3xl text-white'>
                                Build your next project with Schedio today.
                            </h2>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <button
                                className='btn-primary'
                                onClick={() => navigate('/wru')}
                            >
                                Start creating
                            </button>
                            <button
                                className='inline-flex items-center justify-center rounded-full border border-brand-300 bg-transparent px-5 py-2 text-sm font-semibold text-brand-100 transition hover:border-brand-200 hover:text-white'
                                onClick={() => navigate('/SignIn')}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className='border-t border-ink-200 bg-white py-10 dark:border-ink-700 dark:bg-ink-900'>
                <div className='container-page grid gap-8 md:grid-cols-3'>
                    <div>
                        <p className='text-sm font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                            Social
                        </p>
                        <div className='mt-4 flex flex-col gap-2 text-ink-700 dark:text-ink-200'>
                            <a href='https://twitter.com/neilgogte' target='_blank' rel='noreferrer'>
                                Twitter
                            </a>
                            <a href='https://www.facebook.com/KMiT.in/' target='_blank' rel='noreferrer'>
                                Facebook
                            </a>
                            <a href='https://www.instagram.com/kmitofficial/?hl=en' target='_blank' rel='noreferrer'>
                                Instagram
                            </a>
                        </div>
                    </div>
                    <div>
                        <p className='text-sm font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                            Contact
                        </p>
                        <p className='mt-4 text-ink-700 dark:text-ink-200'>[EMAIL_ADDRESS]</p>
                    </div>
                    <div>
                        <p className='text-sm font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                            Community
                        </p>
                        <p className='mt-4 text-ink-700 dark:text-ink-200'>Trusted by teams building meaningful work.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FrontPage;
