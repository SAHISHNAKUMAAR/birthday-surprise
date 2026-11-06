<<<<<<< HEAD
# 💖 Romantic Birthday Surprise Website

A magical, interactive single-page romantic birthday journey built with React, Vite, Tailwind CSS, and Framer Motion. 

Designed with a **Dreamy Pink Romantic** theme (soft pastel pink and lavender gradients, rose pink and white palette, glowing particles, glassmorphism, and elegant serif typography).

> **Strict Image-Free Design:** Built entirely without photographs, external illustrations, or image assets. All visual art—the cake, candles, flames, envelopes, hearts, medals, and animations—is crafted purely using CSS, HTML, SVG vector math, and typography.

---

## ✨ Experience Overview (7 Magical Scenes)

1. **Scene 1 – The Secret Beginning (`Welcome.jsx`)**
   - 3D interactive animated envelope with a wax heart seal.
   - Floating romantic particles and soft glowing aura.
   - Smooth opening sequence unveiling the birthday girl's name.

2. **Scene 2 – Birthday Celebration (`Birthday.jsx`)**
   - Pure CSS layered strawberry-cream birthday cake with dripping icing and sugar pearls.
   - Three animated candles with flickering flames.
   - Interactive candle-blowing button that extinguishes the flames, rises smoke puffs, and detonates celebratory confetti!

3. **Scene 3 – How Well Do You Know Us? (`LoveQuiz.jsx`)**
   - Interactive 5-question romantic memory quiz.
   - Real-time instant visual feedback with sweet romantic notes for each answer.
   - Score counter, percentage calculation, and sweet customized outcome message.

4. **Scene 4 – Catch My Heart (`CatchHeart.jsx`)**
   - Falling hearts mini-game with 60 FPS physics loop.
   - Slide the heart basket or directly tap falling hearts on touchscreens or with a mouse.
   - Golden hearts with bonus +25 points, normal hearts +10 points, and 3 heart lives.
   - Romantic victory screen upon reaching 100 points.

5. **Scene 5 – Unlock My Heart (`UnlockHeart.jsx`)**
   - 3 interactive romantic riddles.
   - Fuzzy input matching with hint toggle.
   - Animated padlock unlocking letter-by-letter to reveal the secret passkey: **`LOVE`**.

6. **Scene 6 – My Words For You (`LoveLetter.jsx`)**
   - Handwritten love parchment card with realistic typewriter text animation.
   - Elegant Playfair Display typography and romantic Dancing Script cursive sign-off.
   - "Show Full Letter" instant toggle.

7. **Scene 7 – Forever Yours (`FinalSurprise.jsx`)**
   - Grand glowing animated heartbeat center with personalized nickname.
   - Special romantic birthday vows checklist.
   - Double confetti & heart shower explosion.
   - "Relive The Magic" replay button.

---

## 🎵 Persistent Background Music System

- **File Path:** `public/music/romantic.mp3`
- Starts automatically upon the user's first click/tap anywhere on the screen (complying with modern browser autoplay policies).
- Persists uninterrupted as you navigate across all 7 scenes.
- Glassmorphic music controller in the top corner featuring Play/Pause, Mute/Unmute, and Volume Slider controls.
- **Built-in Smart Fallback:** If `romantic.mp3` is not yet placed in the folder, the website automatically falls back to an ambient romantic Web Audio API chime synthesizer, ensuring your website never stays silent or broken!

---

## 🛠️ Technology Stack

- **React 18** + **Vite 6** (Blazing fast local development & build)
- **Tailwind CSS 3** (Custom pink/rose/lavender palette and animations)
- **Framer Motion 11** (Fluid scene transitions and gesture animations)
- **Canvas-Confetti** (High-performance celebratory confetti bursts)
- **Lucide React** (Clean vector icon set)

---

## 🚀 Quickstart & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
Production output will be generated in the `dist/` folder.

---

## 🎨 How to Personalize the Content

All customizable content is centralized in **`src/data/content.js`**. You do not need to edit any component code!

Simply open `src/data/content.js` and change:

```javascript
export const romanticContent = {
  personal: {
    girlfriendName: "Sophia",               // <-- Her name
    girlfriendNickname: "My Sweet Sunshine",// <-- Cute pet name
    senderName: "Alex",                     // <-- Your name
    birthdayDate: "November 5th",           // <-- Her birthday
    relationshipMilestone: "3 Beautiful Years Together",
  },
  // Customize welcome messages, quiz questions, riddles, letters, and vows!
};
```

### Adding Your Own Song:
Place your preferred romantic song in:
```
public/music/romantic.mp3
```
Supported formats: `.mp3` (recommended bitrate 128kbps - 192kbps).

---

## 🌐 Deployment to Vercel (1-Click)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will auto-detect as **Vite**.
5. Click **"Deploy"**!

Your girlfriend will receive a live, fast HTTPS link that works smoothly on iPhone, Android, tablets, and desktop!

=======
# birthday-surprise
>>>>>>> b9410f6eec193409468349f842fc7baf9ca95479
