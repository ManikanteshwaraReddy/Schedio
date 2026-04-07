import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import CheckEmail from "./components/auth/Check-Email";
import ForgotPassword from "./components/auth/ForgotPassword";
import NewUser from "./components/auth/NewUser";
import NewPassword from "./components/auth/Newpassword";
import CollegeLogin from "./components/auth/CollegeLogin";
import NewPassword_email from "./components/auth/newpassword_email";
import StudentLogin from "./components/auth/StudentLogin";
import CollegeDetails from "./components/college/College-details";
import Category from "./components/auth/wru";
import HRMAIN from "./components/dashboard/hrmain";
import HrSignUp from "./components/auth/hrsignup";
import Newhr from "./components/auth/Newhr";
import Company from "./components/dashboard/choosecompany";
import CollegeMain from "./components/dashboard/CollegeMain";
import ProjectUploadForm from "./components/portfolio/ProjectUploadForm";
import FileExplorer from "./components/file-manager/fileExplorer";
import FrontPage from "./components/pages/FrontPage";
import HomeComponents from "./components/dashboard/HomeComponents";
import TermsAndConditions from "./components/pages/TermsAndConditions";
import Instructions from "./components/pages/Instructions";

axios.defaults.withCredentials = true;

export default function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);
  const checkSession = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/en/checkSessionEndpoint`,
      );
      if (response.data) {
        setUserData(response.data);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };
  console.log(userData);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/hrmain/:projid"
          element={
            userData && userData[1] === 2 && userData[2] === 1 ? (
              <HRMAIN checkSession={checkSession} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/hrmain"
          element={
            userData && userData[1] === 2 && userData[2] === 1 ? (
              <HRMAIN checkSession={checkSession} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/clgmain/:projid"
          element={
            userData && userData[1] === 1 && userData[2] === 1 ? (
              <CollegeMain checkSession={checkSession} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/main/:projid"
          element={
            userData && userData[1] === 0 && userData[2] === 1 ? (
              <HomeComponents checkSession={checkSession} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/clgmain"
          element={
            userData && userData[1] === 1 && userData[2] === 1 ? (
              <CollegeMain checkSession={checkSession} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/main"
          element={
            userData && userData[1] === 0 && userData[2] === 1 ? (
              <HomeComponents checkSession={checkSession} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/signup/:errorMessage"
          element={userData ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/signup"
          element={userData ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/wru"
          element={userData ? <Navigate to="/" /> : <Category />}
        />
        <Route
          path="/Check-email/:mailid"
          element={userData ? <Navigate to="/" /> : <CheckEmail />}
        />
        <Route
          path="/college-signup"
          element={userData ? <Navigate to="/" /> : <CollegeLogin />}
        />
        <Route
          path="/college-signup/:errorMessage"
          element={userData ? <Navigate to="/" /> : <CollegeLogin />}
        />
        <Route
          path="/forgot-password/:errorMessage"
          element={<ForgotPassword />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/set-password/np/:token" element={<NewPassword />} />
        <Route
          path="/set-password/nu/:token"
          element={
            userData ? (
              <Navigate to="/" />
            ) : (
              <NewUser setUserData={setUserData} />
            )
          }
        />
        <Route
          path="/set-password/ne/:token"
          element={
            userData ? (
              <Navigate to="/" />
            ) : (
              <NewPassword_email setUserData={setUserData} />
            )
          }
        />
        <Route
          path="/set-password/nh/:token"
          element={
            userData ? <Navigate to="/" /> : <Newhr setUserData={setUserData} />
          }
        />
        <Route
          path="/SignIn"
          element={
            userData ? (
              <Navigate to="/" />
            ) : (
              <SignIn setUserData={setUserData} />
            )
          }
        />
        <Route
          path="/hrsignup/:errorMessage"
          element={userData ? <Navigate to="/" /> : <HrSignUp />}
        />
        <Route
          path="/hrsignup"
          element={userData ? <Navigate to="/" /> : <HrSignUp />}
        />
        <Route
          path="/ProjectUploadForm"
          element={
            userData && userData[1] === 1 && userData[2] === 1 ? (
              <ProjectUploadForm />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/showFiles/:data"
          element={
            userData && userData[2] === 1 ? (
              <FileExplorer />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/t&c" element={<TermsAndConditions />} />
        <Route path="/Ins" element={<Instructions />} />
        <Route path="/*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={
            userData ? (
              userData[1] === 0 ? (
                userData[2] === 0 ? (
                  userData[3] ? (
                    <CollegeDetails setUserData={setUserData} />
                  ) : (
                    <StudentLogin setUserData={setUserData} />
                  )
                ) : (
                  <Navigate to="/main" />
                )
              ) : userData[1] === 1 ? (
                <Navigate to="/clgmain" />
              ) : userData[2] === 0 ? (
                <Company setUserData={setUserData} />
              ) : (
                <Navigate to="/hrmain" />
              )
            ) : (
              <FrontPage />
            )
          }
          exact
        />
      </Routes>
    </BrowserRouter>
  );
}
