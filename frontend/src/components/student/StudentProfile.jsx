import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faPen, faCheck, faXmark, faUserGraduate, faSchool, faQuoteLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import NothingHere from '../ui/nothinghere';
import ProjectCard from '../portfolio/ProjectCard';

export default function StudentProfile({
    studentproj,
    handlestudentdetail,
    studentdetail,
    handleclick,
}) {
    const [editMode, setEditMode] = useState(false);
    const [studentDescription, setStudentDescription] = useState('');
    const [studentorganization, setStudentOrganization] = useState('');
    const [studentfield, setStudentField] = useState('');

    const handlePhotoChange = async (event) => {
        const selectedProfilePhoto = event.target.files[0];
        if (selectedProfilePhoto) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64data = reader.result.split(',')[1];
                let temp = event.target.value;
                const profilePhotoName = temp.replace('C:\\fakepath\\', '');

                try {
                    await axios.post(
                        `${process.env.REACT_APP_BACKEND_URL}/en/uploadProfilePhoto`,
                        {
                            profilePhoto: base64data,
                            pphotoname: profilePhotoName,
                            userId: studentdetail._id,
                        }
                    );
                    console.log('Photo saved successfully');
                    handlestudentdetail();
                } catch (error) {
                    console.error('Error uploading photo:', error);
                }
            };
            reader.readAsDataURL(selectedProfilePhoto);
        }
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleStudentDescription = (event) => {
        setStudentDescription(event.target.value);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setStudentDescription(studentdetail.Description || '');
        setStudentField(studentdetail.field_name || '');
        setStudentOrganization(studentdetail.college_name || ''); // Defaulting to college_name if organization isn't a direct field
    };

    const handleStudentDescriptionSave = async () => {
        setEditMode(false);
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/uploadDescription`,
                {
                    studentDescription: studentDescription,
                    studentorganization: studentorganization,
                    studentfield: studentfield,
                    userId: studentdetail._id,
                }
            );
            handlestudentdetail();
        } catch (error) {
            console.error('Error saving details:', error);
        }
    };

    useEffect(() => {
        if (studentdetail) {
            setStudentDescription(studentdetail.Description || '');
            setStudentField(studentdetail.field_name || '');
            setStudentOrganization(studentdetail.college_name || '');
        }
    }, [studentdetail]);

    return (
        <div className='max-w-6xl mx-auto space-y-12 pb-12 transition-all duration-300'>
            {studentdetail && (
                <section className='card-surface overflow-hidden transition-shadow duration-300 hover:shadow-soft-lg'>
                    {/* Header Banner */}
                    <div className='h-40 bg-gradient-to-r from-brand-600 via-indigo-600 to-indigo-700 dark:from-brand-900 dark:to-indigo-950 relative overflow-hidden'>
                        <div className='absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:24px_24px]'></div>
                    </div>

                    <div className='px-8 pb-8'>
                        <div className='-mt-16 relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
                            <div className='flex flex-col sm:flex-row items-center sm:items-center gap-6'>
                                {/* Avatar Container */}
                                <div className='relative group'>
                                    <div className='h-32 w-32 overflow-hidden rounded-3xl border-4 border-white dark:border-ink-800 bg-ink-100 shadow-xl ring-1 ring-ink-200 dark:ring-ink-700 transition-transform duration-300 group-hover:scale-105'>
                                        <img
                                            className='h-full w-full object-cover'
                                            src={`${process.env.REACT_APP_BACKEND_URL}/en/image/${studentdetail.photo}`}
                                            alt='Student Profile'
                                            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + studentdetail.student_name + '&background=6366f1&color=fff'; }}
                                        />
                                    </div>
                                    <label
                                        htmlFor='fileInput'
                                        className='absolute -bottom-2 -right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-ink-200 bg-white text-brand-600 shadow-lg transition-all duration-200 hover:bg-brand-50 hover:scale-110 active:scale-95 dark:border-ink-700 dark:bg-ink-800 dark:text-brand-400 dark:hover:bg-ink-700'
                                        title='Change profile photo'
                                    >
                                        <FontAwesomeIcon icon={faCamera} className='text-sm' />
                                    </label>
                                    <input
                                        id='fileInput'
                                        type='file'
                                        accept='image/*'
                                        onChange={handlePhotoChange}
                                        className='hidden'
                                    />
                                </div>

                                {/* Identity */}
                                <div className='text-center sm:text-left flex-1 min-w-0 pt-2 sm:pt-14'>
                                    <div className='flex items-center gap-2 justify-center sm:justify-start flex-wrap'>
                                        <span className='px-2.5 py-0.5 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-[10px] font-bold uppercase tracking-widest rounded-md border border-brand-100 dark:border-brand-500/20'>
                                            {studentdetail.field_name || 'Scholar'}
                                        </span>
                                        <span className='flex items-center gap-1.5 px-2.5 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-widest rounded-md border border-green-100 dark:border-green-500/20'>
                                            <FontAwesomeIcon icon={faStar} className='text-[8px]' />
                                            Verified Profile
                                        </span>
                                    </div>
                                    <h2 className='mt-2 font-display text-4xl font-bold text-ink-900 dark:text-ink-100 tracking-tight truncate capitalize'>
                                        {studentdetail.student_name}
                                    </h2>
                                    <p className='text-ink-500 dark:text-ink-400 font-medium text-sm'>
                                        {studentdetail.email_address}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className='flex items-center justify-center sm:justify-start gap-3 pb-2'>
                                {!editMode ? (
                                    <button
                                        type='button'
                                        className='btn-ghost gap-2 px-6 shadow-sm border-brand-200/50 hover:border-brand-400 dark:border-ink-700 dark:hover:border-brand-500 group'
                                        onClick={handleEditClick}
                                    >
                                        <FontAwesomeIcon icon={faPen} className='text-xs text-ink-400 group-hover:text-brand-500' />
                                        Update Profile
                                    </button>
                                ) : (
                                    <div className='flex gap-2'>
                                        <button
                                            type='button'
                                            className='btn-primary gap-2 px-6 animate-in zoom-in duration-200'
                                            onClick={handleStudentDescriptionSave}
                                        >
                                            <FontAwesomeIcon icon={faCheck} className='text-xs' />
                                            Save
                                        </button>
                                        <button
                                            type='button'
                                            className='btn-ghost gap-2 px-6 border-red-200 text-red-600 dark:border-red-900/50 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10'
                                            onClick={handleCancelEdit}
                                        >
                                            <FontAwesomeIcon icon={faXmark} className='text-xs' />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className='mt-10 grid gap-6'>
                            {!editMode ? (
                                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                                    {/* Status Card */}
                                    <div className='group rounded-2xl border border-ink-100 dark:border-ink-800 bg-ink-50/30 dark:bg-ink-900/40 p-5 transition-all duration-300 hover:border-brand-300 dark:hover:border-brand-700 hover:bg-white dark:hover:bg-ink-800 shadow-sm hover:shadow-md'>
                                        <div className='flex items-center gap-3 mb-4'>
                                            <div className='h-8 w-8 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400'>
                                                <FontAwesomeIcon icon={faUserGraduate} size='sm' />
                                            </div>
                                            <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400'>
                                                Specialization
                                            </p>
                                        </div>
                                        <p className='text-base font-semibold text-ink-800 dark:text-ink-200'>
                                            {studentdetail.field_name || 'Not specified'}
                                        </p>
                                    </div>

                                    {/* College Card */}
                                    <div className='group rounded-2xl border border-ink-100 dark:border-ink-800 bg-ink-50/30 dark:bg-ink-900/40 p-5 transition-all duration-300 hover:border-brand-300 dark:hover:border-brand-700 hover:bg-white dark:hover:bg-ink-800 shadow-sm hover:shadow-md'>
                                        <div className='flex items-center gap-3 mb-4'>
                                            <div className='h-8 w-8 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400'>
                                                <FontAwesomeIcon icon={faSchool} size='sm' />
                                            </div>
                                            <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400'>
                                                Current College
                                            </p>
                                        </div>
                                        <p className='text-base font-semibold text-ink-800 dark:text-ink-200 line-clamp-1'>
                                            {studentdetail.college_name || 'Educational Institution'}
                                        </p>
                                    </div>

                                    {/* About Card */}
                                    <div className='md:col-span-2 lg:col-span-1 group rounded-2xl border border-ink-100 dark:border-ink-800 bg-ink-50/30 dark:bg-ink-900/40 p-5 transition-all duration-300 hover:border-brand-300 dark:hover:border-brand-700 hover:bg-white dark:hover:bg-ink-800 shadow-sm hover:shadow-md'>
                                        <div className='flex items-center gap-3 mb-4'>
                                            <div className='h-8 w-8 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400'>
                                                <FontAwesomeIcon icon={faQuoteLeft} size='sm' />
                                            </div>
                                            <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400'>
                                                Bio Snapshot
                                            </p>
                                        </div>
                                        <p className='text-sm leading-relaxed text-ink-600 dark:text-ink-300 italic line-clamp-2'>
                                            "{studentdetail.Description || 'No description provided yet.'}"
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className='lg:col-span-3 animate-in fade-in slide-in-from-top-4 duration-300'>
                                    <div className='grid gap-6 md:grid-cols-3'>
                                        <div className='space-y-2'>
                                            <label className='text-xs font-bold uppercase tracking-wider text-ink-600 dark:text-ink-400'>
                                                Status
                                            </label>
                                            <select
                                                className='w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                                                value={studentfield}
                                                onChange={(e) => setStudentField(e.target.value)}
                                            >
                                                <option value='Employed'>Employed</option>
                                                <option value='Unemployed'>Unemployed</option>
                                                <option value='Internship'>Internship</option>
                                                <option value='Freelance'>Freelance</option>
                                            </select>
                                        </div>
                                        <div className='space-y-2'>
                                            <label className='text-xs font-bold uppercase tracking-wider text-ink-600 dark:text-ink-400'>
                                                Organization / Role
                                            </label>
                                            <input
                                                className='w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                                                type='text'
                                                placeholder='e.g. Acme Corp / Full Stack Dev'
                                                value={studentorganization}
                                                onChange={(e) => setStudentOrganization(e.target.value)}
                                            />
                                        </div>
                                        <div className='space-y-2'>
                                            <label className='text-xs font-bold uppercase tracking-wider text-ink-600 dark:text-ink-400'>
                                                Bio
                                            </label>
                                            <input
                                                className='w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                                                type='text'
                                                placeholder='A short sentence about you'
                                                value={studentDescription}
                                                onChange={handleStudentDescription}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Portfolio Section */}
            <section className='space-y-6 pt-4'>
                <div className='flex items-end justify-between border-b border-ink-200 dark:border-ink-700 pb-4'>
                    <div>
                        <p className='text-[10px] font-bold uppercase tracking-[0.4em] text-brand-600 dark:text-brand-400 mb-1'>
                            Showcase
                        </p>
                        <h2 className='font-display text-2xl font-bold text-ink-900 dark:text-ink-100 tracking-tight'>
                            Exhibited Projects
                        </h2>
                    </div>
                    <div className='text-xs font-bold text-ink-400 px-3 py-1 bg-ink-100 dark:bg-ink-800 rounded-lg'>
                        {studentproj?.length || 0} Projects Total
                    </div>
                </div>

                <div className='grid gap-6 md:grid-cols-2'>
                    {studentproj && studentproj.length > 0 ? (
                        studentproj.map((suggestion, index) => (
                            <button
                                key={suggestion._id || index}
                                type='button'
                                className='text-left group transition-all duration-200 active:scale-[0.98] outline-none'
                                onClick={() => handleclick(suggestion._id)}
                            >
                                <ProjectCard
                                    projinfo={suggestion}
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
