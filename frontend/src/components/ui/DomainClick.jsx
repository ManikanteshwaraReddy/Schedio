import React from "react";
import NothingHere from "./nothinghere";
import ProjectCard from "../portfolio/ProjectCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function DomainClick({ sugesstions, handlebackClick, handleclick }) {
    return (
        <div className="space-y-4">
            <button
                type="button"
                className="btn-ghost gap-2 !px-4 !py-2.5 w-fit"
                onClick={() => handlebackClick()}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Go Back</span>
            </button>
            <div className="grid gap-4 md:grid-cols-2">
                {sugesstions &&
                    sugesstions.map((suggestion, index) => (
                        <button
                            key={`${suggestion._id}-${index}`}
                            type="button"
                            className="text-left"
                            onClick={() => {
                                handleclick(suggestion._id);
                            }}
                        >
                            <ProjectCard projinfo={suggestion} index={index} />
                        </button>
                    ))}
            </div>
            {sugesstions.length === 0 && <NothingHere />}
        </div>
    );
}