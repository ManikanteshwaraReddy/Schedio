import React from "react";
import NothingHere from "./nothinghere";
import ProjectCard from "../portfolio/ProjectCard";

export default function DomainClick({ sugesstions, handlebackClick, handleclick }) {
    return (
        <div className="space-y-4">
            <button
                type="button"
                className="text-sm font-semibold text-brand-600 dark:text-brand-200"
                onClick={() => handlebackClick()}
            >
                {'<- Go Back'}
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