import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileOrFolder from './fileorfolder';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../ui/Loading';
import ThemeToggle from '../ui/ThemeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCode, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const FileExplorer = () => {
    const [sider, setsider] = useState(true);
    const { data } = useParams();
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');
    const [folderStructure, setFolderStructure] = useState(null);
    const [fileContents, setFileContents] = useState({});
    const [cde, setcde] = useState('');
    const [openforpath, setopenforpath] = useState('');
    const [codeExplain, setCodeExplain] = useState('');
    const [loadingExplainer, setLoadingExplainer] = useState(false);

    const fetchFolderStructure = async (id) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/en/fexp`,
                { data: id }
            );
            setFolderStructure(response.data.folderStructure);
            setFileContents(response.data.fileContents);
            setFileName(response.data.filename);
        } catch (error) {
            console.error('Error fetching folder structure:', error);
        }
    };

    useEffect(() => {
        fetchFolderStructure(data);
    }, [data]);

    const handleCodeExplain = () => {
        setCodeExplain('');
        setLoadingExplainer(true);
        setsider(false);
        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/en/explainCode`,
            { data: cde }
        )
            .then((result) => {
                let explanation = result.data.ans || 'No explanation generated.';
                explanation = explanation.replace(/\n/g, '<br/>');
                setCodeExplain(explanation);
            })
            .catch((error) => {
                console.error('Error: ', error);
                setCodeExplain('Failed to generate explanation.');
            })
            .finally(() => {
                setLoadingExplainer(false);
            });
    };

    const handleLogoClick = () => navigate('/');

    return (
        <div className='min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-100 flex flex-col'>
            <header className='border-b border-ink-200 bg-white sticky top-0 z-50 dark:border-ink-700 dark:bg-ink-900'>
                <div className='container-page flex h-16 items-center justify-between gap-3'>
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
                            onClick={handleLogoClick}
                        >
                            Schedio
                        </button>
                        <div className='h-4 w-[1px] bg-ink-200 dark:bg-ink-700 mx-2' />
                        <span className='text-sm font-medium text-ink-500 truncate max-w-[200px]'>
                            {fileName || 'Project Explorer'}
                        </span>
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            <div className='flex-1 flex overflow-hidden'>
                {/* Sidebar */}
                {sider && (
                    <aside className='w-72 shrink-0 border-r border-ink-200 bg-ink-50/50 backdrop-blur dark:border-ink-700 dark:bg-ink-900/50 flex flex-col'>
                        <div className='p-4 border-b border-ink-200 dark:border-ink-700 bg-white/50 dark:bg-ink-800/50'>
                            <h3 className='text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400'>Files</h3>
                        </div>
                        <div className='flex-1 overflow-y-auto p-4 custom-scrollbar'>
                            {folderStructure ? (
                                <FileOrFolder
                                    fileName={fileName}
                                    name={fileName}
                                    contents={folderStructure}
                                    fileContents={fileContents}
                                    setcde={setcde}
                                    setopenforpath={setopenforpath}
                                    openforpath={openforpath}
                                />
                            ) : (
                                <div className='flex items-center justify-center h-20'>
                                    <Loading />
                                </div>
                            )}
                        </div>
                    </aside>
                )}

                {/* Main Content Area */}
                <main className='flex-1 flex flex-col overflow-hidden bg-white dark:bg-ink-900 relative'>
                    <div className='flex-1 overflow-auto p-6 bg-ink-50/30 dark:bg-transparent'>
                        <div className='max-w-5xl mx-auto space-y-6'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    {(!sider || !cde) && (
                                        <button
                                            onClick={() => setsider(true)}
                                            className='btn-ghost gap-2 !px-3'
                                            title="Show Sidebar"
                                        >
                                            <FontAwesomeIcon icon={faArrowLeft} />
                                            Back
                                        </button>
                                    )}
                                    <div className='flex flex-col'>
                                        <h2 className='text-lg font-semibold text-ink-900 dark:text-ink-100 flex items-center gap-2'>
                                            <FontAwesomeIcon icon={faCode} className='text-brand-500' />
                                            {openforpath.split('/').pop() || 'Code Viewer'}
                                        </h2>
                                        {openforpath && (
                                            <p className='text-xs text-ink-500 font-mono'>{openforpath}</p>
                                        )}
                                    </div>
                                </div>
                                {sider && cde && (
                                    <button
                                        className='btn-primary gap-2'
                                        onClick={handleCodeExplain}
                                    >
                                        <FontAwesomeIcon icon={faLightbulb} />
                                        Explain Code
                                    </button>
                                )}
                            </div>

                            <div className='flex flex-col lg:flex-row gap-6 min-h-[600px]'>
                                {/* Code Viewer Column */}
                                <div className={`flex-1 flex flex-col min-w-0 transition-all duration-500 overflow-hidden`}>
                                    <div className='card-surface flex flex-col h-full !bg-[#1e1e1e] border-ink-800 shadow-xl overflow-hidden'>
                                        <div className='flex items-center justify-between px-4 py-2 border-b border-ink-800 bg-[#252526]'>
                                            <div className='flex items-center gap-2'>
                                                <FontAwesomeIcon icon={faCode} className='text-brand-400 text-xs' />
                                                <span className='text-[11px] font-mono text-ink-400 uppercase tracking-wider'>Source Code</span>
                                            </div>
                                            <span className='text-[10px] text-ink-500 font-mono'>{openforpath.split('.').pop()?.toUpperCase()}</span>
                                        </div>
                                        <div className='flex-1 overflow-auto custom-scrollbar'>
                                            <SyntaxHighlighter
                                                language={openforpath.split('.').pop() || 'javascript'}
                                                style={atomDark}
                                                customStyle={{
                                                    margin: 0,
                                                    padding: '1.5rem',
                                                    fontSize: '13px',
                                                    lineHeight: '1.6',
                                                    background: 'transparent',
                                                }}
                                            >
                                                {cde || '// Select a file to view its content'}
                                            </SyntaxHighlighter>
                                        </div>
                                    </div>
                                </div>

                                {/* Explanation Column */}
                                {!sider && (
                                    <div className='w-full lg:w-[400px] xl:w-[500px] shrink-0 flex flex-col min-w-0 animate-in slide-in-from-right duration-500'>
                                        <div className='card-surface flex flex-col h-full bg-white dark:bg-ink-900 border-ink-200 dark:border-ink-800 shadow-xl overflow-hidden'>
                                            <div className='flex items-center justify-between px-6 py-4 border-b border-ink-100 dark:border-ink-800 bg-ink-50/50 dark:bg-ink-900/50'>
                                                <div className='flex items-center gap-2'>
                                                    <div className='w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center'>
                                                        <FontAwesomeIcon icon={faLightbulb} className='text-brand-500' />
                                                    </div>
                                                    <h3 className='font-display font-bold text-ink-900 dark:text-ink-100'>Explanation</h3>
                                                </div>
                                                <button
                                                    onClick={() => setsider(true)}
                                                    className='p-2 text-ink-400 hover:text-ink-600 dark:hover:text-ink-200 transition-colors'
                                                    title='Close Explanation'
                                                >
                                                    <span className='text-xs font-bold uppercase tracking-tighter'>Close</span>
                                                </button>
                                            </div>

                                            <div className='flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar'>
                                                {loadingExplainer ? (
                                                    <div className='flex flex-col items-center justify-center h-full space-y-4'>
                                                        <Loading />
                                                        <div className='text-center'>
                                                            <p className='text-sm font-semibold text-ink-800 dark:text-ink-200'>Analyzing logic...</p>
                                                            <p className='text-xs text-ink-500 mt-1'>Consulting the AI architect</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className='prose prose-sm md:prose-base dark:prose-invert max-w-none text-ink-700 dark:text-ink-300 leading-relaxed font-sans'>
                                                        <div dangerouslySetInnerHTML={{ __html: codeExplain }} />
                                                    </div>
                                                )}
                                            </div>

                                            {!loadingExplainer && codeExplain && (
                                                <div className='p-4 bg-ink-50/50 dark:bg-ink-800/20 border-t border-ink-100 dark:border-ink-800'>
                                                    <p className='text-[10px] text-center text-ink-400 font-medium uppercase tracking-widest'>
                                                        AI Generated Content
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FileExplorer;
