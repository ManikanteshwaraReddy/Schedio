const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const Mailgen = require('mailgen');
const nodemailer = require('nodemailer');
const {
    EMAIL,
    PASSWORD,
    JWT_SECRET,
    SESSION_KEY,
    Student,
    college,
    Department,
    recruiter,
    skills,
    FRONTEND_URL,
} = require('../settings/env.js');
require('dotenv').config();

app.use(bodyParser.json());

// college suggestions
const getsignupCollege = async (req, res) => {
    try {
        const term1 = req.query.term;
        const regex1 = new RegExp(term1, 'i');
        const colleges = await college
            .find({ college_name: regex1 })
            .select('college_name')
            .limit(10);
        const suggestions1 = colleges.map((college) => college.college_name);
        res.json(suggestions1);
    } catch (err) {
        console.error('Error retrieving colleges:', err);
        res.status(500).json({ error: 'Error in retriveing colleges' });
    }
};

//SESSION_CHECKER
const checkSessionEndpoint = async (req, res) => {
    if (req.session.loggedInemail) {
        //if exists condition will be true
        res.json([
            req.session.loggedInemail,
            req.session.typeofuser,
            req.session.status,
            req.session.third,
            req.session.fourth,
        ]);
        // typeof user 0 is student
        //1 is college
        //2 is hr
        //status is 0 or 1 depending if the user completed all sign up procedure
    } else {
        // If no session null will be returned
        res.json(null);
    }
};

//colege send mailer
const signup_college = async (req, res) => {
    const CollegeName = req.body.serverCollegeName;
    try {
        // Find the document based on the provided college name
        const result = await college.findOne({ college_name: CollegeName });
        //console.log(result.password)
        if (result.password !== undefined) {
            // User already has a password
            res.json({
                message: 'User already registered',
                CollegeName: 'null',
            });
        } else if (result) {
            const username = result.email_address;
            //mail has found
            const token = jwt.sign({ username }, JWT_SECRET, {
                expiresIn: '10m',
            });
            let config = {
                service: 'gmail',
                auth: {
                    user: EMAIL,
                    pass: PASSWORD,
                },
            };
            let transporter = nodemailer.createTransport(config);
            let MailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    name: 'PROJECT PALACE',
                    link: 'https://mailgen.js/',
                },
            });
            let response = {
                body: {
                    name: CollegeName,
                    intro: 'Please click on the following link to set your password:',
                    action: {
                        instructions:
                            'Click the button below to set your password:',
                        button: {
                            color: '#22BC66',
                            text: 'Set your password',
                            link: `${FRONTEND_URL}/set-password/ne/${token}`,
                        },
                    },
                    outro: 'If you did not request to set a password, no further action is required on your part.',
                },
            };
            let mail = MailGenerator.generate(response);
            let message = {
                from: EMAIL,
                to: username,
                subject: 'Your OTP for Verification',
                html: mail,
            };
            transporter.sendMail(message);
            res.json({ message: 'Mail Sent', mail: username });
        } else {
            res.status(404).json({ error: 'College not found' });
        }
    } catch (error) {
        console.error('Error retrieving data from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//LINK-MAILER
const signup = async (req, res) => {
    const { username } = req.body; // takes email from request

    //checks if user exists already
    async function checkStudent(mail) {
        const Students = await Student.find({ email_address: mail }); //represents students
        const result = await college.find({ email_address: mail });
        const recruiters = await recruiter.find({ email_address: mail });
        if (Students.length !== 0) {
            return null; // User found
        } else if (recruiters.length !== 0) {
            return null;
        } else if (result.length !== 0) {
            return null;
        }
        return 1;
    }

    //creates signup
    async function create(req, res) {
        var email_1 = await checkStudent(username);
        if (email_1 === null) {
            res.json({ message: 'User Already Exists', username: 'null' });
        } else {
            const token = jwt.sign({ username }, JWT_SECRET, {
                expiresIn: '10m',
            }); //encodes mail with expiration time 10 min
            let config = {
                service: 'gmail', //to use gmail for sending mail
                auth: {
                    user: EMAIL, //our email
                    pass: PASSWORD, //our app-password
                },
            };
            let transporter = nodemailer.createTransport(config); // adds configuration to a variable named transporter
            let MailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    name: 'PROJECT PALACE', //change based on website name
                    link: 'https://mailgen.js/', //add website link after hosting
                },
            });
            let response = {
                // creating mail
                body: {
                    name: 'USER',
                    intro: 'Please click on the following link to set your password:',
                    action: {
                        instructions:
                            'Click the button below to set your password:',
                        button: {
                            color: '#22BC66',
                            text: 'Set your password',
                            link: `${FRONTEND_URL}/set-password/nu/${token}`, //change link
                        },
                    },
                    outro: 'If you did not request to set a password, no further action is required on your part.',
                },
            };
            let mail = MailGenerator.generate(response); // generating mail
            let message = {
                //complete mail
                from: EMAIL,
                to: username,
                subject: 'Your OTP for Verification',
                html: mail,
            };
            await transporter.sendMail(message); //sending mail
            res.json({ message: 'Mail Sent', mail: username });
        }
    }
    create(req, res);
};

//hr LINK-MAILER
const hrsignup = async (req, res) => {
    const { username } = req.body;
    async function checkStudent(mail) {
        const Students = await Student.find({ email_address: mail });
        const result = await college.find({ email_address: mail });
        const recruiters = await recruiter.find({ email_address: mail });
        if (Students.length !== 0) {
            return null; // User found
        } else if (recruiters.length !== 0) {
            return null;
        } else if (result.length !== 0) {
            return null;
        }
        return 1;
    }
    async function create(req, res) {
        var email_1 = await checkStudent(username);
        if (email_1 === null) {
            res.json({ message: 'User Already Exists', username: 'null' });
        } else {
            const token = jwt.sign({ username }, JWT_SECRET, {
                expiresIn: '10m',
            });
            let config = {
                service: 'gmail',
                auth: {
                    user: EMAIL,
                    pass: PASSWORD,
                },
            };
            let transporter = nodemailer.createTransport(config);
            let MailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    name: 'PROJECT PALACE',
                    link: 'https://mailgen.js/',
                },
            });
            let response = {
                body: {
                    name: 'USER',
                    intro: 'Please click on the following link to set your password:',
                    action: {
                        instructions:
                            'Click the button below to set your password:',
                        button: {
                            color: '#22BC66',
                            text: 'Set your password',
                            link: `${FRONTEND_URL}/set-password/nh/${token}`,
                        },
                    },
                    outro: 'If you did not request to set a password, no further action is required on your part.',
                },
            };
            let mail = MailGenerator.generate(response);
            let message = {
                from: EMAIL,
                to: username,
                subject: 'Your OTP for Verification',
                html: mail,
            };
            transporter.sendMail(message);
            res.json({ message: 'Mail Sent', mail: username });
        }
    }
    create(req, res);
};

//LOGIN
const signin = async (req, res) => {
    async function checkStudent(mail) {
        const Students = await Student.find({ email_address: mail });
        const result = await college.find({ email_address: mail });
        const recruiters = await recruiter.find({ email_address: mail });
        if (Students.length !== 0) {
            return [Students[0].password, 0];
        }
        if (result.length !== 0) {
            return [result[0].password, 1];
        }
        if (recruiters.length !== 0) {
            return [recruiters[0].password, 2];
        }
        return 'NULL';
    }

    async function signin(req, res) {
        const { username, password } = req.body;
        const colleges = await college.findOne({ email_address: username });
        var userPassword = await checkStudent(username);
        bcrypt.compare(password, userPassword[0], (err, result) => {
            if (userPassword === 'NULL') {
                res.json({ message: 'User Not found' });
            } else if (result) {
                req.session.loggedInemail = username;
                req.session.typeofuser = userPassword[1];
                if (userPassword[1] === 1) {
                    req.session.loggedInCollege = colleges.college_name;
                }
                req.session.status = 1;
                res.json({
                    message: 'Login successful',
                    user: { username: username },
                    checkstudent: userPassword[1],
                });
            } else {
                res.json({ message: 'Wrong Password', user: username });
            }
        });
    }
    signin(req, res);
};

//token validation
const validate_token = function (req, res) {
    var token = req.params.token;
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                res.json({ message: 'Token expired', email: 'null' });
            } else {
                res.json({ message: 'Invalid token', email: 'null' });
            }
        } else {
            res.json({ message: 'verified', email: decoded.username });
        }
    });
};

//college registartion
const mailpass = async (req, res) => {
    const { mail, password, cpassword } = req.body;
    const fromdb = await college.findOne({ email_address: mail });
    if (password !== cpassword) {
        res.json({ message: 'Passwords are not same' });
    } else {
        bcrypt.hash(password, 8, async (err, hash) => {
            req.session.loggedInemail = mail;
            req.session.typeofuser = 1;
            req.session.status = 1;
            const result = await college.updateOne(
                { email_address: mail },
                { $set: { password: hash } }
            );
            res.send({ message: 'ok', email: mail });
        });
    }
};

//NEW-USER
const newuser = async (req, res) => {
    const { mail, username, password, cpassword } = req.body;
    const mails = await Student.find({ email_address: mail });
    const Students = await Student.find({ student_name: username });
    const recruiters = await recruiter.find({ hr_name: username });
    if (mails.length !== 0) {
        res.json({ message: 'Mail already registered' });
    } else if (password !== cpassword) {
        res.json({ message: 'Passwords are not same' });
    } else if (Students.length !== 0) {
        res.json({ message: 'Username Taken' });
    } else if (recruiters.length !== 0) {
        res.json({ message: 'Username Taken' });
    } else {
        bcrypt.hash(password, 8, (err, hash) => {
            req.session.loggedInemail = mail;
            req.session.typeofuser = 0;
            req.session.status = 0;
            req.session.username = username;
            req.session.password = hash;
            res.json({ message: 'success', email: mail });
        });
    }
};

//NEW-hr
const newhr = async (req, res) => {
    const { mail, username, password, cpassword } = req.body;
    const mails = await recruiter.find({ email_address: mail });
    const Students = await Student.find({ student_name: username });
    const recruiters = await recruiter.find({ hr_name: username });
    if (mails.length !== 0) {
        res.json({ message: 'Mail already registered' });
    } else if (password !== cpassword) {
        res.json({ message: 'Passwords are not same' });
    } else if (Students.length !== 0) {
        res.json({ message: 'Username Taken' });
    } else if (recruiters.length !== 0) {
        res.json({ message: 'Username Taken' });
    } else {
        bcrypt.hash(password, 8, (err, hash) => {
            req.session.loggedInemail = mail;
            req.session.typeofuser = 2;
            req.session.status = 0;
            req.session.username = username;
            req.session.password = hash;
            res.json({ message: 'success', email: mail });
        });
    }
};

//send mail for forgot password
const fpassword = async (req, res) => {
    const { username } = req.body;
    async function checkStudent(mail) {
        const Students = await Student.find({ email_address: mail });
        const result = await college.find({ email_address: mail });
        const recruiters = await recruiter.find({ email_address: mail });
        if (Students.length !== 0) {
            return Students[0].password;
        }
        if (result.length !== 0) {
            return result[0].password;
        }
        if (recruiters.length !== 0) {
            return recruiters[0].password;
        }
        return null;
    }
    async function create(req, res) {
        var email_1 = await checkStudent(username);

        if (email_1 === null) {
            res.json({ message: 'User does not exist' });
        } else {
            const token = jwt.sign({ username }, JWT_SECRET, {
                expiresIn: '10m',
            });
            let config = {
                service: 'gmail',
                auth: {
                    user: EMAIL,
                    pass: PASSWORD,
                },
            };
            let transporter = nodemailer.createTransport(config);

            let MailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    name: 'PROJECT PALACE',
                    link: 'https://mailgen.js/',
                },
            });
            let response = {
                body: {
                    name: 'USER',
                    intro: 'Please click on the following link to set your new password:',
                    action: {
                        instructions:
                            'Click the button below to set your new password:',
                        button: {
                            color: '#22BC66',
                            text: 'Set your new password',
                            link: `${FRONTEND_URL}/set-password/np/${token}`,
                        },
                    },
                    outro: 'If you did not request to set a new password, no further action is required on your part.',
                },
            };

            let mail = MailGenerator.generate(response);

            let message = {
                from: EMAIL,
                to: username,
                subject: 'Your OTP for Verification',
                html: mail,
            };
            transporter.sendMail(message);
            res.json({ message: 'Mail Sent' });
        }
    }
    create(req, res);
};

//new-password
const newp = async (req, res) => {
    const { mail, password, cpassword } = req.body;
    async function checkStudent(mail) {
        const Students = await Student.find({ email_address: mail });
        const result = await college.find({ email_address: mail });
        const recruiters = await recruiter.find({ email_address: mail });
        if (Students.length !== 0) {
            return Students[0];
        }
        if (result.length !== 0) {
            return result[0];
        }
        if (recruiters.length !== 0) {
            return recruiters[0];
        }
        return null;
    }
    if (password !== cpassword) {
        res.json({ message: 'Passwords are not same' });
    } else {
        let user = await checkStudent(mail);
        bcrypt.hash(password, 8, async (err, hash) => {
            user.password = hash;
            await user.save();
            res.json({ message: 'success' });
        });
    }
};

//department update
const departments = async (req, res) => {
    const mail = req.session.loggedInemail; // Get the email from session
    const result = req.body.department;
    req.session.third = result;
    res.json({ message: 'user saved', email: mail });
};

//department suggestions
const get_departments = async (req, res) => {
    try {
        const term = req.query.term;
        const regex = new RegExp(term, 'i');
        const departments = await Department.find({ field_name: regex })
            .select('field_name')
            .limit(4);
        const suggestions = departments.map(
            (department) => department.field_name
        );
        res.json(suggestions);
    } catch (err) {
        console.error('Error retrieving departments:', err);
        res.status(500).json({ error: 'Error retrieving departments' });
    }
};

//suggest colleges
const getCollegeDetails = async (req, res) => {
    try {
        const term1 = req.query.term1;
        const regex1 = new RegExp(term1, 'i');
        const colleges = await college
            .find({ college_name: regex1 })
            .select('college_name')
            .limit(10);
        const suggestions1 = colleges.map((college) => college.college_name);
        res.json(suggestions1);
    } catch (err) {
        console.error('Error retrieving colleges:', err);
        res.status(500).json({ error: 'Error in retriveing colleges' });
    }
};

//save collegedetails
const collegeDetails = async (req, res) => {
    const result = req.body.college;
    const check = await college.find({ college_name: result });
    if (check.length === 0) {
        res.json({ message: 'error' });
    } else {
        req.session.fourth = result;
        try {
            const student = new Student({
                student_name: req.session.username,
                email_address: req.session.loggedInemail,
                password: req.session.password,
                field_name: req.session.third,
                college_name: req.session.fourth,
                likes: [],
                photo: new mongoose.Types.ObjectId('65e55060fbd8d3ee2b6f1045'),
                Description: `Hi I am ${req.session.username} from ${req.session.fourth} ${req.session.third} department`,
                versionKey: false,
            });
            await student.save();
            req.session.status = 1;
            res.json({
                message: 'user saved',
                email: req.session.loggedInemail,
            });
        } catch (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Error updating user' });
        }
    }
};

//suggest organization
const getCompanyDetails = async (req, res) => {
    try {
        const term1 = req.query.term1;
        const regex1 = new RegExp(term1, 'i');
        const colleges = await college
            .find({ college_name: regex1, type: 'company' })
            .select('college_name')
            .limit(10);
        const suggestions1 = colleges.map((college) => college.college_name);
        res.json(suggestions1);
    } catch (err) {
        console.error('Error retrieving colleges:', err);
        res.status(500).json({ error: 'Error in retriveing colleges' });
    }
};

//save hr details
const companyDetails = async (req, res) => {
    const mail = req.session.loggedInemail; // Get the email from session
    const result = req.body.college;
    req.session.third = result;

    try {
        const Recruiter = new recruiter({
            hr_name: req.session.username,
            email_address: req.session.loggedInemail,
            password: req.session.password,
            company_name: req.session.third,
            photo: new mongoose.Types.ObjectId('65e55060fbd8d3ee2b6f1045'),
            versionKey: false,
        });
        await Recruiter.save();
        const company = await college
            .findOne({ college_name: result })
            .select('college_name');
        if (company) {
            req.session.status = 1;
            res.json({
                message: 'user saved',
                email: req.session.loggedInemail,
            });
        } else {
            res.json({ message: 'doesnt exist' });
        }
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Error updating user' });
    }
};

//displaying projects in home page after clicking
const homepage = async (req, res) => {
    const { term } = req.query;
    console.log(term);
};

//suggest skills
const getSkill = async (req, res) => {
    try {
        const term1 = decodeURIComponent(req.query.term);
        if (term1.trim() === '') {
            res.json([]);
        } else {
            const languages = req.query.languages;
            const listoflanguages = languages.split(',');
            const a = languages.length + 8;
            const escapedSearchString = term1.replace(
                /[!@%^*()_\-=\[\]{}|;':",.<>\/?~`+&#+]/g,
                '\\$&'
            );
            const regex1 = new RegExp(escapedSearchString, 'i');
            const Skills = await skills
                .find({ skill_name: regex1 })
                .select('skill_name')
                .limit(a)
                .sort({ skill_name: 1 });
            let suggestions2 = Skills.map((Skill) => Skill.skill_name);
            for (let i = 0; i < suggestions2.length; i++) {
                if (listoflanguages.includes(suggestions2[i])) {
                    console.log(suggestions2[i]);
                    suggestions2.splice(i, 1);
                    i--;
                }
            }
            suggestions2.sort((a, b) => a.length - b.length);
            res.json(suggestions2.slice(0, 5));
        }
    } catch (err) {
        console.error('Error retrieving colleges:', err);
        res.status(500).json({ error: 'Error in retriveing colleges' });
    }
};

//suggest students
const getteam = async (req, res) => {
    try {
        const term1 = decodeURIComponent(req.query.term);
        const tims = req.query.teams;
        if (term1.trim() === '') {
            res.json([]);
        } else {
            const regex1 = new RegExp(term1, 'i');
            const teams = await Student.find({
                college_name: req.session.loggedInCollege,
                student_name: regex1,
            })
                .select('student_name')
                .limit(3);
            res.json(teams);
        }
    } catch (err) {
        console.error('Error retrieving colleges:', err);
        res.status(500).json({ error: 'Error in retrieving colleges' });
    }
};

const deletesession = async (req, res) => {
    req.session.destroy();
    res.json('success');
};

const getcount = async (req, res) => {
    const a = await Student.countDocuments();
    const b = await college.countDocuments();
    const c = await recruiter.countDocuments();
    res.json([a, b, c]);
};
module.exports = {
    signin,
    checkSessionEndpoint,
    signup,
    validate_token,
    newp,
    fpassword,
    newuser,
    mailpass,
    signup_college,
    departments,
    get_departments,
    collegeDetails,
    getCollegeDetails,
    getsignupCollege,
    hrsignup,
    newhr,
    companyDetails,
    getCompanyDetails,
    homepage,
    getSkill,
    getteam,
    deletesession,
    getcount,
};
