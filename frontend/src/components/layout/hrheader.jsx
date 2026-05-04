import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import ThemeToggle from '../ui/ThemeToggle';




export default function Header({ takedata, toggleDashboard1, handlehrdetail, toggleDashboard }) {
    const [formData, setFormData] = useState({
        type: 'Project Search',
        search: '',
    });

    const handlesearchchange = (event) => {
        setFormData({
            ...formData,
            search: event.target.value
        });
    };
    const save = (event) => {
        setFormData({
            ...formData,
            type: event.target.value
        });
    };
    const handlesearch = async (event) => {
        if (formData.search !== '') {
            takedata(formData);
        }
    };

    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleTitleClick = () => {
        navigate('/');
    };

    return (
        <div className="border-b border-ink-200 bg-white/90 backdrop-blur dark:border-ink-700 dark:bg-ink-900/90">
            <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-6 py-3">
                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200"
                    onClick={toggleDashboard}
                    aria-label="Toggle sidebar"
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <div className="flex items-center gap-3">
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
                <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                    <select
                        name="type"
                        value={formData.type}
                        onChange={save}
                        className="h-10 rounded-full border border-ink-200 bg-white px-4 text-sm text-ink-700 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200"
                    >
                        <option value="Project Search">Project Search</option>
                        <option value="Student Search">Student Search</option>
                    </select>
                    <div className="relative flex-1">
                        <input
                            type="search"
                            spellCheck={false}
                            placeholder="Search for projects"
                            value={formData.search}
                            onChange={handlesearchchange}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handlesearch();
                                }
                            }}
                            className="h-10 w-full rounded-full border border-ink-200 bg-white px-4 pl-11 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100"
                        />
                        <button
                            type="button"
                            className="absolute left-2 top-1/2 -translate-y-1/2 text-ink-500 dark:text-ink-300"
                            onClick={() => handlesearch()}
                            aria-label="Search"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
                <ThemeToggle />
                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200"
                    onClick={() => {
                        toggleDashboard1();
                        handlehrdetail();
                    }}
                    aria-label="Open profile"
                >
                    <FontAwesomeIcon icon={faUser} />
                </button>
            </div>
        </div>
    );
}
