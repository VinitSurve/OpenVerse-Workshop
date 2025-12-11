// config.js - Environment configuration loader
// This file loads environment variables from env.js

import { ENV } from './env.js';

export async function loadConfig() {
  // Simply return the ENV object from env.js
  return ENV;
}

// Export individual config getters for convenience
export function getFirebaseConfig(config) {
  return {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
    projectId: config.FIREBASE_PROJECT_ID,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.FIREBASE_APP_ID,
    measurementId: config.FIREBASE_MEASUREMENT_ID
  };
}

export function getGeminiConfig(config) {
  return {
    apiKey: config.GEMINI_API_KEY,
    model: config.GEMINI_MODEL || 'gemini-2.5-flash'
  };
}

export function getGoogleSheetsUrl(config) {
  return config.GOOGLE_SHEET_PUB_URL;
}

export function getAppsScriptUrl(config) {
  return config.APPS_SCRIPT_URL;
}

export function getGoogleDriveLink(config) {
  return config.GOOGLE_DRIVE_SYLLABUS_LINK;
}
