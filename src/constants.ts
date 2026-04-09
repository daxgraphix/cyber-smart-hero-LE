import React from 'react';
import { 
  Globe, 
  ShieldCheck, 
  Search, 
  MessageSquare, 
  UserCheck, 
  Bug, 
  Eye, 
  Zap, 
  Share2, 
  Cpu,
  Lock,
  AlertTriangle,
  UserX,
  Shield,
  FileSearch,
  MousePointer2,
  Smartphone,
  Home,
  History,
  Sparkles
} from 'lucide-react';
import { Mission } from './types';

export const avatarsInfo = [
  { id: 'bot1' }, { id: 'bot2' }, { id: 'bot3' }, { id: 'bot4' }
];

export const customizations = {
  colors: [
    { id: 'default', value: '#38bdf8', dark: '#0ea5e9', cost: 0 },
    { id: 'red', value: '#f87171', dark: '#ef4444', cost: 100 },
    { id: 'green', value: '#4ade80', dark: '#22c55e', cost: 100 },
    { id: 'purple', value: '#c084fc', dark: '#a855f7', cost: 100 },
    { id: 'yellow', value: '#facc15', dark: '#eab308', cost: 150 },
    { id: 'pink', value: '#f472b6', dark: '#ec4899', cost: 150 },
    { id: 'teal', value: '#2dd4bf', dark: '#14b8a6', cost: 150 },
  ],
  accessories: [
    { id: 'none', name: 'None', cost: 0 },
    { id: 'hat', name: 'Cap', cost: 200 },
    { id: 'glasses', name: 'Shades', cost: 250 }
  ]
};

export const missions: Record<string, Mission> = {
  'internet-basics': {
    id: 'internet-basics',
    title: 'Internet Basics',
    badgeName: 'Digital Explorer',
    icon: React.createElement(Globe, { className: "w-12 h-12 text-sky-400" }),
    badgeIcon: React.createElement(Globe, { className: "w-full h-full text-sky-400" }),
    description: 'Learn what the internet is and how to start exploring safely.',
    knowledge: {
      title: 'Your First Digital Steps',
      pages: [
        { text: "Hello, new hero! I'm Cybie! Imagine a giant, magical library with endless books, games, and videos. That's the internet! It connects computers all over the world." },
        { text: "Each 'book' in this library is a 'website'. You use a special car called a 'web browser' to drive to different websites. And 'links' are like magical doorways!" },
        { text: "The most important rule is to be a good 'Digital Citizen'—that means being kind, safe, and respectful to everyone you meet." },
        { text: "Your parent's smartphone, a school computer, and even smart speakers all connect to the internet. They're all connected to share information!" },
        { text: "Not everything on the internet is for everyone. Some sites are for adults only. Your browser can be set to 'kid-safe mode' to keep you safe." }
      ]
    },
    training: {
      title: 'Explorer Terminology',
      flashcards: [
        { term: "Internet", definition: "A giant web connecting computers all around the world." },
        { term: "Website", definition: "A place you visit on the internet with pages to look at." },
        { term: "Web Browser", definition: "The app you use to travel around the internet (like Chrome or Safari)." },
        { term: "Link", definition: "A clickable word or picture that takes you to another page." },
        { term: "URL", definition: "The unique address for a website, like a house address." },
        { term: "Wi-Fi", definition: "Invisible signals that let devices connect to the internet without wires." },
        { term: "Search Engine", definition: "A tool like Google that helps you find websites." },
        { term: "Online", definition: "When your device is connected to the internet." },
        { term: "Offline", definition: "When your device is not connected to the internet." },
        { term: "Digital Citizen", definition: "A person who uses the internet respectfully and safely." },
        { term: "Homepage", definition: "The first page you see when you open a website." },
        { term: "Bookmark", definition: "A saved link to your favorite websites." }
      ]
    },
    challenge: {
      title: 'Beginner Basics',
      gameType: 'matchThePairs',
      timeLimit: 120,
      content: [
        { action: "Connected computers world-wide", consequence: "Internet" },
        { action: "App for visiting websites", consequence: "Web Browser" },
        { action: "A single place on the web", consequence: "Website" },
        { action: "A clickable door to another page", consequence: "Link" },
        { action: "A website's special address", consequence: "URL" },
        { action: "Invisible signals for connection", consequence: "Wi-Fi" },
        { action: "Tool for finding things (Google)", consequence: "Search Engine" },
        { action: "Connected to the web", consequence: "Online" },
        { action: "Not connected to the web", consequence: "Offline" },
        { action: "Kind and safe person online", consequence: "Digital Citizen" }
      ]
    }
  },
  'internet-hero': {
    id: 'internet-hero',
    title: 'Password Power',
    badgeName: 'Password Protector',
    icon: React.createElement(Lock, { className: "w-12 h-12 text-green-400" }),
    badgeIcon: React.createElement(Lock, { className: "w-full h-full text-green-400" }),
    description: 'Learn to create super-strong passwords to protect your accounts.',
    knowledge: {
      title: 'The Keys to the Kingdom',
      pages: [
        { text: "Think of passwords as magic keys. A simple key like '1234' is like a twig a goblin can snap. We need keys of solid steel!" },
        { text: "A strong key has a mix: BIG letters, smol letters, symbols, and numbers. The longer and weirder, the better!" },
        { text: "Try a 'passphrase' - a silly secret sentence like 'My_Robot_Ate_8_Tacos!'. It's easy to remember but hard to guess." },
        { text: "Never, EVER use the same password on multiple accounts. If hackers crack one, they access all your accounts!" },
        { text: "A Password Manager like Bitwarden or 1Password remembers all your passwords for you. You only need to remember ONE master password." }
      ]
    },
    training: {
      title: 'Password Terminology',
      flashcards: [
        { term: "Password", definition: "A secret code you create to protect your account." },
        { term: "Username", definition: "Your online nickname. Don't use your full real name!" },
        { term: "Encryption", definition: "Scrambling data into a secret code so only you can read it." },
        { term: "2FA", definition: "Two-Factor Authentication: Needing a password AND a code from your phone." },
        { term: "Phishing", definition: "When a bad guy pretends to be someone else to steal your password." },
        { term: "Uppercase", definition: "BIG letters like A, B, C." },
        { term: "Lowercase", definition: "Small letters like a, b, c." },
        { term: "Symbol", definition: "Characters like !, @, #, $." },
        { term: "Password Manager", definition: "A secure vault that remembers all your passwords for you." },
        { term: "Biometrics", definition: "Using your fingerprint or face to unlock a device." },
        { term: "Passphrase", definition: "A long phrase that's easier to remember than a random password." },
        { term: "Brute Force", definition: "When hackers try every possible password combination." }
      ]
    },
    challenge: {
      title: 'Password Power-Up',
      gameType: 'passwordChecker',
      timeLimit: 120,
      content: [
        { scenario: "A simple lock for your game account. Needs 8+ chars and a number.", rules: { minLength: 8, needsNumber: true, needsSymbol: false, needsUpper: false, needsLower: true } },
        { scenario: "The Arcade server's lock. Needs 10+ chars, uppercase, and a symbol.", rules: { minLength: 10, needsNumber: true, needsSymbol: true, needsUpper: true, needsLower: true } },
        { scenario: "Cybie's secret vault! Needs 12+ chars with everything.", rules: { minLength: 12, needsNumber: true, needsSymbol: true, needsUpper: true, needsLower: true } }
      ]
    }
  },
  'safe-browsing': {
    id: 'safe-browsing',
    title: 'Phish Finder',
    badgeName: 'Phish Finder',
    icon: React.createElement(Search, { className: "w-12 h-12 text-amber-400" }),
    badgeIcon: React.createElement(Search, { className: "w-full h-full text-amber-400" }),
    description: 'Spot and avoid the tricky traps laid by online phishers and scammers.',
    knowledge: {
      title: 'Spotting the Traps',
      pages: [
        { text: "The internet has sneaky villains called 'phishers'. They dangle a 'free prize' email hoping you'll bite!" },
        { text: "These messages create PANIC ('Account deleted!') or GREED ('You won!') to make you click fast. Don't let them rush you!" },
        { text: "Check the sender's email for typos. Hover over links to see where they really go. Real companies rarely ask for passwords via email." },
        { text: "The email might look perfect—same colors, fonts, and logo as the real company. But check if the sender's email is legit!" },
        { text: "Trust your gut! If something feels off, it probably is. Forward it to the actual company's security team, don't reply to the phishing email." }
      ]
    },
    training: {
      title: 'Phishing Terminology',
      flashcards: [
        { term: "Phishing", definition: "A scam using fake emails or sites to steal your info." },
        { term: "Red Flag", definition: "A clue that something is fishy, like bad spelling." },
        { term: "Sender Address", definition: "Who the email is from. Always check for weird characters!" },
        { term: "Malicious Link", definition: "A link that looks innocent but takes you to a dangerous place." },
        { term: "Urgency", definition: "A trick scammers use to make you panic and click quickly." },
        { term: "Spam", definition: "Junk mail you didn't ask for." },
        { term: "Firewall", definition: "A digital guard that blocks unwanted visitors to your computer." },
        { term: "HTTPS", definition: "The 'S' stands for Secure. Look for the padlock in your browser!" },
        { term: "Spear Phishing", definition: "A phishing attack targeting a specific person with personal details." },
        { term: "Whaling", definition: "A phishing attack targeting high-level people like executives." }
      ]
    },
    challenge: {
      title: 'Phishing Trap Spotter',
      gameType: 'spotThePhish',
      timeLimit: 120,
      content: [
        { 
          title: "Bank Alert Email", 
          hotspots: [ 
            { style: {top: '10%', left: '10%', width: '65%', height: '10%'}, explanation: "Weird email address! 'your-bank-online.co' is fake." }, 
            { style: {top: '28%', left: '10%', width: '80%', height: '10%'}, explanation: "Scary threats are a red flag!" }, 
            { style: {top: '60%', left: '25%', width: '50%', height: '12%'}, explanation: "The link goes to a suspicious site." } 
          ] 
        }
      ]
    }
  },
  'cyberbully-defender': {
    id: 'cyberbully-defender',
    title: 'Cyber Shield',
    badgeName: 'Cyber Shield',
    icon: React.createElement(Shield, { className: "w-12 h-12 text-cyan-400" }),
    badgeIcon: React.createElement(Shield, { className: "w-full h-full text-cyan-400" }),
    description: 'Stand up for others and learn how to handle mean behavior online.',
    knowledge: {
      title: 'Becoming an Upstander',
      pages: [
        { text: "Sometimes people use the internet to be mean. That's 'cyberbullying'. It's a major glitch in the system." },
        { text: "You can be a 'bystander' who just watches, or an 'UPSTANDER' who helps! Heroes are always upstanders." },
        { text: "Use the Hero Trio: STOP (don't reply!), BLOCK the person, and TELL a trusted adult." },
        { text: "Cyberbullying can include mean comments, spreading rumors, sharing embarrassing photos, or creating fake accounts to harass someone." },
        { text: "Remember: What's posted can hurt for YEARS. Even deleted posts can be screenshots. Be the person who stands up, not the one who stands by." }
      ]
    },
    training: {
      title: 'Defender Terminology',
      flashcards: [
        { term: "Cyberbullying", definition: "Using digital tools to be mean or hurt someone repeatedly." },
        { term: "Upstander", definition: "Someone who sees bullying and takes action to help." },
        { term: "Bystander", definition: "Someone who sees bullying but doesn't do anything." },
        { term: "Block", definition: "A button that stops a person from contacting you." },
        { term: "Report", definition: "Telling an app's moderators about someone breaking the rules." },
        { term: "Empathy", definition: "Understanding and sharing the feelings of another person." },
        { term: "Trolling", definition: "Posting things online just to make people angry." },
        { term: "Mute", definition: "Hiding someone's messages without blocking them completely." },
        { term: "Screenshot", definition: "Taking a picture of a message to prove what was said." },
        { term: "Doxxing", definition: "Sharing someone's personal information to harass them." }
      ]
    },
    challenge: {
      title: 'Defender Decisions',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "Someone is making fun of a friend in a group chat. What do you do?", 
          options: [ 
            { text: "Join in so you don't get targeted.", feedback: "Joining in makes the problem worse. A hero helps!", correct: false }, 
            { text: "Message your friend privately to see if they're okay.", feedback: "Great! Supporting the target is a true upstander move.", correct: true }, 
            { text: "Ignore it and hope it stops.", feedback: "Ignoring it doesn't help your friend.", correct: false } 
          ] 
        },
        {
          scenario: "You see someone posting a fake rumor about a classmate. What should you do?",
          options: [
            { text: "Like it so the bully feels supported.", feedback: "That reinforces the bullying! Don't encourage it.", correct: false },
            { text: "Report it and leave a comment defending the classmate.", feedback: "Perfect! Reporting and defending is real upstander behavior.", correct: true },
            { text: "Share it to more people so everyone knows.", feedback: "That spreads the rumor further and hurts the victim more.", correct: false }
          ]
        }
      ]
    }
  },
  'privacy-guardian': {
    id: 'privacy-guardian',
    title: 'Privacy Guardian',
    badgeName: 'Social Sage',
    icon: React.createElement(UserCheck, { className: "w-12 h-12 text-indigo-400" }),
    badgeIcon: React.createElement(UserCheck, { className: "w-full h-full text-indigo-400" }),
    description: 'Master the art of sharing safely and managing your digital footprint.',
    knowledge: {
      title: 'Protecting Your Secrets',
      pages: [
        { text: "Every time you go online, you leave 'digital footprints'. A Privacy Guardian knows how to leave the right trail!" },
        { text: "Sharing your favorite pizza is cool (public). Sharing your home address is NOT (private)!" },
        { text: "Ask yourself: 'Would I show this to a random stranger?' If not, don't post it." },
        { text: "Be careful with location tagging! When you tag your location at home, you're telling everyone where you live." },
        { text: "Read privacy settings carefully. Many apps default to 'public'—change yours to 'friends only' or 'private'!" }
      ]
    },
    training: {
      title: 'Privacy Terminology',
      flashcards: [
        { term: "Digital Footprint", definition: "The trail of data you leave behind online." },
        { term: "Private Info", definition: "Details like your address, phone, and school that should stay secret." },
        { term: "Public Info", definition: "Safe things to share, like your favorite hobbies." },
        { term: "Privacy Settings", definition: "Controls that let you decide who sees your posts." },
        { term: "Oversharing", definition: "Posting too much personal information online." },
        { term: "Tagging", definition: "Identifying someone in a photo. Always ask first!" },
        { term: "Cookies", definition: "Small files that websites use to remember you." },
        { term: "Incognito Mode", definition: "A browser setting that doesn't save your history." },
        { term: "Location Services", definition: "Features that share where you are with apps." },
        { term: "Data Collection", definition: "Apps gathering information about you and your habits." }
      ]
    },
    challenge: {
      title: 'Privacy Sort',
      gameType: 'dragAndDrop',
      timeLimit: 90,
      content: [
        { text: "Your cat's name", type: "safe" },
        { text: "Your home address", type: "unsafe" },
        { text: "Your favorite color", type: "safe" },
        { text: "Your school's name", type: "unsafe" },
        { text: "A drawing you made", type: "safe" },
        { text: "Your phone number", type: "unsafe" },
        { text: "Your favorite game", type: "safe" },
        { text: "Your parents' work location", type: "unsafe" }
      ]
    }
  },
  'malware-menace': {
    id: 'malware-menace',
    title: 'Malware Menace',
    badgeName: 'Virus Vanquisher',
    icon: React.createElement(Bug, { className: "w-12 h-12 text-rose-400" }),
    badgeIcon: React.createElement(Bug, { className: "w-full h-full text-rose-400" }),
    description: 'Identify and defeat digital pests like viruses and malware.',
    knowledge: {
      title: 'Digital Germs',
      pages: [
        { text: "Malware is like a digital germ that makes your computer sick. It can hide in games, emails, or ads!" },
        { text: "You get it from suspicious downloads or clicking strange links. They're sneaky!" },
        { text: "Your best defense is an 'antivirus' program - it's like a doctor for your device." },
        { text: "Symptoms of malware: Your device is slow, lots of pop-ups, strange apps installed that you didn't download, or your battery drains fast." },
        { text: "Always download apps from official sources like the App Store or Google Play. Never from random websites!" }
      ]
    },
    training: {
      title: 'Malware Terminology',
      flashcards: [
        { term: "Malware", definition: "Software designed to harm your computer." },
        { term: "Virus", definition: "A program that copies itself to spread to other computers." },
        { term: "Trojan Horse", definition: "Malware that pretends to be a useful app or game." },
        { term: "Ransomware", definition: "Malware that locks your files and demands money." },
        { term: "Spyware", definition: "Software that secretly watches what you do online." },
        { term: "Antivirus", definition: "Software that finds and removes malware." },
        { term: "Software Update", definition: "Updates that fix security holes in your apps." },
        { term: "Pop-up", definition: "A window that suddenly appears, often carrying ads or malware." },
        { term: "Worm", definition: "A virus that spreads itself without needing you to do anything." },
        { term: "Quarantine", definition: "When an antivirus isolates a threat so it can't hurt you." }
      ]
    },
    challenge: {
      title: 'Malware Mission',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "A pop-up says 'YOU HAVE 5 VIRUSES! CLICK TO CLEAN!'. What do you do?", 
          options: [ 
            { text: "Click it to fix the problem.", feedback: "The pop-up IS the trap! Never click them.", correct: false }, 
            { text: "Close the browser window immediately.", feedback: "Correct! Closing the window is the safest move.", correct: true }, 
            { text: "Restart your computer.", feedback: "Restarting might help, but closing the ad is better.", correct: false } 
          ] 
        },
        {
          scenario: "A friend sends you a link to 'Free Game Download!' that looks suspicious. What do you do?",
          options: [
            { text: "Download it immediately before it expires.", feedback: "That's a trap! Real games don't expire or come through random links.", correct: false },
            { text: "Ask your friend if they really sent it (their account might be hacked) and download only from official stores.", feedback: "Perfect security practice! Official stores have security checks.", correct: true },
            { text: "Download it but scan with antivirus right after.", feedback: "Better than nothing, but prevention is better than cure!", correct: false }
          ]
        }
      ]
    }
  },
  'truth-detective': {
    id: 'truth-detective',
    title: 'Truth Detective',
    badgeName: 'Fact Finder',
    icon: React.createElement(FileSearch, { className: "w-12 h-12 text-blue-400" }),
    badgeIcon: React.createElement(FileSearch, { className: "w-full h-full text-blue-400" }),
    description: 'Spot the difference between real news and fake stories online.',
    knowledge: {
      title: 'Finding the Facts',
      pages: [
        { text: "Not everything on the internet is true! Some stories are made up to trick you. This is 'misinformation'." },
        { text: "People make fake stories for money, to make people angry, or just as a bad joke." },
        { text: "Check the source! Does a real news site say the same thing? If it sounds too wild, it probably is." },
        { text: "A good detective asks: Who wrote this? When was it written? Do other trusted sources agree? What facts can I verify?" },
        { text: "AI deepfakes can make videos of people saying things they never said. Look for odd lip-syncing or glitchy parts!" }
      ]
    },
    training: {
      title: 'Detective Terminology',
      flashcards: [
        { term: "Misinformation", definition: "False info spread by mistake." },
        { term: "Disinformation", definition: "False info spread on purpose to trick people." },
        { term: "Clickbait", definition: "Shocking headlines meant to make you click." },
        { term: "Fact-Checking", definition: "Verifying if a story is actually true." },
        { term: "Source", definition: "Where the information comes from." },
        { term: "Bias", definition: "Favoring one side of a story over another." },
        { term: "Satire", definition: "Using humor to make a point, often with fake stories." },
        { term: "Deepfake", definition: "A fake video or image made with AI to look real." },
        { term: "Credible", definition: "Able to be trusted and believed." },
        { term: "Verification", definition: "Proving that something is true." }
      ]
    },
    challenge: {
      title: 'Headline Hunt',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "Headline: 'Scientists find a cure for all colds! Click now!'. What's your move?", 
          options: [ 
            { text: "Share it with everyone!", feedback: "Wait! Big news like this would be everywhere if true.", correct: false }, 
            { text: "Search for it on a trusted news site first.", feedback: "Perfect! Real detectives always verify.", correct: true }, 
            { text: "Click to see the cure.", feedback: "Careful! This could be a scam link.", correct: false } 
          ] 
        },
        {
          scenario: "You see a video of a celebrity saying something unbelievable. How do you check it?",
          options: [
            { text: "Assume it's real and share it immediately.", feedback: "With deepfakes, you need to verify first!", correct: false },
            { text: "Look for the video on official celebrity accounts and reputable news sites.", feedback: "Great! Checking multiple sources reveals fake videos.", correct: true },
            { text: "Check TikTok comments to see if others think it's real.", feedback: "TikTok isn't a reliable fact-checker. Stick to official sources.", correct: false }
          ]
        }
      ]
    }
  },
  'ad-alert': {
    id: 'ad-alert',
    title: 'Ad Alert',
    badgeName: 'Ad Blocker Pro',
    icon: React.createElement(AlertTriangle, { className: "w-12 h-12 text-pink-400" }),
    badgeIcon: React.createElement(AlertTriangle, { className: "w-full h-full text-pink-400" }),
    description: 'Navigate the world of online ads and in-app purchases safely.',
    knowledge: {
      title: 'Sneaky Salesbots',
      pages: [
        { text: "Some 'free' games are full of ads and tricks to make you spend real money." },
        { text: "In-app purchases let you buy items with real money. Never buy anything without asking an adult!" },
        { text: "Ads can be banners, pop-ups, or even look like part of the game. Stay sharp!" },
        { text: "Some ads try to trick you with words like 'FREE' or 'LIMITED TIME!'. These are manipulation tactics." },
        { text: "Always ask an adult before watching a video ad to unlock something. You might accidentally click the purchase button!" }
      ]
    },
    training: {
      title: 'Commerce Lingo',
      flashcards: [
        { term: "In-App Purchase", definition: "Buying things inside an app with real money." },
        { term: "Ad", definition: "A message trying to sell you something." },
        { term: "Banner Ad", definition: "An ad that sits at the top or bottom of a screen." },
        { term: "Pop-up Ad", definition: "An ad that suddenly appears and covers your screen." },
        { term: "Loot Box", definition: "A mystery box with random items that costs money." },
        { term: "Microtransaction", definition: "A very small purchase, usually in a game." },
        { term: "Targeted Ad", definition: "An ad based on things you've searched for before." },
        { term: "Sponsorship", definition: "When a creator is paid to talk about a product." },
        { term: "Clickbait", definition: "A misleading ad designed to trick you into clicking." },
        { term: "Currency", definition: "Special coins or gems in games that cost real money." }
      ]
    },
    challenge: {
      title: 'Purchase Protection',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "You see a flashing ad saying 'UNLOCK 100 GEMS FOR $1.99 - LIMITED TIME!'. What do you do?", 
          options: [ 
            { text: "Click it immediately before it expires!", feedback: "That's the trap! It's not really limited. Ask an adult first anyway.", correct: false }, 
            { text: "Ask an adult for permission before doing anything.", feedback: "Perfect! Never make purchases without grown-up approval.", correct: true }, 
            { text: "Close the ad and keep playing. The gems aren't that important.", feedback: "Great thinking! That's also a smart choice.", correct: true } 
          ] 
        },
        {
          scenario: "While playing, you accidentally tap on a purchase button. What happens next?",
          options: [
            { text: "Your game purchase completes immediately with real money charged.", feedback: "Sometimes it's instant, sometimes your parent has to confirm. Either way, own up to it!", correct: false },
            { text: "Tell your parent right away so they can check their account.", feedback: "This is the hero move! Immediate honesty prevents bigger problems.", correct: true },
            { text: "Hope nobody notices and keep playing.", feedback: "Bad idea! Parents ALWAYS notice the charges. Honesty is better.", correct: false }
          ]
        }
      ]
    }
  },
  'social-media': {
    id: 'social-media',
    title: 'Social Media Smart',
    badgeName: 'Social Star',
    icon: React.createElement(Share2, { className: "w-12 h-12 text-purple-400" }),
    badgeIcon: React.createElement(Share2, { className: "w-full h-full text-purple-400" }),
    description: 'Learn how to be a positive and safe presence on social networks.',
    knowledge: {
      title: 'Social Networking 101',
      pages: [
        { text: "Social media is for connecting, but it has rules! Most apps require you to be 13 or older." },
        { text: "What you post stays online forever. It's like writing in permanent marker on the internet!" },
        { text: "Be kind! Comments can hurt just as much as words spoken in person." },
        { text: "Never accept friend requests from strangers. They might not be who they claim to be." },
        { text: "Check your privacy settings  regularly! Make sure only friends can see your posts and personal info." }
      ]
    },
    training: {
      title: 'Social Lingo',
      flashcards: [
        { term: "Profile", definition: "Your personal page on a social network." },
        { term: "Follower", definition: "Someone who subscribes to see your posts." },
        { term: "Direct Message (DM)", definition: "A private message sent to one person." },
        { term: "Algorithm", definition: "The computer code that decides what you see in your feed." },
        { term: "Influencer", definition: "Someone with many followers who can affect others' opinions." },
        { term: "Hashtag", definition: "A word starting with # used to group similar posts." },
        { term: "Feed", definition: "The main stream of posts you see when you open an app." },
        { term: "Privacy Policy", definition: "The rules about how an app uses your data." },
        { term: "Cyberbullying", definition: "Bullying done through digital devices and social media." },
        { term: "Blocking", definition: "Preventing someone from contacting you or seeing your profile." }
      ]
    },
    challenge: {
      title: 'Social Choices',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "You want to join a new app that says 'Must be 13'. You are 10. What do you do?", 
          options: [ 
            { text: "Lie about your age to join.", feedback: "Lying about your age can expose you to content that isn't safe for you.", correct: false }, 
            { text: "Wait until you are 13 or ask for a kid-safe app.", feedback: "Correct! Rules are there for your safety.", correct: true }, 
            { text: "Use your parent's account without asking.", feedback: "Never use accounts without permission!" , correct: false } 
          ] 
        },
        {
          scenario: "Someone you don't know sends you a friend request. What should you do?",
          options: [
            { text: "Accept it right away—you love having more followers!", feedback: "Don't accept requests from strangers. This is a common predator tactic.", correct: false },
            { text: "Check their profile. If they seem suspicious or have no profile picture, say no.", feedback: "Perfect! You're using good judgment to protect yourself.", correct: true },
            { text: "Ask them to send you a private message first.", feedback: "Better to not engage at all. Just decline the request.", correct: false }
          ]
        }
      ]
    }
  },
  'ai-explorer': {
    id: 'ai-explorer',
    title: 'AI Explorer',
    badgeName: 'AI Ace',
    icon: React.createElement(Cpu, { className: "w-12 h-12 text-teal-400" }),
    badgeIcon: React.createElement(Cpu, { className: "w-full h-full text-teal-400" }),
    description: 'Understand what AI is and how to use it safely and creatively.',
    knowledge: {
      title: 'The World of AI',
      pages: [
        { text: "AI stands for Artificial Intelligence. It's when computers are trained to 'think' and solve problems like humans." },
        { text: "AI can help us write, draw, and learn, but it's not always right! It can make mistakes called 'hallucinations'." },
        { text: "Never share personal secrets with an AI. It remembers what you tell it to learn more!" },
        { text: "AI learns from examples. If it learns from biased data, it might make unfair decisions about people." },
        { text: "AI is a powerful tool, but it's not magic. Humans need to check its work and use good judgment." }
      ]
    },
    training: {
      title: 'AI Terminology',
      flashcards: [
        { term: "AI", definition: "Artificial Intelligence: Computers doing 'smart' things." },
        { term: "Machine Learning", definition: "How AI learns from huge amounts of data." },
        { term: "Prompt", definition: "The instructions you give to an AI." },
        { term: "Chatbot", definition: "An AI you can talk to, like a digital assistant." },
        { term: "Generative AI", definition: "AI that can create new things like art or stories." },
        { term: "Hallucination", definition: "When an AI confidently says something that is totally false." },
        { term: "Ethics", definition: "Rules about what is right and wrong when using AI." },
        { term: "Training Data", definition: "The information used to teach an AI how to work." },
        { term: "Algorithm", definition: "The set of rules an AI uses to make decisions." },
        { term: "Bias", definition: "When an AI is unfair to certain groups of people." }
      ]
    },
    challenge: {
      title: 'AI Smart',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "An AI tells you a 'fact' that sounds really weird. What do you do?", 
          options: [ 
            { text: "Believe it! Computers are always right.", feedback: "AI can make mistakes! Always double-check.", correct: false }, 
            { text: "Check the fact in a book or on a trusted website.", feedback: "Correct! AI is a tool, not a perfect source of truth.", correct: true }, 
            { text: "Tell everyone the new 'fact'.", feedback: "Spreading unverified info can lead to misinformation.", correct: false } 
          ] 
        },
        {
          scenario: "You want to use AI to help with your homework. What's the best way?",
          options: [
            { text: "Ask it to write the whole essay for you.", feedback: "That's cheating! AI should help you learn, not do the work for you.", correct: false },
            { text: "Ask it to explain a difficult concept or give you an outline.", feedback: "Perfect! Using AI as a tutor or brainstorming partner is great.", correct: true },
            { text: "Copy and paste whatever it says without reading it.", feedback: "Risky! AI can be wrong, and you won't learn anything.", correct: false }
          ]
        }
      ]
    }
  },
  'digital-wellness': {
    id: 'digital-wellness',
    title: 'Digital Wellness',
    badgeName: 'Balance Boss',
    icon: React.createElement(Zap, { className: "w-12 h-12 text-yellow-400" }),
    badgeIcon: React.createElement(Zap, { className: "w-full h-full text-yellow-400" }),
    description: 'Learn to balance your screen time and stay healthy in the digital age.',
    knowledge: {
      title: 'Finding Your Balance',
      pages: [
        { text: "The internet is awesome, but too much of it can make you feel tired or grumpy. This is why 'Digital Balance' is important!" },
        { text: "Taking breaks helps your eyes, your brain, and your body. Try the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds." },
        { text: "Remember to spend time offline too—playing outside, reading books, and talking to friends in person are just as important as gaming!" },
        { text: "If you notice you're checking your phone in bed, during meals, or during homework, that's a sign to take a break." },
        { text: "Most phones have 'Screen Time' settings that help you know how much time you're spending. Ask your parent to review yours with you!" }
      ]
    },
    training: {
      title: 'Wellness Words',
      flashcards: [
        { term: "Screen Time", definition: "The amount of time you spend looking at digital devices." },
        { term: "Digital Detox", definition: "Taking a planned break from all digital devices." },
        { term: "Blue Light", definition: "The light from screens that can make it hard to sleep at night." },
        { term: "Ergonomics", definition: "Setting up your desk and chair so your body stays comfortable and healthy." },
        { term: "Mindfulness", definition: "Being aware of how you feel while using technology." },
        { term: "Notifications", definition: "Alerts that try to pull your attention back to your device." },
        { term: "FOMO", definition: "Fear Of Missing Out: Feeling like you need to be online all the time." },
        { term: "JOMO", definition: "Joy Of Missing Out: Enjoying your time offline without worrying about the web." },
        { term: "Posture", definition: "How you sit. Good posture prevents neck and back pain during screen time." },
        { term: "Breaks", definition: "Regular periods away from screens to rest your eyes and mind." }
      ]
    },
    challenge: {
      title: 'Wellness Warrior',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "You've been playing a game for two hours and your eyes are starting to sting. What should you do?", 
          options: [ 
            { text: "Keep playing until you finish the level.", feedback: "Your health is more important than a game level! Take a break.", correct: false }, 
            { text: "Save your game and go for a 15-minute walk outside.", feedback: "Excellent! A physical break is exactly what you need.", correct: true }, 
            { text: "Switch to watching videos on your phone instead.", feedback: "That's still screen time! Your eyes need a real break.", correct: false } 
          ] 
        },
        {
          scenario: "It's 30 minutes before bedtime. What's the best digital choice?",
          options: [
            { text: "Play one last high-energy game.", feedback: "High energy and blue light can make it hard to fall asleep.", correct: false },
            { text: "Put your devices away and read a paper book.", feedback: "Perfect! This helps your brain get ready for a good night's sleep.", correct: true },
            { text: "Check all your social media notifications.", feedback: "Notifications can make your brain too active before bed.", correct: false }
          ]
        }
      ]
    }
  },
  'copyright-hero': {
    id: 'copyright-hero',
    title: 'Copyright Hero',
    badgeName: 'Creative Creator',
    icon: React.createElement(UserCheck, { className: "w-12 h-12 text-orange-400" }),
    badgeIcon: React.createElement(UserCheck, { className: "w-full h-full text-orange-400" }),
    description: 'Learn how to respect others\' work and protect your own creations.',
    knowledge: {
      title: 'Respecting Creativity',
      pages: [
        { text: "When someone creates something—like a song, a drawing, or a video—they own it. This is called 'Copyright'." },
        { text: "You can't just take someone else's work and say it's yours. That's called 'Plagiarism'. It's like stealing a digital toy!" },
        { text: "But you can use things if you have permission or if they are 'Creative Commons'. Always give credit to the original creator!" },
        { text: "When you make your own work, YOU own the copyright! Protect it by watermarking your drawings or keeping a dated copy of your creation." },
        { text: "Screenshot or download only what you have permission to. Public Domain and Creative Commons work are safe, but always check the license!" }
      ]
    },
    training: {
      title: 'Creator Lingo',
      flashcards: [
        { term: "Copyright", definition: "A law that protects a creator's work from being copied without permission." },
        { term: "Plagiarism", definition: "Taking someone else's work or ideas and passing them off as your own." },
        { term: "Fair Use", definition: "A rule that lets you use small parts of copyrighted work for things like school reports or reviews." },
        { term: "Creative Commons", definition: "A type of license where creators give everyone permission to use their work for free." },
        { term: "Public Domain", definition: "Work that is free for anyone to use because its copyright has expired." },
        { term: "Attribution", definition: "Giving credit to the person who created the work you are using." },
        { term: "Piracy", definition: "Illegally downloading or sharing copyrighted things like movies or games." },
        { term: "Intellectual Property", definition: "Creations of the mind, like inventions, art, and designs." },
        { term: "Watermark", definition: "A visible mark placed on digital work to show who created it." },
        { term: "License", definition: "Permission to use something in specific ways, with specific rules." }
      ]
    },
    challenge: {
      title: 'Copyright Check',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "You found a cool drawing online and want to use it in your school presentation. What's the right move?", 
          options: [ 
            { text: "Just copy and paste it. It's on the internet, so it's free, right?", feedback: "Wrong! Most things online are copyrighted. You need to check for permission.", correct: false }, 
            { text: "Check if it has a Creative Commons license and make sure to include the artist's name.", feedback: "Spot on! Respecting the creator and giving credit is the hero way.", correct: true }, 
            { text: "Crop out the artist's signature so it looks cleaner.", feedback: "That's even worse! Never remove a creator's mark.", correct: false } 
          ] 
        },
        {
          scenario: "Your friend asks to use your artwork for their video without permission. What do you do?",
          options: [
            { text: "Say yes because they're your friend.", feedback: "Friendship is great, but your work is YOUR property! You should have a say.", correct: false },
            { text: "Say you want credit if they use it, or politely decline.", feedback: "Perfect! You're protecting your work AND being a good friend.", correct: true },
            { text: "Wait and see if they post it without asking.", feedback: "By then it's too late. Set boundaries BEFORE they use it.", correct: false }
          ]
        }
      ]
    }
  },
  'gaming-safety': {
    id: 'gaming-safety',
    title: 'Gaming Safety',
    badgeName: 'Pro Gamer',
    icon: React.createElement(MousePointer2, { className: "w-12 h-12 text-red-400" }),
    badgeIcon: React.createElement(MousePointer2, { className: "w-full h-full text-red-400" }),
    description: 'Stay safe while playing games online and interacting with other players.',
    knowledge: {
      title: 'Safe Gaming 101',
      pages: [
        { text: "Online games are fun! You can play with people from all over the world. But remember, not everyone is who they say they are." },
        { text: "Never share your real name, location, or school in a game chat. Use a cool gamer tag instead!" },
        { text: "If someone makes you feel uncomfortable or asks for personal info, use the 'Mute' or 'Report' buttons immediately." },
        { text: "Watch out for scams! Some players might offer 'free items' in exchange for sensitive info. This is a trick!" },
        { text: "Take breaks from gaming! Playing for too long can be tiring. Balance gaming with other activities." }
      ]
    },
    training: {
      title: 'Gamer Lingo',
      flashcards: [
        { term: "Gamer Tag", definition: "A nickname you use in games instead of your real name." },
        { term: "Mute", definition: "A setting that stops you from hearing or seeing messages from a specific player." },
        { term: "Report", definition: "Telling the game company that a player is breaking the rules or being mean." },
        { term: "Griefing", definition: "When a player intentionally tries to ruin the game for others." },
        { term: "Skin", definition: "A cosmetic item that changes how your character looks." },
        { term: "Server", definition: "The digital 'room' where a game takes place." },
        { term: "Voice Chat", definition: "Talking to other players using a microphone. Be careful what you say!" },
        { term: "Friend Request", definition: "An invitation to connect. Only accept from people you actually know!" },
        { term: "Account Hijacking", definition: "When someone hacks your account to steal your items or play as you." },
        { term: "Toxic", definition: "Behavior that's mean, rude, or disruptive to other players." }
      ]
    },
    challenge: {
      title: 'Gamer Guard',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "A player you don't know asks for your Discord or phone number to 'play better'. What do you do?", 
          options: [ 
            { text: "Give it to them! They seem nice.", feedback: "Never share personal contact info with strangers in games.", correct: false }, 
            { text: "Say 'No thanks' and keep playing the game.", feedback: "Perfect! Keeping your personal life separate from the game is smart.", correct: true }, 
            { text: "Tell them your address instead.", feedback: "That's even more dangerous! Never share your location.", correct: false } 
          ] 
        },
        {
          scenario: "Someone offers you free legendary items if you share your password. What do you do?",
          options: [
            { text: "Share your password to get the items!", feedback: "This is a classic scam! Your password is your security. Never share it for ANY reason.", correct: false },
            { text: "Politely decline and report the player if they keep asking.", feedback: "Excellent! You spotted the scam and took action.", correct: true },
            { text: "Ask them to show you the items first.", feedback: "Even if they show you items, it's still a trap. Don't share passwords!", correct: false }
          ]
        }
      ]
    }
  },
  'mobile-guard': {
    id: 'mobile-guard',
    title: 'Mobile Guard',
    badgeName: 'Phone Protector',
    icon: React.createElement(Smartphone, { className: "w-12 h-12 text-blue-400" }),
    badgeIcon: React.createElement(Smartphone, { className: "w-full h-full text-blue-400" }),
    description: 'Secure your smartphone and learn about app permissions.',
    knowledge: {
      title: 'Smart Phone, Smarter You',
      pages: [
        { text: "Your phone is a powerful computer in your pocket! It needs protection just like a laptop." },
        { text: "Apps often ask for 'permissions' to use your camera, location, or contacts. Only give them what they REALLY need!" },
        { text: "Always use a screen lock (PIN, pattern, or biometrics) so if you lose your phone, your data stays safe." },
        { text: "Keep your phone software updated! Updates fix security problems that hackers exploit." },
        { text: "Download apps only from official stores like App Store or Google Play. Third-party stores can have fake or malicious apps!" }
      ]
    },
    training: {
      title: 'Mobile Mastery',
      flashcards: [
        { term: "Permission", definition: "Allowing an app to access a specific part of your phone." },
        { term: "App Store", definition: "The only safe place to download new apps." },
        { term: "Screen Lock", definition: "A security layer that prevents others from opening your phone." },
        { term: "Location Services", definition: "A feature that tells apps exactly where you are." },
        { term: "Update", definition: "Fixing bugs and security holes in your phone's software." },
        { term: "Public Wi-Fi", definition: "Unsecured internet that can be risky for private stuff." },
        { term: "Bluetooth", definition: "Short-range wireless that should be turned off when not in use." },
        { term: "Remote Wipe", definition: "A way to delete all data from a lost phone from far away." },
        { term: "Two-Factor Auth", definition: "An extra verification step when logging in to important apps." },
        { term: "SIM Card", definition: "The tiny chip that connects your phone to the cellular network." }
      ]
    },
    challenge: {
      title: 'Permission Patrol',
      gameType: 'sorting',
      timeLimit: 120,
      content: [
        { text: "Camera for a photo app", type: "safe" },
        { text: "Contacts for a calculator", type: "unsafe" },
        { text: "Location for a map", type: "safe" },
        { text: "Microphone for a simple game", type: "unsafe" },
        { text: "Storage for a file manager", type: "safe" },
        { text: "SMS for a flashlight app", type: "unsafe" },
        { text: "Contacts for a messaging app", type: "safe" },
        { text: "Location for a weather app", type: "safe" }
      ]
    }
  },
  'smart-home': {
    id: 'smart-home',
    title: 'Smart Home Security',
    badgeName: 'Home Warden',
    icon: React.createElement(Home, { className: "w-12 h-12 text-green-400" }),
    badgeIcon: React.createElement(Home, { className: "w-full h-full text-green-400" }),
    description: 'Secure the smart devices in your home from digital intruders.',
    knowledge: {
      title: 'The Connected Home',
      pages: [
        { text: "Smart speakers, cameras, and even fridges can connect to the internet. This is called the 'Internet of Things' (IoT)." },
        { text: "If these devices aren't secured, hackers could listen in or see through your cameras. Scary!" },
        { text: "Change the default passwords on all your smart devices immediately after getting them." },
        { text: "Many smart home devices send lots of data to the cloud. Check privacy settings and disable features you don't need." },
        { text: "Put your smart devices on a separate Wi-Fi network if your router allows it. This keeps them away from your main computer." }
      ]
    },
    training: {
      title: 'IoT Intelligence',
      flashcards: [
        { term: "IoT", definition: "Internet of Things: Everyday objects connected to the web." },
        { term: "Default Password", definition: "The simple password a device comes with (like 'admin'). Change it!" },
        { term: "Firmware", definition: "The internal software that runs a smart device." },
        { term: "Smart Speaker", definition: "A device that listens for commands. Mute it when not in use!" },
        { term: "Network Isolation", definition: "Keeping smart devices on a separate Wi-Fi from your main computer." },
        { term: "Encryption", definition: "Making sure the data sent by your devices is secret." },
        { term: "Cloud Storage", definition: "Where smart cameras often save their videos." },
        { term: "Two-Factor (2FA)", definition: "An extra layer of security for your smart home accounts." },
        { term: "Microphone", definition: "A sensor in smart speakers that can be hacked if not secured." },
        { term: "Privacy Breach", definition: "When someone gains unauthorized access to your private data." }
      ]
    },
    challenge: {
      title: 'Home Security Quiz',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "You just got a smart speaker as a gift. What should you do FIRST?", 
          options: [ 
            { text: "Set it up with the default password and enjoy it.", feedback: "Wrong! Default passwords are easy to guess. Change it immediately.", correct: false }, 
            { text: "Change the default password to something strong and check privacy settings.", feedback: "Perfect! Security first, entertainment second.", correct: true }, 
            { text: "Don't worry, hackers won't target your home.", feedback: "Any connected device can be a target. Don't underestimate cyber risks.", correct: false } 
          ] 
        },
        {
          scenario: "Your smart camera is recording videos all the time. What's a smart move?",
          options: [
            { text: "Leave it recording 24/7. More footage is safer!", feedback: "More recording means more data collected. Disable it when you're away or sleeping if privacy settings allow.", correct: false },
            { text: "Disable the feature or adjust it to only record when motion is detected.", feedback: "Excellent! This balances security with privacy.", correct: true },
            { text: "Share the password with your friends so they can watch too.", feedback: "Sharing passwords makes your home less secure. Keep it private!", correct: false }
          ]
        }
      ]
    }
  },
  'digital-footprint': {
    id: 'digital-footprint',
    title: 'Footprint Master',
    badgeName: 'Legacy Leader',
    icon: React.createElement(History, { className: "w-12 h-12 text-purple-400" }),
    badgeIcon: React.createElement(History, { className: "w-full h-full text-purple-400" }),
    description: 'Understand the long-term impact of your online actions.',
    knowledge: {
      title: 'Your Digital Legacy',
      pages: [
        { text: "Everything you do online—posts, comments, likes—creates a 'Digital Footprint' that can last forever." },
        { text: "Think before you post! A mean comment today could be seen by a college or boss years from now." },
        { text: "You can't always 'delete' things. Once it's online, someone could have screenshotted it." }
      ]
    },
    training: {
      title: 'Footprint Facts',
      flashcards: [
        { term: "Digital Footprint", definition: "The permanent record of your online activity." },
        { term: "Reputation", definition: "How others see you based on your online behavior." },
        { term: "Privacy Policy", definition: "The document that explains how an app uses your data." },
        { term: "Data Mining", definition: "When companies collect your info to sell to advertisers." },
        { term: "Permanence", definition: "The idea that things online stay there forever." },
        { term: "Oversharing", definition: "Posting too much personal info that could hurt your reputation." },
        { term: "Digital Citizenship", definition: "Using technology in a responsible and kind way." },
        { term: "Searchability", definition: "How easy it is for others to find your past posts." }
      ]
    },
    challenge: {
      title: 'Legacy Logic',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "You're angry at a friend and want to post something mean. What's the best choice?", 
          options: [ 
            { text: "Post it! They deserve it.", feedback: "Wait! That post will stay on your footprint forever and hurt your reputation.", correct: false }, 
            { text: "Write it in a private journal or talk to them in person later.", feedback: "Perfect! Handling emotions offline keeps your digital footprint clean.", correct: true }, 
            { text: "Post it but delete it 5 minutes later.", feedback: "Someone could have already seen it or screenshotted it!", correct: false } 
          ] 
        }
      ]
    }
  },
  'cloud-security': {
    id: 'cloud-security',
    title: 'Cloud Keeper',
    badgeName: 'Cloud Commander',
    icon: React.createElement(Lock, { className: "w-12 h-12 text-cyan-400" }),
    badgeIcon: React.createElement(Lock, { className: "w-full h-full text-cyan-400" }),
    description: 'Protect your files stored in the cloud and manage multiple accounts.',
    knowledge: {
      title: 'Beyond Your Device',
      pages: [
        { text: "The 'cloud' is someone else's powerful computer storing YOUR files. Google Drive, OneDrive, and iCloud are clouds in the sky!" },
        { text: "Cloud storage is super convenient, but you must use strong passwords and 2FA. If hackers get in, ALL your photos and documents are at risk!" },
        { text: "Be careful what you upload. Public folders can be seen by anyone if they get the link. Private folders need special permissions." },
        { text: "Delete old accounts you don't use anymore. They're like leaving doors open to your digital house while you're away!" }
      ]
    },
    training: {
      title: 'Cloud Computing',
      flashcards: [
        { term: "Cloud", definition: "Files stored on internet servers instead of your device." },
        { term: "Backup", definition: "Making a copy of your important files just in case." },
        { term: "Sync", definition: "Automatically keeping files the same across multiple devices." },
        { term: "API", definition: "Tools that let different apps talk to each other." },
        { term: "Token", definition: "A temporary pass that proves you're you without a password." },
        { term: "Endpoint", definition: "A place on the internet where your data connects." },
        { term: "Version History", definition: "The ability to see and restore old versions of your files." },
        { term: "Shared Drive", definition: "A folder multiple people can access together." },
        { term: "Encryption in Transit", definition: "Scrambling your data while it travels to the cloud." },
        { term: "Encryption at Rest", definition: "Scrambling your data while it sits on cloud servers." }
      ]
    },
    challenge: {
      title: 'Cloud Cipher',
      gameType: 'codeBreaker',
      timeLimit: 150,
      content: [
        { 
          text: "5280", 
          scenario: "First digit is the number of feet in a mile divided by 1000|Second is 2 plus 8|Third is 8 minus 0|Fourth is 0 times anything"
        },
        {
          text: "3141",
          scenario: "First digit is 3|Second is the Roman numeral I converted|Fourth is the first digit minus 2|Third is 4"
        },
        {
          text: "7410",
          scenario: "First is 7|Second is the number of days in a week plus 3|Third is half of 20|Fourth is a zero"
        }
      ]
    }
  },
  'email-safety': {
    id: 'email-safety',
    title: 'Email Enforcer',
    badgeName: 'Mail Master',
    icon: React.createElement(MessageSquare, { className: "w-12 h-12 text-orange-400" }),
    badgeIcon: React.createElement(MessageSquare, { className: "w-full h-full text-orange-400" }),
    description: 'Master email security and learn to spot phishing attempts.',
    knowledge: {
      title: 'Email Excellence',
      pages: [
        { text: "Email is like digital mail. But unlike real letters, it can be hacked, intercepted, or scammed." },
        { text: "Never answer emails that ask for passwords, credit cards, or personal information. Real companies NEVER ask this via email." },
        { text: "Check the sender's email address carefully. 'supp0rt@fakeb ank.com' looks like 'support@bank.com' but it's NOT!" },
        { text: "If an email seems suspicious, ask a trusted adult or contact the company through their official website instead of replying." },
        { text: "Attachments can hide viruses! Never open attachments from people you don't know." }
      ]
    },
    training: {
      title: 'Email Essentials',
      flashcards: [
        { term: "Phishing Email", definition: "A fake email that looks real to trick you into giving up secrets." },
        { term: "Spoofing", definition: "Making an email look like it's from someone important when it's not." },
        { term: "Spam", definition: "Unwanted mass emails, often trying to sell something." },
        { term: "Attachment", definition: "A file sent with an email. Only open from trusted people!" },
        { term: "Subject Line", definition: "The headline of the email that shows in your inbox." },
        { term: "BCC", definition: "Blind Copy: Sending to someone without others knowing." },
        { term: "Reply All", definition: "Responding to everyone on an email thread. Be careful—embarrassing!" },
        { term: "Unsubscribe", definition: "A button to stop receiving emails from a company." },
        { term: "Signature", definition: "Your name and info at the bottom of emails." },
        { term: "Bounce Back", definition: "When an email returns because the address doesn't exist." }
      ]
    },
    challenge: {
      title: 'Email Detector',
      gameType: 'spotThePhish',
      timeLimit: 120,
      content: [
        { 
          title: "Amazon Order Confirmation?", 
          hotspots: [ 
            { style: { top: '5%', left: '5%', width: '90%', height: '15%' }, explanation: "Check the sender address at the very top—is it really from Amazon?" }, 
            { style: { top: '25%', left: '10%', width: '80%', height: '15%' }, explanation: "Urgent language ('Act now!') is a red flag for phishing." },
            { style: { top: '50%', left: '15%', width: '70%', height: '12%' }, explanation: "A suspicious link asking you to verify your password—NEVER click!" }
          ] 
        }
      ]
    }
  },
  'video-call-safety': {
    id: 'video-call-safety',
    title: 'Video Vault',
    badgeName: 'Call Commander',
    icon: React.createElement(Eye, { className: "w-12 h-12 text-pink-400" }),
    badgeIcon: React.createElement(Eye, { className: "w-full h-full text-pink-400" }),
    description: 'Stay safe during video calls and screen sharing.',
    knowledge: {
      title: 'Seeing and Being Seen',
      pages: [
        { text: "Video calls are awesome for seeing friends and family far away. But anyone taking a screenshot could save your image forever!" },
        { text: "Check your background before you go on camera! You don't want to accidentally show your address or schedule on your wall." },
        { text: "Mute your microphone when you're not talking. You might accidentally share something private!" },
        { text: "Never accept video calls from strangers. And if someone asks to see private body parts on camera—that's abuse. Tell an adult!" },
        { text: "Be careful with screen sharing! Hide passwords, personal files, and private conversations before you start." }
      ]
    },
    training: {
      title: 'Call Lingo',
      flashcards: [
        { term: "Mute", definition: "Turning off your microphone so others can't hear you." },
        { term: "Unmute", definition: "Turning your microphone back on." },
        { term: "Screen Share", definition: "Showing everyone what's on your computer screen." },
        { term: "Camera", definition: "The video part of a video call. Disable it for privacy!" },
        { term: "Microphone", definition: "The audio part of a video call." },
        { term: "Background", definition: "What people see behind you on camera." },
        { term: "Blur Background", definition: "A feature that hides what's behind you." },
        { term: "Recording", definition: "Saving a video call for later. Always ask permission!" },
        { term: "Screenshot", definition: "A picture of your screen someone else took." },
        { term: "Virtual Background", definition: "A fake background to hide your real room." }
      ]
    },
    challenge: {
      title: 'Call Choices',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "You're about to video call your grandma, but your messy room is in the background. What do you do?", 
          options: [ 
            { text: "Go on camera anyway. It's just your room!", feedback: "You don't know if your address or schedule are visible. Better safe than sorry!", correct: false }, 
            { text: "Use a virtual background or blur feature, or move to a different spot.", feedback: "Smart! Protecting your privacy is easy with these tools.", correct: true }, 
            { text: "Tell your grandma you can't video call today.", feedback: "A nice excuse, but you don't need to cancel—just adjust your background!", correct: false } 
          ] 
        },
        {
          scenario: "Someone you don't know sends you a video call request from your school friend's account. What's your move?",
          options: [
            { text: "Answer it! It must be your friend.", feedback: "An account can be hacked! Always check with your friend first.", correct: false },
            { text: "Decline and ask your friend in person or via text if they sent it.", feedback: "Perfect! You caught a potential scam or account hack.", correct: true },
            { text: "Answer but don't show your face.", feedback: "Better, but it's still risky. Just decline and verify first.", correct: false }
          ]
        }
      ]
    }
  },
  'cryptography-quest': {
    id: 'cryptography-quest',
    title: 'Cryptography Quest',
    badgeName: 'Code Cracker',
    icon: React.createElement(Lock, { className: "w-12 h-12 text-teal-400" }),
    badgeIcon: React.createElement(Lock, { className: "w-full h-full text-teal-400" }),
    description: 'Learn about secret codes and how data is encrypted.',
    knowledge: {
      title: 'Secret Messages',
      pages: [
        { text: "For thousands of years, people have used secret codes called 'ciphers' to hide messages from enemies." },
        { text: "The simplest cipher is 'Caesar Cipher'—shift each letter 3 spots forward. A=D, B=E, etc. HOW becomes ELT!" },
        { text: "Modern encryption is WAY more complex. Banks use codes so tough that even computers would take billions of years to break them!" },
        { text: "With encryption, only you and the person you're sending a message to can read it. The government, hackers, and even the app company can't!" },
        { text: "Public Key Encryption is like having a mailbox anyone can put letters in, but only you have the key to open it." }
      ]
    },
    training: {
      title: 'Crypto Concepts',
      flashcards: [
        { term: "Cipher", definition: "A method to scramble information into a secret code." },
        { term: "Encryption", definition: "Converting readable information into secret code." },
        { term: "Decryption", definition: "Converting secret code back into readable form." },
        { term: "Key", definition: "The secret number or phrase needed to encrypt or decrypt data." },
        { term: "Public Key", definition: "A key someone can share with others to send you encrypted messages." },
        { term: "Private Key", definition: "A key only you have to decrypt messages sent to you." },
        { term: "Hash", definition: "A one-way code that proves data hasn't been tampered with." },
        { term: "Brute Force", definition: "Trying every possible password to break encryption (super slow!)." },
        { term: "SSL/TLS", definition: "The tech that makes websites secure (look for the padlock!)." },
        { term: "End-to-End", definition: "Only you and the receiver can read messages, no one in between." }
      ]
    },
    challenge: {
      title: 'Code Masters',
      gameType: 'sorting',
      timeLimit: 120,
      content: [
        { text: "Changing the order of letters (scrambling)", type: "safe" },
        { text: "Replacing each letter with a number", type: "safe" },
        { text: "Sharing your password with a friend", type: "unsafe" },
        { text: "Using a cipher only you know to encode messages", type: "safe" },
        { text: "Leaving your encryption key on a sticky note", type: "unsafe" },
        { text: "Using End-to-End encryption for chats", type: "safe" }
      ]
    }
  },
  'ethical-hacking': {
    id: 'ethical-hacking',
    title: 'Ethical Explorer',
    badgeName: 'White Hat Warrior',
    icon: React.createElement(Shield, { className: "w-12 h-12 text-emerald-400" }),
    badgeIcon: React.createElement(Shield, { className: "w-full h-full text-emerald-400" }),
    description: 'Learn about hacking ethics and how to use tech skills for good.',
    knowledge: {
      title: 'Hacking For Good',
      pages: [
        { text: "There are two kinds of hackers: 'White Hats' (good guys) and 'Black Hats' (bad guys). White hats find bugs to fix them!" },
        { text: "'Ethical Hacking' means testing a company's security WITH permission. It's like a fire drill for computers." },
        { text: "Bug bounty programs pay people to find security holes and report them before bad guys can exploit them." },
        { text: "A white-hat hacker's job is to break in, take notes, and help the company fix the problems. It's like being a digital security guard!" },
        { text: "Breaking into systems without permission is illegal, even if you're just 'testing'. Always get written permission first!" }
      ]
    },
    training: {
      title: 'Hacker Handbook',
      flashcards: [
        { term: "White Hat", definition: "An ethical hacker who tests security with permission." },
        { term: "Black Hat", definition: "A criminal hacker with bad intentions." },
        { term: "Gray Hat", definition: "A hacker who tests security without always asking first (morally questionable)." },
        { term: "Bug Bounty", definition: "Money paid by companies for finding and reporting security bugs." },
        { term: "Vulnerability", definition: "A security weakness that could be exploited." },
        { term: "Penetration Test", definition: "A legal test where hackers try to break into a system to find weaknesses." },
        { term: "Security Audit", definition: "An official check of a system's defenses." },
        { term: "Exploit", definition: "Using a vulnerability to gain unauthorized access." },
        { term: "Patch", definition: "An update that fixes a security vulnerability." },
        { term: "Zero-Day", definition: "A newly discovered bug that even the company doesn't know about yet." }
      ]
    },
    challenge: {
      title: 'Hacker Decisions',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "You find a security bug on Facebook. What's the ethical move?", 
          options: [ 
            { text: "Post about it on internet forums so everybody knows!", feedback: "That helps bad guys! Report it secretly to Facebook's bug bounty program.", correct: false }, 
            { text: "Contact Facebook's security team directly using their official report channel.", feedback: "Correct! White hats report responsibly and privately.", correct: true }, 
            { text: "Try to exploit it to see if you can steal data.", feedback: "That's illegal and unethical! Always get permission first.", correct: false } 
          ] 
        }
      ]
    }
  },
  'network-ninja': {
    id: 'network-ninja',
    title: 'Network Ninja',
    badgeName: 'Network Navigator',
    icon: React.createElement(Zap, { className: "w-12 h-12 text-yellow-400" }),
    badgeIcon: React.createElement(Zap, { className: "w-full h-full text-yellow-400" }),
    description: 'Understand networks and protect yourself on shared Wi-Fi.',
    knowledge: {
      title: 'Welcome to the Web',
      pages: [
        { text: "A network is computers talking to each other. Your home Wi-Fi is a network. So is the internet!" },
        { text: "Public Wi-Fi (coffee shops, airports) is like shouting your passwords to the world. Avoid doing banking or logging into important accounts there!" },
        { text: "A 'VPN' is like a private tunnel for your data. It hides what you're doing from the Wi-Fi owner." },
        { text: "Your router has a password, too! Change it from the factory setting, or anyone can join your home Wi-Fi." },
        { text: "If you see a network called 'Free Airport Wi-Fi 2' and another called 'FreeAirportWiFi'—pick neither! They're both fake scams." }
      ]
    },
    training: {
      title: 'Network Know-How',
      flashcards: [
        { term: "Network", definition: "Computers connected together to share data." },
        { term: "Router", definition: "The device that gives Wi-Fi to your home." },
        { term: "IP Address", definition: "A unique number that identifies your device on a network." },
        { term: "DNS", definition: "The system that turns website names into addresses computers understand." },
        { term: "SSID", definition: "The name of your Wi-Fi network." },
        { term: "VPN", definition: "Virtual Private Network: A secure tunnel for your internet traffic." },
        { term: "Bandwidth", definition: "How much data you can send and receive." },
        { term: "Latency", definition: "The time it takes for data to travel (important for gaming!)." },
        { term: "Packet", definition: "A small chunk of data sent over a network." },
        { term: "Firewall", definition: "A wall that blocks unauthorized traffic from entering your network." }
      ]
    },
    challenge: {
      title: 'Network Ninja Challenge',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "You're at the airport and see free Wi-Fi called 'Airport_Free'. What do you do?", 
          options: [ 
            { text: "Connect and buy an online game.", feedback: "Risk! This could be a trap. Check with airport staff for the real network name.", correct: false }, 
            { text: "Ask an airport employee which Wi-Fi is official, then use it only for safe browsing.", feedback: "Smart networking! Public Wi-Fi is fine for reading articles, not for banking.", correct: true }, 
            { text: "Use your phone's data plan instead.", feedback: "Good instinct! If you have data, it's safer than public Wi-Fi.", correct: false } 
          ] 
        },
        {
          scenario: "You want to check your bank account at a coffee shop Wi-Fi. What's safest?",
          options: [
            { text: "Just log in. It's a known coffee shop.", feedback: "Still risky! Even legitimate places can have hackers on the network.", correct: false },
            { text: "Wait until you're home, or use a VPN if your parents set one up.", feedback: "Perfect! Protecting sensitive logins is crucial.", correct: true },
            { text: "Ask the cashier for the Wi-Fi password first.", feedback: "Verifying the network is good, but public Wi-Fi + banking = risky.", correct: false }
          ]
        }
      ]
    }
  },
  'identity-shield': {
    id: 'identity-shield',
    title: 'Identity Shield',
    badgeName: 'Identity Guardian',
    icon: React.createElement(UserX, { className: "w-12 h-12 text-red-400" }),
    badgeIcon: React.createElement(UserX, { className: "w-full h-full text-red-400" }),
    description: 'Protect yourself from identity theft and data breaches.',
    knowledge: {
      title: 'You Are You',
      pages: [
        { text: "Identity theft is when someone steals your personal info and pretends to be YOU. They could open fake accounts or steal money!" },
        { text: "If a company gets hacked, your data could be sold on the dark web. This is why changing passwords regularly is important." },
        { text: "Never give out your social security number (or the info it's based on) unless you ABSOLUTELY have to." },
        { text: "Credit monitoring services can alert you if someone tries to open accounts in your name. Ask your parent about this!" },
        { text: "If you think your identity was stolen, tell an adult immediately. The sooner you act, the less damage thieves can do." }
      ]
    },
    training: {
      title: 'Identity Info',
      flashcards: [
        { term: "Identity Theft", definition: "Someone stealing your personal info to impersonate you." },
        { term: "Data Breach", definition: "When hackers steal information from a company's database." },
        { term: "Dark Web", definition: "A secret part of the internet where illegal goods are sold." },
        { term: "Credit Report", definition: "A record of how you've paid bills and borrowed money." },
        { term: "Credit Score", definition: "A number showing how trustworthy you are with money (important for adults!)." },
        { term: "Fraud", definition: "Pretending to be someone else to trick them out of money or info." },
        { term: "Impersonation", definition: "Pretending to be another person." },
        { term: "Documentation", definition: "Keeping records of what happened if you're a victim." },
        { term: "Recovery", definition: "The process of fixing problems after identity theft." },
        { term: "Prevention", definition: "Steps you take to stop identity theft before it happens." }
      ]
    },
    challenge: {
      title: 'Identity Protector',
      gameType: 'dragAndDrop',
      timeLimit: 120,
      content: [
        { text: "Your full legal name", type: "unsafe" },
        { text: "Your favorite cartoon character", type: "safe" },
        { text: "Your birth date", type: "unsafe" },
        { text: "Your favorite book", type: "safe" },
        { text: "Your Social Security Number", type: "unsafe" },
        { text: "Your favorite hobby", type: "safe" },
        { text: "Your parent's email", type: "unsafe" },
        { text: "Your school mascot name", type: "safe" }
      ]
    }
  },
  'cyber-career': {
    id: 'cyber-career',
    title: 'Cyber Careers',
    badgeName: 'Future Fighter',
    icon: React.createElement(Sparkles, { className: "w-12 h-12 text-amber-400" }),
    badgeIcon: React.createElement(Sparkles, { className: "w-full h-full text-amber-400" }),
    description: 'Explore exciting careers in cybersecurity and tech.',
    knowledge: {
      title: 'Your Cyber Future',
      pages: [
        { text: "Cybersecurity experts protect companies from digital attacks. They're heroes of the digital world and they're always in demand!" },
        { text: "There are tons of cyber jobs: Security Analysts find problems, Penetration Testers break in safely, Security Architects design defenses, and more!" },
        { text: "Many cyber jobs start at $60,000+ per year and go way higher! It's lucrative AND fun." },
        { text: "You don't always need a fancy degree. Certifications like CompTIA Security+ and CEH are super valuable." },
        { text: "Start now! Learn Python, join cyber clubs, do CTF competitions, and build projects. You're already starting your hero journey!" }
      ]
    },
    training: {
      title: 'Career Knowledge',
      flashcards: [
        { term: "Security Analyst", definition: "Someone who finds and fixes security holes in systems." },
        { term: "Penetration Tester", definition: "A professional hacker hired to test security legally." },
        { term: "Chief Information Security Officer (CISO)", definition: "The top security manager at a company." },
        { term: "Incident Response", definition: "The team that responds when a company gets hacked." },
        { term: "Compliance", definition: "Making sure a company follows all security laws and regulations." },
        { term: "Certification", definition: "A proof that you know your stuff (like Security+, CEH, CISSP)." },
        { term: "CTF", definition: "Capture The Flag: A hacking competition where you solve security challenges." },
        { term: "SOC", definition: "Security Operations Center: The command center for detecting attacks." },
        { term: "Python", definition: "A popular programming language for security work." },
        { term: "Freelance", definition: "Working for yourself and taking projects from different companies." }
      ]
    },
    challenge: {
      title: 'Career Quest',
      gameType: 'chooseYourResponse',
      timeLimit: 120,
      content: [
        { 
          scenario: "You're interested in a cyber career. What's the best first step?", 
          options: [ 
            { text: "Wait until you're in college to learn about it.", feedback: "You can start learning NOW! The earlier you start, the better.", correct: false }, 
            { text: "Start learning Python, join cyber clubs, and practice on sites like TryHackMe or HackTheBox.", feedback: "Perfect! This is exactly how real cyber pros started.", correct: true }, 
            { text: "Become a hacker and prove your skills by breaking into websites.", feedback: "That's illegal! Learn ethically and get hired the right way.", correct: false } 
          ] 
        }
      ]
    }
  },
  'biometric-basics': {
    id: 'biometric-basics',
    title: 'Biometric Basics',
    badgeName: 'Bio Blocker',
    icon: React.createElement(Smartphone, { className: "w-12 h-12 text-purple-400" }),
    badgeIcon: React.createElement(Smartphone, { className: "w-full h-full text-purple-400" }),
    description: 'Learn about fingerprints, face ID, and other biometric security.',
    knowledge: {
      title: 'You Are Your Password',
      pages: [
        { text: "Biometrics use your unique body parts—fingerprints, face, iris—to unlock devices. You can't lose them like a password!" },
        { text: "Face ID scans your face from over 30,000 points. It's really hard to fool!" },
        { text: "Biometrics are super convenient, but they store sensitive data. Make sure your biometric settings are configured correctly." },
        { text: "If someone forces you to unlock your phone with your face, tell an adult. Forced biometric access is a serious crime." },
        { text: "Most devices store biometric data locally on your phone, not in the cloud. That's safer!" }
      ]
    },
    training: {
      title: 'Biometric Terms',
      flashcards: [
        { term: "Biometric", definition: "Using your body's unique features to identify you." },
        { term: "Fingerprint", definition: "The unique pattern of lines on your fingers." },
        { term: "Face ID", definition: "Facial recognition technology that unlocks your device." },
        { term: "Iris Scanner", definition: "Technology that scans the colored part of your eye." },
        { term: "Retina", definition: "The part of your eye at the back. It has a unique pattern!" },
        { term: "Liveness Detection", definition: "Making sure the face or fingerprint is REAL and not a photo." },
        { term: "Spoofing Biometrics", definition: "Trying to fool biometric systems with fake fingerprints or photos." },
        { term: "Multi-Factor", definition: "Using multiple types of security (biometric + password = extra safe!)." },
        { term: "Enrollment", definition: "The process of teaching a device your biometric data." },
        { term: "Authentication", definition: "Proving you are who you say you are." }
      ]
    },
    challenge: {
      title: 'Bio Shield',
      gameType: 'matchThePairs',
      timeLimit: 120,
      content: [
        { action: "Lines and patterns on your fingers", consequence: "Fingerprint" },
        { action: "The unique patterns in your eye's colored part", consequence: "Iris" },
        { action: "The structure and features of your face", consequence: "Face ID" },
        { action: "Making sure the biometric is really alive", consequence: "Liveness Detection" },
        { action: "Multiple ways to prove you're you", consequence: "Multi-Factor Auth" },
        { action: "Trying to fool a fingerprint scanner with a fake copy", consequence: "Spoofing" }
      ]
    }
  }
};

