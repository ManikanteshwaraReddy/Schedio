import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function Filters({ sendDataToParent }) {
    const [formData, setFormData] = useState({
        college_name: 'Any',
        category: 'Any',
        sort_by: 'Upload Date',
        order: false,
    });
    const [term, setTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleChange1 = async (event) => {
        const inputdata = event.target.value;
        setTerm(inputdata);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/data?term=${inputdata}`
            );
            const data = response.data;
            setSuggestions(data);
        } catch (error) {
            console.log('error', error);
        }
        if (inputdata === '') {
            setFormData({
                ...formData,
                ['college_name']: 'Any',
            });
        }
    };
    const handleSuggestionClick = (selectedSuggestion) => {
        setFormData({
            ...formData,
            ['college_name']: selectedSuggestion,
        });
        setTerm(selectedSuggestion);
        setSuggestions([]);
        sendDataToParent(formData);
    };

    useEffect(() => {
        sendDataToParent(formData);
    }, [formData]);

    const handleToggle = () => {
        setFormData({
            ...formData,
            order: !formData.order,
        });
        sendDataToParent(formData);
    };
    return (
        <div className='card-surface relative flex flex-wrap items-center gap-4 px-4 py-3'>
            <div className='flex-1 min-w-[220px]'>
                <label className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                    Institution
                </label>
                <input
                    type='text'
                    spellCheck='false'
                    placeholder='Search for institutions'
                    name='college_name'
                    value={term}
                    onChange={handleChange1}
                    className='mt-2 w-full rounded-full border border-ink-200 bg-white px-4 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                />
                {suggestions.length > 0 && (
                    <div className='absolute mt-2 w-[min(320px,90%)] rounded-xl border border-ink-200 bg-white p-2 text-sm text-ink-700 shadow-soft-sm dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200'>
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                type='button'
                                className='w-full rounded-lg px-3 py-2 text-left transition hover:bg-ink-100 dark:hover:bg-ink-800'
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className='min-w-[180px]'>
                <label className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                    Category
                </label>
                <select
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                    className='mt-2 h-10 w-full rounded-full border border-ink-200 bg-white px-4 text-sm text-ink-700 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200'
                >
                    <option value='Any'>Any</option>
                    <option value='Web development'>Web development</option>
                    <option value='App development'>App development</option>
                    <option value='Data Science and Analytics'>
                        Data Science and Analytics
                    </option>
                    <option value='Game development'>Game development</option>
                    <option value='Cyber Security'>Cyber Security</option>
                    <option value='Artificial Intelligence and Robotics'>
                        Artificial Intelligence and Robotics
                    </option>
                    <option value='Embedded systems and IOT(Sensors)'>
                        Embedded systems and IOT(Sensors)
                    </option>
                    <option value='E-Commerce and Marketplace development'>
                        E-Commerce and Marketplace development
                    </option>
                    <option value='Healthcare'>Healthcare</option>
                    <option value='Software development'>
                        Software development
                    </option>
                </select>
            </div>
            <div className='min-w-[160px]'>
                <label className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                    Sort by
                </label>
                <select
                    name='sort_by'
                    value={formData.sort_by}
                    onChange={handleChange}
                    className='mt-2 h-10 w-full rounded-full border border-ink-200 bg-white px-4 text-sm text-ink-700 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200'
                >
                    <option value='Name'>Name</option>
                    <option value='Likes'>Likes</option>
                    <option value='Upload Date'>Upload Date</option>
                </select>
            </div>
            <div className='min-w-[160px]'>
                <label className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                    Order
                </label>
                <button
                    type='button'
                    name='order'
                    onClick={handleToggle}
                    className='mt-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200'
                >
                    {formData.order ? (
                        <>
                            Ascending <FontAwesomeIcon icon={faArrowUp} />
                        </>
                    ) : (
                        <>
                            Descending <FontAwesomeIcon icon={faArrowDown} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
