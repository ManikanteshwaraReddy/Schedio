import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSchool, faCode, faFolderOpen, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function StudentCard({ student, onClick }) {
  // Default data for demonstration if no student prop is provided
  const data = student || {
    student_name: 'Nithin T',
    email_address: 'nithinchowdary2354@gmail.com',
    college_name: 'Keshav Memorial Institute of Technology',
    field_name: 'Html, CSS, Python, JS, C++',
    projects: [1, 2, 3, 4, 5, 6],
    photo: 'test.png'
  };

  return (
    <div
      className='group card-surface border-ink-100 dark:border-ink-800 p-5 transition-all duration-300 hover:shadow-soft-xl hover:-translate-y-1 cursor-pointer relative overflow-hidden'
      onClick={onClick}
    >
      {/* Subtle Gradient Accent */}
      <div className='absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150'></div>

      <div className='flex gap-5 items-start relative z-10'>
        {/* Avatar */}
        <div className='relative shrink-0'>
          <div className='h-20 w-20 rounded-2xl overflow-hidden ring-4 ring-white dark:ring-ink-800 shadow-soft-lg bg-ink-100 dark:bg-ink-800'>
            <img
              src={data.photo && data.photo !== 'test.png' ? `${process.env.REACT_APP_BACKEND_URL}/en/image/${data.photo}` : `https://ui-avatars.com/api/?name=${data.student_name}&background=6366f1&color=fff`}
              alt={data.student_name}
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
            />
          </div>
        </div>

        {/* Info */}
        <div className='flex-1 min-w-0 space-y-3'>
          <div>
            <h3 className='font-display text-xl font-bold text-ink-900 dark:text-ink-100 tracking-tight transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400 capitalize'>
              {data.student_name}
            </h3>
            <div className='flex items-center gap-2 mt-1'>
              <span className='px-2 py-0.5 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-[10px] font-bold uppercase tracking-wider rounded-md border border-brand-100 dark:border-brand-500/20'>
                Developer
              </span>
            </div>
          </div>

          <div className='space-y-1.5'>
            <div className='flex items-center gap-2 text-xs text-ink-500 dark:text-ink-400'>
              <FontAwesomeIcon icon={faEnvelope} className='w-3.5 opacity-50' />
              <span className='truncate'>{data.email_address}</span>
            </div>
            <div className='flex items-center gap-2 text-xs text-ink-500 dark:text-ink-400'>
              <FontAwesomeIcon icon={faSchool} className='w-3.5 opacity-50' />
              <span className='truncate'>{data.college_name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Skills */}
      <div className='mt-5 pt-4 border-t border-ink-50 dark:border-ink-800/50 flex flex-wrap items-center justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-1.5 text-[11px] font-bold text-brand-600 dark:text-brand-400'>
            <FontAwesomeIcon icon={faFolderOpen} className='opacity-70' />
            {data.projects?.length || 0} Projects
          </div>
          <div className='h-3 w-[1px] bg-ink-100 dark:bg-ink-800'></div>
          <div className='flex items-center gap-1.5 text-[11px] font-medium text-ink-400'>
            <FontAwesomeIcon icon={faCode} className='opacity-70' />
            {typeof data.field_name === 'string' ? data.field_name.split(',').length : 0} Skills
          </div>
        </div>

        <div className='text-brand-500 dark:text-brand-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0'>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  );
}
