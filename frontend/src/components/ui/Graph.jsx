import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import NothingHere from './nothinghere';
import ProjectCard from '../portfolio/ProjectCard';
const Graph = ({
    handleclick,
    receivedData,
    selectedYear,
    handleYearChange,
}) => {
    const [suggestions, setsuggestions] = useState([]);
    const [college, setCollege] = useState('');
    const [collegeprj, setCollegePrj] = useState([]);
    const [noofprj, setNoofprj] = useState(0);
    const [domainprj, setDomainprj] = useState([]);
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains('dark')
    );

    useEffect(() => {
        getproj();
    }, [receivedData]);

    const getproj = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/collegeprojectsdisplay`,
                { receivedData: receivedData }
            );

            setsuggestions(response.data.list);
            setCollege(response.data.college);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };
    useEffect(() => {
        const getNoofprojects = async (req, res) => {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/en/getnoofprj?term=${selectedYear}`
            );
            const data = response.data;
            setNoofprj(data);
        };
        getNoofprojects();
    }, [selectedYear]);

    useEffect(() => {
        const handlecollegeprojects = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/en/getcollegeprojects?term=${selectedYear}`
                );
                const data = response.data;
                setCollegePrj(data);
            } catch (error) {
                console.error('Error fetching college projects:', error);
            }
        };

        handlecollegeprojects();
    }, [selectedYear]);

    useEffect(() => {
        const handledomainprojects = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/en/getcolldomainprojects?term=${selectedYear}`
                );
                const data = response.data;
                setDomainprj(data);
            } catch (error) {
                console.error('Error fetching college projects:', error);
            }
        };

        handledomainprojects();
    }, [selectedYear]);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => observer.disconnect();
    }, []);

    const monthlyChartRef = useRef(null);
    const domainChartRef = useRef(null);

    const getChartPalette = () => {
        const isDark = document.documentElement.classList.contains('dark');
        return {
            line: isDark ? 'rgba(88, 140, 210, 1)' : 'rgba(4, 67, 112, 1)',
            bar: isDark ? 'rgba(88, 140, 210, 0.85)' : 'rgba(4, 67, 112, 1)',
            tick: isDark ? '#cbd5e1' : '#475569',
            grid: isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.35)',
            tooltipBg: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(15, 23, 42, 0.85)',
            tooltipText: isDark ? '#e2e8f0' : '#f8fafc'
        };
    };

    useEffect(() => {
        if (!collegeprj) {
            console.warn(`Data for year ${selectedYear} not available yet.`);
            return;
        }

        if (monthlyChartRef.current) {
            monthlyChartRef.current.destroy();
        }

        const ctx = document.getElementById('monthlyChart').getContext('2d');

        const palette = getChartPalette();

        monthlyChartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: collegeprj.map((entry) => entry.month),
                datasets: [
                    {
                        label: `Number of Projects (${selectedYear})`,
                        borderColor: palette.line,
                        borderWidth: 2,
                        fill: false,
                        data: collegeprj.map((entry) => entry.projectsCount),
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            color: palette.grid,
                        },
                        ticks: {
                            color: palette.tick,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: palette.grid,
                        },
                        ticks: {
                            color: palette.tick,
                        },
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            color: palette.tick,
                        },
                    },
                    tooltip: {
                        backgroundColor: palette.tooltipBg,
                        titleColor: palette.tooltipText,
                        bodyColor: palette.tooltipText,
                    },
                },
            },
        });
    }, [selectedYear, collegeprj, isDark]);

    useEffect(() => {
        if (!domainprj) {
            console.warn(`Data for year ${selectedYear} not available yet.`);
            return;
        }

        if (domainChartRef.current) {
            domainChartRef.current.destroy();
        }

        const ctx = document.getElementById('domainChart').getContext('2d');

        const palette = getChartPalette();

        domainChartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: domainprj.map((entry) => entry.domain),
                datasets: [
                    {
                        label: `Number of Projects (${selectedYear})`,
                        borderColor: palette.bar,
                        borderWidth: 2,
                        fill: true,
                        backgroundColor: palette.bar,
                        data: domainprj.map((entry) => entry.projectsCount),
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            color: palette.grid,
                        },
                        ticks: {
                            color: palette.tick,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: palette.grid,
                        },
                        ticks: {
                            color: palette.tick,
                        },
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            color: palette.tick,
                        },
                    },
                    tooltip: {
                        backgroundColor: palette.tooltipBg,
                        titleColor: palette.tooltipText,
                        bodyColor: palette.tooltipText,
                    },
                },
            },
        });
    }, [selectedYear, domainprj, isDark]);
    return (
        <div className='space-y-8'>
            <div className='card-surface p-6'>
                <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
                    <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                            College overview
                        </p>
                        <h2 className='mt-2 font-display text-2xl text-ink-900 dark:text-ink-100'>
                            {college}
                        </h2>
                        <p className='mt-2 text-sm text-ink-600 dark:text-ink-300'>
                            {noofprj} projects this year
                        </p>
                    </div>
                    <label className='grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200'>
                        Select year
                        <select
                            id='yearSelector'
                            onChange={handleYearChange}
                            value={selectedYear}
                            className='h-10 rounded-full border border-ink-200 bg-white px-4 text-sm text-ink-700 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200'
                        >
                            <option value='2024'>2024</option>
                            <option value='2023'>2023</option>
                            <option value='2022'>2022</option>
                            <option value='2021'>2021</option>
                            <option value='2020'>2020</option>
                            <option value='2019'>2019</option>
                            <option value='2018'>2018</option>
                            <option value='2017'>2017</option>
                            <option value='2016'>2016</option>
                            <option value='2015'>2015</option>
                            <option value='2014'>2014</option>
                            <option value='2013'>2013</option>
                            <option value='2012'>2012</option>
                            <option value='2011'>2011</option>
                            <option value='2010'>2010</option>
                            <option value='2009'>2009</option>
                            <option value='2008'>2008</option>
                            <option value='2007'>2007</option>
                            <option value='2006'>2006</option>
                            <option value='2005'>2005</option>
                            <option value='2004'>2004</option>
                            <option value='2003'>2003</option>
                        </select>
                    </label>
                </div>
                <div className='mt-6 grid gap-6 lg:grid-cols-2'>
                    <div className='rounded-2xl border border-ink-200 bg-white p-4 dark:border-ink-700 dark:bg-ink-800'>
                        <p className='text-sm font-semibold text-ink-700 dark:text-ink-200'>Monthly activity</p>
                        <div className='mt-4'>
                            <canvas id='monthlyChart'></canvas>
                        </div>
                    </div>
                    <div className='rounded-2xl border border-ink-200 bg-white p-4 dark:border-ink-700 dark:bg-ink-800'>
                        <p className='text-sm font-semibold text-ink-700 dark:text-ink-200'>Projects by domain</p>
                        <div className='mt-4'>
                            <canvas id='domainChart'></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div className='space-y-4'>
                <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300'>
                        Latest uploads
                    </p>
                    <h3 className='mt-2 font-display text-2xl text-ink-900 dark:text-ink-100'>
                        Recent projects
                    </h3>
                </div>
                <div className='grid gap-4'>
                    {suggestions.map((suggestion, index) => (
                        <button
                            type='button'
                            key={`${suggestion._id}-${index}`}
                            className='text-left'
                            onClick={() => {
                                handleclick(suggestion._id);
                            }}
                        >
                            <ProjectCard projinfo={suggestion} index={index} />
                        </button>
                    ))}
                    {suggestions.length === 0 && <NothingHere />}
                </div>
            </div>
        </div>
    );
};

export default Graph;
