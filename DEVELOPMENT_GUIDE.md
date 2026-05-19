# 🧺 RINSE - Complete Development & Testing Guide

**Version 1.0** | Last Updated: May 2026

---

## 📋 TABLE OF CONTENTS

1. [What is Rinse?](#what-is-rinse)
2. [System Requirements](#system-requirements)
3. [Installation Guide](#installation-guide)
4. [Testing Guide](#testing-guide)
5. [Free Development Stack](#free-development-stack)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

---

## 🎯 What is Rinse?

**Rinse** is a modern, student-run laundry pickup and delivery service platform with:

### Customer Features
- ✅ Multi-step booking flow (Service → Schedule → Address → Confirm)
- ✅ OTP-based authentication (secure login)
- ✅ Email confirmations sent instantly
- ✅ Booking history and tracking
- ✅ Help center with FAQs
- ✅ Account management (password, profile changes)

### Runner Features
- ✅ Browse available gigs (jobs to pickup)
- ✅ List view and map view options
- ✅ Accept/track jobs in real-time
- ✅ 4-stage progress tracking (Collected → At Laundromat → Ready → Delivered)
- ✅ Weekly earnings dashboard
- ✅ Photo proof submission
- ✅ Performance ratings

### Admin Features
- ✅ Customer service lead capture
- ✅ Notification history
- ✅ User management
- ✅ Analytics dashboard

---

## 💻 System Requirements

### Minimum Requirements
- **Operating System:** Windows 10+, macOS 10.15+, or Linux
- **RAM:** 4GB (8GB recommended)
- **Disk Space:** 2GB free
- **Internet:** Stable connection required

### Software to Install
1. **Node.js** (JavaScript runtime)
2. **Git** (version control - optional but recommended)
3. **Code Editor** (VS Code recommended - free)
4. **Web Browser** (Chrome, Firefox, Safari, Edge)

---

## 📥 Installation Guide

### Step 1: Install Node.js

**Windows & Mac:**
1. Go to https://nodejs.org
2. Download **LTS version** (Long Term Support)
3. Run the installer
4. Click "Next" through all screens
5. Restart your computer

**Verify Installation:**
```bash
node --version
npm --version
```

Both should show version numbers (e.g., v18.16.0)

### Step 2: Download Rinse Repository

1. Go to https://github.com/daimimran246/rinse
2. Click green **"Code"** button
3. Click **"Download ZIP"**
4. Extract ZIP to Desktop (or any folder)
5. You'll have a folder called `rinse`

### Step 3: Install Dependencies

**Windows:**
1. Open Command Prompt
   - Press `Win + R`
   - Type `cmd`
   - Press Enter

**Mac/Linux:**
1. Open Terminal
   - Search for "Terminal"
   - Open it

**Navigate to Rinse Folder:**
```bash
cd Desktop/rinse
```

**Install All Packages:**
```bash
npm install
```

Wait 2-3 minutes. You'll see lots of text. That's normal! ✅

### Step 4: Start the Development Server

```bash
npm run dev
```

You'll see:
```
VITE v4.4.0  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

### Step 5: Open in Browser

1. Open Chrome, Firefox, or Safari
2. Go to: **http://localhost:5173**
3. You should see the Rinse login screen! ✅

---

## 🧪 Complete Testing Guide

### TEST 1: Customer Signup & Authentication

**Steps:**
1. You see login screen
2. Enter email: `test@email.com`
3. Click **"Send OTP"** button
4. Enter code: `123456` (any 6 digits for testing)
5. Click **"Verify Code"**
6. Enter:
   - Name: John Doe
   - Password: Test@12345
   - Confirm: Test@12345
7. Click **"Create Account"**

**Expected Result:**
- ✅ Success message appears
- ✅ Account created screen shows
- ✅ Can proceed to booking

**Common Issues:**
- Password less than 8 characters → Won't proceed
- Passwords don't match → Shows error
- Empty email field → Button disabled

---

### TEST 2: Customer Booking Flow

**Steps:**

**Part A: Select Service**
1. Click on a service (Wash & Fold, Wash & Iron, Bedding, Express)
2. Price displays (£12-£25)
3. Click **"Continue"**

**Part B: Schedule Pickup**
1. Select day (Today, Tomorrow, Wed, Thu, Fri, Sat)
2. Select time (8:00 AM - 6:00 PM)
3. Click **"Continue"**

**Part C: Enter Address**
1. Type address: `123 Main Street, Manchester`
2. Add notes: `Flat 5, ring doorbell`
3. Click **"Continue"**

**Part D: Confirm Booking**
1. Review all details on summary
2. Verify:
   - Service name correct
   - Date/time correct
   - Address correct
   - Price correct
3. Click **"Confirm Booking 🚀"**

**Expected Result:**
- ✅ Success screen appears
- ✅ Shows booking confirmation
- ✅ Displays booking ID
- ✅ Shows "✅ Saved to Supabase" badge

**Test Variations:**
- Try each service type (4 total)
- Try different days
- Try different times
- Try different addresses

---

### TEST 3: Runner App Features

#### 3.1: Gigs Tab (Available Jobs)

**List View:**
1. See list of available jobs
2. Each shows:
   - Customer name
   - Service type
   - Address
   - Time
   - Distance
   - Pay amount (highlighted in teal)
   - "Urgent" badge (if time-sensitive)
3. Click **"Accept Gig →"**

**Expected Result:**
- ✅ Gig moves to Active tab
- ✅ Removed from available list
- ✅ Shows in Active gig section

**Map View:**
1. Click **"🗺️ Map"** button
2. See interactive map with pins:
   - 🟢 Green pins = Regular gigs
   - 🔴 Red pins = Urgent gigs
   - 🔵 Blue pins = Laundromats
3. Hover over pins to see details
4. See nearby laundromats list below

**Expected Result:**
- ✅ Map displays correctly
- ✅ All pins visible
- ✅ Laundromat list shows

#### 3.2: Active Tab (Current Job)

**Progress Tracking:**
1. After accepting gig, you see:
   - Customer name (highlighted)
   - Job status: "🟢 In Progress"
   - 4-stage progress tracker:
     - ① Collected
     - ② At Laundromat
     - ③ Ready
     - ④ Delivered
2. Current stage highlighted in teal
3. Previous stages show checkmark

**Job Details:**
- 📍 Pickup address
- 🕐 Pickup time
- 🛍️ Items count
- 💰 Your pay

**Nearest Laundromat:**
- Shows automatically assigned
- Shows address, machines, distance
- Shows open/closed status

**Mark Progress:**
1. Click **"Mark as [Next Stage]"** button
2. Current stage moves forward
3. After final stage, job completes
4. Returns to Gigs tab

**Expected Result:**
- ✅ Progress updates smoothly
- ✅ All 4 stages can be marked
- ✅ Final stage shows completion
- ✅ Job is now complete

#### 3.3: Earnings Tab (Analytics)

**Weekly Summary:**
- Shows total earned this week (£XX.XX)
- Shows % change from last week
- Shows trend indicator (↑ up or ↓ down)

**Daily Bar Chart:**
- 7 bars (Monday-Sunday)
- Height represents daily earnings
- Highest day highlighted in teal
- Values shown on each bar

**Summary Stats (4 cards):**
1. 💰 Total earned
2. ✅ Gigs completed
3. 📊 Average per gig
4. ⏱️ Hours worked

**Recent Gigs:**
- Shows last 3 completed gigs
- Customer name, service, date, pay
- Most recent first

**Expected Result:**
- ✅ All data displays
- ✅ Charts render correctly
- ✅ Numbers make sense

---

### TEST 4: Help Center

**FAQ Section:**
1. Click **"Help"** in navigation
2. See FAQ categories:
   - Bookings
   - Payments
   - Service
3. Click category to expand
4. Read answers to common questions

**Support Ticket:**
1. Scroll to "Can't find what you need?"
2. Select issue type
3. Type message
4. Click "Send Message →"

**Expected Result:**
- ✅ FAQs display
- ✅ Can select categories
- ✅ Can submit support ticket
- ✅ Success message appears

---

## 💰 FREE Development Stack

### What You Need (All FREE)

| Component | Tool | Cost | Why |
|-----------|------|------|-----|
| **Editor** | VS Code | FREE | Best code editor |
| **Version Control** | Git/GitHub | FREE | Store code online |
| **Database** | Supabase | FREE | PostgreSQL backend |
| **Authentication** | Supabase Auth | FREE | Secure login |
| **Frontend** | React + Vite | FREE | Fast, modern UI |
| **Email** | Resend | FREE (100/month) | Send emails free |
| **Hosting** | Vercel | FREE | Deploy app free |
| **Real-time Sync** | Supabase | FREE | Live updates |

### Total Cost: **$0** ✅

---

## 📦 Complete Free Setup Instructions

### 1. Code Editor (VS Code) - FREE

**Download:**
1. Go to https://code.visualstudio.com
2. Download for your OS
3. Install it
4. Open the `rinse` folder in VS Code

**Why?**
- Industry standard
- Free
- Extensions for React, Git, debugging
- Beautiful interface

### 2. GitHub Account - FREE

**Create Account:**
1. Go to https://github.com
2. Click **"Sign up"**
3. Enter email, password, username
4. Verify email
5. You're done!

**Why?**
- Store code online
- Free for unlimited public repos
- Share with team
- Track changes

### 3. Supabase Setup - FREE

**Create Database:**
1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign up with GitHub or email
4. Create new project
5. Choose region (pick closest to you)
6. Wait 2 minutes for setup

**Get Credentials:**
1. Go to **Settings** → **API**
2. Copy:
   - `Project URL` (this is SUPABASE_URL)
   - `anon public` key (this is SUPABASE_ANON_KEY)
3. Open `.env.local` file in Rinse
4. Paste both values
5. Save file

**Create Database Tables:**
1. In Supabase, go to **SQL Editor**
2. Copy entire content of `database/schema.sql`
3. Create new query
4. Paste SQL code
5. Click **"Run"**
6. Wait for tables to be created ✅

**Why Supabase?**
- FREE tier: 500MB database + 2GB file storage
- Real PostgreSQL database
- Built-in authentication
- Real-time updates
- Email integration
- Perfect for student projects

### 4. Resend Email Service - FREE

**Setup Emails:**
1. Go to https://resend.com
2. Click **"Sign up"**
3. Verify email
4. Go to **API Keys**
5. Copy your API key
6. In `.env.local`, add:
   ```
   VITE_EMAIL_API_KEY=your-api-key-here
   VITE_EMAIL_SERVICE=resend
   ```

**Why Resend?**
- FREE: 100 emails per day
- Perfect for testing
- Easy setup
- Reliable delivery

### 5. Vercel Hosting - FREE

**Deploy Your App:**
1. Go to https://vercel.com
2. Click **"Continue with GitHub"**
3. Connect your GitHub account
4. Select `rinse` repository
5. Click **"Deploy"**
6. Wait 2 minutes
7. Your app is LIVE! 🚀

**Access Your App:**
- Vercel gives you a URL like: `rinse-abc123.vercel.app`
- Anyone can visit it
- Deploys automatically when you push to GitHub

**Why Vercel?**
- FREE tier: Unlimited deployments
- Automatic scaling
- Custom domains available
- Perfect for React apps

---

## 🎯 Free Development Workflow

### Daily Development Process

```
1. Start your app
   npm run dev
   
2. Make changes to code
   (Edit files in VS Code)
   
3. Refresh browser
   (See changes instantly)
   
4. Test all features
   (Sign up, book, track)
   
5. Push to GitHub
   git add .
   git commit -m "description"
   git push origin main
   
6. Vercel deploys automatically
   (App updates live)
```

### Zero Cost Operations

| Task | Tool | Cost |
|------|------|------|
| Local development | VS Code + Node | $0 |
| Database | Supabase free tier | $0 |
| Code storage | GitHub | $0 |
| Deploy | Vercel free tier | $0 |
| Emails | Resend free tier | $0 |
| Domain | Freenom (optional) | $0 |
| **TOTAL** | | **$0** |

---

## 🚀 Step-by-Step Free Deployment

### 1. Push Code to GitHub

```bash
# Navigate to rinse folder
cd Desktop/rinse

# Initialize git (if not done)
git init

# Add all files
git add .

# Create commit
git commit -m "Initial Rinse platform"

# Add GitHub repo as origin
git remote add origin https://github.com/YOUR-USERNAME/rinse.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com
2. Click **"New Project"**
3. Select your `rinse` repository
4. Click **"Deploy"**
5. Wait for deployment to complete
6. You get a live URL! 🎉

### 3. Add Environment Variables

1. In Vercel dashboard, go to **Settings** → **Environment Variables**
2. Add all variables from `.env.local`:
   ```
   VITE_SUPABASE_URL=your-url
   VITE_SUPABASE_ANON_KEY=your-key
   VITE_EMAIL_API_KEY=your-email-key
   VITE_EMAIL_SERVICE=resend
   ```
3. Click **"Deploy"** again
4. Done! ✅

### 4. Access Your Live App

- Vercel gives you URL like: `https://rinse-abc123.vercel.app`
- Share with friends/testers
- It's LIVE for the world to see! 🌍

---

## 🔧 Troubleshooting

### Problem: "npm: command not found"

**Solution:**
- Node.js not installed or not in PATH
- Restart computer after installing Node.js
- Verify: `node --version` in new Terminal

### Problem: "Cannot find module"

**Solution:**
- Run `npm install` again
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

### Problem: App won't start

**Solution:**
1. Stop app (Ctrl+C)
2. Clear cache: `npm cache clean --force`
3. Reinstall: `npm install`
4. Start again: `npm run dev`

### Problem: Port 5173 already in use

**Solution:**
```bash
# Use different port
npm run dev -- --port 3000

# Then visit: http://localhost:3000
```

### Problem: Supabase connection fails

**Solution:**
1. Check `.env.local` file exists
2. Verify credentials are correct (copy-paste carefully)
3. Check internet connection
4. Verify Supabase project is active

### Problem: Emails not sending

**Solution:**
1. Verify Resend API key is correct
2. Check `.env.local` has correct key
3. For testing, emails print to console (F12)
4. Check spam folder

---

## 📝 Common Commands Reference

```bash
# Start development server
npm run dev

# Build for production
npm build

# Preview production build locally
npm run preview

# Install new package
npm install package-name

# Update all packages
npm update

# Remove package
npm uninstall package-name

# Check Node version
node --version

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force

# Stop running process
Ctrl + C
```

---

## 🎓 Learning Resources

### Free Courses
- **React:** freeCodeCamp on YouTube
- **JavaScript:** Codecademy (free tier)
- **Git/GitHub:** GitHub's own guides
- **Web Development:** Freecodecamp.org

### Documentation
- React: https://react.dev
- Supabase: https://supabase.com/docs
- Vite: https://vitejs.dev
- Node.js: https://nodejs.org/docs

### Communities
- Stack Overflow (ask questions)
- GitHub Discussions
- Reddit r/learnprogramming
- Discord communities

---

## 📊 Project Structure

```
rinse/
├── src/
│   ├── components/
│   │   ├── CustomerApp.jsx         # Customer booking flow
│   │   ├── RunnerApp.jsx           # Runner dashboard
│   │   ├── AuthFlow.jsx            # Login/signup screens
│   │   ├── HelpCenter.jsx          # FAQ & support
│   │   └── JokeGenerator.jsx       # Fun easter egg
│   ├── lib/
│   │   ├── supabase.js             # Database queries
│   │   ├── auth.js                 # Authentication logic
│   │   └── notifications.js        # Email sending
│   ├── App.jsx                     # Main app component
│   └── main.jsx                    # App entry point
├── database/
│   └── schema.sql                  # Database tables
├── package.json                    # Dependencies list
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
└── vite.config.js                  # Build configuration
```

---

## 🚀 Next Steps

### Phase 1: Testing (This Week)
- [ ] Download code
- [ ] Test locally
- [ ] Try all features
- [ ] Report bugs

### Phase 2: Setup (Next Week)
- [ ] Create Supabase account
- [ ] Configure database
- [ ] Create GitHub account
- [ ] Setup Resend email

### Phase 3: Deployment (2 Weeks)
- [ ] Create Vercel account
- [ ] Deploy app
- [ ] Share with testers
- [ ] Get feedback

### Phase 4: Enhancement (Optional)
- [ ] Add payment processing
- [ ] Implement reviews/ratings
- [ ] Add real-time chat
- [ ] Mobile app development

---

## 💡 Pro Tips

### Development Speed
- Use keyboard shortcuts (Ctrl+S to save)
- Use Chrome DevTools (F12) to debug
- Use VS Code extensions for productivity
- Use Git to track all changes

### Testing Strategy
- Test on desktop first
- Then test on mobile
- Try different browsers
- Test with real data

### Deployment Strategy
- Develop locally first
- Push to GitHub often
- Deploy to Vercel weekly
- Monitor live app performance

### Cost Optimization
- Use free tiers completely
- Don't need paid plans for MVP
- Upgrade only when necessary
- Monitor usage regularly

---

## 📞 Support

**Having Issues?**

1. **Check Troubleshooting section** above
2. **Search GitHub Issues:** https://github.com/daimimran246/rinse/issues
3. **Check Supabase Docs:** https://supabase.com/docs
4. **Stack Overflow:** Tag your question `react` `supabase` `vite`

---

## 📄 License

This project is open source and free to use.

---

## 🎉 Conclusion

**You now have everything to:**
- ✅ Download Rinse
- ✅ Develop it locally (FREE)
- ✅ Test all features
- ✅ Deploy it live (FREE)
- ✅ Run it forever (FREE)

**Total Cost: $0**

**Start now and build something amazing!** 🚀

---

**Questions?** Contact us or check documentation above.

**Made with ❤️ for students. Rinse. Clean, minimal, modern.** 🧺
