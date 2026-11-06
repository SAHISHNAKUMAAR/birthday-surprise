/**
 * ===================================================================
 * 💖 ROMANTIC BIRTHDAY SURPRISE - CENTRAL CONFIGURATION 💖
 * ===================================================================
 * 
 * Customize all names, dates, messages, quiz questions, game texts,
 * and riddles right here! You don't need to touch any component code.
 */

export const romanticContent = {
  // --- Personal Details ---
  personal: {
    girlfriendName: "Asvika",
    girlfriendNickname: "My Sweet Sunshine",
    senderName: "Sahishnakumaar",
    birthdayDate: "November 6th",
    relationshipMilestone: "4 Beautiful Years Together",
    favoriteSongTitle: "A Thousand Years - Romantic Instrumental",
  },

  // --- Scene 1: The Secret Beginning ---
  welcome: {
    title: "For The Love of My Life",
    subtitle: "I created a little universe just for you...",
    tagline: "Happy Birthday, My Love ✨",
    openPrompt: "Are you ready to discover your secret surprise?",
    openButtonText: "Open Your Surprise 💌",
    envelopeHint: "Tap the seal with love to unlock",
  },

  // --- Scene 2: Birthday Celebration ---
  birthday: {
    heading: "Happy Birthday, Beautiful!",
    subheading: "Another year of your warm laughter, your sweet smile, and your endless grace.",
    cakeInstruction: "Make a special wish in your heart, then blow out the candles! 🕯️",
    blowButtonText: "Blow Out The Candles ✨",
    blownSuccessMessage: "May every secret wish and dream of yours come true today and forever! 🎉🎂",
    romanticNote: "You make this world so much brighter simply by being in it. Every single day with you feels like a blessing I never want to take for granted.",
    continueButtonText: "Let's Play Games 💕",
  },

  // --- Scene 3: How Well Do You Know Us? (Quiz Game) ---
  quiz: {
    title: "How Well Do You Know Us?",
    subtitle: "A sweet journey through our favorite memories and silly moments",
    questions: [
      {
        id: 1,
        question: "En thangatha na epo first patha ?",
        options: [
          "2021",
          "2022",
          "2023",
          "2024"
        ],
        correctIndex: 1,
        sweetFeedback: "2022"
      },
      {
        id: 2,
        question: "What is my absolute favorite thing about your face?",
        options: [
          "kutty kangal",
          "kutty macham",
          "kutty mukku",
          "kutty kannam"
        ],
        correctIndex: 1,
        sweetFeedback: "kutty macham"
      },
      {
        id: 3,
        question: "Ennaku enna kettu alugum kulandahi aguva ?",
        options: [
          "boobie",
          "butt",
          "kannam",
          "kai"
        ],
        correctIndex: 0,
        sweetFeedback: "boobie"
      },
      {
        id: 4,
        question: "What is our signature midnight craving comfort snack?",
        options: [
          "Wafle & ice cream 🍪🍨",
          "Extra cheesy pizza slices at 1 AM 🍕",
          "Spicy noodles while binge-watching our favorite show 🍜",
          "Strawberries dipped in sweet melted chocolate 🍓"
        ],
        correctIndex: 0,
        sweetFeedback: "Mmm yes! Nothing beats sweet treats and cuddling with you late at night! 🍦"
      },
      {
        id: 5,
        question: "If we could teleport anywhere together right now, where would we go?",
        options: [
          "A quiet wooden cabin overlooking snowy mountains 🏔️",
          "A dreamy beach villa listening to the ocean waves 🌅",
          "A romantic Parisian street cafe with warm croissants 🥐",
          "Anywhere on Earth, as long as I am with you 🌍❤️"
        ],
        correctIndex: 3,
        sweetFeedback: "Home isn't a place for me anymore; home is wherever you are. 🏡💞"
      }
    ],
    resultMessages: {
      perfect: "100% Perfect Score! You know our love by heart, my soulmate! 🏆💖",
      high: "Amazing job! You truly hold the sweetest keys to our story! 🥰✨",
      good: "You are the cutest! Every memory with you is treasured in my heart! 💕",
    },
    continueButtonText: "Catch My Heart Next 🏹",
  },

  // --- Scene 4: Catch My Heart (Mini-Game) ---
  catchGame: {
    title: "Catch My Heart! 💖",
    instructions: "Catch the falling hearts before they hit the ground! Golden hearts give bonus points. You have 3 lives!",
    targetScore: 100,
    pointPerHeart: 10,
    bonusPerGolden: 25,
    maxLives: 3,
    winTitle: "You Caught All My Love! 💘",
    winMessage: "You've captured my whole heart—not just in this game, but in real life, today, tomorrow, and forever.",
    loseTitle: "My Heart Slipped! 🥺",
    loseMessage: "Don't worry my love, my heart is always yours anyway. Want to try again?",
    playAgainText: "Play Again 🔄",
    continueButtonText: "Unlock The Secret Vault 🔐",
  },

  // --- Scene 5: Unlock My Heart (Riddles / Puzzle Game) ---
  puzzle: {
    title: "Unlock My Heart 🔐",
    subtitle: "Solve three romantic riddles to reveal the secret lock combination",
    riddles: [
      {
        id: 1,
        question: "Ennaku intha world yaru per alagu ?",
        acceptableAnswers: ["sahi", "sahipapa", "asvi", "kutty", "kuttypapa","nan","Nan"],
        hint: "Na unna en peru vechu kupduva ____papa ❤️",
        revealedLetter: "L"
      },
      {
        id: 2,
        question: "Na unna epo first kiss panna ? [park,college,theatre,....]",
        acceptableAnswers: ["park", "college", "theatre", "College"],
        hint: "Paper presentation nebagam irukka? ",
        revealedLetter: "O"
      },
      {
        id: 3,
        question: "Namba kulandhaigal ku name yoshichom nebagam irukka ? ",
        acceptableAnswers: ["shakshitha", "shaksitha", "shakshith", "shaksith"],
        hint: "shak__tha, shak__th tell any one",
        revealedLetter: "VE"
      }
    ],
    vaultSuccessTitle: "Vault Unlocked: Pure Love 💖",
    vaultSuccessMessage: "You unlocked the secret code: 'LOVE'. My heart has always been wide open just for you, and it always will be.",
    continueButtonText: "Read My Heart's Words 📜",
  },

  // --- Scene 6: My Words For You (Love Letter) ---
  letter: {
    title: "My Words For You 💌",
    subtitle: "A handwritten letter from the deepest corner of my heart",
    salutation: "My Dearest AsvikaSahishnakumaar,",
    bodyParagraphs: [
      "On this very special day, the most gentle, kind, and good human being to ever exist—and I am the luckiest person alive to love you and be loved by you.",
      "Thank you for being my safe home when storms brew, my laughter when life is quiet, and the spark in my eyes that never fades. Your warmth fills my body, and your kindness inspires me to be a better person every single day.",
      "I promise to stand by you in every triumph, hold your hand through every uncertainty, and never stop reminding you how special you are.",
      "Happy Birthday, my angel."
    ],
    signoff: "Forever and always yours,",
    signature: "SahishnakumaarAsvika❤️",
    continueButtonText: "One Last Surprise... 🎁",
  },

  // --- Scene 7: Forever Yours (Grand Finale) ---
  finale: {
    badge: "Forever & Always",
    headline: "Happy Birthday, My Entire World 💫",
    message: "Thank you for walking into my life and turning ordinary moments into pure happiness. You are my greatest adventure, my sweetest dream, and my eternal home.",
    promises: [
      "I promise to always listen with an open heart.",
      "I promise to celebrate your victories, big or small.",
      "I promise to hold your hand when the road gets rocky.",
      "I promise to keep falling in love with you, every single day."
    ],
    birthdayWish: "May your upcoming year be overflowing with laughter, dream-come-true moments, peace, and endless love.",
    replayButtonText: "Relive The Magic From The Start 🔄",
    specialSignature: "Crafted with endless love just for you 💖",
  },

  // --- Background Music Settings ---
  audio: {
    audioPath: "/music/romantic.mp3",
    fallbackEnabled: true,
    placeholderNotice: "To play your custom song, place 'romantic.mp3' in the public/music folder.",
  }
};

