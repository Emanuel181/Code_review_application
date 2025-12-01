<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<img src="Code_review_application.png" width="30%" style="position: relative; top: 0; right: 0;" alt="Project Logo"/>

# CODE_REVIEW_APPLICATION

<em>Transforming Code Reviews Into Smarter, Faster Insights</em>

<!-- BADGES -->
<img src="https://img.shields.io/github/license/Emanuel181/Code_review_application?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
<img src="https://img.shields.io/github/last-commit/Emanuel181/Code_review_application?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/Emanuel181/Code_review_application?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/Emanuel181/Code_review_application?style=flat&color=0080ff" alt="repo-language-count">

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white" alt="Markdown">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=flat&logo=dotenv&logoColor=black" alt=".ENV">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
<br>
<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=flat&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions">
<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=Prisma&logoColor=white" alt="Prisma">
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">

</div>
<br>

---

## 📄 Table of Contents

- [Overview](#-overview)
- [Architecture](#architecture)
- [Getting Started](#-getting-started)
    - [Prerequisites](#-prerequisites)
    - [Installation](#-installation)
    - [Usage](#-usage)
    - [Testing](#-testing)
- [Features](#-features)
- [Project Structure](#-project-structure)
    - [Project Index](#-project-index)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Overview

Code_review_application is a comprehensive platform designed to streamline code quality, collaboration, and deployment workflows. It leverages AI-powered analysis with a locally hosted Large Language Model to provide insightful code reviews, issue detection, and suggestions—all while maintaining privacy. The system also features secure, expiring file sharing, detailed version control with diffing, and an automated deployment pipeline using Docker, Prisma, and ECS. Its rich UI components facilitate efficient file management, review, and team collaboration, making it an essential tool for modern development teams seeking automation, security, and high-quality code standards.

This project enhances developer productivity by integrating intelligent code review, secure sharing, and automated deployment into a unified environment. The core features include:

- 🧠 **AI-Powered Code Review:** Utilizes a local Large Language Model for privacy-focused, comprehensive code analysis and suggestions.
- 🔒 **Secure File Sharing:** Enables creation of expiring, permission-based share links for seamless collaboration.
- 📜 **Version Control & Diffing:** Tracks file history and visualizes changes to support effective review and rollback.
- 🚀 **Automated Deployment:** Orchestrates build, test, and deployment processes with Docker, Prisma, and ECS for reliable releases.
- 🎨 **Rich UI Components:** Provides intuitive interfaces for file management, code review, and team communication.

---

## Architecture
![Architecture]([./images/photo.png](https://github.com/Emanuel181/Code_review_application/blob/main/Screenshot%202025-11-01%20171827.png))
---


## 📌 Features

|      | Component       | Details                                                                                     |
| :--- | :-------------- | :------------------------------------------------------------------------------------------ |
| ⚙️  | **Architecture**  | <ul><li>Next.js framework for server-side rendering and React-based frontend</li><li>Prisma ORM for database interactions</li><li>Modular component structure with React and Radix UI</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>TypeScript for static typing and improved maintainability</li><li>ESLint and @typescript-eslint for linting and code consistency</li><li>Pre-configured with code analysis tools like SonarQube (via qodana.yaml)</li></ul> |
| 📄 | **Documentation** | <ul><li>README with project overview and setup instructions</li><li>Component documentation via components.json</li><li>Inline code comments and schema documentation (schema.prisma)</li></ul> |
| 🔌 | **Integrations**  | <ul><li>GitHub Actions workflows for CI/CD (deploy.yml)</li><li>Dockerfile for containerization</li><li>AWS SDK (@aws-sdk/client-s3, @aws-sdk/s3-request-presigner) for cloud storage</li><li>Next.js plugins and Tailwind CSS for styling</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Component-based React architecture with Radix UI components</li><li>Separation of concerns via Prisma schema and API routes</li><li>Configurable via components.json and schema.prisma</li></ul> |
| 🧪 | **Testing**       | <ul><li>Testing setup implied with ESLint and TypeScript; specific test frameworks not explicitly listed</li><li>Potential use of Mammoth, Archiver for content processing and file handling in tests</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Next.js SSR and static generation for fast page loads</li><li>Tailwind CSS for optimized styling</li><li>Use of S3 SDK for efficient media storage and retrieval</li></ul> |
| 🛡️ | **Security**      | <ul><li>Environment variables via dotenv for secret management</li><li>Secure AWS SDK integrations with presigned URLs</li><li>ESLint and TypeScript for code safety</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Core: React, Next.js, Prisma, Tailwind CSS</li><li>Utilities: @aws-sdk, mammoth, archiver, nanoid, lucide-react</li><li>DevTools: ESLint, @typescript-eslint, qodana.yaml</li></ul> |

---

## 📁 Project Structure

```sh
└── Code_review_application/
    ├── .github
    │   └── workflows
    ├── Dockerfile
    ├── FILE_SHARING_COMPLETE.md
    ├── README.md
    ├── Screenshot 2025-11-01 171827.png
    ├── components.json
    ├── eslint.config.mjs
    ├── jsconfig.json
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── prisma
    │   └── schema.prisma
    ├── prisma.config.ts
    ├── qodana.yaml
    ├── sonar-project.properties
    └── src
        ├── app
        ├── components
        ├── lib
        ├── proxy.js
        └── scripts
```

---

### 📑 Project Index

<details open>
	<summary><b><code>CODE_REVIEW_APPLICATION/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/Dockerfile'>Dockerfile</a></b></td>
					<td style='padding: 8px;'>- Defines the containerized environment for a Next.js application with Prisma integration, orchestrating dependency installation, build processes, and production setup<br>- Facilitates efficient deployment by ensuring consistent runtime conditions, managing environment variables, and preparing the app for scalable execution in cloud environments<br>- Serves as the foundation for deploying a secure, optimized, and maintainable web service within the overall architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/components.json'>components.json</a></b></td>
					<td style='padding: 8px;'>- Defines project-wide UI component configurations aligned with the New York style theme, ensuring consistent styling and structure across the codebase<br>- Facilitates seamless integration of components, icons, and utilities within a modern, server-rendered React environment, supporting streamlined development and maintainability of the applications user interface.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/jsconfig.json'>jsconfig.json</a></b></td>
					<td style='padding: 8px;'>- Defines path aliasing for streamlined module resolution across the project, enhancing developer experience and maintainability<br>- By establishing a clear mapping between the root source directory and the alias, it simplifies import statements and supports scalable project architecture within the JavaScript codebase.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/README.md'>README.md</a></b></td>
					<td style='padding: 8px;'>- Provides an overview of the AI-powered code review system, emphasizing its role in analyzing source code to identify issues, generate insights, and suggest improvements<br>- It highlights the integration of a locally hosted Large Language Model to ensure privacy and performance, supporting comprehensive, guideline-aware, and efficient code evaluations within the broader architecture of the review automation platform.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/eslint.config.mjs'>eslint.config.mjs</a></b></td>
					<td style='padding: 8px;'>- Defines and configures ESLint settings to enforce code quality standards across the project<br>- Integrates core web vitals rules for Next.js and customizes ignore patterns to exclude build artifacts and environment files<br>- Ensures consistent linting behavior, supporting maintainability and adherence to best practices within the overall architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/FILE_SHARING_COMPLETE.md'>FILE_SHARING_COMPLETE.md</a></b></td>
					<td style='padding: 8px;'>- Implements a comprehensive file sharing system enabling users to generate secure, expiring share links with granular permissions for viewing, editing, commenting, and analysis<br>- Supports collaborative workflows with detailed change tracking, comments, and security features, integrating authentication, database management, and cloud storage to facilitate seamless, permission-controlled file access and collaboration within the broader application architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/postcss.config.mjs'>postcss.config.mjs</a></b></td>
					<td style='padding: 8px;'>- Configures PostCSS to integrate Tailwind CSS into the project’s styling pipeline, enabling utility-first CSS features<br>- Serves as a foundational component within the overall architecture by ensuring consistent, optimized styling across the application, facilitating maintainability and scalability of the user interface design.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Defines project metadata, dependencies, and scripts for managing development, build, and deployment workflows within a Next.js-based web application<br>- Facilitates seamless integration of tools like Prisma, Tailwind CSS, and AWS SDK, ensuring consistent environment setup and automation across the codebase<br>- Serves as the foundational configuration that orchestrates core development processes and package management.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/next.config.mjs'>next.config.mjs</a></b></td>
					<td style='padding: 8px;'>- Defines the Next.js application configuration to enable React compiler, ensure a standalone build, and set global HTTP headers for cache control<br>- It optimizes the applications performance and security by controlling caching behavior and preparing the project for deployment as a self-contained, production-ready server.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/qodana.yaml'>qodana.yaml</a></b></td>
					<td style='padding: 8px;'>- Defines the configuration for Qodana code analysis, establishing inspection profiles, quality gates, and CI/CD integration parameters<br>- It ensures consistent, automated code quality checks for JavaScript projects, guiding development standards and maintaining code health across the entire codebase architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/prisma.config.ts'>prisma.config.ts</a></b></td>
					<td style='padding: 8px;'>- Defines the Prisma ORM configuration, establishing database connection settings and migration paths<br>- It facilitates seamless integration with the PostgreSQL database by managing environment variables and providing a fallback URL during setup<br>- This configuration ensures consistent schema management and supports Prismas code generation and migration workflows within the overall project architecture.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- src Submodule -->
	<details>
		<summary><b>src</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ src</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/proxy.js'>proxy.js</a></b></td>
					<td style='padding: 8px;'>- Implements authentication middleware across the application, ensuring secure access control for protected routes while allowing public access to specific pages<br>- It dynamically manages redirect URIs based on environment variables and matches all relevant routes to facilitate consistent authentication enforcement throughout the codebase<br>- This setup integrates seamlessly with the overall architecture to maintain secure, user-friendly navigation.</td>
				</tr>
			</table>
			<!-- scripts Submodule -->
			<details>
				<summary><b>scripts</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.scripts</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/scripts/test-llm-config.js'>test-llm-config.js</a></b></td>
							<td style='padding: 8px;'>- Validate and verify the configuration, health status, and basic functionality of the large language model (LLM) integration within the system<br>- Ensures the LLM service is operational, correctly configured, and capable of generating responses, thereby supporting reliable deployment and troubleshooting of the overall architecture.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- components Submodule -->
			<details>
				<summary><b>components</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.components</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/incremental-history-analysis.jsx'>incremental-history-analysis.jsx</a></b></td>
							<td style='padding: 8px;'>- Facilitates incremental version history analysis and comparison within the application, enabling users to review changes, issues, and quality metrics across different file versions<br>- Supports fetching version data, running analyses, and visualizing differences, thereby enhancing code review workflows and tracking evolution over time in the overall architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/tree-view.jsx'>tree-view.jsx</a></b></td>
							<td style='padding: 8px;'>- Implements an interactive, accessible tree view component supporting nested structures, item selection, drag-and-drop reordering, and expandable/collapsible nodes<br>- Integrates with Radix UIs accordion primitives for smooth animations and state management, enabling dynamic navigation and manipulation of hierarchical data within the broader application architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/file-version-history.jsx'>file-version-history.jsx</a></b></td>
							<td style='padding: 8px;'>- Provides an interactive interface for viewing and managing file version history within the application<br>- Enables users to fetch, display, and compare different versions, offering insights into version metadata and facilitating version selection for comparison<br>- Integrates seamlessly into the overall architecture to support version control and change tracking functionalities.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/review-comments.jsx'>review-comments.jsx</a></b></td>
							<td style='padding: 8px;'>- Facilitates inline review comment management within a codebase, enabling users to load, add, reply to, and resolve comments associated with specific files<br>- Supports nested replies and status tracking, enhancing collaborative code review workflows<br>- Integrates with backend APIs for persistent comment storage and updates, contributing to streamlined review processes and improved team communication.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/file-editor.jsx'>file-editor.jsx</a></b></td>
							<td style='padding: 8px;'>- Provides an interactive interface for editing, saving, and managing file content within the application<br>- Facilitates version history access, change tracking, and real-time updates, ensuring users can efficiently modify files while maintaining version control<br>- Integrates seamlessly with backend APIs for persistent storage and version management, supporting a streamlined workflow for code or content editing in the broader system architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/chat-interface.jsx'>chat-interface.jsx</a></b></td>
							<td style='padding: 8px;'>- Provides a user interface indicating the removal of the AI chat feature, guiding users back to the home page<br>- It serves as a placeholder within the applications architecture to inform users about feature updates and maintain seamless navigation, ensuring clarity and continuity in the user experience after the chat functionality has been deprecated.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/code-review-panel.jsx'>code-review-panel.jsx</a></b></td>
							<td style='padding: 8px;'>- The <code>CodeReviewPanel</code> component serves as an interactive interface for reviewing and analyzing code files within the application<br>- It consolidates various review-related functionalities—such as displaying comments, version history, and incremental analysis—into a unified panel, enabling users to efficiently assess code quality, track changes, and collaborate<br>- This component integrates AI-driven review insights alongside traditional review data, enhancing the overall code review process<br>- It is a key part of the applications architecture, facilitating seamless, comprehensive code evaluations directly within the user interface.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/folder-analysis-panel.jsx'>folder-analysis-panel.jsx</a></b></td>
							<td style='padding: 8px;'>- Provides an interactive user interface for initiating, monitoring, and displaying comprehensive security analysis of project folders<br>- It visualizes key metrics, presents detailed insights into individual files, and highlights issues with severity indicators, facilitating efficient review and management of code quality, security, and linting results within the overall application architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/files-list.jsx'>files-list.jsx</a></b></td>
							<td style='padding: 8px;'>- Provides a comprehensive interface for managing files within a specified folder, enabling users to view, edit, download, overwrite, and delete files seamlessly<br>- Integrates file size formatting, upload handling, and confirmation dialogs, ensuring smooth user interactions and maintaining synchronization with backend storage<br>- Serves as a core component for file management within the overall application architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/sign-in-button.jsx'>sign-in-button.jsx</a></b></td>
							<td style='padding: 8px;'>- Provides a sign-in button component that dynamically displays loading, sign-in, or sign-out states based on user authentication status<br>- Integrates with the authentication system to facilitate seamless user session management within the applications UI, supporting a consistent and intuitive user experience across the overall architecture.</td>
						</tr>
					</table>
					<!-- folder-tree-new Submodule -->
					<details>
						<summary><b>folder-tree-new</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.components.folder-tree-new</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/folder-tree-new/FolderTreeDialogs.jsx'>FolderTreeDialogs.jsx</a></b></td>
									<td style='padding: 8px;'>- Defines and manages dialog components for folder and file operations within the folder tree interface, facilitating user interactions such as creating, deleting, and overwriting files or folders<br>- Integrates various dialog components to streamline user workflows, ensuring consistent handling of confirmation and cancellation actions across the folder management system within the applications architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/folder-tree-new/index.jsx'>index.jsx</a></b></td>
									<td style='padding: 8px;'>- The <code>FolderTree</code> component serves as the central interface for navigating, managing, and interacting with a hierarchical folder and file structure within the application<br>- It orchestrates core functionalities such as folder expansion, creation, deletion, file editing, and sharing, providing users with an intuitive and dynamic view of their project assets<br>- By integrating various UI elements and state management hooks, this component facilitates seamless user interactions, including file review, folder analysis, and content editing, thereby enabling efficient project organization and collaboration within the overall architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/folder-tree-new/utils.js'>utils.js</a></b></td>
									<td style='padding: 8px;'>- Provides utility functions for file operations, specifically extracting file extensions from filenames<br>- These helpers support the broader folder tree component by enabling accurate identification and handling of different file types, facilitating navigation, display, and management within the file explorer interface of the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/folder-tree-new/FolderDialogs.jsx'>FolderDialogs.jsx</a></b></td>
									<td style='padding: 8px;'>- Provides user interface dialogs for creating, deleting, and overwriting folders and files within a hierarchical file management system<br>- These components facilitate seamless user interactions for managing folder structures and file uploads, integrating with the overall architecture to support intuitive file organization and modification workflows.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/folder-tree-new/FolderTreeHeader.jsx'>FolderTreeHeader.jsx</a></b></td>
									<td style='padding: 8px;'>- Provides the header interface for the file explorer, enabling users to create new folders, download all files as a ZIP, and expand or collapse all folders<br>- It facilitates user interactions within the folder tree component, supporting efficient navigation and management of file structures in the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/folder-tree-new/useFolderTreeNew.js'>useFolderTreeNew.js</a></b></td>
									<td style='padding: 8px;'>- Provides core functionality for managing folder and file operations within a hierarchical storage interface<br>- Facilitates folder creation, deletion, movement, and file overwriting, while handling user interactions such as drag-and-drop, dialogs, and notifications<br>- Integrates with backend APIs to ensure seamless updates to the storage structure, supporting an intuitive and responsive user experience in the overall application architecture.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- ui Submodule -->
					<details>
						<summary><b>ui</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.components.ui</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/ui/progress.jsx'>progress.jsx</a></b></td>
									<td style='padding: 8px;'>- Provides a reusable progress indicator component integrated with Radix UI primitives, enabling consistent visual feedback for ongoing processes within the applications user interface<br>- It supports dynamic progress updates and customizable styling, contributing to a cohesive and accessible user experience across the project’s component architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/ui/scroll-area.jsx'>scroll-area.jsx</a></b></td>
									<td style='padding: 8px;'>- Provides a reusable scroll area component leveraging Radix UI primitives to enable customizable, accessible scrolling regions within the user interface<br>- Facilitates smooth, styled scrollbars for both vertical and horizontal orientations, enhancing user experience and interface consistency across the application<br>- Integrates seamlessly into the overall component architecture to support complex layouts requiring scrollable content.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/ui/input.jsx'>input.jsx</a></b></td>
									<td style='padding: 8px;'>- Defines a reusable Input component that standardizes user input fields across the application, ensuring consistent styling and behavior<br>- It integrates seamlessly within the component-based architecture, facilitating maintainability and a cohesive user interface experience throughout the project.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/ui/sonner.jsx'>sonner.jsx</a></b></td>
									<td style='padding: 8px;'>- Provides a customizable toast notification component integrated with theme support, enabling consistent and visually appealing user alerts across the application<br>- It leverages iconography and styling options to deliver clear success, error, warning, info, and loading messages, enhancing user experience and feedback within the overall UI architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/ui/card.jsx'>card.jsx</a></b></td>
									<td style='padding: 8px;'>- Defines a modular, reusable Card component suite for consistent UI presentation<br>- Facilitates structured content organization with distinct sections like header, footer, title, description, content, and actions, enabling flexible and accessible card layouts within the overall design system<br>- Enhances visual coherence and user experience across the application’s interface.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/ui/tooltip.jsx'>tooltip.jsx</a></b></td>
									<td style='padding: 8px;'>- Provides a reusable tooltip component built on Radix UI primitives, enabling consistent and accessible tooltip functionality across the application<br>- Facilitates easy integration of styled, animated tooltips with customizable positioning and appearance, supporting enhanced user experience and interface clarity within the overall component architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/ui/badge.jsx'>badge.jsx</a></b></td>
									<td style='padding: 8px;'>- Defines a reusable Badge component for UI consistency, enabling styled, variant-driven visual indicators within the application<br>- It supports multiple visual styles such as default, secondary, destructive, and outline, facilitating clear and consistent status or category labels across the project’s interface<br>- This component enhances the overall design system by providing a flexible, accessible, and easily customizable badge element.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/ui/tree-view.jsx'>tree-view.jsx</a></b></td>
									<td style='padding: 8px;'>- Provides a flexible, accessible, and interactive tree view component for hierarchical data navigation<br>- Supports selection, expansion, icons, drag-and-drop, and customizable actions, enabling seamless integration into complex user interfaces<br>- Facilitates both controlled and uncontrolled states, ensuring adaptability within diverse application architectures.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/ui/select.jsx'>select.jsx</a></b></td>
									<td style='padding: 8px;'>- Provides a customizable, accessible dropdown select component built with Radix UI primitives and React<br>- Facilitates consistent, styled selection menus with support for grouping, scrolling, and indicators, enhancing user interface consistency and usability across the application<br>- Integrates seamlessly into the overall architecture to enable flexible, reusable selection interactions.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/ui/button.jsx'>button.jsx</a></b></td>
									<td style='padding: 8px;'>- Defines a versatile, styled Button component for the UI library, enabling consistent button rendering across the application<br>- Supports multiple variants and sizes, ensuring design flexibility and accessibility<br>- Integrates with Radix UI for composability and utility functions for class management, contributing to a cohesive, reusable component architecture within the overall frontend framework.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/ui/file-upload.jsx'>file-upload.jsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates user-driven file uploads by enabling selection, drag-and-drop, and folder organization within the application<br>- Manages file metadata, provides real-time upload progress, and interacts with backend APIs to generate presigned URLs for secure cloud storage<br>- Enhances user experience through customizable filenames, folder assignment, and comprehensive upload controls, integrating seamlessly into the overall architecture for efficient file management.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/ui/textarea.jsx'>textarea.jsx</a></b></td>
									<td style='padding: 8px;'>- Provides a reusable, styled textarea component integral to the user interface, enabling consistent and accessible multi-line text input across the application<br>- It enhances the overall design system by encapsulating styling and behavior, supporting seamless integration within various forms and interactive elements in the project’s component architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/ui/alert-dialog.jsx'>alert-dialog.jsx</a></b></td>
									<td style='padding: 8px;'>- Provides a customizable alert dialog component built with Radix UI primitives, enabling consistent modal interactions across the application<br>- It encapsulates dialog structure, styling, and accessibility features, facilitating seamless integration and user experience within the overall UI architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/components/ui/dialog.jsx'>dialog.jsx</a></b></td>
									<td style='padding: 8px;'>- Defines a reusable, accessible dialog component leveraging Radix UI primitives, enabling consistent modal interactions across the application<br>- It manages dialog structure, overlay, header, footer, and close actions, ensuring a cohesive user experience with smooth animations and styling<br>- Integrates seamlessly into the overall UI architecture, promoting maintainability and design consistency for modal dialogs.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- app Submodule -->
			<details>
				<summary><b>app</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.app</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/page.js'>page.js</a></b></td>
							<td style='padding: 8px;'>- Handles user authentication flow by verifying login status and redirecting authenticated users to the main application page<br>- Presents a welcoming interface with a sign-in prompt for unauthenticated visitors, ensuring seamless access control within the overall application architecture<br>- This component centralizes user access management and enhances user experience during the sign-in process.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/layout.js'>layout.js</a></b></td>
							<td style='padding: 8px;'>- Establishes the foundational layout for the application, integrating global styles, authentication, and user impersonation features<br>- Facilitates consistent rendering of child components within a styled, accessible environment while enabling secure user management and real-time notifications, thereby supporting a cohesive and scalable architecture for the overall project.</td>
						</tr>
					</table>
					<!-- home-page Submodule -->
					<details>
						<summary><b>home-page</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.app.home-page</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/home-page/page.jsx'>page.jsx</a></b></td>
									<td style='padding: 8px;'>- Provides the main interface for user interaction with file management, enabling browsing, uploading, and organizing files within a folder structure<br>- Facilitates seamless user experience by fetching and displaying user data, existing files, and folders, while supporting real-time updates upon file uploads or folder modifications<br>- Integrates sign-out functionality, ensuring secure session management within the applications architecture.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- actions Submodule -->
					<details>
						<summary><b>actions</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.app.actions</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/actions/signOut.js'>signOut.js</a></b></td>
									<td style='padding: 8px;'>- Facilitates user sign-out functionality within the application by invoking the signOut method from the authkit library<br>- Integrates seamlessly into the authentication flow, ensuring secure session termination and maintaining overall security posture of the system<br>- Supports the broader architecture by enabling consistent and reliable user logout processes across the platform.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- login Submodule -->
					<details>
						<summary><b>login</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.app.login</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/login/route.js'>route.js</a></b></td>
									<td style='padding: 8px;'>- Facilitates user authentication by generating a WorkOS sign-in URL and redirecting users to the login interface<br>- Integrates seamlessly within the applications routing architecture to enable secure, streamlined access control, supporting the overall authentication flow in the project’s architecture<br>- This component ensures users are directed to the appropriate external identity provider for sign-in.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- callback Submodule -->
					<details>
						<summary><b>callback</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.app.callback</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/callback/route.js'>route.js</a></b></td>
									<td style='padding: 8px;'>- Facilitates user authentication flow by handling callback responses and managing post-authentication actions<br>- Integrates with WorkOS to authenticate users and ensures user data synchronization upon successful login<br>- Supports seamless redirection to the designated homepage, maintaining consistent user session management within the applications architecture.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- share Submodule -->
					<details>
						<summary><b>share</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.app.share</b></code>
							<!-- [token] Submodule -->
							<details>
								<summary><b>[token]</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.share.[token]</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/share/[token]/page.jsx'>page.jsx</a></b></td>
											<td style='padding: 8px;'>- SharedFilePage ComponentThis component serves as the core interface for viewing and interacting with shared code files within the application<br>- It enables users to access a specific file via a unique token, view its content, and engage with it through comments and analysis features<br>- By integrating real-time comments, code analysis, and sharing capabilities, this page facilitates collaborative review and understanding of code snippets, supporting the broader architecture of a collaborative code review and sharing platform.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- api Submodule -->
					<details>
						<summary><b>api</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.app.api</b></code>
							<!-- files Submodule -->
							<details>
								<summary><b>files</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.files</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/files/route.js'>route.js</a></b></td>
											<td style='padding: 8px;'>- Provides an API endpoint for authenticated users to retrieve a list of their files stored in S3, including metadata and accessible URLs<br>- Facilitates seamless integration of user-specific file management within the application, supporting secure access and organized presentation of stored files as part of the overall architecture.</td>
										</tr>
									</table>
									<!-- move Submodule -->
									<details>
										<summary><b>move</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.files.move</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/files/move/route.js'>route.js</a></b></td>
													<td style='padding: 8px;'>- Facilitates secure file relocation within the applications storage system by handling user-authenticated requests to move files between folders in an S3 bucket<br>- Ensures proper authorization, maintains data integrity during the move, and updates file paths accordingly, supporting organized file management in the overall architecture.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- delete Submodule -->
									<details>
										<summary><b>delete</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.files.delete</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/files/delete/route.js'>route.js</a></b></td>
													<td style='padding: 8px;'>- Handles authenticated deletion of user-specific files from cloud storage, ensuring only authorized users can remove their own files<br>- Integrates user authentication, verifies ownership based on file key prefix, and performs secure deletion, contributing to the overall data management and security architecture of the application.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<!-- share Submodule -->
							<details>
								<summary><b>share</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.share</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/share/route.js'>route.js</a></b></td>
											<td style='padding: 8px;'>- Facilitates secure sharing of files through creation, retrieval, and revocation of shareable links<br>- Manages user-authenticated operations to generate unique access tokens, list active shares, and revoke links, integrating with the database to ensure proper permissions and expiration handling within the overall file management architecture.</td>
										</tr>
									</table>
									<!-- [token] Submodule -->
									<details>
										<summary><b>[token]</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.share.[token]</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/share/[token]/route.js'>route.js</a></b></td>
													<td style='padding: 8px;'>- Facilitates secure access to shared files via unique tokens by validating link status, permissions, and expiration, then retrieving file content from cloud storage when permitted<br>- Integrates with the database to verify share link details and ownership, supporting controlled, time-limited sharing within the applications architecture.</td>
												</tr>
											</table>
											<!-- comment Submodule -->
											<details>
												<summary><b>comment</b></summary>
												<blockquote>
													<div class='directory-path' style='padding: 8px 0; color: #666;'>
														<code><b>⦿ src.app.api.share.[token].comment</b></code>
													<table style='width: 100%; border-collapse: collapse;'>
													<thead>
														<tr style='background-color: #f8f9fa;'>
															<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
															<th style='text-align: left; padding: 8px;'>Summary</th>
														</tr>
													</thead>
														<tr style='border-bottom: 1px solid #eee;'>
															<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/share/[token]/comment/route.js'>route.js</a></b></td>
															<td style='padding: 8px;'>- Facilitates the retrieval and management of comments associated with shared content identified by a unique token<br>- Integrates comment-related operations within the sharing feature, enabling users to view and interact with comments tied to specific shared items<br>- Supports the overall architecture by ensuring seamless comment handling within the sharing and collaboration workflow.</td>
														</tr>
													</table>
												</blockquote>
											</details>
											<!-- edit Submodule -->
											<details>
												<summary><b>edit</b></summary>
												<blockquote>
													<div class='directory-path' style='padding: 8px 0; color: #666;'>
														<code><b>⦿ src.app.api.share.[token].edit</b></code>
													<table style='width: 100%; border-collapse: collapse;'>
													<thead>
														<tr style='background-color: #f8f9fa;'>
															<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
															<th style='text-align: left; padding: 8px;'>Summary</th>
														</tr>
													</thead>
														<tr style='border-bottom: 1px solid #eee;'>
															<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/share/[token]/edit/route.js'>route.js</a></b></td>
															<td style='padding: 8px;'>- Facilitates secure editing of shared files through a REST API endpoint by validating access permissions, updating file content in cloud storage, and recording edit history<br>- Integrates with Prisma for permission verification and history tracking, ensuring authorized modifications within the overall architecture that manages file sharing, versioning, and access control.</td>
														</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<!-- folders Submodule -->
							<details>
								<summary><b>folders</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.folders</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/folders/route.js'>route.js</a></b></td>
											<td style='padding: 8px;'>- Provides API endpoints to manage user-specific folder structures within an S3-based storage system<br>- Facilitates listing all accessible folders and creating new virtual folders, supporting organized file management and navigation for authenticated users in the application<br>- Ensures secure access and seamless folder handling aligned with the overall storage architecture.</td>
										</tr>
									</table>
									<!-- download-all Submodule -->
									<details>
										<summary><b>download-all</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.folders.download-all</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/folders/download-all/route.js'>route.js</a></b></td>
													<td style='padding: 8px;'>- Facilitates bulk download of user-specific files stored in S3 by aggregating all relevant objects into a single ZIP archive<br>- Ensures secure access through authentication, efficiently streams multiple files, and delivers a consolidated package for seamless user retrieval within the applications architecture.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- move Submodule -->
									<details>
										<summary><b>move</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.folders.move</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/folders/move/route.js'>route.js</a></b></td>
													<td style='padding: 8px;'>- Facilitates secure folder relocation within an S3-based storage system by handling user authentication, validating move operations, and efficiently transferring all objects from the source to the target directory<br>- Integrates seamlessly into the applications API layer, supporting organized file management and maintaining data integrity during folder moves in the overall architecture.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- download Submodule -->
									<details>
										<summary><b>download</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.folders.download</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/folders/download/route.js'>route.js</a></b></td>
													<td style='padding: 8px;'>- Facilitates secure, on-demand download of user-specific folders from AWS S3 by aggregating folder contents into a ZIP archive<br>- Ensures authenticated access, dynamically retrieves folder files, and streams the compressed package as a downloadable response, integrating seamlessly into the applications architecture for efficient file management and user data retrieval.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- delete Submodule -->
									<details>
										<summary><b>delete</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.folders.delete</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/folders/delete/route.js'>route.js</a></b></td>
													<td style='padding: 8px;'>- Facilitates secure deletion of user-specific folders in an S3 bucket by authenticating requests, listing all objects within the specified folder, and removing them in bulk<br>- Ensures proper authorization and error handling, integrating seamlessly into the applications API layer to manage cloud storage cleanup operations efficiently.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<!-- upload Submodule -->
							<details>
								<summary><b>upload</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.upload</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/upload/route.js'>route.js</a></b></td>
											<td style='padding: 8px;'>- Facilitates secure client-side uploads by generating pre-signed URLs for file storage in Amazon S3, ensuring authenticated users can upload files to designated folders<br>- Integrates authentication checks and interacts with cloud storage to streamline the upload process within the applications architecture, supporting efficient and secure file management workflows.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- file-content Submodule -->
							<details>
								<summary><b>file-content</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.file-content</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/file-content/route.js'>route.js</a></b></td>
											<td style='padding: 8px;'>- Facilitates secure retrieval and storage of file content within the applications architecture by interfacing with Amazon S3<br>- Ensures authenticated access for users to fetch or update files, supporting seamless content management and synchronization across the system<br>- Serves as a critical API layer enabling efficient, secure file operations integral to the platforms data handling capabilities.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- file-version Submodule -->
							<details>
								<summary><b>file-version</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.file-version</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/file-version/route.js'>route.js</a></b></td>
											<td style='padding: 8px;'>- Provides API endpoints to manage file versioning by retrieving version history and statistics, as well as storing new file versions<br>- Integrates authentication, interacts with storage and version tracking services, and ensures consistent version control within the applications architecture<br>- Facilitates seamless file change tracking and management across the system.</td>
										</tr>
									</table>
									<!-- [id] Submodule -->
									<details>
										<summary><b>[id]</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.file-version.[id]</b></code>
											<!-- diff Submodule -->
											<details>
												<summary><b>diff</b></summary>
												<blockquote>
													<div class='directory-path' style='padding: 8px 0; color: #666;'>
														<code><b>⦿ src.app.api.file-version.[id].diff</b></code>
													<table style='width: 100%; border-collapse: collapse;'>
													<thead>
														<tr style='background-color: #f8f9fa;'>
															<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
															<th style='text-align: left; padding: 8px;'>Summary</th>
														</tr>
													</thead>
														<tr style='border-bottom: 1px solid #eee;'>
															<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/file-version/[id]/diff/route.js'>route.js</a></b></td>
															<td style='padding: 8px;'>- Facilitates retrieval and comparison of different file versions by generating detailed diffs, enabling users to track changes over time within the project’s version history<br>- Integrates authentication, version fetching, and diff calculation to support insights into file evolution, supporting version management and change auditing across the codebase architecture.</td>
														</tr>
													</table>
												</blockquote>
											</details>
											<!-- content Submodule -->
											<details>
												<summary><b>content</b></summary>
												<blockquote>
													<div class='directory-path' style='padding: 8px 0; color: #666;'>
														<code><b>⦿ src.app.api.file-version.[id].content</b></code>
													<table style='width: 100%; border-collapse: collapse;'>
													<thead>
														<tr style='background-color: #f8f9fa;'>
															<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
															<th style='text-align: left; padding: 8px;'>Summary</th>
														</tr>
													</thead>
														<tr style='border-bottom: 1px solid #eee;'>
															<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/file-version/[id]/content/route.js'>route.js</a></b></td>
															<td style='padding: 8px;'>- Provides an API endpoint to securely retrieve the content of a specific file version, ensuring user authentication and authorization<br>- Integrates with the database to fetch version details and enforces access controls, supporting the overall architecture of versioned file management within the application<br>- Facilitates controlled access to historical file data for authorized users.</td>
														</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<!-- storage Submodule -->
							<details>
								<summary><b>storage</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.storage</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/storage/route.js'>route.js</a></b></td>
											<td style='padding: 8px;'>- Provides an API endpoint to retrieve user-specific files stored in S3, integrating authentication to ensure secure access<br>- It facilitates seamless data retrieval within the applications storage architecture, enabling authenticated users to access their files efficiently while handling errors gracefully<br>- This component plays a crucial role in managing user data access within the overall system.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- ai-review Submodule -->
							<details>
								<summary><b>ai-review</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.ai-review</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/ai-review/route.js'>route.js</a></b></td>
											<td style='padding: 8px;'>- Facilitates AI-powered code review by orchestrating static analysis data and user authentication, then generating detailed insights through a language model<br>- Ensures service health and security, providing structured feedback on code quality, architecture, security, and performance<br>- Integrates seamlessly into the architecture to enhance code quality assessments with automated, intelligent analysis.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- review-comments Submodule -->
							<details>
								<summary><b>review-comments</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.review-comments</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/review-comments/route.js'>route.js</a></b></td>
											<td style='padding: 8px;'>- Provides API endpoints for managing review comments within the code review system<br>- Facilitates creating new comments linked to specific files, lines, or issues, and retrieving existing comments with support for nested replies and filtering by status<br>- Integrates user authentication and database synchronization to ensure secure, consistent comment handling aligned with the overall review architecture.</td>
										</tr>
									</table>
									<!-- [id] Submodule -->
									<details>
										<summary><b>[id]</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.review-comments.[id]</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/review-comments/[id]/route.js'>route.js</a></b></td>
													<td style='padding: 8px;'>- Facilitates secure management of review comments by enabling authenticated users to update or delete their comments within the review workflow<br>- Ensures proper authorization, maintains data integrity, and supports comment status updates, including resolution tracking<br>- Integrates seamlessly into the overall review system architecture, providing essential comment moderation and lifecycle functionalities.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<!-- folder-analysis Submodule -->
							<details>
								<summary><b>folder-analysis</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.folder-analysis</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/folder-analysis/route.js'>route.js</a></b></td>
											<td style='padding: 8px;'>- Facilitates comprehensive analysis of code files within a specified folder in an S3 bucket, generating multi-dimensional quality and security metrics<br>- It filters relevant files, performs language-specific assessments, and computes overall folder health scores, supporting code quality monitoring and review workflows across diverse programming languages.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- get-name Submodule -->
							<details>
								<summary><b>get-name</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.get-name</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/get-name/route.js'>route.js</a></b></td>
											<td style='padding: 8px;'>- Provides an authenticated API endpoint to retrieve current user information, ensuring secure access within the applications architecture<br>- Integrates with the WorkOS authentication SDK to verify user identity and returns essential user details or appropriate error responses, supporting user management and personalized experiences across the platform.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- estimate Submodule -->
							<details>
								<summary><b>estimate</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.estimate</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/estimate/route.js'>route.js</a></b></td>
											<td style='padding: 8px;'>- Provides an API endpoint to estimate effort for a batch of issues, ensuring user authentication and input validation<br>- Integrates with the effort estimation library to deliver time projections, supporting project planning and workload assessment within the overall architecture<br>- Facilitates seamless, secure effort estimation for issue management workflows.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- code-review Submodule -->
							<details>
								<summary><b>code-review</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.code-review</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/code-review/route.js'>route.js</a></b></td>
											<td style='padding: 8px;'>- Provides an API endpoint for secure code analysis by fetching file content from S3, performing multi-dimensional or legacy code review, and returning detailed issues and metrics<br>- Integrates language-specific checks, style, quality, and complexity assessments to support code quality improvement and maintainability within the overall architecture.</td>
										</tr>
									</table>
									<!-- incremental Submodule -->
									<details>
										<summary><b>incremental</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.code-review.incremental</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/code-review/incremental/route.js'>route.js</a></b></td>
													<td style='padding: 8px;'>- Facilitates incremental code reviews by analyzing only changed lines to identify issues and metrics, optimizing review efficiency within the overall codebase architecture<br>- Integrates version tracking, diff calculation, and targeted analysis to streamline quality assessments, ensuring rapid feedback on recent modifications while maintaining comprehensive oversight of code health.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<!-- fixes Submodule -->
							<details>
								<summary><b>fixes</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.fixes</b></code>
									<!-- preview Submodule -->
									<details>
										<summary><b>preview</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.fixes.preview</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/fixes/preview/route.js'>route.js</a></b></td>
													<td style='padding: 8px;'>- Provides an API endpoint to preview code fixes for specific issues without applying changes<br>- It authenticates users, validates input, maps issues to fix types, and generates a preview showing the before-and-after states of the code<br>- This facilitates safe review of potential fixes, integrating seamlessly into the broader code correction and quality assurance workflow.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- apply Submodule -->
									<details>
										<summary><b>apply</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.fixes.apply</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/fixes/apply/route.js'>route.js</a></b></td>
													<td style='padding: 8px;'>- Facilitates secure application of code fixes by authenticating users, validating input, and mapping issues to appropriate fix types<br>- Integrates with the fix registry to modify code, optionally saves updated files to cloud storage, and handles errors gracefully<br>- Serves as a critical API endpoint within the architecture to streamline automated code correction workflows.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- available Submodule -->
									<details>
										<summary><b>available</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.fixes.available</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/app/api/fixes/available/route.js'>route.js</a></b></td>
													<td style='padding: 8px;'>- Provides an API endpoint to retrieve contextually relevant automatic fixes for identified issues, ensuring authenticated user access<br>- It maps issues to fix types, fetches applicable solutions, and returns detailed fix information, supporting streamlined issue resolution within the applications architecture<br>- This facilitates efficient troubleshooting and enhances user experience by offering targeted, automated remediation options.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- lib Submodule -->
			<details>
				<summary><b>lib</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.lib</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/lib/account.js'>account.js</a></b></td>
							<td style='padding: 8px;'>- Provides a mechanism to retrieve comprehensive user account information, including personal details, roles, and permissions, ensuring authenticated access within the application<br>- Integrates with the authentication system to deliver structured user data, supporting role-based access control and personalized user experiences across the codebase.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/lib/version-tracker.js'>version-tracker.js</a></b></td>
							<td style='padding: 8px;'>- Provides core functionality for version control of files within the system, enabling change detection, version storage, retrieval, and comparison<br>- Facilitates tracking file history, managing multiple versions, and ensuring data integrity through hashing, supporting robust file management and audit capabilities across the applications architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/lib/effort-estimator.js'>effort-estimator.js</a></b></td>
							<td style='padding: 8px;'>- Provides a comprehensive effort estimation framework for fixing code issues by categorizing them based on type, severity, complexity, and risk<br>- Facilitates prioritization, time forecasting, and auto-fix capabilities, supporting efficient management of technical debt and quality improvements within the overall project architecture<br>- Enhances decision-making for issue resolution and resource allocation.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/lib/multi-dimensional-analyzer.js'>multi-dimensional-analyzer.js</a></b></td>
							<td style='padding: 8px;'>- Src/lib/multi-dimensional-analyzer.jsThis module provides a comprehensive static analysis tool that evaluates code files across multiple critical dimensions, including linting, security, architecture, and overall code quality<br>- Its primary purpose is to ensure code health, maintainability, and security by identifying issues and providing insights to developers<br>- Integrated into the larger codebase, this analyzer supports continuous quality assurance by offering a holistic view of code standards and potential vulnerabilities, thereby facilitating informed decision-making and fostering robust software development practices.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/lib/utils.js'>utils.js</a></b></td>
							<td style='padding: 8px;'>- Provides a utility function that consolidates class name management by combining conditional class merging with Tailwind CSS<br>- It streamlines styling logic across the project, ensuring consistent and conflict-free class application within the broader component architecture<br>- This enhances maintainability and readability of style-related code throughout the codebase.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/lib/sync-user.js'>sync-user.js</a></b></td>
							<td style='padding: 8px;'>- Facilitates synchronization of user data between external identity sources and the database by performing create or update operations<br>- Ensures user information remains current within the system, supporting seamless user management and data consistency across the application architecture<br>- Handles errors gracefully, providing detailed logs for troubleshooting and maintaining data integrity.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/lib/prisma.js'>prisma.js</a></b></td>
							<td style='padding: 8px;'>- Establishes a singleton Prisma client to facilitate efficient database interactions across the application<br>- It ensures a consistent and optimized connection to the database, supporting reliable data operations within the broader architecture<br>- This setup promotes performance and resource management, enabling seamless data access for various features and services in the project.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/lib/s3.js'>s3.js</a></b></td>
							<td style='padding: 8px;'>- Provides a comprehensive interface for managing file storage in AWS S3, enabling secure file uploads, retrievals, deletions, and listings<br>- Facilitates seamless integration of user-specific file operations within the broader application architecture, ensuring efficient and organized handling of user data and media assets in cloud storage.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/lib/llm-config.js'>llm-config.js</a></b></td>
							<td style='padding: 8px;'>- Provides dynamic configuration and interaction with language model endpoints, enabling seamless switching between local and cloud-hosted models based on environment<br>- Facilitates prompt-based requests, health checks, and retrieval of available models, ensuring reliable and adaptable integration within the overall architecture for scalable and flexible language model utilization.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/lib/diff-engine.js'>diff-engine.js</a></b></td>
							<td style='padding: 8px;'>- Provides core functionality for comparing different versions of text files through line-by-line analysis, identifying changes, and generating detailed diffs with contextual insights<br>- Facilitates understanding of code modifications, supports change visualization, and enables targeted review by highlighting altered sections and line numbers within a broader codebase architecture.</td>
						</tr>
					</table>
					<!-- fixes Submodule -->
					<details>
						<summary><b>fixes</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.lib.fixes</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/src/lib/fixes/fix-registry.js'>fix-registry.js</a></b></td>
									<td style='padding: 8px;'>- Serves as a centralized repository for code fixes, enabling consistent identification, preview, and application of various code quality improvements<br>- Facilitates mapping of issue messages to specific fixes, supports automatic and manual corrections, and provides mechanisms to preview changes, thereby streamlining code maintenance and ensuring adherence to best practices across the codebase.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- prisma Submodule -->
	<details>
		<summary><b>prisma</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ prisma</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/prisma/schema.prisma'>schema.prisma</a></b></td>
					<td style='padding: 8px;'>- Defines the data schema for a code review and collaboration platform, modeling users, file versions, reviews, comments, and sharing mechanisms<br>- Facilitates structured storage and retrieval of review activities, user interactions, and shared content, supporting scalable, organized management of code review workflows within the overall system architecture.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- .github Submodule -->
	<details>
		<summary><b>.github</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ .github</b></code>
			<!-- workflows Submodule -->
			<details>
				<summary><b>workflows</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ .github.workflows</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/Emanuel181/Code_review_application/blob/master/.github/workflows/deploy.yml'>deploy.yml</a></b></td>
							<td style='padding: 8px;'>- Automates the deployment pipeline for a production ECS environment by performing code quality and security scans, building and pushing Docker images, applying database migrations with Prisma, and updating ECS services with new task definitions<br>- Ensures continuous delivery, environment consistency, and seamless updates to the application infrastructure.</td>
						</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

## 🚀 Getting Started

### 📋 Prerequisites

This project requires the following dependencies:

- **Programming Language:** JavaScript
- **Package Manager:** Npm
- **Container Runtime:** Docker

### ⚙️ Installation

Build Code_review_application from the source and install dependencies:

1. **Clone the repository:**

    ```sh
    ❯ git clone https://github.com/Emanuel181/Code_review_application
    ```

2. **Navigate to the project directory:**

    ```sh
    ❯ cd Code_review_application
    ```

3. **Install the dependencies:**

**Using [docker](https://www.docker.com/):**

```sh
❯ docker build -t Emanuel181/Code_review_application .
```
**Using [npm](https://www.npmjs.com/):**

```sh
❯ npm install
```

### 💻 Usage

Run the project with:

**Using [docker](https://www.docker.com/):**

```sh
docker run -it {image_name}
```
**Using [npm](https://www.npmjs.com/):**

```sh
npm start
```

### 🧪 Testing

Code_review_application uses the {__test_framework__} test framework. Run the test suite with:

**Using [docker](https://www.docker.com/):**

```sh
echo 'INSERT-TEST-COMMAND-HERE'
```
**Using [npm](https://www.npmjs.com/):**

```sh
npm test
```

---

## 📈 Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

## 🤝 Contributing

- **💬 [Join the Discussions](https://github.com/Emanuel181/Code_review_application/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/Emanuel181/Code_review_application/issues)**: Submit bugs found or log feature requests for the `Code_review_application` project.
- **💡 [Submit Pull Requests](https://github.com/Emanuel181/Code_review_application/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/Emanuel181/Code_review_application
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/Emanuel181/Code_review_application/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=Emanuel181/Code_review_application">
   </a>
</p>
</details>

---

## 📜 License

Code_review_application is protected under the [LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

<div align="left"><a href="#top">⬆ Return</a></div>

---
