import React, { useState, useEffect, useCallback } from 'react';
import Header from '../layout/hrheader';
import Filters from '../ui/filters';
import axios from 'axios';
import StudentData from '../student/StudentData';
import ProjectPortfolio from '../portfolio/ProjectPortfolio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faArrowRight,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NothingHere from '../ui/nothinghere';
import ProjectCard from '../portfolio/ProjectCard';

function HRMAIN({ checkSession }) {
    const navigate = useNavigate();
    const [display, setDisplay] = useState(0);
    const [students, setStudents] = useState([]);
    const [receivedData, setReceivedData] = useState({
        category: 'Any',
        college_name: 'Any',
        sort_by: 'Upload Date',
        order: false,
    });
    const [searchData, setSearchData] = useState({
        type: 'Project Search',
        search: '',
    });
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sendDataToStudent, setSendDataToStudent] = useState(null);
    const [hrdetails, setHrdetails] = useState([]);
    const [isSiderVisible, setIsSiderVisible] = useState(false);
    const [stack, setstack] = useState([[0]]);
    const toggleDashboard1 = () => {
        setIsProfileVisible((prevState) => !prevState);
    };

    const FilterData = useCallback((data) => {
        updateReceivedData(data);
        setCurrentPage(1);
    }, []);

    const handleDomainClick = async (data) => {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/en/getdomainbyclick?term=${data}`
        );
        setProjects(response.data);
        console.log('got filter data');
        setDisplay(6);
        setstack((prevStack) => {
            const newStack = [...prevStack];
            newStack.push([6, data]);
            return newStack;
        });
    };

    const CategoryData = useCallback((data) => {
        updatesearchData(data);
        setCurrentPage(1);
    }, []);

    const updatesearchData = (data) => {
        if (data.search !== '') {
            if (data.type === 'Project Search') {
                handlesearch(data.search);
            } else if (data.type === 'Student Search') {
                handlestusearch(data.search);
            }
        }
        setSearchData((prevData) => ({ ...prevData, ...data }));
    };

    const handlestusearch = async (data) => {
        console.log('clicked');
        try {
            const queryString = `?type=${'Student Search'}&search=${data}`;
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/hrmainsearch${queryString}`
            );
            setDisplay(3);
            setstack((prevStack) => {
                const newStack = [...prevStack];
                newStack.push([3, data]);
                return newStack;
            });
            console.log(response.data);
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updateReceivedData = (data) => {
        setReceivedData((prevData) => ({ ...prevData, ...data }));
    };

    let { projid } = useParams();

    const openproject = async (data) => {
        setDisplay(1);
        setSendDataToStudent(data);
        setstack((prevStack) => {
            const newStack = [...prevStack];
            newStack.push([1, data]);
            return newStack;
        });
    };

    const openstuinfo = async (data) => {
        setDisplay(4);
        setSendDataToStudent(data);
        setstack((prevStack) => {
            const newStack = [...prevStack];
            newStack.push([4, data]);
            return newStack;
        });
    };

    const fetchData = async () => {
        try {
            if (projid) {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/en/validateurl?projid=${projid}`
                );
                if (response.data === 1) {
                    openproject(projid);
                } else if (response.data === 2) {
                    openstuinfo(projid);
                } else {
                    navigate('/hrmain');
                }
            } else {
                const queryParams = new URLSearchParams({
                    ...receivedData,
                    page: currentPage,
                });
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/en/projects?${queryParams}`
                );
                setProjects(response.data.list);
                setTotalPages(response.data.total_pages);
                setDisplay(response.data.display);
                setstack((prevStack) => {
                    const newStack = [...prevStack];
                    newStack.push([2, queryParams]);
                    return newStack;
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlesearch = async (inputData) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/getsearchbyclick?term=${inputData}`
            );
            const data = response.data;
            setDisplay(6);
            setstack((prevStack) => {
                const newStack = [...prevStack];
                newStack.push([6, inputData]);
                return newStack;
            });
            console.log(data);
            setProjects(data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleOptionClick = (inputval) => {
        fetchData();
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const killpage = () => {
        if (projid) {
            navigate('/');
        } else {
            setDisplay(2);
            setSendDataToStudent(null);
        }
    };

    const ShowBookmarks = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/en/getbookmarks`
        );
        setDisplay(3);
        setstack((prevStack) => {
            const newStack = [...prevStack];
            newStack.push([3, 1, 'bookmark']);
            return newStack;
        });
        console.log(response.data);
        setStudents(response.data);
    };

    const handlehrdetail = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/gethrdetails`
            );
            const data = response.data;
            console.log(data);
            setHrdetails(data);
        } catch (error) {
            console.error('error occurred:', error);
        }
    };

    const deletesession = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/deletesession`
            );
            await checkSession();
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    useEffect(() => {
        if (display == 2) {
            console.log('fetching dataaa');
            fetchData();
        }
    }, [receivedData, currentPage]);

    useEffect(() => {
        if (projid) {
            fetchData();
        }
    }, [projid]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/checksessionexpiry`
                );
                console.log('345678998765ty', response.data);
                if (response.data === 0) {
                    try {
                        clearInterval(intervalId);
                        alert('Session Expired. Please Login again');
                        await checkSession();
                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                console.error('Error checking session expiry:', error);
            }
        }, 10000);

        return () => clearInterval(intervalId);
    }, [checkSession]);

    const toggleDashboard = () => {
        setIsSiderVisible((prevState) => !prevState);
    };
    const stackclear = () => {
        setDisplay(0);
        setstack([[0]]);
    };
    const stackexplore = () => {
        fetchData();
    };
    console.log('Stack is', stack);
    return (
        <div className='min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-100'>
            <header className='sticky top-0 z-30'>
                <Header
                    takedata={CategoryData}
                    handlehrdetail={handlehrdetail}
                    toggleDashboard1={toggleDashboard1}
                    toggleDashboard={toggleDashboard}
                />
            </header>

            <div className='mx-auto flex w-full max-w-7xl gap-6 px-6 py-6'>
                {isSiderVisible && (
                    <aside className='w-56 shrink-0 space-y-2'>
                        {[
                            { label: 'Home', action: stackclear },
                            { label: 'Explore', action: stackexplore },
                            { label: 'Bookmarks', action: ShowBookmarks }
                        ].map((item) => (
                            <button
                                key={item.label}
                                type='button'
                                onClick={item.action}
                                className='w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-left text-sm font-semibold text-ink-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200'
                            >
                                {item.label}
                            </button>
                        ))}
                    </aside>
                )}

                <main className={`flex-1 ${isProfileVisible ? 'pointer-events-none blur-sm' : ''}`}>
                    {display === 0 ? (
                        <HomePage
                            handleOptionClick={handleOptionClick}
                            handleDomainClick={handleDomainClick}
                            handleclick={openproject}
                        />
                    ) : (
                        <>
                            {display === 1 ? (
                                <ProjectPortfolio
                                    studata={sendDataToStudent}
                                    dis={killpage}
                                    openstuinfo={openstuinfo}
                                />
                            ) : display === 6 ? (
                                <div className='space-y-4'>
                                    <button
                                        type='button'
                                        className='text-sm font-semibold text-brand-600 dark:text-brand-200'
                                        onClick={() => setDisplay(0)}
                                    >
                                        {'<- Go Back'}
                                    </button>

                                    <div className='grid gap-4 md:grid-cols-2'>
                                        {projects.map((suggestion, index) => (
                                            <div key={index}>
                                                <div
                                                    onClick={() =>
                                                        openproject(suggestion._id)
                                                    }
                                                >
                                                    <ProjectCard
                                                        projinfo={suggestion}
                                                        index={index}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : display === 3 ? (
                                <div className='space-y-4'>
                                    <button
                                        type='button'
                                        className='text-sm font-semibold text-brand-600 dark:text-brand-200'
                                        onClick={() => setDisplay(0)}
                                    >
                                        {'<- Go Back'}
                                    </button>
                                    <div className='grid gap-4 md:grid-cols-2'>
                                        {students.map((student, index) => (
                                            <button
                                                key={index}
                                                type='button'
                                                className='text-left'
                                                onClick={() => openstuinfo(student._id)}
                                            >
                                                <div className='card-surface flex gap-4 p-4'>
                                                    <div className='h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-ink-200 bg-ink-100 dark:border-ink-700 dark:bg-ink-800'>
                                                        <img
                                                            src={`${process.env.REACT_APP_BACKEND_URL}/en/image/${student.photo}`}
                                                            alt=''
                                                            className='h-full w-full object-cover'
                                                        />
                                                    </div>
                                                    <div className='space-y-2'>
                                                        <div>
                                                            <p className='text-lg font-semibold text-ink-900 dark:text-ink-100'>
                                                                {student.student_name}
                                                            </p>
                                                            <p className='text-sm text-ink-600 dark:text-ink-300'>
                                                                {student.email_address}
                                                            </p>
                                                        </div>
                                                        <div className='grid gap-1 text-xs text-ink-600 dark:text-ink-300'>
                                                            <p>
                                                                <span className='font-semibold text-ink-700 dark:text-ink-200'>College:</span>{' '}
                                                                {student.college_name}
                                                            </p>
                                                            <p>
                                                                <span className='font-semibold text-ink-700 dark:text-ink-200'>Languages:</span>{' '}
                                                                {student.skills
                                                                    ? student.skills.toString()
                                                                    : 'None'}
                                                            </p>
                                                            <p>
                                                                <span className='font-semibold text-ink-700 dark:text-ink-200'>Projects:</span>{' '}
                                                                {student.projects?.length || 0}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : display === 4 ? (
                                <StudentData
                                    studata={sendDataToStudent}
                                    dis={killpage}
                                    openproject={openproject}
                                    isSiderVisible={isSiderVisible}
                                    toggleDashboard={toggleDashboard}
                                />
                            ) : display === 2 ? (
                                <div className='space-y-4'>
                                    <Filters sendDataToParent={FilterData} />
                                    <button
                                        type='button'
                                        className='text-sm font-semibold text-brand-600 dark:text-brand-200'
                                        onClick={() => setDisplay(0)}
                                    >
                                        {'<- Go Back'}
                                    </button>

                                    <div className='grid gap-4 md:grid-cols-2'>
                                        {projects.map((suggestion, index) => (
                                            <div key={index}>
                                                <div
                                                    onClick={() => {
                                                        openproject(suggestion._id);
                                                    }}
                                                >
                                                    <ProjectCard
                                                        projinfo={suggestion}
                                                        index={index}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className='flex items-center justify-end gap-2'>
                                        {currentPage > 1 && (
                                            <button
                                                className='flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200'
                                                onClick={handlePreviousPage}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faArrowLeft}
                                                />
                                            </button>
                                        )}
                                        {currentPage < totalPages && (
                                            <button
                                                className='flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200'
                                                onClick={handleNextPage}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faArrowRight}
                                                />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <NothingHere />
                            )}
                        </>
                    )}
                </main>
            </div>

            {isProfileVisible && (
                <div className='fixed inset-0 z-40 flex justify-end bg-black/20 p-6'>
                    <div className='card-surface w-full max-w-sm p-6'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600'>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div>
                                    <p className='text-sm text-ink-500 dark:text-ink-300'>Recruiter</p>
                                    <p className='text-lg font-semibold text-ink-800 dark:text-ink-100'>
                                        {hrdetails.hr_name}
                                    </p>
                                </div>
                            </div>
                            <button
                                type='button'
                                onClick={toggleDashboard1}
                                className='text-sm font-semibold text-ink-500 hover:text-ink-700 dark:text-ink-300 dark:hover:text-ink-100'
                            >
                                Close
                            </button>
                        </div>
                        <div className='mt-6 space-y-3 text-sm text-ink-600 dark:text-ink-300'>
                            <p>{hrdetails.email_address}</p>
                            <p>{hrdetails.company_name}</p>
                        </div>
                        <button
                            type='button'
                            onClick={() => deletesession()}
                            className='mt-6 w-full rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition hover:border-brand-300 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200'
                        >
                            Log out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HRMAIN;
