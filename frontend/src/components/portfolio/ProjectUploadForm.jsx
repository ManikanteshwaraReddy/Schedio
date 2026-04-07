import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../layout/hrheader";
import axios from "axios";
import Uploadsucess from "../ui/uploadsucess";
import Uploadpending from "../ui/uploadpending";

export default function ProjectUploadForm() {
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [file, setFile] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoname] = useState("");
  const [videoname, setVideoName] = useState("");
  const [filename, setFileName] = useState("");
  const [pphotoname, setProfilePhotoName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [videoSize, setVideoSize] = useState(0);
  const [profilePhotoSize, setProfilePhotoSize] = useState(0);
  const [percent, setPercent] = useState(0);
  const CategoryData = useCallback((data) => { }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    saveDetails();
  };
  const [languages, setLanguages] = useState([]);
  const [teams, setTeams] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [teamInputValue, setTeamInputValue] = useState("");
  const [sugesstions2, setSugesstions2] = useState([]);
  const [sugesstions3, setSugesstions3] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [plagarismValue, setPlagarismValue] = useState(0);
  const [plagarismErrorMessage, setPlagarismErrorMessage] = useState("");
  const [display, setDisplay] = useState(0);

  const handleInputChange = async (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    console.log(inputValue);

    if (inputValue.trim() === "") {
      setSugesstions2([]);
      return;
    } else {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/en/getskills?term=${encodeURIComponent(
            inputValue,
          )}&languages=${languages}`,
        );
        const data = response.data;
        setSugesstions2(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }
  };

  const handleTeamInputChange = async (event) => {
    const teamInputValue = event.target.value;
    setTeamInputValue(teamInputValue);

    if (teamInputValue.trim() === "") {
      setSugesstions3([]);
      return;
    } else {
      try {
        console.log(teamInputValue, teams);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/en/getteam?term=${encodeURIComponent(
            teamInputValue,
          )}&teams=${teams}`,
        );
        const data = response.data;
        setSugesstions3(data);
      } catch (error) {
        console.log("Error fetching suggestions:", error);
      }
    }
  };

  const handleKeyDown = (sugesstion) => {
    addLanguage(sugesstion.trim());
    setInputValue("");
    setSugesstions2([]);
  };
  const handleTeamKeyDown = (sugesstion) => {
    console.log(sugesstion);
    addTeamMember(sugesstion);
    setTeamInputValue("");
    setSugesstions3([]);
  };

  const addLanguage = (newLanguage) => {
    setLanguages([...languages, newLanguage]);
    console.log(newLanguage);
  };

  const addTeamMember = (newTeamMember) => {
    setTeams([...teams, newTeamMember]);
  };

  const removeLanguage = (indexToRemove) => {
    const updatedLanguages = languages.filter(
      (_, index) => index !== indexToRemove,
    );
    setLanguages(updatedLanguages);
  };

  const removeTeamMember = (indexToRemove) => {
    const updatedTeams = teams.filter((_, index) => index !== indexToRemove);
    setTeams(updatedTeams);
  };

  function handleProfilePhoto(event) {
    const selectedProfilePhoto = event.target.files[0];
    setProfilePhotoSize(selectedProfilePhoto.size / (1024 * 1024));

    if (selectedProfilePhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(selectedProfilePhoto);

      let temp = event.target.value;
      const profilePhotoName = temp.replace("C:\\fakepath\\", "");
      setProfilePhotoName(profilePhotoName);
      alert("photo uploaded");
    } else {
      alert("No photo selected");
    }
  }

  function handleVideoChange(event) {
    const selectedVideo = event.target.files[0];
    setVideoSize(selectedVideo.size / (1024 * 1024));

    if (selectedVideo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(selectedVideo);
      let temp3 = event.target.value;
      const videoname = temp3.replace("C:\\fakepath\\", "");
      setVideoName(videoname);
      alert("uploaded video");
    } else {
      alert("No video selected");
    }
  }

  function handlePhotoChange(event) {
    const selectedPhoto = event.target.files[0];

    console.log("photo");
    if (selectedPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoDataUrl = reader.result.split(",")[1];
        setPhotos((prevPhotos) => [...prevPhotos, photoDataUrl]);
      };
      reader.readAsDataURL(selectedPhoto);
      alert("photos selected");
    } else {
      alert("No photo selected");
    }
  }

  function handlechange(event) {
    const selectedFile = event.target.files[0];
    setFileSize(selectedFile.size / (1024 * 1024));
    if (selectedFile && selectedFile.name.endsWith(".zip")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(selectedFile);
      let temp1 = event.target.value;
      const zipname = temp1.replace("C:\\fakepath\\", "");
      setFileName(zipname);
      console.log(filename);
      alert("file uploaded");
    } else {
      alert("please select a valid .zip file");
    }
  }
  const handlePlagarism = async () => {
    setPlagarismValue(2);
    setPlagarismErrorMessage("Running Plagarism Test Please Wait");
    console.log(description);
    setPercent(100);
    if (description.length !== 0) {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/en/checkPlagiarism`,
        { textToCheck: description },
      );
      console.log(response);
      setPercent(response.data);
    }

    console.log("percent is ", percent);
    if (percent < 30) {
      setPlagarismValue(3);
      setPlagarismErrorMessage("No Plagarised Content Found");
    } else {
      setPlagarismValue(1);
      setPlagarismErrorMessage("Plagarised Content Found");
    }
  };

  async function saveDetails() {
    console.log(photos.length);
    try {
      if (fileSize + videoSize + profilePhotoSize > 4) {
        alert("size exceeded");
      } else if (plagarismValue === 0) {
        alert("Please run Plagarism Check");
      } else if (plagarismValue === 2) {
        alert("Checking Plagrism Wait");
      } else if (plagarismValue === 1) {
        alert("Your Description is Plagarised. It cannot be Submitted");
      } else if (videoname.length === 0) {
        alert("video required!");
      } else if (languages.length === 0) {
        alert("languages required");
      } else if (domain.length === 0) {
        alert("Domain required");
      } else if (teams.length === 0) {
        alert("Team members  required");
      } else if (pphotoname.length === 0) {
        alert("profile photo required");
      } else {
        await axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/en/uploadDetails`, {
            videoname: videoname,
            photoname: photoname,
            filename: filename,
            video: video,
            photos: photos,
            file: file,
            title: title,
            description: description,
            profilePhoto: profilePhoto,
            languages: languages,
            domain: domain,
            teams: teams,
          })

          .then((response) => {
            console.log(response);
            console.log("successfully uploaded.");
            setDisplay(2);
            console.log("response: ", response.data.message);
            if (
              response.data.message === "Project details saved successfully"
            ) {
              setDisplay(1);
            }
          })
          .catch((error) => {
            console.log("Error uploading details:", error);
            alert("File size too large");
          });
      }
    } catch (error) {
      console.log("hi");
      alert("File size too large");

      console.log("Error uploading details:", error);
    }
  }

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-100">
      <Header takedata={CategoryData} />
      {display === 0 && (
        <div className="mx-auto w-full max-w-5xl px-6 py-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="card-surface p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300">
                    Project upload
                  </p>
                  <h1 className="mt-2 font-display text-2xl text-ink-900 dark:text-ink-100">
                    Share your project with the community
                  </h1>
                </div>
                <label
                  htmlFor="profilePic"
                  className="flex cursor-pointer items-center gap-3 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200"
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                  Add cover photo
                  <input
                    type="file"
                    name="profilePic"
                    id="profilePic"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePhoto}
                  />
                </label>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200">
                  Project title
                  <input
                    type="text"
                    spellCheck={false}
                    className="rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200">
                  Select project domain
                  <select
                    name="category"
                    onChange={(e) => setDomain(e.target.value)}
                    className="rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100"
                    required
                  >
                    <option value="Web development">Web development</option>
                    <option value="App development">App development</option>
                    <option value="Data Science and Analytics">
                      Data Science and Analytics
                    </option>
                    <option value="Game development">Game development</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Artificial Intelligence and Robotic">
                      Artificial Intelligence and Robotics
                    </option>
                    <option value="Embedded systems and IOT(Sensors)">
                      Embedded systems and IOT(Sensors)
                    </option>
                    <option value="E-Commerce and Marketplace development">
                      E-Commerce and Marketplace development
                    </option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Software development">
                      Software development
                    </option>
                    <option value="Any">Not listed</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="card-surface p-6">
              <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                <label className="grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200">
                  Description
                  <textarea
                    name="description"
                    rows="6"
                    required
                    className="rounded-lg border border-ink-200 bg-white px-4 py-3 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </label>
                <div className="space-y-4">
                  <label className="grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200">
                    Upload files (.zip)
                    <input
                      type="file"
                      className="rounded-lg border border-dashed border-ink-300 bg-ink-50 px-4 py-6 text-sm text-ink-600 shadow-sm dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300"
                      accept=".zip"
                      onChange={handlechange}
                    />
                  </label>
                  <button
                    className="btn-ghost w-full"
                    type="button"
                    onClick={() => handlePlagarism()}
                  >
                    Run plagiarism test
                  </button>
                  {plagarismErrorMessage && (
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-300">
                      {plagarismErrorMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="card-surface p-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300">
                    Languages used
                  </p>
                  <div className="mt-3 space-y-3">
                    <input
                      type="text"
                      placeholder="Add languages..."
                      value={inputValue}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100"
                    />
                    <div className="flex flex-wrap gap-2">
                      {languages.map((language, index) => (
                        <span
                          key={`${language}-${index}`}
                          className="flex items-center gap-2 rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200"
                        >
                          {language}
                          <button
                            type="button"
                            className="text-ink-400 hover:text-ink-700 dark:text-ink-400 dark:hover:text-ink-100"
                            onClick={() => removeLanguage(index)}
                          >
                            x
                          </button>
                        </span>
                      ))}
                    </div>
                    {sugesstions2.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {sugesstions2.map((sugesstion, index) => (
                          <button
                            key={index}
                            type="button"
                            className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-semibold text-ink-600 hover:border-brand-300 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
                            onClick={() => handleKeyDown(sugesstion)}
                          >
                            {sugesstion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300">
                    Media uploads
                  </p>
                  <div className="mt-3 space-y-3">
                    <label className="grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200">
                      Upload video
                      <input
                        type="file"
                        className="rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm text-ink-700 shadow-sm dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
                        accept="video/*"
                        onChange={handleVideoChange}
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200">
                      Upload photos
                      <input
                        type="file"
                        className="rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm text-ink-700 shadow-sm dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
                        accept="image/*"
                        onChange={handlePhotoChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300">
                Team members
              </p>
              <div className="mt-3 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {teams.map((teamMember, index) => (
                    <span
                      key={`${teamMember?.student_name || "member"}-${index}`}
                      className="flex items-center gap-2 rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200"
                    >
                      {teamMember.student_name}
                      <button
                        type="button"
                        className="text-ink-400 hover:text-ink-700 dark:text-ink-400 dark:hover:text-ink-100"
                        onClick={() => removeTeamMember(index)}
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={teamInputValue}
                  onChange={handleTeamInputChange}
                  className="w-full rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm text-ink-800 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100"
                />
                {sugesstions3.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {sugesstions3.map((sugesstion, index) => (
                      <button
                        key={index}
                        type="button"
                        className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-semibold text-ink-600 hover:border-brand-300 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
                        onClick={() => handleTeamKeyDown(sugesstion)}
                      >
                        {sugesstion.student_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn-primary">
                Submit project
              </button>
            </div>
          </form>
        </div>
      )}
      {display === 2 && <Uploadpending />}
      {display === 1 && <Uploadsucess />}
    </div>
  );
}
