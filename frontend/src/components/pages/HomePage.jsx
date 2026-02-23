import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../portfolio/ProjectCard';
export default function HomePage({
    handleOptionClick,
    handleDomainClick,
    handleclick,
}) {
    const [randomprj, setRandomprj] = useState([]);
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

    const domains = [
        {
            label: 'Healthcare',
            value: 'Healthcare',
            image:
                'https://www.national.edu/wp-content/uploads/2021/11/Nov_4_iStock-1127069581-scaled.jpeg'
        },
        {
            label: 'Artificial Intelligence',
            value: 'Artificial Intelligence and Robotics',
            image:
                'https://assets-global.website-files.com/61845f7929f5aa517ebab941/6440f9477c2a321f0dd6ab61_How%20Artificial%20Intelligence%20(AI)%20Is%20Used%20In%20Biometrics.jpg'
        },
        {
            label: 'Web Development',
            value: 'Web development',
            image:
                'https://sklc-tinymce-2021.s3.amazonaws.com/comp/2023/04/full-stack%20web%20development_1681290664.png'
        },
        {
            label: 'Software Development',
            value: 'Software development',
            image:
                'https://blog.planview.com/wp-content/uploads/2020/01/Top-6-Software-Development-Methodologies.jpg'
        },
        {
            label: 'E-Commerce',
            value: 'E-Commerce and Marketplace development',
            image:
                'https://product.hstatic.net/200000388585/product/khoa-ecommerce-leader_499927079ba847f1b0e4f8ec44fa3d90_1024x1024.jpg'
        },
        {
            label: 'Cyber Security',
            value: 'Cyber Security',
            image:
                'https://www.ctemag.com/sites/default/files/page_images/blockchain-tech-manufacturing.jpg'
        }
    ];

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
