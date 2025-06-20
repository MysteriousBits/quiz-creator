# Quiz Creator

Create and share timed quizzes online. Built with svelte-kit and deployed in vercel.  
Uses supabase storage api to store quizzes and submissions as json.

## ⚙️ Getting Started

```bash
git clone https://github.com/MysteriousBits/quiz-creator.git
cd quiz-creator
npm install
```

### ⚙️ Environment Variables

Make a `.env` file and copy the contents of `.env.example`. Then edit .env and add your *Supabase* credentials.  
Remember to add the environment varables to where you are deploying like vercel.  
  

### 🔧 Dev

```bash
npm run dev
```

> App will be live at: http://localhost:5173  

### 📦 Build for Production

To run with your own server:
- Change `svelte.config.js`
```js
import adapter from '@sveltejs/adapter-vercel';
```
to 
```js
import adapter from '@sveltejs/adapter-node';
```
- build & run
```bash
npm run build
npm run start
```
> App will be live at: http://<your_ip>:3000  

⚠️ **Note that cookies wont be set properly while hosting without ssl.**    

### 🔗 Live Demo

[quiz-creator](https://quizcreatoronline.vercel.app)

