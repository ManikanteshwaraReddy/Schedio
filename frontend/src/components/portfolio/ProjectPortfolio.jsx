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
    faCommentDots,
    faTrashAlt,
    faEllipsisV
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function ProjectPortfolio({ dis, openstuinfo, ...props }) {
    const projid = props.studata;
    const [photolist, setphotolist] = useState([]);
    const [comments, setcomments] = useState([]);
    const [skills, setskills] = useState([]);
    const [students, setstudents] = useState([]);
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const [commentdata, setcommentdata] = useState('');
    const [dotclick, setdotclick] = useState(null); // Track which comment's dots are clicked
    const [studname, setstudname] = useState('');
    const [projdata, setprojdata] = useState(null);

    const exit = () => {
        dis();
    };

    const share = () => {
        const shareUrl = `${window.location.origin}/hrmain/${projid}`;
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                setShowCopyMessage(true);
                setTimeout(() => setShowCopyMessage(false), 2000);
            })
            .catch((err) => console.error('Failed to copy: ', err));
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/getprojectdata`,
                { data: projid }
            );
            setprojdata(response.data);
            setphotolist(response.data.photos || []);
            setcomments(response.data.Comments || []);
            setskills(response.data.Skills || []);
            setstudents(response.data.Students || []);
        } catch (error) {
            console.error('Error fetching project data:', error);
        }
    }, [projid]);

    const getstudentdetails = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/gethrdetails`
            );
            setstudname(response.data.hr_name);
        } catch (error) {
            console.error('Error fetching HR details:', error);
        }
    }, []);

    useEffect(() => {
        getstudentdetails();
        fetchData();
    }, [projid, getstudentdetails, fetchData]);

    const handlecomment = (event) => {
        setcommentdata(event.target.value);
    };

    const AddComment = async (event) => {
        event.preventDefault();
        if (!commentdata.trim()) return;
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/addcomment`,
                { commentdata, projid }
            );
            setcommentdata('');
            fetchData();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const deletecomment = async (index, id) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/delcomment`,
                { index, id }
            );
            if (response.data === 'success') {
                fetchData();
                setdotclick(null);
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const transformdate = (date) => {
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
                                        alt={`Slide ${index + 1}`}
                                        className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Details & Comments */}
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
                                    <span>Posted {transformdate(projdata.Date)}</span>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    <FontAwesomeIcon icon={faThumbsUp} className='text-brand-500' />
                                    <span className='font-semibold text-ink-700 dark:text-ink-300'>{projdata.Likes} Likes</span>
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
                                            onClick={() => openstuinfo(student.id)}
                                            className='flex items-center justify-between p-3 rounded-xl border border-ink-200 dark:border-ink-700 cursor-pointer transition-all hover:bg-white dark:hover:bg-ink-800 hover:border-brand-300 hover:shadow-soft-sm group'
                                        >
                                            <span className='font-medium text-ink-700 dark:text-ink-300 group-hover:text-brand-600 dark:group-hover:text-brand-400'>{student.stuname}</span>
                                            <span className='text-[10px] text-ink-400 group-hover:text-brand-400'>View Profile &rarr;</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Comments Section */}
                    <div className='card-surface flex flex-col'>
                        <div className='p-6 border-b border-ink-200 dark:border-ink-700 flex items-center justify-between'>
                            <h3 className='font-bold flex items-center gap-2'>
                                <FontAwesomeIcon icon={faCommentDots} className='text-brand-500' />
                                Discussion
                            </h3>
                            <span className='text-xs font-semibold bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 px-2 py-0.5 rounded-full'>
                                {comments.length}
                            </span>
                        </div>

                        <div className='p-6 space-y-6'>
                            <form onSubmit={AddComment} className='space-y-3'>
                                <textarea
                                    className='w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 resize-none min-h-[80px]'
                                    placeholder='Write a thoughtful comment...'
                                    value={commentdata}
                                    onChange={handlecomment}
                                    required
                                />
                                <div className='flex justify-end'>
                                    <button type='submit' className='btn-primary !px-6'>
                                        Post Comment
                                    </button>
                                </div>
                            </form>

                            <div className='space-y-6'>
                                {comments.length > 0 ? (
                                    comments.map((comment, index) => (
                                        <div key={index} className='flex gap-4 group'>
                                            <div className='shrink-0 w-10 h-10 rounded-full overflow-hidden border border-ink-200 dark:border-ink-700 bg-ink-100'>
                                                <img
                                                    src={`${process.env.REACT_APP_BACKEND_URL}/en/commentimage/${comment.id}`}
                                                    alt={comment.studentname}
                                                    className='w-full h-full object-cover'
                                                />
                                            </div>
                                            <div className='flex-1 pb-6 border-b border-ink-100 last:border-0 dark:border-ink-800 last:pb-0'>
                                                <div className='flex items-center justify-between mb-1'>
                                                    <div className='flex items-center gap-2'>
                                                        <span className='font-bold text-sm'>{comment.studentname}</span>
                                                        <span className='text-[10px] text-ink-400 lowercase italic'>
                                                            &bull; {transformdate(comment.Date)}
                                                        </span>
                                                    </div>

                                                    {comment.studentname === studname && (
                                                        <div className='relative'>
                                                            <button
                                                                onClick={() => setdotclick(dotclick === index ? null : index)}
                                                                className='p-1.5 text-ink-400 hover:text-ink-600 dark:hover:text-ink-200 transition-colors'
                                                            >
                                                                <FontAwesomeIcon icon={faEllipsisV} />
                                                            </button>
                                                            {dotclick === index && (
                                                                <div className='absolute right-0 mt-1 w-32 bg-white dark:bg-ink-800 border border-ink-200 dark:border-ink-700 rounded-lg shadow-xl z-20 overflow-hidden'>
                                                                    <button
                                                                        onClick={() => deletecomment(index, projdata._id)}
                                                                        className='w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                                                                    >
                                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                                        <span>Delete</span>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <p className='text-sm text-ink-700 dark:text-ink-300 leading-relaxed'>
                                                    {comment.comment}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='text-center py-10 text-ink-400'>
                                        <p className='text-sm italic'>No comments yet. Be the first to start the discussion!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
