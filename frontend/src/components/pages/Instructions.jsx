import React from 'react';

const Instructions = () => {
    return (
        <div className="max-w-6xl mx-auto p-2.5 border border-slate-700 rounded-lg shadow-lg bg-slate-900 my-5">
            <div className='m-2.5 p-5 lg:p-10'>
                <div className="text-center mb-8">
                    <h1 className="text-blue-600 text-3xl lg:text-5xl font-bold">Instructions</h1>
                    <p className="text-gray-100 text-sm lg:text-xl mt-4">Welcome to our online integrated platform for project uploads</p>
                </div>

                <div className="space-y-4">
                    <p className="text-gray-100 text-sm lg:text-base">
                        If you want to add your Organization to our database, please follow these instructions and send the required data to <b className="text-blue-600">teamschedio@gmail.com</b>:
                    </p>

                    <h3 className="text-blue-400 text-base lg:text-lg font-semibold mt-6">Organization Name:</h3>
                    <p className="text-gray-100 text-sm lg:text-base">Provide the full and official name of your Organization mentioned in the Government Database.</p>

                    <h3 className="text-blue-400 text-base lg:text-lg font-semibold mt-6">Address:</h3>
                    <p className="text-gray-100 text-sm lg:text-base">Include the complete postal address of your Organization, including street address, city, state, and ZIP code.</p>

                    <h3 className="text-blue-400 text-base lg:text-lg font-semibold mt-6">Organization ID:</h3>
                    <p className="text-gray-100 text-sm lg:text-base">Share the unique identification or registration number assigned to your institute or company.</p>

                    <h3 className="text-blue-400 text-base lg:text-lg font-semibold mt-6">Email:</h3>
                    <p className="text-gray-100 text-sm lg:text-base">Provide an official email address associated with your Organization. This could be a general contact email or an official representative's email of your Organization.</p>

                    <h3 className="text-blue-400 text-base lg:text-lg font-semibold mt-6">Website (Optional):</h3>
                    <p className="text-gray-100 text-sm lg:text-base">If your Organization has an official website, you can include the URL. This is optional but can speed up the authentication process.</p>

                    <h3 className="text-blue-400 text-base lg:text-lg font-semibold mt-6">Instructions:</h3>
                    <p className="text-gray-100 text-sm lg:text-base">Include any specific instructions or additional information that you think is relevant for the database entry.</p>
                </div>
            </div>
        </div>
    );
};

export default Instructions;
