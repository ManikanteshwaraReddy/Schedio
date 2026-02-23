import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faShareNodes, faXmark, faUserGraduate, faSchool, faQuoteLeft, faStar, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import NothingHere from '../ui/nothinghere';
import ProjectCard from '../portfolio/ProjectCard';

export default function StudentDataclg({ dis, handleclick, ...props }) {
    const projid = props.studata;
    const [showCopyMessage, setShowCopyMessage] = useState(false);

    const exit = () => {
        dis();
    };

    const handleDownload = async () => {
        alert('Please enable background graphics in more settings for better output.');
        window.print();
    };

    const share = async () => {
        navigator.clipboard
            .writeText(`${window.location.origin}/clgmain/${projid}`)
            .then(() => {
                setShowCopyMessage(true);
                setTimeout(() => setShowCopyMessage(false), 3000);
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    const [studata, setstudata] = useState(null);
    const [projects, setprojects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/en/getstudendata`,
                    { data: projid }
                );
                setstudata(response.data);
            } catch (error) {
                console.error('Fetch student data error:', error);
            }
        };
        fetchData();
    }, [projid]);

    useEffect(() => {
        const fetchprojdata = async () => {
            if (studata?.projects) {
                try {
                    const response = await axios.post(
                        `${process.env.REACT_APP_BACKEND_URL}/en/fetchprojdata`,
                        { data: studata.projects }
                    );
                    setprojects(response.data);
                } catch (error) {
                    console.error('Fetch project data error:', error);
                }
            }
        };
        fetchprojdata();
    }, [studata]);

    if (!studata) return null;

    return (
        <div className='max-w-6xl mx-auto space-y-10 pb-20 animate-in fade-in duration-500'>
            {/* Top Action Bar */}
            <div className='no-print flex flex-wrap items-center justify-between gap-4 py-2 sticky top-0 z-20 bg-ink-50/80 backdrop-blur-md dark:bg-ink-900/80 border-b border-ink-100 dark:border-ink-800 -mx-4 px-4'>
                <div className='flex gap-2 text-ink-500'>
                    <button
                        type='button'
                        className='btn-ghost gap-2 px-4'
                        onClick={handleDownload}
                    >
                        <FontAwesomeIcon icon={faDownload} />
                        <span className='hidden sm:inline'>Download PDF</span>
                    </button>
                    <button
                        type='button'
                        className={`btn-ghost gap-2 px-4 ${showCopyMessage ? 'text-green-600 bg-green-50 dark:bg-green-900/20 shadow-none border-green-200' : ''}`}
                        onClick={share}
                    >
                        <FontAwesomeIcon icon={showCopyMessage ? faCircleCheck : faShareNodes} />
                        <span>{showCopyMessage ? 'Copied URL' : 'Share Link'}</span>
                    </button>
                </div>
                <div className='flex gap-2'>
                    <button
                        type='button'
                        className='btn-ghost px-3 border-transparent hover:bg-ink-100 dark:hover:bg-ink-800'
                        onClick={exit}
                        title='Close Profile'
                    >
                        <FontAwesomeIcon icon={faXmark} className='text-lg' />
                    </button>
                </div>
            </div>

            {/* Profile Section */}
            <section className='card-surface overflow-hidden transition-all duration-300 hover:shadow-soft-lg'>
                {/* Banner */}
                <div className='h-32 bg-gradient-to-r from-brand-600 via-indigo-600 to-indigo-700 dark:from-brand-900 dark:to-indigo-950 relative overflow-hidden'>
                    <div className='absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:24px_24px]'></div>
                </div>

                <div className='px-8 pb-8'>
                    <div className='-mt-12 flex flex-col items-center sm:items-center sm:flex-row gap-6'>
                        {/* Avatar */}
                        <div className='relative'>
                            <div className='h-32 w-32 overflow-hidden rounded-3xl border-4 border-white dark:border-ink-800 bg-ink-100 shadow-xl ring-1 ring-ink-200 dark:ring-ink-700'>
                                <img
                                    className='h-full w-full object-cover'
                                    src={`${process.env.REACT_APP_BACKEND_URL}/en/image/${studata.photo}`}
                                    alt={studata.student_name}
                                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${studata.student_name}&background=6366f1&color=fff`; }}
                                />
                            </div>
                        </div>

                        {/* Identity */}
                        <div className='text-center sm:text-left flex-1 min-w-0 pt-2 sm:pt-14'>
                            <div className='flex items-center gap-2 justify-center sm:justify-start flex-wrap mb-1'>
                                <span className='px-2.5 py-0.5 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-[10px] font-bold uppercase tracking-widest rounded-md border border-brand-100 dark:border-brand-500/20'>
                                    {studata.field_name || 'Scholar'}
                                </span>
                                <span className='flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest rounded-md border border-amber-100 dark:border-amber-500/20'>
                                    <FontAwesomeIcon icon={faStar} className='text-[8px]' />
                                    Academic Profile
                                </span>
                            </div>
                            <h2 className='font-display text-4xl font-bold text-ink-900 dark:text-ink-100 tracking-tight truncate capitalize'>
                                {studata.student_name}
                            </h2>
                            <p className='text-ink-500 dark:text-ink-400 font-medium text-sm'>
                                {studata.email_address}
                            </p>
                        </div>

                        <div className='hidden lg:block text-right mb-2'>
                            <p className='text-[10px] font-bold uppercase tracking-wider text-ink-400 dark:text-ink-500'>Institution</p>
                            <p className='mt-1 text-sm font-semibold text-ink-800 dark:text-ink-200 truncate max-w-[200px]'>{studata.college_name}</p>
                        </div>
                    </div>

                    <div className='mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                        {/* Info Blocks */}
                        <div className='space-y-6 lg:col-span-1'>
                            <div className='space-y-4'>
                                <h4 className='text-[11px] font-bold uppercase tracking-widest text-ink-400 dark:text-ink-500 flex items-center gap-2'>
                                    <FontAwesomeIcon icon={faQuoteLeft} className='text-brand-500/50' />
                                    Bio
                                </h4>
                                <p className='text-sm leading-relaxed text-ink-600 dark:text-ink-300 italic px-1'>
                                    "{studata.Description || 'No description provided.'}"
                                </p>
                            </div>

                            <div className='space-y-4 border-t border-ink-100 dark:border-ink-800 pt-6'>
                                <h4 className='text-[11px] font-bold uppercase tracking-widest text-ink-400 dark:text-ink-500 flex items-center gap-2'>
                                    <FontAwesomeIcon icon={faSchool} className='text-indigo-500/50' />
                                    Education
                                </h4>
                                <div className='space-y-1.5'>
                                    <p className='text-xs font-semibold text-ink-800 dark:text-ink-200'>{studata.college_name}</p>
                                    <p className='text-[11px] text-ink-500 font-medium'>{studata.field_name}</p>
                                </div>
                            </div>
                        </div>

                        {/* Skills and Domains */}
                        <div className='space-y-8 lg:col-span-2'>
                            <div className='grid sm:grid-cols-2 gap-8'>
                                <div className='space-y-4'>
                                    <h4 className='text-[11px] font-bold uppercase tracking-widest text-ink-400 dark:text-ink-500'>
                                        Skills
                                    </h4>
                                    <div className='flex flex-wrap gap-2'>
                                        {studata.skills && Array.isArray(studata.skills) && studata.skills.length > 0 ? (
                                            studata.skills.map((skill, index) => (
                                                <span key={index} className='px-2.5 py-1 bg-white dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-200 text-xs font-medium rounded-lg shadow-sm'>
                                                    {skill}
                                                </span>
                                            ))
                                        ) : (
                                            <span className='text-xs text-ink-400 italic'>Not specified</span>
                                        )}
                                    </div>
                                </div>

                                <div className='space-y-4'>
                                    <h4 className='text-[11px] font-bold uppercase tracking-widest text-ink-400 dark:text-ink-500'>
                                        Disciplines
                                    </h4>
                                    <div className='flex flex-wrap gap-2'>
                                        {studata.Domains && studata.Domains.length > 0 ? (
                                            studata.Domains.map((domain, index) => (
                                                <span key={index} className='px-2.5 py-1 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-lg'>
                                                    {domain}
                                                </span>
                                            ))
                                        ) : (
                                            <span className='text-xs text-ink-400 italic'>Not specified</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className='space-y-6 pt-4'>
                <div className='flex items-end justify-between border-b border-ink-200 dark:border-ink-700 pb-4 pr-1'>
                    <div>
                        <p className='text-[10px] font-bold uppercase tracking-[0.4em] text-brand-600 dark:text-brand-400 mb-1'>
                            Exhibition
                        </p>
                        <h2 className='font-display text-2xl font-bold text-ink-900 dark:text-ink-100 tracking-tight'>
                            Featured Projects
                        </h2>
                    </div>
                    <div className='text-xs font-bold text-ink-400 px-3 py-1 bg-ink-100 dark:bg-ink-800 rounded-lg'>
                        {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
                    </div>
                </div>

                <div className='grid gap-6 md:grid-cols-2'>
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <button
                                key={project._id || index}
                                type='button'
                                className='text-left group transition-transform duration-200 active:scale-[0.98] outline-none'
                                onClick={() => handleclick(project._id)}
                            >
                                <ProjectCard
                                    projinfo={project}
                                    index={index}
                                />
                            </button>
                        ))
                    ) : (
                        <div className='md:col-span-2'>
                            <NothingHere />
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
