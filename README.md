<div align="center">
  <a href="https://github.com/vsreddyh/schedio">
    <img src="https://github.com/vsreddyh/schedio/blob/main/frontend/public/favicon.png?raw=true" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Schedio</h3>

  <p align="center">
    A trustworthy platform connecting recruiters and students. 
    <br />
    <a href="https://github.com/vsreddyh/schedio/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/vsreddyh/schedio/issues/new?labels=enhancement">Request Feature</a>
    ·
    <a href="https://schedio-coral.vercel.app">View Website</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/github/issues/vsreddyh/schedio?color=blue" alt="Issues" />
    <img src="https://img.shields.io/github/forks/vsreddyh/schedio" alt="Forks" />
    <img src="https://img.shields.io/github/stars/vsreddyh/schedio" alt="Stars" />
    <img src="https://img.shields.io/github/license/vsreddyh/schedio" alt="License" />
    <img src="https://img.shields.io/github/deployments/vsreddyh/schedio/production?label=Vercel%20Deployment" alt="Vercel Deployment" />
  </p>
</div>

---

## Table of Contents

<details>
	<summary>Expand</summary>
	<ol>
		<li>
			<a href="#about-the-project">About The Project</a>
				<ul>
					<li><a href="#built-with">Built With</a></li>
					<li><a href="#features">Features</a></li>
					<ul>
						<li><a href="#general-features">General Features</a></li>
						<li><a href="#t1-user-features- (student/employee)">T1 Users (Student/Employee)</a></li>
						<li><a href="#t2-user-features-(college/organization)">T2 Users (College/Organization)</a></li>
						<li><a href="#t3-user-features-(recruiter)">T3 Users (Recruiter)</a></li>
					</ul>   
				</ul>
		</li>
		<li><a href="#getting-started">Getting Started</a></li>
		<li><a href="#contributing">Contributing</a></li>
		<li><a href="#screenshots">Screenshots</a></li> 
		<li><a href="#license">License</a></li>
		<li><a href="#contact">Contact</a></li>
	</ol>
</details>

---

## About The Project

![Dashboard](https://github.com/vsreddyh/schedio/blob/main/frontend/public/Project_Photo.png?raw=true)

Schedio provides a platform for students/employees, colleges/organizations, and recruiters to collaborate. It simplifies sharing and understanding projects, offers advanced search and filtering tools, and enables recruiters to discover the right talent.

---

## Built With

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google" alt="Gemini" />
  <img src="https://img.shields.io/badge/RapidAPI-3C3C3D?style=for-the-badge&logo=rapidapi&logoColor=white" alt="RapidAPI" />
</p>

---

## Features

### General Features

1. User Authentication with email (forgot password support)
2. Comprehensive skill dataset
3. Plagiarism check using RapidAPI
4. Upload support for videos, code files, and images
5. Tree-like code structure viewer
6. Code explanation powered by Gemini
7. Session persistence for seamless user experience

###### Note:- T stands for Type

### T1 User Features (Student/Employee)

1. View all projects
2. Search projects by programming language
3. Tokenized search across projects
4. Comment/Like functionality on projects
5. Can be added as contributors by T2 users on project uploads.
6. Add/Edit profile picture and custom Student Description
7. Auto generates Description on Signing up

### T2 User Features (College/ Organisation)

1. View only their T1 users' projects.
2. Monthly Analytics.
3. Upload projects for T1 users.
4. Auto-sync skills and projects with T1 profiles.
5. View and download T1 user profiles as PDFs.

### T3 User Features (Recruiter)

1. Access to all projects.
2. Comment on any project.
3. Filter by Institute or Domain.
4. View and download T1 user profiles.
5. Bookmark users for quick reference.
6. Tokenized search across projects.
7. Tokenized search across students.

---

## Getting Started

To run the project locally, follow these steps.

### Prerequisites

- Node.js & npm
- MongoDB Database
- Git
- Plagiarism Check API Key: [Get it here](https://rapidapi.com/smodin/api/plagiarism-checker-and-auto-citation-generator-multi-lingual)
- Gemini API Key: [Get it here](https://aistudio.google.com/app/apikey)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/vsreddyh/schedio.git
   ```

2. Install dependencies:

   ```sh
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Create a `.env` file in the `./backend` folder with the following structure:

   ```env
   EMAIL=your-email@example.com
   PASSWORD=your-app-password
   JWT_SECRET=random-32-characters
   SESSION_KEY=random-32-characters
   plagarismapi=your-rapidapi-key
   geminiapi=your-gemini-api-key
   url=mongodb://your-connection-url/database-name?retryWrites=true&w=majority
   ```

4. Start the project:
   ```sh
   npm run build && node index.js
   ```

### Installation using Docker

1. Clone the repository:
   ```sh
   git clone https://github.com/vsreddyh/schedio.git
   ```

#### For Development

2. Create a `.env.development` file in the root folder with the following structure:

   ```env
   EMAIL=your-email@example.com
   PASSWORD=your-app-password
   JWT_SECRET=random-32-characters
   SESSION_KEY=random-32-characters
   plagarismapi=your-rapidapi-key
   geminiapi=your-gemini-api-key
   url=mongodb://your-connection-url/database-name?retryWrites=true&w=majority
   FRONTEND_URL=http://localhost:3000
   REACT_APP_BACKEND_URL=http://localhost:3001
   ```

3. Build the image:

   ```sh
   docker build -f development.Dockerfile -t app-dev .
   ```

4. Run the container:
   ```sh
   docker run --env-file .env.development -p 3000:3000 -p 3001:3001 app-dev
   ```

#### For Production

2. Create a `.env.production` file in the root folder with the following structure:

   ```env
   EMAIL=your-email@example.com
   PASSWORD=your-app-password
   JWT_SECRET=random-32-characters
   SESSION_KEY=random-32-characters
   plagarismapi=your-rapidapi-key
   geminiapi=your-gemini-api-key
   url=mongodb://your-connection-url/database-name?retryWrites=true&w=majority
   FRONTEND_URL=website-url
   ```

3. Build the image:

   ```sh
   docker build -f production.Dockerfile --build-arg REACT_APP_BACKEND_URL="website-url" -t app-prod .
   ```

4. Run the container:
   ```sh
   docker run --env-file .env.production -p 3001:3001 app-prod
   ```

---

## Contributing

We welcome contributions of all kinds! Whether it's bug reports, feature suggestions, code improvements, or documentation updates, your help is valuable. Here's how you can get involved:

### How to Contribute

1. **Fork the Repository**
   Click the `Fork` button at the top-right corner of the repository to create a copy of this project on your GitHub account.

2. **Clone the Repository**
   Clone your forked repository locally to make changes:

   ```sh
   git clone https://github.com/your-username/schedio.git
   cd schedio
   ```

3. **Create a New Branch**
   Use meaningful branch names to reflect the type of changes you are making:

   ```sh
   git checkout -b feature/your-feature-name
   ```

   _Example:_  
   `feature/user-authentication` or `feature/fix-login-issue`

4. **Make Your Changes**
   Ensure your changes follow the code style used in the project and include comments where needed. If your change adds new functionality, consider updating or adding tests.

5. **Commit Your Changes**
   Write clear, concise commit messages to describe the changes you made:

   ```sh
   git commit -m "clear and concise commit name"
   ```

6. **Push Your Branch to GitHub**
   Push the branch to your forked repository:

   ```sh
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request (PR)**
   Go to the original repository and click `New Pull Request`. Make sure to:
   - Provide a descriptive title.
   - Reference any related issues (e.g., `Closes #10`).
   - Explain the purpose of your changes and any relevant details in the PR description.

---

### Guidelines for Contributions

- **Follow Code Standards**: Ensure your code follows the project’s existing conventions.
- **Document Changes**: Update documentation if your changes introduce new features or require configuration updates.
- **Test Your Code**: Make sure any new or modified functionality works as expected.
- **Respect Others**: Be kind and constructive in discussions, reviews, and comments.

---

### Reporting Issues and Suggesting Features

If you encounter bugs or have ideas for new features, please open an issue:

- **Report Bugs**: [Create a Bug Report](https://github.com/vsreddyh/schedio/issues/new?labels=bug)
- **Request Features**: [Suggest a Feature](https://github.com/vsreddyh/schedio/issues/new?labels=enhancement)

Make sure to:

- Provide as much detail as possible.
- Include steps to reproduce bugs, if applicable.

---

### Thank You for Contributing! 🎉

Your effort makes a huge difference! Every bug report, feature request, and pull request helps us improve and grow this project.

---

## Screenshots

![](https://github.com/vsreddyh/schedio/blob/main/frontend/public/Project.png?raw=true)<p style="text-align: center;">Project Page</p>

![](https://github.com/vsreddyh/schedio/blob/main/frontend/public/Explorer.png?raw=true)<p style="text-align: center;">Opening a File in Project's Code files</p>

![](https://github.com/vsreddyh/schedio/blob/main/frontend/public/Gemini.png?raw=true)<p style="text-align: center;">Using Gemini to explain code files</p>

![](https://github.com/vsreddyh/schedio/blob/main/frontend/public/Language%20Search.png?raw=true)<p style="text-align: center;">Suggestions for language filters</p>

![](https://github.com/vsreddyh/schedio/blob/main/frontend/public/LikedProjects.png?raw=true)<p style="text-align: center;">Liked Projects in T1 users page</p>

![](https://github.com/vsreddyh/schedio/blob/main/frontend/public/My%20profile.png?raw=true)<p style="text-align: center;">T1 user Profile Page</p>

![](https://github.com/vsreddyh/schedio/blob/main/frontend/public/Status.png?raw=true)<p style="text-align: center;">Log out option in T1 users</p>

![](https://github.com/vsreddyh/schedio/blob/main/frontend/public/college.png?raw=true)

<p style="text-align: center;">Organization HomePage</p>

![](https://github.com/vsreddyh/schedio/blob/main/frontend/public/student_profile.png?raw=true)<p style="text-align: center;">Student Page viewed by T3,T2 users</p>

![](https://github.com/vsreddyh/schedio/blob/main/frontend/public/college_search.png?raw=true)

<p style="text-align: center;">Filtering by college in Recruiter page</p>

![](https://github.com/vsreddyh/schedio/blob/main/frontend/public/Bookmark.png?raw=true)

<p style="text-align: center;">Bookmarks in recruiter page</p>

---

## License

This project is licensed under the GNU Affero General Public License v3.0. See the [LICENSE](https://github.com/vsreddyh/schedio/blob/main/LICENSE) file for more details.

---

## Contact

Have questions? Reach us at [teamschedio@gmail.com](mailto:teamschedio@gmail.com).
