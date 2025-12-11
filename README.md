# OpenVerse Campus Helper

An AI-powered campus helper web application built for students to get instant answers to campus-related questions using Google Gemini AI.

## Features

- 🤖 **AI-Powered Answers**: Ask questions and get instant responses using Google Gemini
- 💾 **FAQ Storage**: Save helpful Q&A to Firebase Firestore
- 📊 **Google Sheets Integration**: View public FAQ via embedded Google Sheet
- 📍 **Campus Location**: Interactive Google Maps embed
- 📄 **Document Links**: Quick access to important documents via Google Drive
- ⚡ **Real-time Updates**: Live FAQ list updates using Firestore

## Project Structure

```
openverse-campus-helper/
├── index.html          # Main HTML page
├── style.css           # Styling
├── script.js           # Main JavaScript logic
├── config.js           # Configuration loader
├── .env                # Environment variables (DO NOT COMMIT)
├── .env.example        # Template for environment variables
├── .gitignore          # Git ignore rules
├── workshop.md         # Complete workshop guide
└── README.md           # This file
```

## Setup Instructions

### 1. Clone or Download

```bash
git clone <your-repo-url>
cd openverse-campus-helper
```

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual API keys and URLs in `.env`:
   - Firebase configuration
   - Gemini API key
   - Google Sheets URL
   - Apps Script URL (optional)
   - Google Drive links (optional)

### 3. Run the Application

Open `index.html` in your browser or use a local server:

**Using Live Server (VS Code):**
- Install Live Server extension
- Right-click `index.html` → "Open with Live Server"

**Using Python:**
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`

## Configuration

All configuration is managed through the `.env` file. Required variables:

- `FIREBASE_API_KEY` - Firebase project API key
- `FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `FIREBASE_APP_ID` - Firebase app ID
- `FIREBASE_MEASUREMENT_ID` - Firebase measurement ID
- `GEMINI_API_KEY` - Google Gemini API key
- `GEMINI_MODEL` - Gemini model name (default: models/gemini-2.5-flash)
- `GOOGLE_SHEET_PUB_URL` - Published Google Sheet URL
- `APPS_SCRIPT_URL` - Google Apps Script web app URL (optional)
- `GOOGLE_DRIVE_SYLLABUS_LINK` - Google Drive document link (optional)

See `.env.example` for the template.

## Technologies Used

- **HTML/CSS/JavaScript** - Frontend
- **Firebase Firestore** - Database for FAQ storage
- **Google Gemini API** - AI-powered question answering
- **Google Sheets API** - Public FAQ display (publish to web)
- **Google Maps** - Campus location embed
- **Google Drive** - Document hosting

## Workshop Guide

For detailed step-by-step instructions, see `workshop.md`.

## Security Notes

⚠️ **Important:**
- Never commit the `.env` file to version control
- The `.gitignore` file is configured to exclude `.env`
- Only share `.env.example` as a template
- Keep your API keys secure

## License

This project is created for educational purposes.

## Support

For questions or issues, please refer to the workshop guide or contact your instructor.
# OpenVerse-Workshop
# OpenVerse-Workshop
