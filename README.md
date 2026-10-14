# ChatBot AI – AI Chatbot for Software Engineers

An AI-powered chatbot built using the MERN stack and the OpenRouter API. It helps software engineers explore programming concepts, understand technical topics, and get assistance with software development questions.

**Live Demo:** https://ai-chatbot-omega-eight-39.vercel.app/

**GitHub Repository:** https://github.com/Pooja9783/ai-chatbot

## Overview

ChatBot AI is a full-stack web application that combines an interactive chat interface with Large Language Models (LLMs) through the OpenRouter API.

The project demonstrates how to integrate an external AI service into a MERN stack application, manage frontend-backend communication, and build a conversational experience tailored to software developers.

## Features

- **AI-Powered Conversations:** Ask questions about programming, coding, and software development.
- **OpenRouter API Integration:** Connect to supported language models through a unified API.
- **Developer-Focused Assistance:** Explore programming concepts and get help understanding technical problems.
- **Interactive Chat Interface:** Communicate with AI through a user-friendly interface.
- **Full-Stack Architecture:** Separate frontend and backend responsibilities.
- **Secure API Integration:** Process AI requests through the backend to keep API credentials out of frontend code.

## Tech Stack

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3

**Backend**
- Node.js
- Express.js

**AI Integration**
- OpenRouter API
- Large Language Models (LLMs)

**Database**
- MongoDB

## How It Works

1. The user enters a programming question in the chatbot interface.
2. The React frontend sends the request to the backend server.
3. The Express.js server processes the request and forwards it to the OpenRouter API.
4. The selected language model generates a response.
5. The backend returns the response to the frontend.
6. The chatbot displays the generated answer to the user.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- An OpenRouter API key
- MongoDB, if required by your application

### 1. Clone the Repository

```bash
git clone https://github.com/Pooja9783/ai-chatbot.git
cd ai-chatbot
```

### 2. Install Dependencies

If your project contains separate `backend` and `frontend` directories, install dependencies in each directory.

**Backend:**

```bash
cd backend
npm install
```

**Frontend:** Open another terminal from the project root and run:

```bash
cd frontend
npm install
```

Adjust the directory names if your repository uses a different structure.

### 3. Configure Environment Variables

Create a `.env` file in the backend directory and configure the variables required by your application.

```env
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key
MONGODB_URI=your_mongodb_connection_string
```

Replace the placeholder values with your actual configuration. Only include variables your application uses.

**Security best practices:**
- Never commit `.env` files or API keys to GitHub.
- Add `.env` to `.gitignore`.
- Keep private API credentials on the backend.
- Never expose secret keys in frontend code.

### 4. Run the Application

Start the backend using the script defined in its `package.json`. For example:

```bash
npm run dev
```

Open another terminal, navigate to the frontend directory, and start the frontend development server:

```bash
npm run dev
```

Open the local URL displayed in the frontend terminal to access the application.

> **Note:** Directory names, environment variables, and commands may differ depending on your actual project structure and configuration.

## OpenRouter API Integration

OpenRouter provides a unified API for accessing supported Large Language Models.

This project demonstrates:

- Sending user prompts to an external AI service.
- Processing model-generated responses.
- Managing AI API communication through a backend server.
- Configuring API credentials using environment variables.
- Handling communication between the frontend and backend.

Model availability, rate limits, and usage costs depend on the selected model and your OpenRouter account.

## Future Improvements

Potential enhancements include:

- Saving and retrieving conversation history.
- Supporting multiple AI model selections.
- Improving code syntax highlighting and formatting.
- Implementing user authentication.
- Adding conversation management features.
- Enhancing error handling and loading indicators.

## What I Learned

Through this project, I gained experience in:

- Building a full-stack application using the MERN stack.
- Integrating an external LLM API into a web application.
- Managing communication between a React frontend and an Express.js backend.
- Handling API requests and responses.
- Managing environment variables and protecting API credentials.
- Organizing frontend and backend components in a full-stack project.

## Author

**Pooja Sankhala**

- GitHub: [Pooja9783](https://github.com/Pooja9783)
- Live Demo: [ChatBot AI](https://ai-chatbot-omega-eight-39.vercel.app/)
