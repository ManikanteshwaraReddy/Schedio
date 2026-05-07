import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../portfolio/ProjectCard';
export default function HomePage({
    handleOptionClick,
    handleDomainClick,
    handleclick,
}) {
    const domains = [
        {
            label: 'Healthcare',
            value: 'Healthcare',
            image: '/domain-healthcare.svg'
        },
        {
            label: 'Artificial Intelligence',
            value: 'Artificial Intelligence and Robotics',
            image: '/domain-artificial-intelligence.svg'
        },
        {
            label: 'Web Development',
            value: 'Web development',
            image: '/domain-web-development.svg'
        },
        {
            label: 'Software Development',
            value: 'Software development',
            image: '/domain-software-development.svg'
        },
        {
            label: 'E-Commerce',
            value: 'E-Commerce and Marketplace development',
            image: '/domain-ecommerce.svg'
        },
        {
            label: 'Cyber Security',
            value: 'Cyber Security',
            image: '/domain-cyber-security.svg'
        }
    ];
    useEffect(() => {
        const getrecentprj = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/en/getrecentprj`
                );
                const data = response.data;
                console.log('Random Projects Data:', data);
                setRandomprj(data);
            } catch (error) {
                console.error('Error occurred:', error);
            }
        };

        getrecentprj();
    }, []);

    const [randomprj, setRandomprj] = useState([]);

    return (
        <div className='space-y-10'>
            <section className='space-y-4'>
                <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                        Home
                    </p>
                    <h2 className='mt-2 font-display text-2xl text-ink-900 dark:text-ink-100'>Explore popular domains</h2>
                </div>
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {domains.map((domain) => (
                        <button
                            key={domain.value}
                            type='button'
                            onClick={() => handleDomainClick(domain.value)}
                            className='group relative h-48 overflow-hidden rounded-2xl border border-ink-200 bg-white text-left shadow-soft-sm dark:border-ink-700 dark:bg-ink-800'
                        >
                            <img
                                src={domain.image}
                                alt={domain.label}
                                className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/20 to-transparent' />
                            <div className='absolute bottom-4 left-4'>
                                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-ink-200 dark:text-ink-100'>
                                    {domain.label}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
                <button
                    type='button'
                    className='btn-ghost'
                    onClick={() => handleOptionClick(2)}
                >
                    See more
                </button>
            </section>

            <section className='space-y-4'>
                <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                        Latest
                    </p>
                    <h2 className='mt-2 font-display text-2xl text-ink-900 dark:text-ink-100'>Recent projects</h2>
                </div>
                <div className='grid gap-4'>
                    {randomprj.map((suggestion, index) => (
                        <button
                            key={index}
                            type='button'
                            className='text-left'
                            onClick={() => {
                                handleclick(suggestion._id);
                            }}
                        >
                            <div className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-300'>
                                {suggestion.College} posted on{' '}
                                {new Date(suggestion.Date).toLocaleDateString()}
                            </div>
                            <ProjectCard projinfo={suggestion} index={index} />
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}
