import { useState, useMemo } from "react";
import { HER_OUTFITS, HIS_LOOKS } from "./outfits.js";

const TABS = ["Overview", "Artists", "Camp", "Packing", "Outfits", "Itinerary", "Travel"];

// ——— Palette ———
const C = {
  cream: "#fff6e0",
  creamDim: "#f5e7c6",
  creamMute: "#d9c4a0",
  dust: "#a68c78",
  rose: "#ff6b9d",
  roseDeep: "#c94a77",
  gold: "#ffc56b",
  goldDeep: "#e09440",
  lavender: "#c9a0dc",
  turquoise: "#5eead4",
  plum: "#1a0820",
};

// ——— Shared font shortcuts ———
const FONT_DISPLAY = "'Bagel Fat One', cursive";
const FONT_HEADING = "'DM Serif Display', serif";
const FONT_BODY = "'Nunito', system-ui, sans-serif";
const FONT_SCRIPT = "'Caveat', cursive";

// ——— Shopping link helpers ———
const amazonUrl = (q) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}`;
const sheinUrl = (q) => `https://us.shein.com/pdsearch/${encodeURIComponent(q)}/`;
const freePeopleUrl = (q) => `https://www.freepeople.com/search?q=${encodeURIComponent(q)}`;

const ARTISTS = [
  {
    tier: "Must-See Headliners",
    acts: [
      { name: "Empire of the Sun", why: "Theatrical live spectacle — legendary set design, expect 'Walking on a Dream'. Pure magic at night.", stage: "Lightning" },
      { name: "Mau P", why: "Peak hard house energy, 'Drugs from Amsterdam' will go off. Best late-night pick.", stage: "Thunder" },
      { name: "Sara Landry", why: "Hypnotic industrial techno — relentless, dark, transcendent. Do not miss.", stage: "Lightning" },
      { name: "Zeds Dead", why: "Bass festival icons. Crowd will be massive. Bring the energy.", stage: "Thunder" },
      { name: "Chase & Status", why: "UK legends. Heavy drum & bass meets pop — anthemic and electric.", stage: "Lightning" },
    ]
  },
  {
    tier: "High Priority",
    acts: [
      { name: "Overmono", why: "Welsh duo blending rave and experimental electronics. Hypnotic and unique.", stage: "Thunder" },
      { name: "Mochakk", why: "Brazilian afro-house maestro. Guaranteed crowd mover — feel-good and deep.", stage: "Woogie" },
      { name: "Maceo Plex", why: "Deep techno at dawn hits different. One of the best sunrise sets you'll ever see.", stage: "Stacks" },
      { name: "Barry Can't Swim", why: "UK jazz-infused house — organic, soulful, and joyful. Perfect LIB vibe.", stage: "Woogie" },
      { name: "Avalon Emerson", why: "Ethereal, cinematic techno. Deeply moving sets. Essential.", stage: "Grand Artique" },
      { name: "Desert Hearts", why: "Mikey Lion, Lee Reynolds & Marbs — house/techno collective legends. Expect marathon vibes.", stage: "Junkyard" },
    ]
  },
  {
    tier: "Hidden Gems",
    acts: [
      { name: "Daily Bread", why: "Bass meets soul — melodic, emotive, beautiful at night.", stage: "Stacks" },
      { name: "Of The Trees", why: "Deep bass/ambient blend. Perfect mid-afternoon trip.", stage: "Grand Artique" },
      { name: "Jayda G", why: "Infectious disco-house DJ. Pure joy in human form.", stage: "Woogie" },
      { name: "Nia Archives", why: "UK jungle/drum & bass with soul. Rising star, catch her early.", stage: "Thunder" },
      { name: "TOKiMONSTA", why: "LA beat queen with beautiful melodic sets. LIB native.", stage: "Lightning" },
      { name: "Tinashe", why: "Only live act on the list — R&B fire, unexpected and different from the rest of the lineup.", stage: "Lightning" },
    ]
  }
];

const PACKING = {
  "Camp Essentials": [
    "Tent + extra stakes (wind storms are real here)",
    "Sleeping bag rated to 45°F for cold nights",
    "Camping chair + inflatable couch/lounger",
    "Canopy/shade structure for camp",
    "Tapestries to hang from canopy sides",
    "Fairy lights for camp vibes",
    "Battery-powered fan + mister",
    "Small table for camp setup",
    "Hammock",
  ],
  "Water & Health": [
    "2× gallon jugs of water (plan 2 gal/day)",
    "Reusable hydration pack / Nalgene",
    "Electrolyte packets (essential!)",
    "Sunscreen SPF 50+ (reapply constantly)",
    "Aloe vera gel",
    "Ibuprofen / Tylenol",
    "Allergy meds (dust is intense)",
    "Band-aids & basic first aid kit",
  ],
  "Sun & Elements": [
    "Wraparound sunglasses (a backup pair too)",
    "Bandanas (style + occasional neck wipe)",
    "Chapstick / lip balm",
    "Eye drops",
  ],
  "Gear & Tech": [
    "Portable charger (20,000mAh+)",
    "Headlamp + extra batteries",
    "Fanny pack / crossbody for festival",
    "Lock for your car / valuables",
    "Download the LIB app before you go",
    "Screenshot schedule & venue map offline",
    "Wristband backup (know your info)",
  ],
  "Toiletries & Comfort": [
    "Baby wipes (essential for freshening up)",
    "Toilet paper (portapotties run out)",
    "Dry shampoo",
    "Travel towel",
    "Deodorant (extra sticks)",
    "Shower shoes / flip flops",
    "Earplugs for sleeping",
  ],
  "Food & Drink": [
    "Easy camp food (granola bars, trail mix, nuts)",
    "Portable camp stove for meals",
    "Airtight containers (squirrels WILL steal food)",
    "Cooler with ice for perishables",
    "Reusable cups and utensils",
    "Alcohol for camp (not allowed in festival grounds)",
    "Trash bags (Leave No Trace!)",
  ]
};

// Slot types drive the color bar on the left of each itinerary row.
const SLOT_TYPES = {
  rest:      { color: "#c9b596", label: "Camp" },
  food:      { color: "#eab77a", label: "Food" },
  wellness:  { color: "#5eead4", label: "Temple" },
  art:       { color: "#c9a0dc", label: "Art" },
  lake:      { color: "#60a5fa", label: "Lake" },
  music:     { color: "#ff6b9d", label: "Music" },
  headliner: { color: "#ffc56b", label: "Headliner" },
  outfit:    { color: "#fdf4e3", label: "Outfit" },
  travel:    { color: "#94a3b8", label: "Travel" },
};

const ITINERARY = [
  {
    day: "Friday",
    date: "May 22",
    color: "#ffc56b",
    vibe: "Arrival + first night",
    slots: [
      { time: "7:30 AM",  temp: "60°F", type: "rest",      title: "Wake at Buttonwillow Walmart", where: "Pre-camp",       note: "You already did the drive last night. Brush teeth, sunscreen, go." },
      { time: "8:00 AM",  temp: "63°F", type: "food",      title: "Coffee + breakfast sandwich",  where: "Flying J",       note: "Last real coffee for three days. Hydrate with water AND electrolytes." },
      { time: "9:30 AM",  temp: "70°F", type: "travel",    title: "Drive to LIB gates",           where: "20 min",         note: "Beat the afternoon arrival wave." },
      { time: "10:00 AM", temp: "72°F", type: "travel",    title: "Gates open — first wave in",   where: "Main entry",     note: "Prime campsite = reward for Thursday effort. Get a shady-ish spot." },
      { time: "11:00 AM", temp: "75°F", type: "rest",      title: "Tailgate tent setup",          where: "Camp",           note: "Canopy, sandbag the legs, tapestries, fairy lights. Car + tent = your world." },
      { time: "12:30 PM", temp: "82°F", type: "food",      title: "Cold lunch at camp",           where: "Camp",           note: "Wraps, fruit, electrolytes. Eat in shade." },
      { time: "1:30 PM",  temp: "83°F", type: "art",       title: "Walk the grounds, orient",     where: "All stages",     note: "Find bathrooms, water fill stations, note walk times from camp to each stage." },
      { time: "3:00 PM",  temp: "85°F", type: "lake",      title: "Lake float + cool off",        where: "Buena Vista Lake", note: "Bring floaties. Best reset of the day." },
      { time: "4:30 PM",  temp: "85°F", type: "music",     title: "Early warm-up sets",           where: "Woogie Stage",   note: "Woogie runs feel-good house all afternoon. Low crowd, great vibes." },
      { time: "6:00 PM",  temp: "82°F", type: "rest",      title: "Back to camp · recharge",      where: "Camp",           note: "Nap 20 min if you need it. Hydrate HARD for the night." },
      { time: "6:30 PM",  temp: "81°F", type: "outfit",    title: "Sunset outfit change",         where: "Camp",           note: "Your golden-hour look. Sun sets at 7:52 PM — don't miss it." },
      { time: "7:00 PM",  temp: "80°F", type: "music",     title: "Barry Can't Swim",             where: "Woogie · likely 7–9 PM", note: "UK jazz-house, perfect LIB vibe. Bring her out here for the first real moment." },
      { time: "8:30 PM",  temp: "74°F", type: "food",      title: "Marketplace food run",         where: "Marketplace",    note: "Walk the vendor strip. Eat a real meal before late night." },
      { time: "9:00 PM",  temp: "72°F", type: "outfit",    title: "Night layer on",               where: "Camp stop",      note: "Grab your sherpa/fleece. It's dropping to 60°F by 3 AM." },
      { time: "9:30 PM",  temp: "70°F", type: "music",     title: "TOKiMONSTA / Nia Archives",    where: "Lightning / Thunder", note: "Build the night. TOKi is LIB native, Nia Archives is a rising force." },
      { time: "11:00 PM", temp: "67°F", type: "headliner", title: "Chase & Status OR Zeds Dead",  where: "Lightning / Thunder", note: "Headliner block. Pick ONE and commit — they're parallel. C&S = DnB energy, Zeds Dead = bass crowd." },
      { time: "1:00 AM",  temp: "64°F", type: "music",     title: "Junkyard late-night",          where: "Junkyard",       note: "Junkyard becomes its own world after 1 AM. Interactive art, weird sets, magic." },
      { time: "3:00 AM",  temp: "60°F", type: "rest",      title: "Crash in the car",             where: "Camp",           note: "3 AM is the wall. Go to bed, Saturday is the big day." },
    ],
  },
  {
    day: "Saturday",
    date: "May 23",
    color: "#ff6b9d",
    vibe: "The biggest day · peak lineup",
    slots: [
      { time: "8:00 AM",  temp: "63°F", type: "rest",      title: "Slow wake + coffee",           where: "Camp",           note: "Don't rush. You have until noon before things heat up." },
      { time: "9:00 AM",  temp: "67°F", type: "wellness",  title: "Vinyasa yoga",                 where: "Lucent Temple",  note: "LIB's signature wellness space. Sets the tone for the whole day. 45 min." },
      { time: "10:30 AM", temp: "73°F", type: "wellness",  title: "Talk or workshop",             where: "The Compass",    note: "150+ talks across the weekend — pick ONE that excites you. Consciousness, sustainability, visionary art." },
      { time: "12:00 PM", temp: "81°F", type: "music",     title: "Mochakk",                      where: "Woogie · likely 12–2 PM", note: "Afro-house maestro. Crowd mover. Pure daytime joy — this man will make her soul smile." },
      { time: "1:30 PM",  temp: "83°F", type: "food",      title: "Marketplace lunch",            where: "Marketplace",    note: "Real food. Sit in shade. Refill water." },
      { time: "2:30 PM",  temp: "85°F", type: "music",     title: "Of The Trees / Daily Bread",   where: "Grand Artique / Stacks", note: "Deep melodic bass mid-afternoon. Grand Artique is an immersive old-west world — explore it." },
      { time: "4:00 PM",  temp: "86°F", type: "lake",      title: "Lake break — mandatory",       where: "Buena Vista Lake", note: "Peak heat. Get wet. Reset your core temp." },
      { time: "5:00 PM",  temp: "84°F", type: "rest",      title: "Camp · eat · recharge",        where: "Camp",           note: "The critical break before the Saturday gauntlet. Eat carbs, hydrate, rest 30 min." },
      { time: "6:00 PM",  temp: "82°F", type: "outfit",    title: "Sunset outfit change",         where: "Camp",           note: "Her best sunset look of the weekend — Saturday is THE day for photos." },
      { time: "6:30 PM",  temp: "81°F", type: "music",     title: "Avalon Emerson",               where: "Grand Artique · likely 6:30–8 PM", note: "Ethereal, cinematic techno at golden hour inside the Grand Artique world. Don't skip." },
      { time: "8:00 PM",  temp: "74°F", type: "outfit",    title: "Warm layer + quick camp stop", where: "Camp",           note: "It's about to drop fast. Grab her sherpa, grab yours, hit it." },
      { time: "9:00 PM",  temp: "71°F", type: "music",     title: "Overmono",                     where: "Thunder · likely 9–10:30 PM", note: "Welsh experimental duo. Hypnotic, rare, unforgettable. Priority set." },
      { time: "10:30 PM", temp: "68°F", type: "music",     title: "Mau P — PEAK ENERGY",          where: "Thunder · likely 10:30 PM–12 AM", note: "Hard house god. The crowd will lose its mind. This is THE peak energy moment of the weekend." },
      { time: "12:00 AM", temp: "65°F", type: "headliner", title: "Sara Landry — HEADLINER",      where: "Lightning · likely 12–1:30 AM", note: "Industrial techno headliner. Dark, relentless, transformative. One of the best sets of 2026." },
      { time: "2:00 AM",  temp: "63°F", type: "music",     title: "Junkyard late-night wander",   where: "Junkyard",       note: "Interactive art, weird DJs, fire performers. Peak LIB magic hours." },
      { time: "4:30 AM",  temp: "59°F", type: "music",     title: "Maceo Plex sunrise (optional)", where: "Stacks · likely 4:30–6 AM", note: "If you can hang — deep techno into dawn is a spiritual experience. Coldest point of the day, full bundle." },
      { time: "6:00 AM",  temp: "58°F", type: "rest",      title: "Crash hard",                   where: "Camp",           note: "Sunday is lighter. You earned it." },
    ],
  },
  {
    day: "Sunday",
    date: "May 24",
    color: "#c9a0dc",
    vibe: "Closer day · Empire at golden hour",
    slots: [
      { time: "9:00 AM",  temp: "65°F", type: "rest",      title: "Wake slow",                    where: "Camp",           note: "Sunday = recovery + reflection. No rush." },
      { time: "9:30 AM",  temp: "67°F", type: "wellness",  title: "Gentle yoga or breathwork",    where: "Lucent Temple",  note: "Reset the body for the closer. Sunday sessions are often slower + deeper." },
      { time: "11:00 AM", temp: "76°F", type: "lake",      title: "Final lake float",             where: "Buena Vista Lake", note: "Bring the inflatable. This is the last one — make it count." },
      { time: "12:30 PM", temp: "81°F", type: "food",      title: "Marketplace brunch",           where: "Marketplace",    note: "Eat the most expensive thing. You're leaving tomorrow — no leftovers." },
      { time: "1:30 PM",  temp: "83°F", type: "music",     title: "Tinashe — only live act",      where: "Lightning · likely 1:30–3 PM", note: "R&B pop energy is a vibe shift from the electronic mass. Absolutely go, even if she's not your genre." },
      { time: "3:00 PM",  temp: "84°F", type: "art",       title: "Art installations walk",       where: "All grounds",    note: "Sunday has the shortest lines + most reflective crowd. Take photos. LIB's art is world-class." },
      { time: "4:00 PM",  temp: "84°F", type: "music",     title: "Hot Since 82 / Lee Burridge",  where: "Woogie · likely 4–6 PM", note: "Deep house legends. Emotional, beautiful. Perfect Sunday afternoon stretch." },
      { time: "5:30 PM",  temp: "83°F", type: "outfit",    title: "BEST sunset outfit",           where: "Camp",           note: "Your closer look. Empire of the Sun at golden hour = the entire weekend peaks here." },
      { time: "6:30 PM",  temp: "80°F", type: "headliner", title: "Empire of the Sun — FINALE",   where: "Lightning · likely 6:30–8:30 PM", note: "Theatrical live spectacle. 'Walking on a Dream' at golden hour will wreck you. The whole trip is for this moment." },
      { time: "8:30 PM",  temp: "72°F", type: "outfit",    title: "Change to driving clothes",    where: "Camp",           note: "Warm comfy layers. The drive home starts soon." },
      { time: "9:00 PM",  temp: "70°F", type: "rest",      title: "Break down camp",              where: "Camp",           note: "Pack what you can now. Don't wait until midnight." },
      { time: "10:00 PM", temp: "66°F", type: "travel",    title: "Leave for San Diego",          where: "On I-5 S",       note: "~3.5 hr drive. Gas + coffee at Buttonwillow on the way out." },
      { time: "1:30 AM",  temp: "—",    type: "travel",    title: "Home",                         where: "San Diego",      note: "She'll be asleep by Grapevine. You got this. Welcome back." },
    ],
  },
];

const TRAVEL = [
  {
    icon: "🚗",
    title: "Driving from San Diego",
    details: [
      "Distance: ~185 miles, approx. 3.5–4 hours",
      "Route: I-5 N → CA-99 N → Buena Vista Lake (Kern County)",
      "Fill up gas before Bakersfield — nothing near the venue",
      "Friday departure: Leave by 7–8 AM to beat gate traffic (4–8 PM gets brutal)",
      "Gate hours are NOT 24/7 — confirm arrival/exit windows on the LIB app",
      "Vehicle pass is an add-on — confirm you have it before you go",
    ]
  },
  {
    icon: "🚌",
    title: "Lightning Bus from San Diego",
    details: [
      "Official LIB shuttle departs from San Diego directly",
      "Drops off at a central part of the campgrounds",
      "Eliminates parking stress and tired driving home",
      "Book on the LIB website — sells out fast",
      "Best option if you're going solo or want to drink freely",
    ]
  },
  {
    icon: "⏰",
    title: "Best Arrival Times",
    details: [
      "Friday before noon = best campsite options, no gate queue",
      "Avoid 4–8 PM Friday — peak gate congestion every year",
      "The earlier you arrive, the better your camping position",
      "Gates are NOT open overnight — know your entry window",
    ]
  },
  {
    icon: "📍",
    title: "On-Site Navigation",
    details: [
      "Download the LIB app now — register your wristband in it",
      "7 stages: Lightning, Thunder, Woogie, Stacks, Junkyard, Grand Artique, The Compass",
      "Set camp landmark flags so you find your way back at 3 AM",
      "Stage walk times: back campsites can be 20+ min to festival entrance",
      "5 MPH speed limit enforced — don't move your car once parked (lose your spot)",
    ]
  }
];

const CAMP_SECTIONS = [
  {
    title: "Tailgate Tent Extension",
    blurb: "Attach to the hatch to extend your car-mattress setup into a covered outdoor room. Dust shield + sun shade + privacy + somewhere to change. Non-negotiable at LIB.",
    items: [
      "napier backroadz suv tent",
      "rightline gear suv tent",
      "kingcamp suv tailgate awning",
      "universal suv tailgate tent",
      "kelty backroads shelter",
    ],
  },
  {
    title: "Car Sleep Gear",
    blurb: "You have the mattress — these finish the sleep setup so bugs, dust, and light don't ruin you at 6 AM.",
    items: [
      "12v car mattress air pump",
      "car window mesh bug screens magnetic",
      "car privacy window sunshade curtains universal",
      "reflective windshield sunshade xl",
      "battery powered clip on fan usb",
      "hatchback rear window mesh",
      "memory foam mattress topper twin",
    ],
  },
  {
    title: "3-Day Cooler Gear",
    blurb: "A standard cooler loses ~30% of ice per day at 90°F+. Here's how to stretch 3 days without running to Buttonwillow for a $9 bag of cubes.",
    tips: [
      "Pre-chill the cooler with a sacrifice bag of ice 24 hrs before packing",
      "Block ice > cube ice — lasts 2–3× longer (grocery stores sell 10 lb blocks)",
      "Freeze gallon water jugs at home — they double as ice AND turn into drinking water",
      "Run a 2-cooler system: DRINKS (opens 50×/day) + FOOD (stays sealed)",
      "Don't drain the melt water — cold water insulates remaining ice better than air",
      "Park coolers in shade, drape a damp towel over them (evaporative cooling is free)",
      "Dry ice on top, wrapped in paper, food below — can add 24+ hours. 5 lb slab is plenty",
      "Avoid opening the food cooler before noon. Morning = colder air = less ice loss",
    ],
    items: [
      "yeti tundra 65 cooler",
      "rtic ultra light 52 cooler",
      "orca 40 quart cooler",
      "arctic ice alaskan series reusable pack",
      "yeti ice 4lb pack",
      "reflective cooler insulation cover",
      "coleman xtreme marine cooler 70qt",
      "cooler floating drink holder",
    ],
  },
  {
    title: "Camp Comfort",
    blurb: "Dust survival, shade, and making your campsite feel like a home for 3 days.",
    items: [
      "10x10 canopy with sandbag weights",
      "heavy duty rebar tent stakes",
      "boho camping rug outdoor",
      "inflatable air couch lounger",
      "solar string fairy lights outdoor",
      "portable propane camp stove 2 burner",
      "rechargeable led camping lantern",
      "collapsible water jug 5 gallon",
      "camping tapestry wall hanging boho",
      "folding camp table aluminum",
    ],
  },
];

const PRE_TRIP_PLANS = [
  {
    label: "Option A · Thursday Night Roll Out",
    recommended: true,
    color: "#5eead4",
    schedule: [
      { time: "6 PM Thu", act: "Load the car, grab dinner in SD", note: "Pack the car fully at home. Last real food for a while." },
      { time: "8 PM Thu", act: "Leave San Diego", note: "Drive at night = zero gate traffic, zero heat, less crowded I-5. ~3.5 hrs." },
      { time: "~11:30 PM Thu", act: "Arrive Buttonwillow Walmart", note: "1800 E Trask Pkwy — free overnight parking, 20 min from the festival, 24/7 bathroom, fuel/snacks. Everyone's cool with overnight car campers here." },
      { time: "Sleep", act: "Crash in the car", note: "You're already set up. No tent to pitch in the dark. Windows cracked with bug mesh." },
      { time: "7 AM Fri", act: "Coffee + drive to LIB gates", note: "Rolling in fresh, not after a 4-hour drive. Be at gate opening." },
      { time: "10 AM Fri", act: "Gates open — first wave", note: "Prime campsite = worth the Thursday effort. You beat the 11 AM–4 PM rush." },
    ],
  },
  {
    label: "Option B · Friday Morning (Realistic)",
    recommended: false,
    color: "#ffc56b",
    schedule: [
      { time: "9 AM Fri", act: "Alarm (you'll snooze)", note: "Be honest — target 9, leave at 11. Plan accordingly." },
      { time: "11 AM Fri", act: "Actually leave San Diego", note: "You're not a morning person and that's fine. Pre-loaded car helps." },
      { time: "~2:30 PM Fri", act: "Arrive — peak gate traffic", note: "Expect an hour in line. Use it to hydrate, not rage." },
      { time: "3:30–5 PM Fri", act: "Set up camp fast", note: "Later spots = farther walk to stages. Eat, dress, pivot to the festival." },
      { time: "6 PM Fri", act: "You're finally free", note: "Day 1 is compressed — skip a mid-tier set to stay sane." },
    ],
  },
];

// Hourly-ish curves based on NOAA Bakersfield May normals (85–86°F avg high,
// 59–60°F avg low) + typical Central Valley diurnal pattern. Sunrise 5:52 AM,
// sunset 7:52 PM in late May.
const DAYS = [
  {
    key: "friday",
    label: "Friday",
    date: "May 22",
    color: "#ffc56b",
    vibe: "Arrival day · first headliners",
    weather: [
      { time: "6 AM",  temp: "60°F", note: "cool dawn, still dark" },
      { time: "8 AM",  temp: "68°F", note: "wake up, warm quick" },
      { time: "Noon",  temp: "82°F", note: "heat builds" },
      { time: "4 PM",  temp: "86°F", note: "peak + afternoon breeze" },
      { time: "7 PM",  temp: "80°F", note: "sunset — outfit change window" },
      { time: "9 PM",  temp: "70°F", note: "layer up (feels crisp after 85°F)" },
      { time: "12 AM", temp: "64°F", note: "comfy, like a SD winter night" },
      { time: "3 AM",  temp: "60°F", note: "daily low — warm layer required" },
    ],
    artists: ["Chase & Status", "Zeds Dead", "Barry Can't Swim", "TOKiMONSTA", "Nia Archives", "Jayda G"],
    outfitNote: "Daytime → sunset piece ~7 PM → warm night layer by 9 PM.",
  },
  {
    key: "saturday",
    label: "Saturday",
    date: "May 23",
    color: "#ff6b9d",
    vibe: "The biggest day · peak lineup",
    weather: [
      { time: "7 AM",  temp: "61°F", note: "cool morning, slow start" },
      { time: "10 AM", temp: "73°F", note: "workshops + wellness window" },
      { time: "1 PM",  temp: "83°F", note: "Mochakk afro-house hour" },
      { time: "4 PM",  temp: "86°F", note: "peak heat + valley wind" },
      { time: "7 PM",  temp: "79°F", note: "sunset — outfit change window" },
      { time: "10 PM", temp: "68°F", note: "headliner warmth — you're fine" },
      { time: "2 AM",  temp: "62°F", note: "late-night chill, layer up" },
      { time: "5 AM",  temp: "59°F", note: "Maceo Plex sunrise territory" },
    ],
    artists: ["Mau P", "Sara Landry", "Overmono", "Mochakk", "Avalon Emerson", "Maceo Plex (sunrise)"],
    outfitNote: "Day look → sunset outfit by 6:30 PM → night layer by 9:30 PM. Bring a backup piece for after 2 AM.",
  },
  {
    key: "sunday",
    label: "Sunday",
    date: "May 24",
    color: "#c9a0dc",
    vibe: "Closer day · Empire at golden hour",
    weather: [
      { time: "8 AM",  temp: "64°F", note: "slow morning, lake float" },
      { time: "11 AM", temp: "76°F", note: "art walk, shorter lines" },
      { time: "2 PM",  temp: "84°F", note: "Tinashe vibe shift" },
      { time: "5 PM",  temp: "84°F", note: "Empire of the Sun prep" },
      { time: "7 PM",  temp: "78°F", note: "the finale — best outfit" },
      { time: "9 PM",  temp: "70°F", note: "pack up in dusk warmth" },
      { time: "11 PM", temp: "64°F", note: "drive home in comfy clothes" },
    ],
    artists: ["Empire of the Sun", "Tinashe", "Hot Since 82", "Lee Burridge"],
    outfitNote: "Lighter day. Save your best sunset look for Empire of the Sun at 7 PM.",
  },
];

export default function LibGuide() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [checkedItems, setCheckedItems] = useState({});
  const [outfitFilter, setOutfitFilter] = useState("all");

  const toggleCheck = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredOutfits = useMemo(() => {
    if (outfitFilter === "all") return HER_OUTFITS;
    return HER_OUTFITS.filter(o => o.time === outfitFilter);
  }, [outfitFilter]);

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: FONT_BODY,
      background:
        "radial-gradient(ellipse at 75% 0%, #f4a87c 0%, transparent 45%)," +
        "radial-gradient(ellipse at 15% 100%, #7d3a86 0%, transparent 55%)," +
        "linear-gradient(180deg, #1a0820 0%, #3d1440 18%, #6b1f47 42%, #a33958 62%, #d46b4a 82%, #eab77a 100%)",
      color: C.cream,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Soft sun orb */}
      <div style={{
        position: "fixed", top: "-120px", right: "-120px", width: 480, height: 480,
        borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle, rgba(255,214,150,0.55) 0%, rgba(255,140,90,0.2) 35%, transparent 70%)",
        filter: "blur(30px)",
      }} />
      {/* Soft moon orb */}
      <div style={{
        position: "fixed", bottom: "-160px", left: "-140px", width: 520, height: 520,
        borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle, rgba(201,160,220,0.3) 0%, rgba(125,58,134,0.15) 40%, transparent 70%)",
        filter: "blur(40px)",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "28px 18px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            fontFamily: FONT_SCRIPT,
            fontSize: 22, color: C.gold, marginBottom: 2,
            transform: "rotate(-2deg)", display: "inline-block",
          }}>
            may 20–24 · buena vista lake
          </div>
          <h1 style={{
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(2.8rem, 11vw, 5.2rem)",
            fontWeight: 400,
            margin: "4px 0 0",
            lineHeight: 0.95,
            background: "linear-gradient(180deg, #fff1d0 0%, #ffc56b 35%, #ff8c5a 70%, #e94a7f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-1px",
          }}>
            Lightning in<br/>a Bottle
          </h1>
          <div style={{
            fontFamily: FONT_HEADING,
            fontSize: 24,
            color: C.cream,
            marginTop: 4,
            opacity: 0.92,
          }}>
            2026
          </div>
          <div style={{
            marginTop: 8, fontSize: 14, color: C.creamDim, fontWeight: 500,
            letterSpacing: 0.5,
          }}>
            Your Friday–Sunday Trip Guide
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 8, marginBottom: 26, overflowX: "auto",
          paddingBottom: 6, scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          {TABS.map(tab => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "12px 20px",
                  borderRadius: 999,
                  border: active
                    ? "1.5px solid rgba(255,197,107,0.8)"
                    : "1.5px solid rgba(253,244,227,0.28)",
                  background: active
                    ? "linear-gradient(135deg, #ff6b9d 0%, #ffc56b 100%)"
                    : "rgba(26,8,32,0.55)",
                  color: active ? C.plum : C.cream,
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.25s ease",
                  fontFamily: FONT_BODY,
                  letterSpacing: 0.3,
                  boxShadow: active
                    ? "0 6px 24px rgba(255,107,157,0.35)"
                    : "0 4px 12px rgba(10,4,15,0.25)",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* OVERVIEW */}
        {activeTab === "Overview" && (
          <div>
            <div style={{
              textAlign: "center", marginBottom: 18,
              fontSize: 14, color: C.creamDim, fontWeight: 600, lineHeight: 1.55,
              padding: "0 8px",
            }}>
              Three days, three day-cards. Each one shows the day's temp curve,
              the artists worth structuring around, and when to swap looks.
            </div>

            {DAYS.map(day => (
              <DayCard key={day.key} day={day} onOpenPlan={() => setActiveTab("Itinerary")} />
            ))}
          </div>
        )}

        {/* ARTISTS */}
        {activeTab === "Artists" && (
          <div>
            <TabNote>Set times not yet released — check LIB app for schedule</TabNote>
            {ARTISTS.map((group, i) => (
              <Card key={i} style={{ marginBottom: 14 }}>
                <SectionLabel>{group.tier}</SectionLabel>
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                  {group.acts.map((act, j) => (
                    <div key={j} style={{
                      padding: "13px 15px",
                      background: "rgba(253,244,227,0.08)",
                      borderRadius: 14,
                      borderLeft: `3px solid ${C.rose}`,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                        <span style={{
                          fontFamily: FONT_HEADING,
                          fontWeight: 400, color: C.cream, fontSize: 18, lineHeight: 1.2,
                        }}>{act.name}</span>
                        <span style={{
                          fontSize: 11, color: C.plum,
                          background: `linear-gradient(135deg, ${C.gold}, ${C.rose})`,
                          padding: "3px 11px", borderRadius: 999, whiteSpace: "nowrap",
                          fontWeight: 800, letterSpacing: 0.5,
                        }}>{act.stage}</span>
                      </div>
                      <div style={{
                        color: C.creamDim, fontSize: 14, marginTop: 6,
                        lineHeight: 1.55, fontWeight: 500,
                      }}>{act.why}</div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* CAMP */}
        {activeTab === "Camp" && (
          <div>
            <Card style={{ marginBottom: 14, borderColor: "rgba(94,234,212,0.45)" }}>
              <SectionLabel color={C.turquoise}>Car Camping Setup</SectionLabel>
              <p style={{ color: C.cream, fontSize: 14, lineHeight: 1.65, margin: "10px 0 0", fontWeight: 600 }}>
                You're car camping with a mattress setup, so your whole game is different from tent campers.
                Your car IS the shelter — this section is about extending it, keeping food cold for 3 days, and not
                getting cooked alive at 7 AM when the sun hits the windshield.
              </p>
            </Card>

            {CAMP_SECTIONS.map((section, si) => (
              <Card key={si} style={{ marginBottom: 14 }}>
                <SectionLabel>{section.title}</SectionLabel>
                <p style={{ color: C.creamDim, fontSize: 13.5, lineHeight: 1.6, margin: "8px 0 0", fontWeight: 600 }}>
                  {section.blurb}
                </p>

                {section.tips && (
                  <ul style={{
                    color: C.cream, lineHeight: 1.75, margin: "12px 0 4px",
                    paddingLeft: 22, fontSize: 13.5, fontWeight: 600,
                  }}>
                    {section.tips.map((tip, ti) => <li key={ti} style={{ marginBottom: 4 }}>{tip}</li>)}
                  </ul>
                )}

                <div style={{
                  marginTop: 12, display: "flex", flexDirection: "column", gap: 7,
                }}>
                  {section.items.map((item, ii) => (
                    <div key={ii} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      paddingBottom: 7,
                      borderBottom: ii < section.items.length - 1 ? "1px dashed rgba(253,244,227,0.14)" : "none",
                      flexWrap: "wrap",
                    }}>
                      <span style={{
                        fontSize: 13.5, color: C.cream, fontWeight: 600,
                        flex: "1 1 200px", lineHeight: 1.4,
                      }}>{item}</span>
                      <ShopLink href={amazonUrl(item)} label="Amazon" color={C.gold} />
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            <Card style={{ borderColor: "rgba(255,107,157,0.5)" }}>
              <SectionLabel color={C.rose}>Ice Run Locations Near the Venue</SectionLabel>
              <p style={{ color: C.cream, fontSize: 14, lineHeight: 1.65, margin: "10px 0 0", fontWeight: 600 }}>
                If you blow through your ice, these are your closest options (~15–25 min from the venue):
              </p>
              <ul style={{ color: C.cream, lineHeight: 1.85, marginTop: 8, paddingLeft: 22, fontSize: 14, fontWeight: 600 }}>
                <li>Buttonwillow Flying J / Love's (fastest, bag ice)</li>
                <li>Buttonwillow Walmart Supercenter (cheapest, block + cube)</li>
                <li>Tupman Country Store (closest actual store to venue)</li>
                <li>Dry ice: call Bakersfield-area Smart &amp; Final or Ralph's — not every store stocks it</li>
              </ul>
            </Card>
          </div>
        )}

        {/* PACKING */}
        {activeTab === "Packing" && (
          <div>
            <TabNote>Tap items to check off your list</TabNote>
            {Object.entries(PACKING).map(([category, items], ci) => (
              <Card key={ci} style={{ marginBottom: 14 }}>
                <SectionLabel>{category}</SectionLabel>
                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
                  {items.map((item, ii) => {
                    const key = `${ci}-${ii}`;
                    const checked = checkedItems[key];
                    return (
                      <div
                        key={ii}
                        onClick={() => toggleCheck(key)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "10px 12px", borderRadius: 10, cursor: "pointer",
                          background: checked ? "rgba(255,197,107,0.18)" : "transparent",
                          transition: "background 0.2s",
                          opacity: checked ? 0.55 : 1,
                        }}
                      >
                        <div style={{
                          width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                          border: checked ? `2px solid ${C.gold}` : "2px solid rgba(253,244,227,0.35)",
                          background: checked ? `linear-gradient(135deg, ${C.gold}, ${C.rose})` : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, color: C.plum, fontWeight: 900,
                        }}>
                          {checked && "✓"}
                        </div>
                        <span style={{
                          fontSize: 14, color: C.cream, fontWeight: 500,
                          textDecoration: checked ? "line-through" : "none",
                        }}>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* OUTFITS */}
        {activeTab === "Outfits" && (
          <div>
            <Card style={{ marginBottom: 14 }}>
              <SectionLabel>Her Outfits · 100 Wook-Festival Looks</SectionLabel>
              <p style={{ color: C.creamDim, fontSize: 13, lineHeight: 1.55, margin: "8px 0 0", fontWeight: 500 }}>
                Each look links to Amazon and SHEIN searches so you can price-shop and mix pieces.
                Laid-back desert-wook, not EDC. Filter by time of day below.
              </p>

              <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
                {[
                  { k: "all", label: `All (${HER_OUTFITS.length})` },
                  { k: "day", label: `☀ Day (${HER_OUTFITS.filter(o=>o.time==="day").length})` },
                  { k: "sunset", label: `🌅 Sunset (${HER_OUTFITS.filter(o=>o.time==="sunset").length})` },
                  { k: "night", label: `🌙 Night (${HER_OUTFITS.filter(o=>o.time==="night").length})` },
                ].map(f => {
                  const active = outfitFilter === f.k;
                  return (
                    <button key={f.k} onClick={() => setOutfitFilter(f.k)} style={{
                      padding: "7px 14px",
                      borderRadius: 999,
                      border: active
                        ? "1.5px solid rgba(255,197,107,0.8)"
                        : "1.5px solid rgba(253,244,227,0.3)",
                      background: active
                        ? "linear-gradient(135deg, #ff6b9d, #ffc56b)"
                        : "rgba(26,8,32,0.5)",
                      color: active ? C.plum : C.cream,
                      fontSize: 12, fontWeight: 700, cursor: "pointer",
                      fontFamily: FONT_BODY, letterSpacing: 0.2,
                    }}>{f.label}</button>
                  );
                })}
              </div>
            </Card>

            <div style={{ display: "grid", gap: 12 }}>
              {filteredOutfits.map((outfit) => (
                <OutfitCard key={outfit.id} outfit={outfit} />
              ))}
            </div>

            <Card style={{ marginTop: 18 }}>
              <SectionLabel color={C.lavender}>His Matching Looks</SectionLabel>
              <p style={{ color: C.creamDim, fontSize: 13, margin: "8px 0 12px", fontWeight: 500 }}>
                Coordinate through warm earth palette — not literal matching.
              </p>
              <div style={{ display: "grid", gap: 10 }}>
                {HIS_LOOKS.map(look => (
                  <OutfitCard key={look.id} outfit={look} compact />
                ))}
              </div>
            </Card>

            <Card style={{ marginTop: 14, borderColor: "rgba(255,197,107,0.5)" }}>
              <SectionLabel color={C.gold}>Footwear Rule</SectionLabel>
              <p style={{ color: C.cream, fontSize: 14, lineHeight: 1.7, margin: "10px 0 0", fontWeight: 500 }}>
                <strong>Closed-toe only.</strong> The terrain is flat but dusty — open sandals will destroy her feet
                and fill with dust. Comfy sneakers for daytime, platform boots or Docs for night sets. Bring a backup pair.
              </p>
            </Card>
          </div>
        )}

        {/* ITINERARY */}
        {activeTab === "Itinerary" && (
          <div>
            <Card style={{ marginBottom: 16, borderColor: "rgba(94,234,212,0.5)" }}>
              <SectionLabel color={C.turquoise}>The Pre-Trip Plan</SectionLabel>
              <p style={{ color: C.cream, fontSize: 14, lineHeight: 1.65, margin: "10px 0 14px", fontWeight: 600 }}>
                Two realistic options. Option A wins every time if you can pull it off — you'd lose the whole
                Friday to driving + gate traffic otherwise.
              </p>

              {PRE_TRIP_PLANS.map((plan, pi) => (
                <div key={pi} style={{
                  marginBottom: pi < PRE_TRIP_PLANS.length - 1 ? 16 : 0,
                  paddingBottom: pi < PRE_TRIP_PLANS.length - 1 ? 16 : 0,
                  borderBottom: pi < PRE_TRIP_PLANS.length - 1 ? "1px dashed rgba(253,244,227,0.18)" : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                    <h4 style={{
                      fontFamily: FONT_HEADING, fontSize: 20, fontWeight: 400,
                      color: plan.color, margin: 0, lineHeight: 1.15,
                    }}>{plan.label}</h4>
                    {plan.recommended && (
                      <span style={{
                        fontSize: 10, color: C.plum, fontWeight: 800, letterSpacing: 0.5,
                        background: `linear-gradient(135deg, ${C.turquoise}, ${C.gold})`,
                        padding: "3px 10px", borderRadius: 999, textTransform: "uppercase",
                      }}>Recommended</span>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {plan.schedule.map((slot, si) => (
                      <div key={si} style={{
                        display: "grid", gridTemplateColumns: "100px 1fr",
                        gap: 12, paddingBottom: 10,
                        borderBottom: si < plan.schedule.length - 1 ? "1px dashed rgba(253,244,227,0.12)" : "none",
                        paddingTop: si > 0 ? 10 : 0,
                      }}>
                        <div style={{
                          fontSize: 12, fontWeight: 800, color: plan.color, paddingTop: 3,
                        }}>{slot.time}</div>
                        <div>
                          <div style={{
                            fontFamily: FONT_HEADING, fontSize: 15, color: C.cream, lineHeight: 1.25,
                          }}>{slot.act}</div>
                          <div style={{
                            fontSize: 13, color: C.creamDim, marginTop: 3, lineHeight: 1.55, fontWeight: 600,
                          }}>{slot.note}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Card>

            <Card style={{ marginBottom: 16, borderColor: "rgba(255,197,107,0.5)" }}>
              <SectionLabel color={C.gold}>Set Times Release ~1 Week Out</SectionLabel>
              <p style={{ color: C.cream, fontSize: 16, lineHeight: 1.65, margin: "10px 0 10px", fontWeight: 600 }}>
                LIB drops the official schedule in the app about a week before the festival.
                Until then, artists below are slotted in their <em>typical</em> LIB window
                (headliner 11 PM–1 AM, peak 9–11 PM, afternoon 12–4 PM).
                Update when the real times land.
              </p>
              <div style={{
                display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8,
              }}>
                {Object.entries(SLOT_TYPES).map(([k, t]) => (
                  <span key={k} style={{
                    fontSize: 11, fontWeight: 800, color: C.plum,
                    background: t.color, padding: "4px 11px", borderRadius: 999,
                    textTransform: "uppercase", letterSpacing: 0.5,
                  }}>{t.label}</span>
                ))}
              </div>
            </Card>

            {ITINERARY.map((day, di) => (
              <Card key={di} style={{
                marginBottom: 18,
                borderColor: `${day.color}55`,
                borderLeft: `4px solid ${day.color}`,
              }}>
                {/* Day header */}
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-end", flexWrap: "wrap", gap: 8,
                  marginBottom: 16,
                  paddingBottom: 14,
                  borderBottom: `1px dashed ${day.color}40`,
                }}>
                  <div>
                    <div style={{
                      fontFamily: FONT_HEADING,
                      fontSize: 34, color: day.color, lineHeight: 1,
                    }}>{day.day}</div>
                    <div style={{
                      fontSize: 13, color: C.creamMute, fontWeight: 800,
                      letterSpacing: 1.2, textTransform: "uppercase", marginTop: 5,
                    }}>{day.date}</div>
                  </div>
                  <div style={{
                    fontSize: 15, color: C.creamDim, fontWeight: 600,
                    fontStyle: "italic", maxWidth: "60%", textAlign: "right",
                  }}>{day.vibe}</div>
                </div>

                {/* Slots */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {day.slots.map((slot, si) => {
                    const slotType = SLOT_TYPES[slot.type] || SLOT_TYPES.rest;
                    return (
                      <div key={si} style={{
                        display: "grid",
                        gridTemplateColumns: "82px 1fr",
                        gap: 14,
                        padding: "12px 14px",
                        background: "rgba(0,0,0,0.28)",
                        borderRadius: 12,
                        borderLeft: `4px solid ${slotType.color}`,
                      }}>
                        <div>
                          <div style={{
                            fontSize: 15, fontWeight: 800,
                            color: C.cream, lineHeight: 1.1,
                          }}>{slot.time}</div>
                          <div style={{
                            fontSize: 14, fontWeight: 700,
                            color: day.color, marginTop: 3, lineHeight: 1,
                          }}>{slot.temp}</div>
                          <div style={{
                            fontSize: 10, fontWeight: 800, color: C.plum,
                            background: slotType.color,
                            padding: "3px 8px", borderRadius: 999,
                            textTransform: "uppercase", letterSpacing: 0.5,
                            marginTop: 7, display: "inline-block",
                          }}>{slotType.label}</div>
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{
                            fontFamily: FONT_HEADING,
                            fontSize: 19, fontWeight: 400, color: C.cream,
                            lineHeight: 1.2,
                          }}>{slot.title}</div>
                          {slot.where && (
                            <div style={{
                              fontSize: 13, color: slotType.color, marginTop: 4,
                              fontWeight: 700, letterSpacing: 0.2,
                            }}>{slot.where}</div>
                          )}
                          <div style={{
                            fontSize: 15, color: C.creamDim, marginTop: 6,
                            lineHeight: 1.55, fontWeight: 600,
                          }}>{slot.note}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* TRAVEL */}
        {activeTab === "Travel" && (
          <div>
            {TRAVEL.map((section, i) => (
              <Card key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 26 }}>{section.icon}</span>
                  <SectionLabel>{section.title}</SectionLabel>
                </div>
                {section.details.map((d, j) => (
                  <div key={j} style={{
                    padding: "10px 0",
                    borderBottom: j < section.details.length - 1 ? "1px dashed rgba(253,244,227,0.18)" : "none",
                    fontSize: 14, color: C.cream, display: "flex", gap: 10,
                    fontWeight: 500, lineHeight: 1.55,
                  }}>
                    <span style={{ color: C.gold, flexShrink: 0, fontWeight: 900 }}>·</span>{d}
                  </div>
                ))}
              </Card>
            ))}
            <Card style={{ borderColor: "rgba(201,160,220,0.5)" }}>
              <SectionLabel color={C.lavender}>Pro Tip: Take the Lightning Bus</SectionLabel>
              <p style={{ color: C.cream, fontSize: 14, lineHeight: 1.7, margin: "10px 0 0", fontWeight: 500 }}>
                LIB runs an official shuttle from San Diego directly to the campgrounds.
                If you want to drink freely, skip parking stress, or avoid the 4-hour post-festival drive
                while exhausted — this is the move. Book on the LIB website, it sells out.
              </p>
            </Card>
          </div>
        )}

        <div style={{
          textAlign: "center", marginTop: 40,
          fontFamily: FONT_SCRIPT, fontSize: 22, color: C.gold,
          transform: "rotate(-1deg)",
        }}>
          lib 2026 · memorial day weekend
        </div>
      </div>
    </div>
  );
}

// ——— Components ———

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(15,5,22,0.92) 0%, rgba(32,10,38,0.9) 100%)",
      border: "1px solid rgba(255,197,107,0.3)",
      borderRadius: 22,
      padding: "22px 22px",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      boxShadow: "0 12px 40px rgba(10, 4, 15, 0.5)",
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children, color = "#fdf4e3" }) {
  return (
    <div style={{
      fontFamily: FONT_HEADING,
      fontSize: 26,
      color,
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: 0.2,
    }}>
      {children}
    </div>
  );
}

function DayCard({ day, onOpenPlan }) {
  return (
    <Card style={{
      marginBottom: 16,
      borderColor: `${day.color}55`,
      borderLeft: `4px solid ${day.color}`,
    }}>
      {/* Header row */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        flexWrap: "wrap", gap: 10, marginBottom: 4,
      }}>
        <div>
          <div style={{
            fontFamily: FONT_HEADING, fontSize: 38, color: day.color, lineHeight: 1,
          }}>{day.label}</div>
          <div style={{
            fontSize: 14, color: C.creamMute, fontWeight: 800,
            letterSpacing: 1.2, textTransform: "uppercase", marginTop: 6,
          }}>{day.date}</div>
        </div>
        <div style={{
          fontSize: 16, color: C.creamDim, fontWeight: 600,
          fontStyle: "italic", maxWidth: "60%", textAlign: "right",
        }}>{day.vibe}</div>
      </div>

      {/* Temperature curve */}
      <div style={{
        marginTop: 18,
        background: "rgba(0,0,0,0.3)",
        borderRadius: 14,
        padding: "16px 18px",
      }}>
        <div style={{
          fontSize: 12, color: C.creamMute, fontWeight: 800,
          letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12,
        }}>Temp Through the Day</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {day.weather.map((w, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "72px 72px 1fr",
              gap: 12, alignItems: "baseline",
            }}>
              <span style={{
                fontSize: 15, color: C.cream, fontWeight: 800,
              }}>{w.time}</span>
              <span style={{
                fontFamily: FONT_HEADING, fontSize: 22, color: day.color, lineHeight: 1,
              }}>{w.temp}</span>
              <span style={{
                fontSize: 14, color: C.creamDim, fontWeight: 600, lineHeight: 1.45,
              }}>{w.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Outfit guidance */}
      <div style={{
        marginTop: 16,
        display: "flex", gap: 10, alignItems: "flex-start",
        background: `${day.color}18`,
        border: `1px solid ${day.color}40`,
        borderRadius: 12,
        padding: "14px 16px",
      }}>
        <span style={{
          fontSize: 12, color: day.color, fontWeight: 800,
          letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap",
          paddingTop: 3,
        }}>Outfit</span>
        <span style={{
          fontSize: 15, color: C.cream, fontWeight: 700, lineHeight: 1.5,
        }}>{day.outfitNote}</span>
      </div>

      {/* Artists */}
      <div style={{ marginTop: 18 }}>
        <div style={{
          fontSize: 12, color: C.creamMute, fontWeight: 800,
          letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10,
        }}>Look Forward To</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {day.artists.map((a, i) => (
            <span key={i} style={{
              fontSize: 14, padding: "7px 13px", borderRadius: 999,
              background: "rgba(253,244,227,0.09)",
              color: C.cream, fontWeight: 700,
              border: `1px solid ${day.color}50`,
            }}>{a}</span>
          ))}
        </div>
      </div>

      {/* Plan button */}
      <button
        onClick={onOpenPlan}
        style={{
          marginTop: 18, width: "100%",
          padding: "15px 18px", borderRadius: 14,
          border: "none",
          background: `linear-gradient(135deg, ${day.color}, #fdf4e3)`,
          color: C.plum,
          fontFamily: FONT_BODY, fontSize: 15, fontWeight: 800,
          letterSpacing: 0.5, textTransform: "uppercase",
          cursor: "pointer",
          boxShadow: `0 6px 20px ${day.color}40`,
        }}
      >
        Full {day.label} Plan →
      </button>
    </Card>
  );
}

function TabNote({ children }) {
  return (
    <div style={{
      fontSize: 13, color: C.creamDim, marginBottom: 14,
      fontWeight: 500, letterSpacing: 0.2, fontStyle: "italic",
    }}>
      {children}
    </div>
  );
}

function OutfitCard({ outfit, compact = false }) {
  const timeColor =
    outfit.time === "day" ? C.gold :
    outfit.time === "sunset" ? C.rose :
    C.lavender;
  const timeLabel =
    outfit.time === "day" ? "Day" :
    outfit.time === "sunset" ? "Sunset" : "Night";

  return (
    <div style={{
      background: compact
        ? "rgba(253,244,227,0.06)"
        : "linear-gradient(135deg, rgba(26,8,32,0.7) 0%, rgba(45,15,48,0.65) 100%)",
      border: compact
        ? "1px solid rgba(253,244,227,0.18)"
        : `1px solid ${timeColor}40`,
      borderLeft: compact ? "none" : `3px solid ${timeColor}`,
      borderRadius: 14,
      padding: "14px 16px",
      backdropFilter: compact ? "none" : "blur(10px)",
      WebkitBackdropFilter: compact ? "none" : "blur(10px)",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        gap: 10, marginBottom: 4,
      }}>
        <div>
          {!compact && (
            <div style={{
              fontSize: 10, color: timeColor, fontWeight: 800, letterSpacing: 1,
              textTransform: "uppercase", marginBottom: 2,
            }}>#{outfit.id} · {outfit.vibe}</div>
          )}
          <h4 style={{
            fontFamily: FONT_HEADING,
            fontSize: compact ? 17 : 19,
            fontWeight: 400,
            color: C.cream,
            margin: 0,
            lineHeight: 1.15,
          }}>{outfit.name}</h4>
        </div>
        <span style={{
          fontSize: 10, color: C.plum, fontWeight: 800, letterSpacing: 0.5,
          background: `linear-gradient(135deg, ${timeColor}, #fdf4e3)`,
          padding: "3px 10px", borderRadius: 999, whiteSpace: "nowrap",
          textTransform: "uppercase",
        }}>{timeLabel}</span>
      </div>

      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 7 }}>
        {outfit.items.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            paddingBottom: 7,
            borderBottom: i < outfit.items.length - 1 ? "1px dashed rgba(253,244,227,0.12)" : "none",
            flexWrap: "wrap",
          }}>
            <span style={{
              fontSize: 13.5, color: C.cream, fontWeight: 500,
              flex: "1 1 180px", lineHeight: 1.4,
            }}>{item}</span>
            <div style={{ display: "flex", gap: 5, flexShrink: 0, flexWrap: "wrap" }}>
              <ShopLink href={freePeopleUrl(item)} label="Free People" color={C.lavender} />
              <ShopLink href={amazonUrl(item)} label="Amazon" color={C.gold} />
              <ShopLink href={sheinUrl(item)} label="SHEIN" color={C.rose} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShopLink({ href, label, color }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        color: C.plum,
        background: color,
        padding: "4px 9px",
        borderRadius: 999,
        textDecoration: "none",
        fontFamily: FONT_BODY,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </a>
  );
}
