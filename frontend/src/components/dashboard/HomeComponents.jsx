import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import HomePage from '../pages/HomePage';
import StudentProfile from '../student/StudentProfile';
import ProjectDisplay from '../portfolio/ProjectDisplay';
import DomainClick from '../ui/DomainClick';
import { useNavigate, useParams } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import axios from 'axios';
import StudentProjectProfile from '../portfolio/studentProjectPortfolio';
// import { MdOutlineHome } from "react-icons/md";
export default function HomeComponents({ checkSession }) {
    const [isSiderVisible, setIsSiderVisible] = useState(false);
    const [studentproj, setStudentproj] = useState([]);
    const [studentdetail, setStudentdetail] = useState([]);
    const [isProfileVisible, setIsProfileVisible] = useState(false);

    const navigate = useNavigate();
    const toggleDashboard = () => {
        setIsSiderVisible((prevState) => !prevState);
    };
    const toggleDashboard1 = () => {
        setIsProfileVisible((prevState) => !prevState);
        console.log(isProfileVisible);
    };

    const [display, setDisplay] = useState(0);
    const [searchterm, setSearchterm] = useState('');
    const [sugesstions, setSugesstions] = useState([]);
    let { projid } = useParams();
    const [sendDataToStudent, setSendDataToStudent] = useState(null);
    const [prevdisplay, setPrevdisplay] = useState(0);
    const [optionclick, setOptionclick] = useState(0);

    const handleOptionClick = (index) => {
        setOptionclick(index);
        setPrevdisplay(index);

        setDisplay(index);
    };
    const handlesearchClick = async (inputData) => {
        if (inputData !== '') {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/en/getsearchbyclick?term=${inputData}`
                );
                const data = response.data;
                setSugesstions(data);
                setPrevdisplay(display);
                setDisplay(3);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }
    };
    const handleDomainClick = async (inputData) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/getdomainbyclick?term=${inputData}`
            );
            const data = response.data;
            setSugesstions(data);
            setPrevdisplay(display);
            setDisplay(3);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };
    const handlelikeClick = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/getlikedprojects`
            );
            const data = response.data;
            setSugesstions(data);
            setPrevdisplay(display);
            setDisplay(3);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };
    const handlebackClick = () => {
        try {
            if (display === prevdisplay) {
                setDisplay(optionclick);
            } else {
                setDisplay(prevdisplay);
            }
        } catch (error) {
            console.error('error occured:', error);
        }
    };
    const handleclick = (data) => {
        setPrevdisplay(display);
        setDisplay(4);
        setSendDataToStudent(data);
    };

    const handleprojectprofile = async () => {
        try {
            console.log('handleprojectprofile function called');
            if (projid) {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/en/validateurl?projid=${projid}`
                );
                console.log('Response from server:', response.data);
                if (response.data === 1) {
                    setDisplay(4);
                    setSendDataToStudent(projid);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlesearchchange = async (event) => {
        event.preventDefault();
        setSearchterm(event.target.value);
        if (event.target.value.trim() === '') {
            setDisplay(prevdisplay);
            return;
        }
    };
    const deletesession = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/deletesession`
            );
            await checkSession();
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };
    const handlestudentdetail = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/getstudentdetails`
            );
            const data = response.data;
            setStudentdetail(data);
        } catch (error) {
            console.error('error occured:', error);
        }
    };
    const handlegetproject = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/getstudentproject`
            );
            const data = response.data;
            setStudentproj(data);
        } catch (error) {
            console.error('error occured:', error);
        }
    };
    const handleskillprj = async (skillname) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/getskillprj?term=${skillname}`
            );
            const data = response.data;
            setSugesstions(data);
            setPrevdisplay(display);
            setDisplay(3);
        } catch (error) {
            console.error('error occured:', error);
        }
    };

    const handleskillList = async (skillList) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/getskillList?term=${skillList}`
            );
            const data = response.data;
            setSugesstions(data);
            setPrevdisplay(display);
            setDisplay(3);
        } catch (error) {
            console.error('error occured:', error);
        }
    };

    const killpage = () => {
        if (projid) {
            navigate('/main');
        }
        setDisplay(prevdisplay);
        setSendDataToStudent(null);
    };
    useEffect(() => {
        if (!projid) {
            setDisplay(prevdisplay);
            setSendDataToStudent(null);
        } else if (projid) {
            console.log('got itttt');
            handleprojectprofile(projid);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projid]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/checksessionexpiry`
                );
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

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleTitleClick = () => {
        navigate('/');
    };

    return (
        <div className='min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-100'>
            <header className='sticky top-0 z-30 border-b border-ink-200 bg-white/90 backdrop-blur dark:border-ink-700 dark:bg-ink-900/90'>
                <div className='mx-auto flex w-full max-w-[1440px] items-center gap-4 px-6 py-3'>
                    <button
                        type='button'
                        className='flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200'
                        onClick={toggleDashboard}
                        aria-label='Toggle sidebar'
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <div className='flex items-center gap-3'>
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
                    <div className='flex-1'>
                        <div className='relative'>
                            <input
                                type='search'
                                className='w-full rounded-full border border-ink-200 bg-white px-4 py-2 pl-11 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100'
                                placeholder='Search for projects'
                                value={searchterm}
                                onChange={handlesearchchange}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handlesearchClick(searchterm);
                                    }
                                }}
                            />
                            <button
                                type='button'
                                className='absolute left-2 top-1/2 -translate-y-1/2 text-ink-500 dark:text-ink-300'
                                onClick={() => {
                                    handlesearchClick(searchterm);
                                }}
                                aria-label='Search'
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                    <ThemeToggle />
                    <button
                        type='button'
                        className='flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200'
                        onClick={() => {
                            toggleDashboard1();
                            handlestudentdetail();
                        }}
                        aria-label='Open profile'
                    >
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                </div>
            </header>

            <div className='mx-auto flex w-full max-w-[1440px] gap-6 px-6 py-6'>
                {isSiderVisible && (
                    <aside className='w-56 shrink-0 space-y-2'>
                        {[
                            { label: 'Home', action: () => handleOptionClick(0) },
                            {
                                label: 'My Profile',
                                action: () => {
                                    handleOptionClick(1);
                                    handlestudentdetail();
                                    handlegetproject();
                                }
                            },
                            { label: 'Explore', action: () => handleOptionClick(2) },
                            { label: 'Liked Projects', action: handlelikeClick },
                            // { label: 'About us', action: () => handleOptionClick(5) }
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
                    {display === 0 && (
                        <HomePage
                            handleOptionClick={handleOptionClick}
                            handleDomainClick={handleDomainClick}
                            handleclick={handleclick}
                        />
                    )}
                    {display === 1 && (
                        <StudentProfile
                            studentproj={studentproj}
                            handlestudentdetail={handlestudentdetail}
                            studentdetail={studentdetail}
                            handleclick={handleclick}
                        />
                    )}
                    {display === 2 && (
                        <ProjectDisplay
                            handleskillprj={handleskillprj}
                            handleskillList={handleskillList}
                            handlesearchchange={handlesearchchange}
                            handleclick={handleclick}
                        />
                    )}
                    {display === 3 && (
                        <DomainClick
                            sugesstions={sugesstions}
                            handlebackClick={handlebackClick}
                            handleclick={handleclick}
                        />
                    )}
                    {display === 4 && (
                        <StudentProjectProfile
                            studata={sendDataToStudent}
                            dis={killpage}
                            handleprojectprofile={handleprojectprofile}
                        />
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
                                    <p className='text-sm text-ink-500 dark:text-ink-300'>Student</p>
                                    <p className='text-lg font-semibold text-ink-800 dark:text-ink-100'>
                                        {studentdetail.student_name}
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
                            <p>{studentdetail.email_address}</p>
                            <p>{studentdetail.college_name}</p>
                            <p>{studentdetail.field_name}</p>
                        </div>
                        <button
                            type='button'
                            onClick={deletesession}
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
