# 🐼🚲 Pedal It Forward

The website for **Pedal It Forward**. People donate broken bikes, we fix them up and give them to people who need a ride, and we teach anyone how to fix bikes themselves.

It's a plain HTML/CSS/JavaScript site. There's nothing to install and no build step.

## What's on the site

| Section | What it does |
|---|---|
| **Hero** | Our panda mascot riding a bike, plus buttons to give or get a bike |
| **How it works** | The 4 steps: you bring a bike → we fix it → it finds a new rider → they pedal it forward |
| **Give a bike** | What we accept, plus a donation form |
| **Get a bike** | A request form for people who need a bike |
| **Learn to fix** | Workshop topics and the ABC Quick Check |
| **Help buy parts** | What donations pay for, the donate button, and bike sales |
| **Events** | Upcoming bike sales and workshops (past ones hide automatically) |
| **Questions / Say hi** | FAQ and a contact form |

## ✏️ Everyday updates: edit one file

Almost everything you'll change lives in **`js/site-config.js`**:

- **`email`**: where form messages go. **Change this first!** It's a placeholder right now.
- **`location`**: your town.
- **`donateUrl`**: your PayPal / Venmo / GoFundMe / Zeffy link. If it's empty, the Donate button points people to the contact section.
- **`instagram`**, **`facebook`**: links, or leave empty to hide them.
- **`showStats`** and **`stats`**: turn on the "bikes fixed / given / people taught" counter once you have real numbers.
- **`events`**: add bike sales and workshops. Copy the example in the file and remove the `//` at the start of each line.

Everything else, like the words on the page, is in `index.html`. Colors and layout are in `css/style.css`.

## How the forms work

The forms don't need a server. When someone presses **Send**, their email app opens with a message already filled out and addressed to you, and they just hit send. If you later want messages to arrive without the visitor's email app, a free service like [Formspree](https://formspree.io) can be added.

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
js/site-config.js     ← your settings (email, donate link, events, stats)
js/main.js            menu, forms, events list, and counters
images/panda-bike.svg the mascot
images/favicon.svg    the little panda face used as the logo and browser icon
```

## Before you launch: checklist

- [ ] Put the real email in `js/site-config.js`
- [ ] Put your town in `location`
- [ ] Add a donation link if you have one
- [ ] Only say donations are tax-deductible if the nonprofit is officially registered (for example, 501(c)(3) in the US)
- [ ] Add your first bike sale or workshop to `events`
- [ ] Give the panda a name? 🐼
