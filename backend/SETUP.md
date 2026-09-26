# Setting up the form back end (about 10 minutes)

When this is set up, every form sent on the website:

- adds a row to a Google Sheet, with a separate tab for **Bike donations**, **Bike requests**, and **Messages**, and
- emails you a copy. You can hit Reply to answer the person if they gave an email address.

It's free and runs in your own Google account. Nobody else can see the Sheet unless you share it.

A parent should do these steps with their own Google account, because the Sheet will hold people's names and contact info.

## 1. Make the Sheet

1. Go to https://sheets.new to create a blank Google Sheet.
2. Name it **Pedal It Forward** (click "Untitled spreadsheet" at the top left).

## 2. Add the script

1. In the Sheet, click **Extensions → Apps Script**.
2. Delete everything in the code box.
3. Open [`Code.gs`](Code.gs) from this folder, copy all of it, and paste it into the code box.
4. Optional: to send the emails somewhere other than your Google account, put that address between the quotes on the `NOTIFY_EMAIL` line.
5. Click the **Save** icon.

## 3. Run setup once

1. In the dropdown next to **Run** at the top, choose **setup**, then click **Run**.
2. Google will ask for permission. Click **Review permissions**, pick your account, then **Allow**.
   - If you see "Google hasn't verified this app," click **Advanced**, then **Go to (project name)**. This appears because you wrote the script yourself.
3. Check your Sheet: it now has the three tabs. You should also get a test email.

## 4. Put it online

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, then copy the **Web app URL**. It ends in `/exec`.

"Anyone" only means the website's forms can send to it. People still can't see or open your Sheet.

## 5. Connect the website

1. Open `js/site-config.js`.
2. Paste the URL between the quotes on the `formEndpoint` line:

   ```js
   formEndpoint: "https://script.google.com/macros/s/AKfy.../exec",
   ```

3. Save and push. After GitHub Pages updates, send a test from each form on the live site and check that a row shows up in the Sheet.

## Using the Sheet

- Every new row has **Status: New**. Change it to things like "Replied," "Bike given," or "Done" as you go.
- The **Bike requests** tab doubles as the waiting list. Sort by date to see who asked first.

## If you change the script later

Changes don't go live until you click **Deploy → Manage deployments**, then the pencil icon, choose **Version: New version**, and click **Deploy**. The URL stays the same.

## Troubleshooting

- **The form says "Sorry, that didn't go through."** Check that the URL in `formEndpoint` ends in `/exec` and that "Who has access" is **Anyone**.
- **Rows show up but no email arrives.** Check your spam folder. Google limits free accounts to about 100 of these emails a day, and the rows are still saved if that runs out.
- **Want to turn it off?** Set `formEndpoint` back to `""`. The forms will go back to opening the visitor's email app.
