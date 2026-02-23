import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
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
                console.log(base64data);

                let temp = event.target.value;
                const profilePhotoName = temp.replace('C:\\fakepath\\', '');

                try {
                    const response = await axios.post(
                        `${process.env.REACT_APP_BACKEND_URL}/en/uploadProfilePhoto`,
                        {
                            profilePhoto: base64data,
                            pphotoname: profilePhotoName,
                            userId: studentdetail._id,
                        }
                    );
                    console.log('Photo saved successfully');
                    const ppid = response.data.fileId;
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
        setStudentDescription('');
        setStudentField('');
        setStudentOrganization('');
    };

    const handleStudentDescriptionSave = async () => {
        console.log('Edited College Name:', studentDescription);
        setEditMode(false);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/uploadDescription`,
                {
                    studentDescription: studentDescription,
                    studentorganization: studentorganization,
                    studentfield: studentfield,
                    userId: studentdetail._id,
                }
            );
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
        handlestudentdetail();
    };
    useEffect(() => {
        setStudentDescription(studentdetail.student_description);
        setStudentField(studentdetail.student_field);
        setStudentOrganization(studentdetail.student_organization);
    }, [studentdetail]);
    return (
        <div className='space-y-10'>
            {studentdetail && (
                <section className='card-surface overflow-hidden'>
                    <div className='h-24 bg-gradient-to-r from-brand-50 via-white to-brand-100 dark:from-ink-800 dark:via-ink-900 dark:to-ink-800' />
                    <div className='px-6 pb-6'>
                        <div className='-mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
                            <div className='flex items-center gap-4'>
                                <div className='relative'>
                                    <div className='h-20 w-20 overflow-hidden rounded-2xl border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-800'>
                                        <img
                                            className='h-full w-full object-cover'
                                            src={`${process.env.REACT_APP_BACKEND_URL}/en/image/${studentdetail.photo}`}
                                            alt='Profile'
                                        />
                                    </div>
                                    <label
                                        htmlFor='fileInput'
                                        className='absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-sm dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200'
                                    >
                                        <FontAwesomeIcon icon={faCamera} />
                                    </label>
                                    <input
                                        id='fileInput'
                                        type='file'
                                        accept='image/*'
                                        onChange={handlePhotoChange}
                                        className='hidden'
                                    />
                                </div>
                                <div>
                                    <p className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                                        Student
                                    </p>
                                    <h2 className='mt-1 font-display text-2xl text-ink-900 dark:text-ink-100'>
                                        {studentdetail.student_name}
                                    </h2>
                                    <p className='text-sm text-ink-600 dark:text-ink-300'>
                                        {studentdetail.email_address}
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3'>
                                {!editMode && (
                                    <button
                                        type='button'
                                        className='btn-ghost'
                                        onClick={handleEditClick}
                                    >
                                        Edit profile
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className='mt-6 grid gap-4 text-sm text-ink-600 lg:grid-cols-3'>
                            {!editMode ? (
                                <>
                                    <div className='rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 dark:border-ink-700 dark:bg-ink-800'>
                                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-300'>
                                            Status
                                        </p>
                                        <p className='mt-2 text-ink-800 dark:text-ink-100'>
                                            {studentdetail.field_name}
                                        </p>
                                    </div>
                                    <div className='rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 dark:border-ink-700 dark:bg-ink-800'>
                                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-300'>
                                            College
                                        </p>
                                        <p className='mt-2 text-ink-800 dark:text-ink-100'>
                                            {studentdetail.college_name}
                                        </p>
                                    </div>
                                    <div className='rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 dark:border-ink-700 dark:bg-ink-800'>
                                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-300'>
                                            About
                                        </p>
                                        <p className='mt-2 text-ink-800 dark:text-ink-100'>
                                            {studentdetail.Description}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className='lg:col-span-3'>
                                    <div className='grid gap-4 md:grid-cols-3'>
                                        <label className='grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200'>
                                            Status
                                            <select
                                                className='rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                                                value={studentfield}
                                                onChange={(e) =>
                                                    setStudentField(e.target.value)
                                                }
                                            >
                                                <option value='Employed'>Employed</option>
                                                <option value='Unemployed'>Unemployed</option>
                                            </select>
                                        </label>
                                        <label className='grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200'>
                                            Organization
                                            <input
                                                className='rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                                                type='text'
                                                placeholder='Enter your organization name'
                                                value={studentorganization}
                                                onChange={(e) =>
                                                    setStudentOrganization(e.target.value)
                                                }
                                            />
                                        </label>
                                        <label className='grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200'>
                                            About you
                                            <input
                                                className='rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100'
                                                type='text'
                                                placeholder='Tell something about yourself'
                                                value={studentDescription}
                                                onChange={handleStudentDescription}
                                            />
                                        </label>
                                    </div>
                                    <div className='mt-4 flex flex-wrap gap-3'>
                                        <button
                                            type='button'
                                            className='btn-primary'
                                            onClick={handleStudentDescriptionSave}
                                        >
                                            Save changes
                                        </button>
                                        <button
                                            type='button'
                                            className='btn-ghost'
                                            onClick={handleCancelEdit}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            <section className='space-y-4'>
                <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500'>
                        Portfolio
                    </p>
                    <h2 className='mt-2 font-display text-2xl text-ink-900'>My projects</h2>
                </div>
                <div className='grid gap-4'>
                    {studentproj &&
                        studentproj.map((suggestion, index) => (
                            <button
                                key={index}
                                type='button'
                                className='text-left'
                                onClick={() => handleclick(suggestion._id)}
                            >
                                <ProjectCard
                                    projinfo={suggestion}
                                    index={index}
                                />
                            </button>
                        ))}
                    {studentproj.length === 0 && <NothingHere />}
                </div>
            </section>
        </div>
    );
}
