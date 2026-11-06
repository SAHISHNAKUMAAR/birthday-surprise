@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ====================================================
echo Starting Romantic Birthday Surprise Website...
echo ====================================================
start http://localhost:5173
npm run dev
pause
