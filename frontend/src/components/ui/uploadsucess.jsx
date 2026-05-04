import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function UploadSuccess() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
            <div className="card-surface max-w-md p-10 reveal is-visible">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-400">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-10 w-10" />
                </div>
                <h1 className="mt-6 font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">
                    Project Uploaded Successfully!
                </h1>
                <p className="mt-4 text-sm text-ink-600 dark:text-ink-300">
                    Your project has been securely saved and is now live on the Schedio platform. Thank you for sharing your work with the community!
                </p>
                <button 
                    className="btn-primary mt-8 w-full gap-2"
                    onClick={() => navigate('/')}
                >
                    Back to Dashboard
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
}

export default UploadSuccess;