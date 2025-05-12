FlipQuest
A gamified flashcard & quiz app to level up your learning.

🚀 Overview
FlipQuest lets you flip virtual cards, answer questions, and earn coins as you climb difficulty tiers. Build or import custom decks, track your streaks, and unlock new challenges—coming soon: real‑time leaderboards and matches!

✨ Features
Card Flipping
Toggle between question (front) and answer (back) views.

Progressive Levels
Start at Level 1 (very easy) and unlock harder tiers as you master content.

Token‑Based Auth
Secure Django‑backed authentication using tokens (DRF TokenAuth).

Coin Reward System
Earn coins for correct answers—spend them on power‑ups or unlockable content (soon).

Custom Deck Management
Create, edit, delete, and organize your own decks.

Responsive UI
Built with Next.js for fast, server‑rendered pages and smooth client navigation.

🛠️ Tech Stack
Frontend: Next.js (React)

Backend: Django + Django REST Framework (Token Authentication)

Database: PostgreSQL (or SQLite in development)

Styling: Tailwind CSS

Future: Socket.io / Django Channels for real‑time quiz battles

📦 Installation & Setup
Clone the repo
git clone https://github.com/yourusername/flipquest.git
cd flipquest

Install dependencies

Frontend
cd frontend
npm install

Backend
cd ../backend
pip install -r requirements.txt

Environment variables
In /backend/.env (create if missing):
SECRET_KEY=your-django-secret-key
DATABASE_URL=postgres://user:pass@host:port/dbname

Run in development

Django API
cd backend
python manage.py migrate
python manage.py runserver

Next.js frontend
cd ../frontend
npm run dev

Open your browser

Frontend: http://localhost:3000

API: http://localhost:8000

🎮 Usage
Sign up or log in (token‑based).

Browse or create a deck.

Click Start to begin flipping cards.

Answer questions, earn coins, and track your progress on the Dashboard.

🚧 Roadmap

Leaderboards & achievements

Power‑up store with skins and themes (spend coins)

Mobile PWA support

Admin Views


📄 License
This project is MIT‑licensed. See LICENSE for details.

📬 Contact
Author: Kai Swain

GitHub: https://github.com/KaiSwain

Email: highlightedfilms@gmail.com








