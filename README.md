# Quiz Creator

Create and share timed quizzes online. Built with svelte-kit.

## ⚙️ Getting Started

```bash
git clone https://github.com/MysteriousBits/quiz-creator.git
cd quiz-creator
npm install
```

### ⚙️ Environment Variables

Make a `.env` file and copy the contents of `.env.example`. Then in `.env` edit this variables:  
```env
STORAGE
ORIGIN
```
Remember to add the environment varables to where you are deploying.  
  

### 🔧 Dev

```bash
npm run dev
```

> App will be live at: http://localhost:5173  

### 📦 Build for Production

To run with your own server:

```bash
npm run build
npm run start
```
> App will be live at: http://<your_ip>:3000  

⚠️ **Note that cookies wont be set properly while hosting without ssl.**    

