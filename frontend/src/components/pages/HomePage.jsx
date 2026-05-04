import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../portfolio/ProjectCard';
export default function HomePage({
    handleOptionClick,
    handleDomainClick,
    handleclick,
}) {
    const [randomprj, setRandomprj] = useState([]);
    const [dynamicDomains, setDynamicDomains] = useState([]);

    useEffect(() => {
        const fetchDomains = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/en/getalldomains`
                );
                // Limit to 6 domains max to keep the 3x2 grid layout clean
                setDynamicDomains(response.data.slice(0, 6));
            } catch (error) {
                console.error('Error fetching domains:', error);
            }
        };
        fetchDomains();
    }, []);
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

    const getDomainImage = (domain) => {
        const lowerDomain = domain.toLowerCase();
        if (lowerDomain.includes('health')) return '/domain-healthcare.svg';
        if (lowerDomain.includes('intelligence') || lowerDomain.includes('ai') || lowerDomain.includes('robot')) return '/domain-artificial-intelligence.svg';
        if (lowerDomain.includes('web')) return '/domain-web-development.svg';
        if (lowerDomain.includes('commerce') || lowerDomain.includes('market')) return '/domain-ecommerce.svg';
        if (lowerDomain.includes('security') || lowerDomain.includes('cyber')) return '/domain-cyber-security.svg';
        return '/domain-software-development.svg';
    };

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
                    {dynamicDomains.map((domainStr) => (
                        <button
                            key={domainStr}
                            type='button'
                            onClick={() => handleDomainClick(domainStr)}
                            className='group relative h-48 overflow-hidden rounded-2xl border border-ink-200 bg-white text-left shadow-soft-sm dark:border-ink-700 dark:bg-ink-800'
                        >
                            <img
                                src={getDomainImage(domainStr)}
                                alt={domainStr}
                                className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/20 to-transparent' />
                            <div className='absolute bottom-4 left-4'>
                                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-ink-200 dark:text-ink-100'>
                                    {domainStr}
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
