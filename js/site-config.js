/*
 * ============================================================
 *  PEDAL IT FORWARD — SITE SETTINGS
 *  This is the one file to edit for everyday updates.
 *  Change the values below, save, and push. That's it!
 * ============================================================
 */
window.SITE = {
  // Where form messages and questions get emailed.
  // IMPORTANT: replace this with the real email address.
  email: "pedalitforward@example.com",

  // Town / area you serve. Shown in the hero and contact section.
  location: "Your Town, USA",

  // Link to your online donation page (PayPal, Venmo, GoFundMe, Zeffy, etc.).
  // Leave as "" and the Donate buttons will ask people to email you instead.
  donateUrl: "",

  // Social links. Leave any as "" to hide it.
  instagram: "",
  facebook: "",

  // Impact numbers. Set showStats to true once you have real numbers to show.
  showStats: false,
  stats: {
    bikesFixed: 0,
    bikesDonated: 0,
    peopleTaught: 0,
  },

  // Upcoming bike sales and fix-it workshops.
  // Dates use YEAR-MONTH-DAY. Past events hide themselves automatically.
  // type can be "sale" or "workshop".
  // Copy the example below, remove the // at the start of each line, and fill it in.
  events: [
    // {
    //   type: "sale",
    //   title: "Fall Bike Sale",
    //   date: "2026-10-17",
    //   time: "9am – 1pm",
    //   place: "Community Center parking lot",
    //   details: "Refurbished bikes for all ages. Every dollar buys parts for the next donated bike.",
    // },
    // {
    //   type: "workshop",
    //   title: "Fix a Flat Workshop",
    //   date: "2026-10-24",
    //   time: "10am – 11:30am",
    //   place: "The garage",
    //   details: "Free. Bring your bike if you have one. Ages 8+ (kids under 12 bring a grown-up).",
    // },
  ],
};
