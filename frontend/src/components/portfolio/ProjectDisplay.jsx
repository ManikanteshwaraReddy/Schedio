import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ProjectCard from './ProjectCard';
export default function ProjectDisplay({
    handleskillprj,
    handleclick,
    handleskillList,
}) {
    const [suggestions, setSuggestions] = useState([]);
    const [searchterm, setSearchterm] = useState('');
    const [randomprj, setRandomprj] = useState([]);
    const handlesearchchange = (event) => {
        event.preventDefault();

        const inputValue = event.target.value;

        const response = axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/en/getskills?term=${encodeURIComponent(
                inputValue
            )}&languages=${tags}`
        );
        response
            .then(function (result) {
                console.log(result.data);
                setSuggestions(result.data);
            })
            .catch(function (error) {
                console.error('Error: ', error);
            });

        setSearchterm(event.target.value);
    };
    useEffect(() => {
        const getmostlikedprj = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/en/getmostlikedprj`
                );
                const data = response.data;
                console.log('Random Projects Data:', data);
                setRandomprj(data);
            } catch (error) {
                console.error('Error occurred:', error);
            }
        };

        getmostlikedprj();
    }, []);

    const [tags, setTags] = useState([]);

    const handleKeyDown = (data) => {
        addTag(data);
        setSuggestions([]);
        setSearchterm('');
    };

    const addTag = (tagText) => {
        setTags((prevTags) => [...prevTags, tagText]);
    };

    const removeTag = (index) => {
        setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    };

    const stacks = [
        {
            label: 'Python',
            image:
                'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'
        },
        {
            label: 'Java',
            image:
                'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/181_Java_logo_logos-512.png'
        },
        {
            label: 'C++',
            image:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png'
        },
        {
            label: 'JavaScript',
            image:
                'https://www.freepnglogos.com/uploads/javascript-png/javascript-logo-transparent-logo-javascript-images-3.png'
        },
        {
            label: 'MERN',
            image:
                'https://upload.wikimedia.org/wikipedia/commons/9/94/MERN-logo.png'
        }
    ];

    return (
        <div className='space-y-10'>
            <section className='space-y-4'>
                <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                        Projects
                    </p>
                    <h2 className='mt-2 font-display text-2xl text-ink-900 dark:text-ink-100'>Browse by stack</h2>
                </div>
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
                    {stacks.map((stack) => (
                        <button
                            key={stack.label}
                            type='button'
                            onClick={() => handleskillprj('html')}
                            className='card-surface flex flex-col items-center gap-3 p-4 text-center transition hover:border-brand-300'
                        >
                            <img
                                src={stack.image}
                                alt={stack.label}
                                className='h-12 w-12 object-contain'
                            />
                            <span className='text-sm font-semibold text-ink-700 dark:text-ink-200'>
                                {stack.label}
                            </span>
                        </button>
                    ))}
                    <div className='card-surface flex items-center justify-center p-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-300'>
                        And more
                    </div>
                </div>
            </section>

            <section className='space-y-4'>
                <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                        Tag search
                    </p>
                    <h2 className='mt-2 font-display text-2xl text-ink-900 dark:text-ink-100'>Refine by skills</h2>
                </div>
                <div className='card-surface p-4'>
                    <div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
                        <div className='flex-1 space-y-2'>
                            <label className='text-sm font-semibold text-ink-700 dark:text-ink-200'>Add tags</label>
                            <input
                                type='text'
                                value={searchterm}
                                placeholder='Type to search skills'
                                onChange={handlesearchchange}
                                className='w-full rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                            />
                        </div>
                        <button
                            type='button'
                            className='btn-primary'
                            onClick={() => {
                                handleskillList(tags);
                            }}
                        >
                            <FontAwesomeIcon icon={faSearch} />
                            <span className='ml-2'>Search</span>
                        </button>
                    </div>
                    {suggestions !== '' && (
                        <div className='mt-4 flex flex-wrap gap-2'>
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    type='button'
                                    onClick={() => handleKeyDown(suggestion)}
                                    className='rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-600 hover:border-brand-300 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200'
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
                    {tags.length > 0 && (
                        <div className='mt-4 flex flex-wrap gap-2'>
                            {tags.map((tag, index) => (
                                <span
                                    key={`${tag}-${index}`}
                                    className='flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-semibold text-ink-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200'
                                >
                                    #{tag}
                                    <button
                                        type='button'
                                        className='text-ink-400 hover:text-ink-700 dark:text-ink-400 dark:hover:text-ink-100'
                                        onClick={() => removeTag(index)}
                                    >
                                        x
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className='space-y-4'>
                <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                        Trending
                    </p>
                    <h2 className='mt-2 font-display text-2xl text-ink-900 dark:text-ink-100'>Most liked projects</h2>
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
                            <ProjectCard projinfo={suggestion} index={index} />
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}
