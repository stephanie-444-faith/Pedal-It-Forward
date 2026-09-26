/**
 * PEDAL IT FORWARD — FORM BACK END (Google Apps Script)
 *
 * This runs for free inside a Google Sheet. Every time someone sends a form
 * on the website, it:
 *   1. adds a row to the right tab of the Sheet, and
 *   2. emails you a copy.
 *
 * Setup steps are in backend/SETUP.md.
 */

// Who gets the "new form" emails. Leave "" to use the Google account that owns the Sheet.
var NOTIFY_EMAIL = "";

// One tab per form. The keys match data-form="..." in index.html.
var FORMS = {
  give: {
    tab: "Bike donations",
    subject: "New bike donation",
    fields: ["Name", "Contact", "Donating", "Details"],
  },
  get: {
    tab: "Bike requests",
    subject: "New bike request",
    fields: ["Name", "Contact", "For", "Rider age", "Rider height", "Use"],
  },
  contact: {
    tab: "Messages",
    subject: "New message",
    fields: ["Name", "Contact", "Message"],
  },
};

var MAX_LENGTH = 2000;

/** Handles form submissions from the website. */
function doPost(e) {
  var p = (e && e.parameter) || {};
  var form = FORMS[p.form];
  if (!form) return reply_({ ok: false, error: "Unknown form." });

  // Spam trap: real people never see or fill the hidden "website" box.
  if (p.website) return reply_({ ok: true });

  var values = form.fields.map(function (f) { return clean_(p[f]); });
  if (!values[0] || !values[1]) {
    return reply_({ ok: false, error: "Please include your name and a way to reach you." });
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var sheet = getTab_(form);
    sheet.appendRow([new Date()].concat(values, ["New"]));
  } catch (err) {
    console.error(err);
    return reply_({ ok: false, error: "Could not save. Please try again." });
  } finally {
    lock.releaseLock();
  }

  // The row is saved. A failed email should not make the visitor think it wasn't.
  try {
    notify_(form, values);
  } catch (err) {
    console.error(err);
  }
  return reply_({ ok: true });
}

/** Lets you check the web app URL in a browser. */
function doGet() {
  return reply_({ ok: true, message: "Pedal It Forward form service is running." });
}

/** Run once from the Apps Script editor: creates the tabs and asks for permissions. */
function setup() {
  Object.keys(FORMS).forEach(function (k) { getTab_(FORMS[k]); });
  var to = NOTIFY_EMAIL || Session.getEffectiveUser().getEmail();
  MailApp.sendEmail(to, "Pedal It Forward: form emails are set up",
    "This is a test. New bike donations, bike requests, and messages from the website will be emailed here.");
}

function getTab_(form) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(form.tab);
  if (!sheet) {
    sheet = ss.insertSheet(form.tab);
    var header = ["Received"].concat(form.fields, ["Status"]);
    sheet.appendRow(header);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, header.length).setFontWeight("bold");
  }
  return sheet;
}

function notify_(form, values) {
  var to = NOTIFY_EMAIL || Session.getEffectiveUser().getEmail();
  var lines = form.fields.map(function (f, i) { return f + ": " + (values[i] || "-"); });
  var body = lines.join("\n") +
    "\n\nThis was also saved in the \"" + form.tab + "\" tab of your Pedal It Forward sheet:\n" +
    SpreadsheetApp.getActiveSpreadsheet().getUrl();
  var options = {};
  var contact = values[1];
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) options.replyTo = contact;
  MailApp.sendEmail(to, "Pedal It Forward: " + form.subject + " from " + values[0], body, options);
}

/** Trims, limits length, and stops text from being run as a spreadsheet formula. */
function clean_(v) {
  var s = String(v == null ? "" : v).trim().slice(0, MAX_LENGTH);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return s;
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
