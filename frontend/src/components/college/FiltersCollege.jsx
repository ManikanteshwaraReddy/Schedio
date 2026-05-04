import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


export default function FiltersCollege({ sendDataToParent }) {
    const [formData, setFormData] = useState({
        sort_by: 'Upload Date',
        order: false
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };



    useEffect(() => {
        sendDataToParent(formData);
    }, [formData, sendDataToParent]);

    const handleToggle = () => {
        setFormData({
            ...formData,
            order: !formData.order
        });
    };

    return (
        <div className="flex flex-wrap items-center gap-4">
            <select
                name="sort_by"
                value={formData.sort_by}
                onChange={handleChange}
                className="h-10 rounded-full border border-ink-200 bg-white px-4 text-sm text-ink-700 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
            >
                <option value="Name">Name</option>
                <option value="Likes">Likes</option>
                <option value="Upload Date">Upload Date</option>
            </select>
            <button
                type="button"
                name="order"
                onClick={handleToggle}
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200"
            >
                {formData.order ? (
                    <>
                        Ascending <FontAwesomeIcon icon={faArrowUp} />
                    </>
                ) : (
                    <>
                        Descending <FontAwesomeIcon icon={faArrowDown} />
                    </>
                )}
            </button>
        </div>
    );
}