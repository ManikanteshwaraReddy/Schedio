import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function UploadPending() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
            <div className="card-surface max-w-md p-10 reveal is-visible">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-900/30 dark:text-brand-400">
                    <FontAwesomeIcon icon={faSpinner} className="h-10 w-10 animate-spin" />
                </div>
                <h1 className="mt-6 font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">
                    Uploading Project...
                </h1>
                <p className="mt-4 text-sm text-ink-600 dark:text-ink-300">
                    Please wait while we securely upload your files and process your submission. Do not close or refresh this page.
                </p>
            </div>
        </div>
    );
}

export default UploadPending;