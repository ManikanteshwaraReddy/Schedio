import React from "react";

const AboutUs = () => {
    const team = [
        { name: "Nithin", id: "65e55060fbd8d3ee2b6f1045" },
        { name: "Vishnu", id: "65e55060fbd8d3ee2b6f1045" },
        { name: "Hrishita", id: "65e55060fbd8d3ee2b6f1045" },
        { name: "Naga Sai", id: "65e55060fbd8d3ee2b6f1045" },
        { name: "Florence", id: "65e55060fbd8d3ee2b6f1045" },
        { name: "Sanjeeva", id: "65e55060fbd8d3ee2b6f1045" },
    ];

    return (
        <div className="card-surface p-8">
            <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300">
                    About Us
                </p>
                <h1 className="mt-3 font-display text-3xl text-ink-900 dark:text-ink-100">
                    Built to simplify project collaboration.
                </h1>
                <p className="mt-4 text-base text-ink-600 dark:text-ink-300">
                    Schedio empowers students and teams to upload, manage, and showcase work without friction.
                </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
                <div className="rounded-2xl border border-ink-200 bg-ink-50 p-6 dark:border-ink-700 dark:bg-ink-800">
                    <h3 className="text-xl font-semibold text-ink-900 dark:text-ink-100">Our Mission</h3>
                    <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
                        At Schedio, we are on a mission to revolutionize project collaboration. We strive to empower
                        individuals and teams to unleash their creativity by providing a user-friendly and efficient platform for
                        uploading, managing, and collaborating on projects.
                    </p>
                </div>
                <div className="rounded-2xl border border-ink-200 bg-ink-50 p-6 dark:border-ink-700 dark:bg-ink-800">
                    <h3 className="text-xl font-semibold text-ink-900 dark:text-ink-100">How It Works</h3>
                    <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
                        Schedio simplifies the project management process. Upload your projects, collaborate with team
                        members, and achieve your goals seamlessly. Our platform offers advanced tools and features designed to
                        enhance your project management experience.
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-xl font-semibold text-ink-900 dark:text-ink-100">Meet Our Team</h3>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {team.map((member) => (
                        <div key={member.name} className="card-surface flex items-center gap-4 p-4">
                            <div className="h-16 w-16 overflow-hidden rounded-full border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900">
                                <img
                                    src={`${process.env.REACT_APP_BACKEND_URL}/en/image/${member.id}`}
                                    alt={member.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-base font-semibold text-ink-900 dark:text-ink-100">{member.name}</p>
                                <p className="text-xs text-ink-500 dark:text-ink-300">Core team</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-10 rounded-2xl border border-ink-200 bg-white p-6 text-center dark:border-ink-700 dark:bg-ink-800">
                <h3 className="text-xl font-semibold text-ink-900 dark:text-ink-100">Contact Us</h3>
                <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
                    If you have any questions or feedback, we would love to hear from you. Contact us at
                    <a
                        href="mailto:teamschedio@gmail.com"
                        className="ml-2 font-semibold text-brand-600 dark:text-brand-200"
                    >
                        teamschedio@gmail.com
                    </a>
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
