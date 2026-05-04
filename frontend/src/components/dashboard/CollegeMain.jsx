import React, { useState, useEffect, useCallback } from 'react';
import CollegeHeader from '../layout/CollegeHeader';
import Graph from '../ui/Graph';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import FiltersCollege from '../college/FiltersCollege';
import DomainClick from '../ui/DomainClick';
import Collegeprojectportfolio from '../portfolio/collegeprojectportfolio';
import { useParams, useNavigate } from 'react-router-dom';
import StudentDataclg from '../student/StudentDataclg';

const CollegeMain = ({ checkSession }) => {
    let { projid } = useParams();

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

    const [display, setDisplay] = useState(0);
    const [sugesstions, setSugesstions] = useState([]);
    const [sendDataToStudent, setSendDataToStudent] = useState(null);
    const [collegedetail, setCollegedetail] = useState([]);
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [stack, setstack] = useState([[0, 'Upload Date', false, 2024]]);
    const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()));
    const toggleDashboard1 = () => {
        setIsProfileVisible((prevState) => !prevState);
    };
    const navigate = useNavigate();
    const handlesearch = async (inputData) => {
        try {
            if (inputData !== '') {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/en/getsearchbycollege?term=${inputData}`
                );
                const data = response.data;
                setSugesstions(data);
                setDisplay(1);
                setstack((prevStack) => {
                    const newStack = [...prevStack];
                    newStack.push([1, inputData]);
                    return newStack;
                });
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
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
    const [receivedData, setReceivedData] = useState({
        sort_by: 'Upload Date',
        order: false,
    });
    const handleclick = (data) => {
        setDisplay(2);
        setSendDataToStudent(data);
        setstack((prevStack) => {
            const newStack = [...prevStack];
            newStack.push([2, data]);
            return newStack;
        });
    };
    const handlestuclick = (data) => {
        setDisplay(3);
        setSendDataToStudent(data);
        setstack((prevStack) => {
            const newStack = [...prevStack];
            newStack.push([3, data]);
            return newStack;
        });
    };
    const FilterData = useCallback((data) => {
        updateReceivedData(data);
    }, []);

    const CategoryData = useCallback((data) => {
        updateReceivedData(data);
    }, []);
    const updateReceivedData = (data) => {
        setReceivedData((prevData) => ({ ...prevData, ...data }));
        setstack((prevStack) => {
            const newStack = [...prevStack];
            newStack[0][1] = data.sort_by;
            newStack[0][2] = data.order;
            return newStack;
        });
    };
    const killpage = async () => {
        const len = stack.length;
        if (stack[len - 2][0] === 0) {
            setDisplay(0);
            updateReceivedData({
                sort_by: stack[len - 2][1],
                order: stack[len - 2][2],
            });
            setSelectedYear(stack[len - 2][3]);
        } else if (stack[len - 2][0] === 1) {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/getsearchbycollege?term=${stack[len - 2][1]
                }`
            );
            const data = response.data;
            setSugesstions(data);
            setDisplay(1);
        } else if (stack[len - 2][0] === 2) {
            setDisplay(2);
            setSendDataToStudent(stack[len - 2][1]);
        } else if (stack[len - 2][0] === 3) {
            setDisplay(3);
            setSendDataToStudent(stack[len - 2][1]);
        }
        setstack((prevStack) => {
            const newStack = [...prevStack];
            newStack.pop();
            return newStack;
        });
    };
    const handlecollegedetail = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/getcollegedetails`
            );
            const data = response.data;
            setCollegedetail(data);
        } catch (error) {
            console.error('error occured:', error);
        }
    };
    const fetchData = async () => {
        try {
            if (projid) {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/en/validateurl?projid=${projid}`
                );
                if (response.data === 1) {
                    handleclick(projid);
                } else if (response.data === 2) {
                    handlestuclick(projid);
                } else {
                    navigate('clgmain');
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        setstack((prevStack) => {
            const newStack = [...prevStack];
            newStack[0][3] = event.target.value;
            return newStack;
        });
    };
    useEffect(() => {
        fetchData();
        
    }, [projid]);
    console.log(display, stack);
    return (
        <div className='min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-100'>
            <header className='sticky top-0 z-30'>
                <CollegeHeader
                    takedata={CategoryData}
                    handlesearch={handlesearch}
                    handlecollegedetail={handlecollegedetail}
                    toggleDashboard1={toggleDashboard1}
                />
            </header>

            <div className='mx-auto flex w-full max-w-[1440px] gap-6 px-6 py-6'>
                <main className={`flex-1 ${isProfileVisible ? 'pointer-events-none blur-sm' : ''}`}>
                    {display === 0 && (
                        <Graph
                            receivedData={receivedData}
                            selectedYear={selectedYear}
                            handleYearChange={handleYearChange}
                            handleclick={handleclick}
                            filterComponent={<FiltersCollege sendDataToParent={FilterData} />}
                        />
                    )}
                    {display === 1 && (
                        <DomainClick
                            handleclick={handleclick}
                            handlebackClick={killpage}
                            sugesstions={sugesstions}
                        />
                    )}
                    {display === 2 && (
                        <Collegeprojectportfolio
                            studata={sendDataToStudent}
                            dis={killpage}
                            handlestuclick={handlestuclick}
                        />
                    )}
                    {display === 3 && (
                        <StudentDataclg
                            studata={sendDataToStudent}
                            dis={killpage}
                            handleclick={handleclick}
                        />
                    )}
                </main>
            </div>

            {isProfileVisible && (
                <div className='fixed inset-0 z-40 flex items-start justify-end bg-black/20 p-6'>
                    <div className='card-surface w-full max-w-sm p-6'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600'>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div>
                                    <p className='text-sm text-ink-500 dark:text-ink-300'>College</p>
                                    <p className='text-lg font-semibold text-ink-800 dark:text-ink-100'>
                                        {collegedetail?.college_name || 'College'}
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
                            <p>{collegedetail?.email_address || 'Email not available'}</p>
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
};
export default CollegeMain;
