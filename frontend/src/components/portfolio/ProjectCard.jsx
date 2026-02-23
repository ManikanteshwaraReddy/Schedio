import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

export default function ProjectCard({ projinfo, index }) {
    return (
        <div
            key={index}
            className="card-surface group flex gap-4 p-4 transition hover:border-brand-300"
        >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-ink-100 dark:bg-ink-700">
                <img
                    className="h-full w-full object-cover"
                    src={`${process.env.REACT_APP_BACKEND_URL}/en/image/${projinfo.photo}`}
                    alt="Profile"
                />
            </div>
            <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-lg font-semibold text-ink-900 dark:text-ink-100">
                            {projinfo.Project_Name}
                        </p>
                        <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">
                            {projinfo.Description}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 text-ink-400 dark:text-ink-500">
                        <FontAwesomeIcon icon={faHeart} />
                        <FontAwesomeIcon icon={faComment} />
                        <FontAwesomeIcon icon={faShareNodes} />
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {projinfo.Skills &&
                        projinfo.Skills.map((skill) => (
                            <span
                                key={`${skill}-${index}`}
                                className="rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-600 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300"
                            >
                                #{skill}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
}