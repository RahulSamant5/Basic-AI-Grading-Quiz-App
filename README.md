# AI-Powered 30-Question Grading Quiz App

A full-stack AI-driven quiz application built with **React**, **Node.js**, **FastAPI**, **MongoDB**, and **Sentence Transformers**. This app allows users to answer 30 questions, save their responses to a database, and receive AI-powered grading in real-time using a local transformer model.  

---

## 🚀 Features

- **Fast and scalable backend** with **FastAPI** for Python-side AI grading.
- **React frontend** with dynamic question rendering and answer submission.
- **MongoDB** database for storing user answers.
- **AI-powered grading** using a local **Sentence Transformers** model for semantic similarity.
- **Node.js server** for additional backend API functionality.
- Save answers to the database and fetch detailed grading results.
- Color-coded similarity scores and detailed feedback for each answer.

---

## 🛠 Technology Stack

| Frontend       | Backend       | Database       | AI Model                  |
|----------------|---------------|----------------|--------------------------|
| React          | FastAPI (Python) | MongoDB       | Sentence Transformers    |
| Axios for API calls | Node.js server | MongoDB Atlas/local | Local offline model (`all-MiniLM-L6-v2`) |

---

## 📂 Project Structure

project-root/
│
├─ backend/ # FastAPI + AI grading logic
│ ├─ app.py # Main Python API server
│ ├─ model_cache/ # Offline transformer model (not on GitHub)
│
├─ frontend/ # React frontend
│ ├─ src/
│ │ ├─ QuizPage.js
│ │ ├─ GradingResults.js
│ │ └─ QuestionCard.js
│ └─ .env # Environment variables for backend URL
│
├─ node-backend/ # Node.js server
│
├─ .gitignore
└─ README.md

yaml
Copy code

> **Note:** The `model_cache` folder containing the transformer model is **not included in the GitHub repo** due to its size. You need to download it separately.

---

## ⚡ Performance Improvements

- Migrated grading backend from Flask to **FastAPI** for faster request handling.
- Uses **local AI transformer model** for offline, low-latency grading.
- Async API calls in React ensure smooth UX during grading.

---

## 📥 Prerequisites

Before running the project, ensure you have installed:

- Node.js (v16+)
- Python (v3.10+)
- MongoDB (local or Atlas)
- npm or yarn

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/RahulSamant5/Basic-AI-Grading-Quiz-App.git
cd Basic-AI-Grading-Quiz-App
2. Setup Python Backend (FastAPI + AI Grading)
bash
Copy code
cd backend
python -m venv venv
source venv/bin/activate    # macOS/Linux
venv\Scripts\activate       # Windows

pip install -r requirements.txt
Download the transformer model (all-MiniLM-L6-v2) and place it in backend/model_cache/.

Run FastAPI server:

bash
Copy code
uvicorn app:app --reload --host 127.0.0.1 --port 5001
3. Setup Node.js Backend (if applicable)
bash
Copy code
cd node-backend
npm install
npm start
Make sure it runs on a different port than FastAPI (e.g., 5000).

4. Setup React Frontend
bash
Copy code
cd frontend
npm install
npm start
Make sure .env contains the correct backend URL:

ini
Copy code
REACT_APP_BACKEND_URL=http://127.0.0.1:5001
5. Initialize MongoDB
Ensure MongoDB is running locally (mongodb://localhost:27017) or update the connection URL in app.py.

The app automatically creates the ai_demo_db database and answers collection.

💻 How to Use
Open the React frontend in your browser.

Answer the 30 questions on the quiz page.

Click Save All Answers to store them in MongoDB.

Click View Grading Results to fetch AI-generated feedback and similarity scores.

Review your grading summary and detailed results.

📊 Grading Logic
Uses Sentence Transformers to compute semantic similarity between user answers and expected answers.

Similarity > 0.7 → ✅ Correct

Similarity ≤ 0.7 → ❌ Incorrect

Each question shows:

Your answer

Expected answer

Similarity percentage

Result color-coded

⚠️ Notes
Transformer model is not included in GitHub. Download and place in backend/model_cache/.

Do not commit the venv/ or node_modules/ folders. They are already in .gitignore.

📈 Future Improvements
Add user authentication to save multiple users' quizzes.

Integrate large transformer models hosted on the cloud.

Add detailed analytics dashboards for answer performance.

Deploy frontend and backend on Vercel / Heroku for public access.

🔗 Links
GitHub: https://github.com/RahulSamant5/Basic-AI-Grading-Quiz-App


<img width="1470" height="956" alt="Screenshot 2025-12-10 at 5 49 24 AM" src="https://github.com/user-attachments/assets/83b057d5-4285-488b-9af0-9325a2be86ab" />
<img width="1470" height="956" alt="Screenshot 2025-12-10 at 5 49 30 AM" src="https://github.com/user-attachments/assets/29449672-2eb4-4606-a1da-01183691b732" />
<img width="1470" height="956" alt="Screenshot 2025-12-10 at 5 49 40 AM" src="https://github.com/user-attachments/assets/2df7391c-1338-49ea-adb8-13788fa9f6c4" />
