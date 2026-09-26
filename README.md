# 🐼🚲 Pedal It Forward

The website for **Pedal It Forward**, Emmett's bar mitzvah project for the Wyngate community. People donate bikes they don't need, Emmett fixes them up and gives them to people who need one, and he teaches people how to fix bikes themselves.

It's a plain HTML/CSS/JavaScript site. There's nothing to install and no build step.

## What's on the site

| Section | What it does |
|---|---|
| **Hero** | Our panda mascot riding a bike, plus buttons to give or get a bike |
| **Hi, I'm Emmett!** | A short note from Emmett about his mitzvah project |
| **How it works** | The 4 steps: you bring a bike → we fix it → it finds a new rider → they pedal it forward |
| **Give a bike** | What we accept, plus a donation form |
| **Get a bike** | A request form for people who need a bike |
| **Learn to fix** | Workshop topics and the ABC Quick Check |
| **Events** | Upcoming bike sales and workshops (past ones hide automatically) |
| **Questions / Say hi** | FAQ and a contact form |

## ✏️ Everyday updates: edit one file

Almost everything you'll change lives in **`js/site-config.js`**:

- **`email`**: where form messages go. **Change this first!** It's a placeholder right now. Use an address a parent can see, since it shows on the public site.
- **`instagram`**, **`facebook`**: links, or leave empty to hide them.
- **`showStats`** and **`stats`**: turn on the "bikes fixed / given / people taught" counter once you have real numbers.
- **`events`**: add bike sales and workshops. Copy the example in the file and remove the `//` at the start of each line.

Everything else, like the words on the page, is in `index.html`. Colors and layout are in `css/style.css`.

## How the forms work

The three forms (give a bike, get a bike, and send a message) can work two ways:

- **With the back end (recommended).** Each form is saved to a Google Sheet and emailed to you, and the visitor sees a thank-you message. Setup takes about 10 minutes. Follow [backend/SETUP.md](backend/SETUP.md), then paste the web app URL into `formEndpoint` in `js/site-config.js`.
- **Without it.** If `formEndpoint` is empty, pressing **Send** opens the visitor's email app with the message filled in, and they send it themselves.

## 🌐 Put it on the internet for free (GitHub Pages)

1. On GitHub, open this repo and go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Pick the branch with the site on it and the **/ (root)** folder, then **Save**.
4. After a minute or two the site will be live at `https://<your-username>.github.io/pedal-it-forward/`.

## Preview it on your computer

Double-click `index.html` to open it in a browser. Or, from this folder, run:

```
python3 -m http.server
```

and visit http://localhost:8000.

## Files

```
index.html            the whole page
css/style.css         colors, fonts, and layout
js/site-config.js     ← your settings (email, form back end, events, stats)
js/main.js            menu, forms, events list, and counters
backend/Code.gs       the form back end (runs in Google Sheets)
backend/SETUP.md      how to set up the back end
images/panda-bike.svg the mascot
images/favicon.svg    the little panda face used as the logo and browser icon
```

## Before you launch: checklist

- [ ] Put the real email in `js/site-config.js`
- [ ] Set up the form back end ([backend/SETUP.md](backend/SETUP.md)) and paste its URL into `formEndpoint`
- [ ] Add your first bike sale or workshop to `events`
- [ ] Give the panda a name? 🐼
