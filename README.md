# 1. Introduction
# eemager
Image gallery built with React v18.2.0 using Vite as the build tool, Redux Toolkit for state management, Axios for handling data fetching, Tailwind CSS for styling, and TypeScript for type-checking.

# 2. Getting Started
Prerequisites
Node.js (version 14.0.0 or higher)
npm (version 6.0.0 or higher)
Installation
Clone the repository:

git clone https://github.com/RubinVelcani/eemager.git

Change to the project directory:
cd your-webapp

Install dependencies:
npm install

# 3. Project Structure

your-webapp/
|-- public/
    |-- favicons/
|-- src/
    |-- client/
    |-- components/
    |-- hooks/
    |-- store/
    |-- App.tsx
    |-- index.css
    |-- layout.tsx
    |-- main.tsx
|-- ..env
|-- .eslintrc.cjs
|-- .gitignore
|-- .index.html
|-- .postcss.config.js
|-- tailwind.config.js
|-- tsconfig.json
|-- tsconfig.node.json
|-- vite.config.ts

# 4. Dependencies
react v18.2.0
vite v4.4.5
@reduxjs/toolkit v1.9.7
react-redux v8.1.3
axios v1.6.0
tailwindcss v3.3.5
typescript v5.0.2
react-icons v4.11.0
react-multi-carousel v2.8.4

# 5. Configuration
Environment Variables
Create a .env file at the root of your project for environment-specific configurations. The necessary environement variables will be provided in the email.

# 6. Development
Running the Development Server
npm run dev
This command starts the development server at http://localhost:3000 and at http://127.0.0.1:5173/. Through localhost I couldn't access the Imgur api, but by running the app through the loopback interface everything went smoothly.

Linting and Formatting
npm run lint

# 7. State Management
Redux Toolkit is used for state management. The one slice used is stored in the src/store directory

# 8. Data Fetching
Axios is employed for making HTTP requests.

# 9. Styling
Tailwind CSS is used as a CSS framework based on utility classes

# 10. Icon Library
React Icons is used for including SVG icons in the application.

# 11. Carousel
React Multi Carousel is utilized for creating a responsive and customizable carousel of slides.

# 12. TypeScript
TypeScript is employed for static typing and improved developer tooling.

# 13. Build and Deployment
npm run build
This command generates a production-ready build in the dist/ directory.
