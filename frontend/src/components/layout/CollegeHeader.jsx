import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ThemeToggle from '../ui/ThemeToggle';

export default function CollegeHeader({
  takedata,
  handlesearch,
  toggleDashboard1,
  handlecollegedetail,
}) {
  const navigate = useNavigate();
  const [formData] = useState({
    category: "Any",
    search: "",
  });
  const [searchterm, setSearchTerm] = useState("");
  useEffect(() => {
    takedata(formData);
  }, [formData, takedata]);
  const handlesearchchange = async (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const projectadd = async () => {
    window.open(`/ProjectUploadForm`, "_blank");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleTitleClick = () => {
    navigate("/");
  };
  return (
    <div className="border-b border-ink-200 bg-white/90 backdrop-blur dark:border-ink-700 dark:bg-ink-900/90">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-6 py-3">
        <div className="flex items-center gap-3">
          <img
            src="../Plogo.png"
            alt="Schedio logo"
            className="h-9 w-9 cursor-pointer"
            onClick={handleLogoClick}
          />
          <button
            type="button"
            className="font-display text-lg font-semibold text-ink-800 dark:text-ink-100"
            onClick={handleTitleClick}
          >
            Schedio
          </button>
        </div>
        <div className="flex-1">
          <div className="relative">
            <input
              type="search"
              spellCheck={false}
              placeholder="Search for projects"
              value={searchterm}
              onChange={(event) => {
                handlesearchchange(event);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handlesearch(searchterm);
                }
              }}
              className="h-10 w-full rounded-full border border-ink-200 bg-white px-4 pl-11 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100"
            />
            <button
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 text-ink-500 dark:text-ink-300"
              onClick={() => {
                handlesearch(searchterm);
              }}
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200"
            onClick={() => projectadd()}
          >
            + Add Project
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200"
            onClick={() => {
              toggleDashboard1();
              handlecollegedetail();
            }}
            aria-label="Open profile"
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      </div>
    </div>
  );
}
