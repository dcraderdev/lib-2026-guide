import { useState, useMemo } from "react";
import { HER_OUTFITS, HIS_LOOKS } from "./outfits.js";

const TABS = ["Overview", "Artists", "Packing", "Outfits", "Itinerary", "Travel"];

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
  "Dust & Elements": [
    "Dust mask or N95 respirator (1 per day)",
    "Goggles or wraparound sunglasses",
    "Bandanas (multipurpose + style)",
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

const ITINERARY = [
  {
    day: "Friday · May 22",
    color: C.gold,
    schedule: [
      { time: "7:00 AM", act: "Leave San Diego", note: "Beat the afternoon heat & gate traffic. ~3.5 hr drive. Fill gas before Bakersfield." },
      { time: "10:30 AM", act: "Arrive & Set Up Camp", note: "Get there early for a prime campsite. Stake everything down — wind picks up." },
      { time: "12–2 PM", act: "Explore the Grounds", note: "Walk every stage, find bathrooms, locate water fill stations, orient yourselves." },
      { time: "2–4 PM", act: "Rest / Lake Time", note: "Swim or relax before the night. Bring floaties. You'll need the energy reset." },
      { time: "4–6 PM", act: "Early Afternoon Sets", note: "Explore Woogie & Stacks for warm-up acts. Low crowd, great vibes." },
      { time: "6–7 PM", act: "Get Dressed / Eat", note: "Back to camp. Eat a real meal. Layer up — it cools fast after sunset." },
      { time: "7–9 PM", act: "Barry Can't Swim / Jayda G", note: "Start the night with feel-good house. Woogie stage for maximum crowd joy." },
      { time: "9–11 PM", act: "TOKiMONSTA / Nia Archives", note: "Build up the night with melodic beats before the headliners hit." },
      { time: "11 PM–2 AM", act: "Chase & Status or Zeds Dead", note: "HEADLINER BLOCK. Pick one and commit. Thunder or Lightning." },
      { time: "2–5 AM", act: "Junkyard / Desert Hearts", note: "The Junkyard comes alive at 2am. Desert Hearts marathon sets are legendary." },
    ]
  },
  {
    day: "Saturday · May 23",
    color: C.rose,
    schedule: [
      { time: "8–10 AM", act: "Morning Recovery", note: "Sleep in or catch an early sunrise ambient set at The Compass." },
      { time: "10 AM–12 PM", act: "Workshops & Wellness", note: "LIB's talks and yoga sessions are genuinely special. Check the schedule in the app." },
      { time: "12–2 PM", act: "Mochakk", note: "Afro-house afternoon — this man will make your soul smile. Perfect daytime energy." },
      { time: "2–4 PM", act: "Of The Trees / Daily Bread", note: "Deeper bass vibes mid-afternoon. Grand Artique or Stacks stage." },
      { time: "4–6 PM", act: "Overmono", note: "Priority set. Welsh experimental electronic duo — you won't hear this anywhere else." },
      { time: "6–7 PM", act: "Camp / Eat / Recharge", note: "Critical break. Eat, hydrate, change. Dust mask on for the night ahead." },
      { time: "7–9 PM", act: "Avalon Emerson", note: "Ethereal, hypnotic sets. Grand Artique is its own world — explore the art here too." },
      { time: "9–11 PM", act: "Mau P", note: "Hard house god. The crowd will lose their minds. Peak energy set of the weekend." },
      { time: "11 PM–2 AM", act: "Sara Landry", note: "Industrial techno headliner — dark, relentless, transformative." },
      { time: "2–5 AM", act: "Maceo Plex sunrise", note: "If you can stay up — deep techno into dawn is a spiritual experience at LIB." },
    ]
  },
  {
    day: "Sunday · May 24",
    color: C.lavender,
    schedule: [
      { time: "9–11 AM", act: "Lake Morning / Float", note: "Final morning at the lake. Easy pace, soak it all in." },
      { time: "11 AM–1 PM", act: "Art Installations", note: "Sunday is the best day for exploring art — shorter lines, reflective crowd energy." },
      { time: "1–3 PM", act: "Tinashe", note: "Only live act on the main bill. R&B pop energy is a vibe shift — absolutely go." },
      { time: "3–5 PM", act: "Hot Since 82 / Lee Burridge", note: "Deep house legends for the Sunday stretch. Beautiful closer energy." },
      { time: "5–7 PM", act: "Empire of the Sun", note: "THE FINALE. 'Walking on a Dream' at golden hour will wreck you (in the best way)." },
      { time: "7–8 PM", act: "Break Camp / Pack Up", note: "Start packing now — don't wait until dark. Lots of traffic leaving Sunday night." },
      { time: "8–9 PM", act: "One Last Set (optional)", note: "If you haven't seen your bucket list act yet, now's the time." },
      { time: "9–10 PM", act: "Leave for San Diego", note: "~3.5 hr drive home. Stop in Bakersfield for gas + food." },
    ]
  }
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

const WEATHER = [
  { label: "Day High", value: "85–86°F", note: "record 107°F — plan for 100°F" },
  { label: "Night Low", value: "59–60°F", note: "can dip to 45°F" },
  { label: "Precip", value: "≈0%", note: "bone dry, low humidity" },
  { label: "Wind + Dust", value: "Daily PM", note: "mask + goggles required" },
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
          display: "flex", gap: 6, marginBottom: 24, overflowX: "auto",
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
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: active
                    ? "1.5px solid rgba(255,197,107,0.8)"
                    : "1.5px solid rgba(253,244,227,0.28)",
                  background: active
                    ? "linear-gradient(135deg, #ff6b9d 0%, #ffc56b 100%)"
                    : "rgba(26,8,32,0.55)",
                  color: active ? C.plum : C.cream,
                  fontSize: 13,
                  fontWeight: 700,
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
            <Card>
              <SectionLabel>The Festival</SectionLabel>
              <p style={{ color: C.cream, lineHeight: 1.7, margin: "10px 0 0", fontSize: 15, fontWeight: 500 }}>
                LIB is a transformational camping festival — not just a music event. 7 stages, a lake, immersive art,
                workshops, late-night hidden spaces, and a community unlike any other. <span style={{ color: C.gold, fontWeight: 700 }}>
                You're going Friday–Sunday (May 22–24)</span> — the full headliner run, peak crowd energy, and the legendary Sunday closer.
              </p>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
              <StatCard label="Stages" value="7 worlds" />
              <StatCard label="Daytime" value="80–100°F" />
              <StatCard label="Nights" value="Can hit 45°F" />
              <StatCard label="Terrain" value="Dusty + flat" />
              <StatCard label="From SD" value="~3.5 hrs" />
              <StatCard label="The Lake" value="Swim time!" />
            </div>

            <Card style={{ marginTop: 14 }}>
              <SectionLabel color={C.gold}>Weather · May 20–24</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                {WEATHER.map((w, i) => (
                  <div key={i} style={{
                    background: "rgba(253,244,227,0.08)",
                    border: "1px solid rgba(253,244,227,0.18)",
                    borderRadius: 12, padding: "10px 12px",
                  }}>
                    <div style={{
                      fontSize: 10, color: C.creamMute, letterSpacing: 1.2,
                      textTransform: "uppercase", fontWeight: 700, marginBottom: 4,
                    }}>{w.label}</div>
                    <div style={{
                      fontFamily: FONT_HEADING, fontSize: 18, color: C.cream, lineHeight: 1.1,
                    }}>{w.value}</div>
                    <div style={{ fontSize: 11, color: C.creamDim, marginTop: 3 }}>{w.note}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: C.creamMute, marginTop: 10, fontStyle: "italic" }}>
                Source: NOAA / NWS Hanford — Bakersfield climate normals
              </div>
            </Card>

            <Card style={{ marginTop: 14, borderColor: "rgba(255,197,107,0.5)" }}>
              <SectionLabel color={C.gold}>Critical Notes for First-Timers</SectionLabel>
              <ul style={{
                color: C.cream, lineHeight: 1.9, margin: "10px 0 0",
                paddingLeft: 22, fontSize: 14, fontWeight: 500,
              }}>
                <li>Gate hours are NOT 24/7 — if you leave after gates close, you can't return until morning</li>
                <li>Temperatures swing 40–50°F from day to night — always carry a warm layer</li>
                <li>Dust storms hit without warning — bring a mask every single day</li>
                <li>Plan 2 gallons of water per person per day — seriously</li>
                <li>Stake your tent AND shade structure down tight — wind is intense</li>
                <li>Set times drop closer to the festival — download the LIB app now for alerts</li>
              </ul>
            </Card>
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
            <TabNote>Based on known artists · adjust when set times drop</TabNote>
            {ITINERARY.map((day, di) => (
              <Card key={di} style={{ marginBottom: 16 }}>
                <h3 style={{
                  margin: "0 0 14px",
                  fontFamily: FONT_HEADING,
                  fontWeight: 400,
                  fontSize: 24,
                  color: day.color,
                  lineHeight: 1.1,
                }}>{day.day}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {day.schedule.map((slot, si) => (
                    <div key={si} style={{
                      display: "grid", gridTemplateColumns: "92px 1fr",
                      gap: 14, paddingBottom: 12,
                      borderBottom: si < day.schedule.length - 1 ? "1px dashed rgba(253,244,227,0.18)" : "none",
                      paddingTop: si > 0 ? 12 : 0,
                    }}>
                      <div style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: day.color,
                        letterSpacing: 0.3,
                        paddingTop: 3,
                      }}>{slot.time}</div>
                      <div>
                        <div style={{
                          fontFamily: FONT_HEADING,
                          fontSize: 16, fontWeight: 400, color: C.cream,
                          lineHeight: 1.25,
                        }}>{slot.act}</div>
                        <div style={{
                          fontSize: 13, color: C.creamDim, marginTop: 4,
                          lineHeight: 1.55, fontWeight: 500,
                        }}>{slot.note}</div>
                      </div>
                    </div>
                  ))}
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
      borderRadius: 20,
      padding: "18px 20px",
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
      fontSize: 20,
      color,
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: 0.2,
    }}>
      {children}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(26,8,32,0.65) 0%, rgba(45,15,48,0.6) 100%)",
      border: "1px solid rgba(255,197,107,0.28)",
      borderRadius: 14,
      padding: "12px 14px",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
    }}>
      <div style={{
        fontSize: 10, color: C.creamMute, letterSpacing: 1.4,
        textTransform: "uppercase", fontWeight: 700, marginBottom: 3,
      }}>{label}</div>
      <div style={{
        fontFamily: FONT_HEADING,
        fontSize: 17, color: C.cream, lineHeight: 1.1,
      }}>{value}</div>
    </div>
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
            <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
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
