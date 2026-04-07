import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faLink,
    faCheck,
    faThumbsUp,
    faCalendarAlt,
    faFolderOpen,
    faCode,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function StudentProjectProfile({
    dis,
    studata,
    handlestuclick,
}) {
    const projid = studata;
    const [photolist, setPhotolist] = useState([]);
    const [projdata, setProjdata] = useState(null);
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const [skills, setskills] = useState([]);
    const [students, setstudents] = useState([]);
    const [likeCount, setLikeCount] = useState(0);

    const exit = () => {
        dis();
    };

    const share = async () => {
        try {
            const shareUrl = `${window.location.origin}/clgmain/${projid}`;
            await navigator.clipboard.writeText(shareUrl);
            setShowCopyMessage(true);
            setTimeout(() => setShowCopyMessage(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/getprojectdata`,
                { data: projid }
            );
            setProjdata(response.data);
            setPhotolist(response.data.photos || []);
            setskills(response.data.Skills || []);
            setstudents(response.data.Students || []);
            setLikeCount(response.data.Likes || 0);
        } catch (error) {
            console.error('Error fetching project data:', error);
        }
    }, [projid]);

    useEffect(() => {
        fetchData();
    }, [projid, fetchData]);

    const transformDate = (date) => {
        if (!date) return '';
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[dateObj.getMonth()];
        const year = dateObj.getFullYear();

        let suffix = 'th';
        if (day % 10 === 1 && day !== 11) suffix = 'st';
        else if (day % 10 === 2 && day !== 12) suffix = 'nd';
        else if (day % 10 === 3 && day !== 13) suffix = 'rd';

        return `${day}${suffix} ${month} ${year}`;
    };

    const handleFile = (data) => {
        window.open(`/showFiles/${data}`, '_blank');
    };

    return (
        <div className='flex flex-col min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-100 p-4 md:p-6 lg:p-8'>
            {/* Action Bar */}
            <div className='flex items-center justify-between mb-8 sticky top-0 bg-ink-50/90 dark:bg-ink-900/90 backdrop-blur-md z-10 py-3 border-b border-ink-100 dark:border-ink-800'>
                <button
                    onClick={exit}
                    className='btn-ghost gap-2 !px-4 !py-2.5'
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Go Back</span>
                </button>
                <button
                    onClick={share}
                    className={`btn-ghost gap-2 !px-4 !py-2.5 transition-all duration-300 ${showCopyMessage ? 'border-green-500 text-green-600 dark:text-green-400' : ''}`}
                >
                    <FontAwesomeIcon icon={showCopyMessage ? faCheck : faLink} />
                    <span>{showCopyMessage ? 'Link Copied' : 'Share Project'}</span>
                </button>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
                {/* Left Column: Media */}
                <div className='lg:col-span-7 space-y-6'>
                    <div className='card-surface overflow-hidden !bg-black aspect-video flex items-center justify-center shadow-xl'>
                        {projdata && (
                            <video
                                className='w-full h-full object-contain'
                                src={`${process.env.REACT_APP_BACKEND_URL}/en/image/${projdata.Video}`}
                                controls
                            />
                        )}
                    </div>

                    {photolist.length > 0 && (
                        <div className='grid grid-cols-2 gap-4'>
                            {photolist.map((photo, index) => (
                                <div key={index} className='card-surface overflow-hidden aspect-video'>
                                    <img
                                        src={`${process.env.REACT_APP_BACKEND_URL}/en/image/${photo}`}
                                        alt={`Project ${index + 1}`}
                                        className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Details */}
                <div className='lg:col-span-5 space-y-6'>
                    {projdata && (
                        <section className='card-surface p-6 md:p-8 space-y-6'>
                            <div className='flex items-start gap-4'>
                                <div className='shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-brand-500 shadow-soft-sm bg-white'>
                                    <img
                                        src={`${process.env.REACT_APP_BACKEND_URL}/en/image/${projdata.photo}`}
                                        alt='Project thumbnail'
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='flex-1'>
                                    <h1 className='font-display text-2xl md:text-3xl font-bold text-ink-900 dark:text-ink-100 leading-tight'>
                                        {projdata.Project_Name}
                                    </h1>
                                    <p className='text-brand-600 dark:text-brand-400 font-semibold mt-1'>
                                        {projdata.College}
                                    </p>
                                </div>
                            </div>

                            <div className='flex flex-wrap gap-4 text-sm text-ink-500'>
                                <div className='flex items-center gap-1.5'>
                                    <FontAwesomeIcon icon={faCalendarAlt} className='text-ink-400' />
                                    <span>Posted {transformDate(projdata.Date)}</span>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    <FontAwesomeIcon icon={faThumbsUp} className='text-brand-500' />
                                    <span className='font-semibold text-ink-700 dark:text-ink-300'>{likeCount} Likes</span>
                                </div>
                            </div>

                            <div className='bg-ink-100/50 dark:bg-ink-800/30 rounded-xl p-4 text-ink-700 dark:text-ink-200 leading-relaxed font-sans'>
                                {projdata.Description}
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <button
                                    onClick={() => handleFile(projdata.File || '65e557edd218d5da2e19a9de')}
                                    className='btn-primary gap-2 w-full !rounded-xl !py-3'
                                >
                                    <FontAwesomeIcon icon={faFolderOpen} />
                                    <span>Browse Code</span>
                                </button>
                                <div className='flex items-center gap-2 p-3 bg-white dark:bg-ink-800 rounded-xl border border-ink-200 dark:border-ink-700 min-w-0'>
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-[10px] uppercase tracking-wider text-ink-400 font-bold'>Domain</p>
                                        <p className='text-sm font-semibold truncate' title={projdata.Domain}>{projdata.Domain}</p>
                                    </div>
                                    <FontAwesomeIcon icon={faCode} className='text-ink-300 text-xl shrink-0' />
                                </div>
                            </div>

                            <div className='space-y-3'>
                                <h3 className='text-sm font-bold text-ink-400 uppercase tracking-widest flex items-center gap-2'>
                                    <FontAwesomeIcon icon={faCode} className='text-brand-500' />
                                    Technologies
                                </h3>
                                <div className='flex flex-wrap gap-2'>
                                    {skills.map((skill, index) => (
                                        <span key={index} className='px-3 py-1 bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-xs font-semibold rounded-full border border-brand-100 dark:border-brand-800'>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className='space-y-3 pt-4 border-t border-ink-200 dark:border-ink-700'>
                                <h3 className='text-sm font-bold text-ink-400 uppercase tracking-widest flex items-center gap-2'>
                                    <FontAwesomeIcon icon={faUsers} className='text-brand-500' />
                                    Project Team
                                </h3>
                                <div className='grid grid-cols-1 gap-2'>
                                    {students.map((student, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handlestuclick(student.id)}
                                            className='flex items-center justify-between p-3 rounded-xl border border-ink-200 dark:border-ink-700 cursor-pointer transition-all hover:bg-white dark:hover:bg-ink-800 hover:border-brand-300 hover:shadow-soft-sm group'
                                        >
                                            <span className='font-medium text-ink-700 dark:text-ink-300 group-hover:text-brand-600 dark:group-hover:text-brand-400'>{student.stuname}</span>
                                            <span className='text-[10px] uppercase tracking-wider text-ink-400 font-bold group-hover:text-brand-400'>View Profile &rarr;</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
