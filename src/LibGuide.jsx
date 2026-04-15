import { useState } from "react";

const TABS = ["Overview", "Artists", "Packing", "Outfits", "Itinerary", "Travel"];

// ——— Palette ———
const C = {
  cream: "#fdf4e3",
  creamDim: "#f4e6c8",
  creamMute: "#d9c4a8",
  dust: "#b89a87",
  rose: "#ff6b9d",
  roseDeep: "#c94a77",
  gold: "#ffc56b",
  goldDeep: "#e09440",
  lavender: "#c9a0dc",
  turquoise: "#5eead4",
  plum: "#1f0b2a",
};

const ARTISTS = [
  {
    tier: "✹ Must-See Headliners",
    acts: [
      { name: "Empire of the Sun", why: "Theatrical live spectacle — legendary set design, expect 'Walking on a Dream'. Pure magic at night.", stage: "Lightning" },
      { name: "Mau P", why: "Peak hard house energy, 'Drugs from Amsterdam' will go off. Best late-night pick.", stage: "Thunder" },
      { name: "Sara Landry", why: "Hypnotic industrial techno — relentless, dark, transcendent. Do not miss.", stage: "Lightning" },
      { name: "Zeds Dead", why: "Bass festival icons. Crowd will be massive. Bring the energy.", stage: "Thunder" },
      { name: "Chase & Status", why: "UK legends. Heavy drum & bass meets pop — anthemic and electric.", stage: "Lightning" },
    ]
  },
  {
    tier: "✿ High Priority",
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
    tier: "🍄 Hidden Gems",
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
  "🏕️ Camp Essentials": [
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
  "💧 Water & Health": [
    "2× gallon jugs of water (plan 2 gal/day)",
    "Reusable hydration pack/Nalgene",
    "Electrolyte packets (essential!)",
    "Sunscreen SPF 50+ (reapply constantly)",
    "Aloe vera gel",
    "Ibuprofen / Tylenol",
    "Allergy meds (dust is intense)",
    "Band-aids & basic first aid kit",
  ],
  "👁️ Dust & Elements": [
    "Dust mask or N95 respirator (1 per day)",
    "Goggles or wraparound sunglasses",
    "Bandanas (multipurpose + style)",
    "Chapstick / lip balm",
    "Eye drops",
  ],
  "🔦 Gear & Tech": [
    "Portable charger (large capacity, 20,000mAh+)",
    "Headlamp + extra batteries",
    "Fanny pack / crossbody for festival",
    "Lock for your car/valuables",
    "Download the LIB app before you go",
    "Screenshot schedule & venue map offline",
    "Wristband backup (know your info)",
  ],
  "🚿 Toiletries & Comfort": [
    "Baby wipes (essential for freshening up)",
    "Toilet paper (portapotties run out)",
    "Dry shampoo",
    "Travel towel",
    "Deodorant (extra sticks)",
    "Shower shoes / flip flops",
    "Earplugs for sleeping",
  ],
  "🍜 Food & Drink": [
    "Easy camp food (granola bars, trail mix, nuts)",
    "Portable camp stove for meals",
    "Airtight containers (squirrels WILL steal food)",
    "Cooler with ice for perishables",
    "Reusable cups and utensils",
    "Alcohol for camp (not allowed in festival grounds)",
    "Trash bags (Leave No Trace!)",
  ]
};

const OUTFITS = [
  {
    time: "☀️ Daytime",
    vibe: "Desert Warrior",
    items: [
      "Wide-brim hat or bucket hat — essential sun protection",
      "Mesh/net top or bralette + high-waist shorts",
      "Linen button-down shirt (open, breathable)",
      "Lightweight loose pants (palazzo or cargo)",
      "Comfortable closed-toe shoes (sneakers/boots — NO sandals, too dusty)",
      "Wraparound or shield sunglasses",
      "Fanny pack or small crossbody",
    ],
    buy: ["Brandy Melville oversized linen shirt", "Urban Outfitters mesh/knit top", "ASOS wide-leg cargo shorts", "Goodr wrap-around sunglasses"]
  },
  {
    time: "🌅 Sunset",
    vibe: "Golden Hour Glam",
    items: [
      "Flowy sheer cover-up or kimono",
      "Bodysuit + flared pants",
      "Metallic or iridescent accessories",
      "Light layering piece (it cools fast after sunset)",
      "Platform sneakers or ankle boots",
      "Statement earrings or rings",
    ],
    buy: ["Free People flowy kimono", "PacSun flared cargo pants", "ASOS metallic bodysuit", "Dr. Martens platform sneakers"]
  },
  {
    time: "🌙 Night",
    vibe: "Rave Creature",
    items: [
      "Warm layer — fleece, sherpa, or puffer jacket (it WILL get cold)",
      "Beanie or ear warmer",
      "LED accessories / gloving gloves",
      "Dark or reflective outfit base",
      "Comfortable shoes you can dance in for 6+ hours",
      "Pashmina/wrap scarf (multipurpose: warmth + dust mask)",
    ],
    buy: ["Uniqlo Ultra Light Down jacket (packable)", "Carhartt beanie", "SHEIN reflective set", "New Balance 550 for dancing"]
  }
];

const ITINERARY = [
  {
    day: "Friday, May 22",
    emoji: "⚡",
    color: C.gold,
    schedule: [
      { time: "7:00 AM", act: "Leave San Diego 🚗", note: "Beat the afternoon heat & gate traffic. ~3.5 hr drive. Fill gas before Bakersfield." },
      { time: "10:30 AM", act: "Arrive & Set Up Camp", note: "Get there early for a prime campsite spot. Stake everything down — wind picks up." },
      { time: "12–2 PM", act: "Explore the Grounds", note: "Walk every stage, find bathrooms, locate water fill stations, orient yourself." },
      { time: "2–4 PM", act: "Rest / Lake Time", note: "Swim or relax before the night. Bring floaties. You'll need the energy reset." },
      { time: "4–6 PM", act: "Early Afternoon Sets", note: "Explore Woogie & Stacks for warm-up acts. Low crowd, great vibes." },
      { time: "6–7 PM", act: "Get Dressed / Eat", note: "Back to camp. Eat a real meal. Layer up — it cools fast after sunset." },
      { time: "7–9 PM", act: "Barry Can't Swim / Jayda G", note: "Start the night with feel-good house. Woogie stage for maximum crowd joy." },
      { time: "9–11 PM", act: "TOKiMONSTA / Nia Archives", note: "Build up the night with melodic beats before the headliners hit." },
      { time: "11 PM–2 AM", act: "Chase & Status or Zeds Dead", note: "HEADLINER BLOCK. Pick one and commit — both will be massive. Thunder or Lightning." },
      { time: "2–5 AM", act: "Junkyard / Desert Hearts late-night", note: "The Junkyard comes alive at 2am. Desert Hearts marathon sets are legendary." },
    ]
  },
  {
    day: "Saturday, May 23",
    emoji: "🔥",
    color: C.rose,
    schedule: [
      { time: "8–10 AM", act: "Morning Recovery", note: "Sleep in or catch an early sunrise ambient set at The Compass." },
      { time: "10 AM–12 PM", act: "Workshops & Wellness", note: "LIB's talks and yoga sessions are genuinely special. Check the schedule in the app." },
      { time: "12–2 PM", act: "Mochakk", note: "Afro-house afternoon — this man will make your soul smile. Perfect daytime energy." },
      { time: "2–4 PM", act: "Of The Trees / Daily Bread", note: "Deeper bass vibes mid-afternoon. Grand Artique or Stacks stage." },
      { time: "4–6 PM", act: "Overmono", note: "Priority set. Welsh experimental electronic duo — you won't hear this anywhere else." },
      { time: "6–7 PM", act: "Camp / Eat / Recharge", note: "Critical break. Eat, hydrate, change. Dust mask on for the night ahead." },
      { time: "7–9 PM", act: "Avalon Emerson", note: "Ethereal, hypnotic sets. Grand Artique is its own world — explore the art here too." },
      { time: "9–11 PM", act: "Mau P", note: "Hard house god. The crowd will lose their minds. This is the peak energy set of the weekend." },
      { time: "11 PM–2 AM", act: "Sara Landry", note: "Industrial techno headliner — dark, relentless, transformative. One of the best sets of 2026." },
      { time: "2–5 AM", act: "Maceo Plex sunrise set", note: "If you can stay up — deep techno into dawn is a spiritual experience at LIB." },
    ]
  },
  {
    day: "Sunday, May 24",
    emoji: "🌅",
    color: C.lavender,
    schedule: [
      { time: "9–11 AM", act: "Lake morning / Float", note: "Final morning at the lake. Easy pace, soak it all in." },
      { time: "11 AM–1 PM", act: "Wander & Art Installations", note: "Sunday is the best day for exploring art — shorter lines, reflective crowd energy." },
      { time: "1–3 PM", act: "Tinashe", note: "Only live act on the main bill. R&B pop energy is a vibe shift — absolutely go." },
      { time: "3–5 PM", act: "Hot Since 82 / Lee Burridge", note: "Deep house legends for the Sunday stretch. Emotional, beautiful, perfect closer energy." },
      { time: "5–7 PM", act: "Empire of the Sun", note: "🌟 THE FINALE. Theatrical, cinematic, euphoric. 'Walking on a Dream' at golden hour will wreck you (in the best way)." },
      { time: "7–8 PM", act: "Break camp / pack up", note: "Start packing now — don't wait until dark. Lots of traffic leaving Sunday night." },
      { time: "8–9 PM", act: "One last set (optional)", note: "If you haven't seen your bucket list act yet, now's the time. Otherwise head to the car." },
      { time: "9–10 PM", act: "Leave for San Diego 🚗", note: "~3.5 hr drive home. Beat Monday morning traffic. Stop in Bakersfield for gas + food." },
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
      "Drops off at a central part of campgrounds",
      "Eliminates parking stress and tired driving home",
      "Book on the LIB website — sells out fast",
      "Best option if you're going solo or want to drink freely",
    ]
  },
  {
    icon: "⏰",
    title: "Best Arrival Times",
    details: [
      "Friday: Arrive before noon = best campsite options, no gate queue",
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

export default function LibGuide() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{
      minHeight: "100vh",
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
        background: "radial-gradient(circle, rgba(255,214,150,0.55) 0%, rgba(255,140,90,0.25) 35%, transparent 70%)",
        filter: "blur(30px)",
      }} />
      {/* Soft moon orb */}
      <div style={{
        position: "fixed", bottom: "-160px", left: "-140px", width: 520, height: 520,
        borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle, rgba(201,160,220,0.35) 0%, rgba(125,58,134,0.2) 40%, transparent 70%)",
        filter: "blur(40px)",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto", padding: "28px 18px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 22, color: C.gold, marginBottom: 4,
            transform: "rotate(-2deg)",
          }}>
            ✿ may 20–24 · buena vista lake ✿
          </div>
          <h1 style={{
            fontFamily: "'Bagel Fat One', cursive",
            fontSize: "clamp(2.8rem, 11vw, 5.2rem)",
            fontWeight: 400,
            margin: "4px 0 0",
            lineHeight: 0.95,
            background: "linear-gradient(180deg, #fff1d0 0%, #ffc56b 35%, #ff8c5a 70%, #e94a7f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 2px 30px rgba(255,140,90,0.25)",
            letterSpacing: "-1px",
          }}>
            Lightning in<br/>a Bottle
          </h1>
          <div style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic",
            fontSize: 26,
            color: C.cream,
            marginTop: 2,
            opacity: 0.85,
          }}>
            ~ 2026 ~
          </div>
          <div style={{
            fontFamily: "'Caveat', cursive",
            marginTop: 10, fontSize: 20, color: C.creamDim,
          }}>
            your friday–sunday trip guide ⚡
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 6, marginBottom: 28, overflowX: "auto",
          paddingBottom: 6, scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}>
          {TABS.map(tab => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "9px 18px",
                  borderRadius: 999,
                  border: active
                    ? "1.5px solid rgba(255,197,107,0.7)"
                    : "1.5px solid rgba(253,244,227,0.22)",
                  background: active
                    ? "linear-gradient(135deg, #ff6b9d 0%, #ffc56b 100%)"
                    : "rgba(253,244,227,0.08)",
                  color: active ? C.plum : C.cream,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.25s ease",
                  fontFamily: "'Quicksand', sans-serif",
                  letterSpacing: 0.3,
                  boxShadow: active
                    ? "0 6px 24px rgba(255,107,157,0.35), 0 0 0 4px rgba(255,197,107,0.12)"
                    : "none",
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
              <SectionLabel>✿ The Festival</SectionLabel>
              <p style={{ color: C.creamDim, lineHeight: 1.75, margin: "10px 0 0", fontSize: 15 }}>
                LIB is a transformational camping festival — not just a music event. It's 7 stages, a lake, immersive art,
                workshops, late-night hidden spaces, and a community unlike any other. <span style={{ color: C.gold, fontWeight: 600 }}>You're going
                for Friday–Sunday (May 22–24)</span> — the heart of the weekend, the full headliner run, peak crowd energy,
                and the legendary Sunday closer.
              </p>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
              <StatCard icon="⚡" label="Stages" value="7 worlds" />
              <StatCard icon="🌡️" label="Daytime" value="80–100°F" />
              <StatCard icon="🌙" label="Nights" value="Can hit 45°F" />
              <StatCard icon="🌪️" label="Terrain" value="Dusty + flat" />
              <StatCard icon="🚗" label="From SD" value="~3.5 hrs" />
              <StatCard icon="🏊" label="The Lake" value="Swim time!" />
            </div>

            <Card style={{
              marginTop: 14,
              borderColor: "rgba(255,197,107,0.4)",
              background: "linear-gradient(135deg, rgba(255,197,107,0.12) 0%, rgba(255,107,157,0.08) 100%)",
            }}>
              <SectionLabel color={C.gold}>⚠ Critical Notes for First-Timers</SectionLabel>
              <ul style={{ color: C.creamDim, lineHeight: 1.95, margin: "10px 0 0", paddingLeft: 22, fontSize: 14 }}>
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
            <div style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 18, color: C.creamMute, marginBottom: 14,
            }}>
              ~ set times not yet released · check LIB app for schedule ~
            </div>
            {ARTISTS.map((group, i) => (
              <Card key={i} style={{ marginBottom: 14 }}>
                <SectionLabel>{group.tier}</SectionLabel>
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                  {group.acts.map((act, j) => (
                    <div key={j} style={{
                      padding: "13px 15px",
                      background: "rgba(253,244,227,0.06)",
                      borderRadius: 14,
                      borderLeft: `3px solid ${C.rose}`,
                      position: "relative",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                        <span style={{
                          fontFamily: "'DM Serif Display', serif",
                          fontWeight: 400, color: C.cream, fontSize: 18,
                        }}>{act.name}</span>
                        <span style={{
                          fontSize: 11, color: C.plum,
                          background: `linear-gradient(135deg, ${C.gold}, ${C.rose})`,
                          padding: "3px 11px", borderRadius: 999, whiteSpace: "nowrap",
                          fontWeight: 700, letterSpacing: 0.5,
                          boxShadow: "0 2px 8px rgba(255,107,157,0.25)",
                        }}>{act.stage}</span>
                      </div>
                      <div style={{ color: C.creamMute, fontSize: 13.5, marginTop: 5, lineHeight: 1.65 }}>{act.why}</div>
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
            <div style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 18, color: C.creamMute, marginBottom: 14,
            }}>
              ~ tap items to check off your list ~
            </div>
            {Object.entries(PACKING).map(([category, items], ci) => (
              <Card key={ci} style={{ marginBottom: 14 }}>
                <SectionLabel>{category}</SectionLabel>
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
                  {items.map((item, ii) => {
                    const key = `${ci}-${ii}`;
                    const checked = checkedItems[key];
                    return (
                      <div
                        key={ii}
                        onClick={() => toggleCheck(key)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "9px 12px", borderRadius: 10, cursor: "pointer",
                          background: checked ? "rgba(255,197,107,0.14)" : "transparent",
                          transition: "background 0.2s",
                          opacity: checked ? 0.55 : 1,
                        }}
                      >
                        <div style={{
                          width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                          border: checked ? `2px solid ${C.gold}` : "2px solid rgba(253,244,227,0.3)",
                          background: checked
                            ? `linear-gradient(135deg, ${C.gold}, ${C.rose})`
                            : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, color: C.plum, fontWeight: 900,
                        }}>
                          {checked && "✓"}
                        </div>
                        <span style={{
                          fontSize: 14.5, color: C.creamDim,
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
            {OUTFITS.map((outfit, i) => (
              <Card key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <SectionLabel>{outfit.time}</SectionLabel>
                  <span style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: 22, color: C.rose,
                    transform: "rotate(-1deg)",
                  }}>{outfit.vibe}</span>
                </div>
                <div style={{ marginTop: 12 }}>
                  <div style={{
                    fontSize: 11, color: C.creamMute, letterSpacing: 2,
                    marginBottom: 8, textTransform: "uppercase", fontWeight: 700,
                  }}>Wear</div>
                  {outfit.items.map((item, j) => (
                    <div key={j} style={{
                      padding: "8px 0",
                      borderBottom: "1px solid rgba(253,244,227,0.1)",
                      fontSize: 14, color: C.creamDim, display: "flex", gap: 10,
                    }}>
                      <span style={{ color: C.gold, fontSize: 16 }}>✿</span>{item}
                    </div>
                  ))}
                  <div style={{ marginTop: 14 }}>
                    <div style={{
                      fontSize: 11, color: C.creamMute, letterSpacing: 2,
                      marginBottom: 8, textTransform: "uppercase", fontWeight: 700,
                    }}>Buy</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {outfit.buy.map((b, k) => (
                        <span key={k} style={{
                          fontSize: 12, padding: "5px 12px", borderRadius: 999,
                          background: "rgba(253,244,227,0.08)",
                          color: C.creamDim,
                          border: "1px solid rgba(253,244,227,0.2)",
                          fontWeight: 500,
                        }}>{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Card style={{
              borderColor: "rgba(255,197,107,0.4)",
              background: "linear-gradient(135deg, rgba(255,197,107,0.12) 0%, rgba(255,107,157,0.08) 100%)",
            }}>
              <SectionLabel color={C.gold}>👟 Footwear Rule</SectionLabel>
              <p style={{ color: C.creamDim, fontSize: 14, lineHeight: 1.75, margin: "10px 0 0" }}>
                Closed-toe only. The terrain is flat but dusty — open sandals will destroy your feet and fill with dust.
                Comfy sneakers for daytime (New Balance, Nike, Vans), then ankle boots or platforms for the night sets if you want style.
                Bring an extra pair — your shoes WILL get destroyed.
              </p>
            </Card>
          </div>
        )}

        {/* ITINERARY */}
        {activeTab === "Itinerary" && (
          <div>
            <div style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 18, color: C.creamMute, marginBottom: 14,
            }}>
              ~ based on known artists · adjust when set times drop ~
            </div>
            {ITINERARY.map((day, di) => (
              <Card key={di} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 26 }}>{day.emoji}</span>
                  <h3 style={{
                    margin: 0,
                    fontFamily: "'DM Serif Display', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 24,
                    color: day.color,
                  }}>{day.day}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {day.schedule.map((slot, si) => (
                    <div key={si} style={{
                      display: "grid", gridTemplateColumns: "82px 1fr",
                      gap: 14, paddingBottom: 12,
                      borderBottom: si < day.schedule.length - 1 ? "1px dashed rgba(253,244,227,0.14)" : "none",
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
                          fontFamily: "'DM Serif Display', serif",
                          fontSize: 16, fontWeight: 400, color: C.cream,
                          lineHeight: 1.3,
                        }}>{slot.act}</div>
                        <div style={{ fontSize: 13, color: C.creamMute, marginTop: 4, lineHeight: 1.6 }}>{slot.note}</div>
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
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 28 }}>{section.icon}</span>
                  <SectionLabel>{section.title}</SectionLabel>
                </div>
                {section.details.map((d, j) => (
                  <div key={j} style={{
                    padding: "9px 0",
                    borderBottom: j < section.details.length - 1 ? "1px dashed rgba(253,244,227,0.12)" : "none",
                    fontSize: 14, color: C.creamDim, display: "flex", gap: 10,
                  }}>
                    <span style={{ color: C.gold, flexShrink: 0 }}>✿</span>{d}
                  </div>
                ))}
              </Card>
            ))}
            <Card style={{
              borderColor: "rgba(201,160,220,0.4)",
              background: "linear-gradient(135deg, rgba(201,160,220,0.12) 0%, rgba(94,234,212,0.06) 100%)",
            }}>
              <SectionLabel color={C.lavender}>🚌 Pro Tip: Take the Lightning Bus</SectionLabel>
              <p style={{ color: C.creamDim, fontSize: 14, lineHeight: 1.75, margin: "10px 0 0" }}>
                LIB runs an official shuttle from San Diego directly to the campgrounds.
                If you're going with a group that wants to drink freely, not stress about parking, or avoid the
                4-hour post-festival drive while exhausted — this is the move. Book on the LIB website, it sells out.
              </p>
            </Card>
          </div>
        )}

        <div style={{
          textAlign: "center", marginTop: 40,
          fontFamily: "'Caveat', cursive", fontSize: 22, color: C.gold,
          transform: "rotate(-1deg)",
        }}>
          ⚡ lib 2026 · memorial day weekend · buena vista lake ⚡
        </div>
      </div>
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "rgba(253,244,227,0.06)",
      border: "1px solid rgba(253,244,227,0.16)",
      borderRadius: 22,
      padding: "18px 20px",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      boxShadow: "0 10px 30px rgba(31, 11, 42, 0.25)",
      ...style
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children, color = "#fdf4e3" }) {
  return (
    <div style={{
      fontFamily: "'DM Serif Display', serif",
      fontStyle: "italic",
      fontSize: 19,
      color,
      fontWeight: 400,
      marginBottom: 2,
      letterSpacing: 0.2,
    }}>
      {children}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div style={{
      background: "rgba(253,244,227,0.07)",
      border: "1px solid rgba(253,244,227,0.18)",
      borderRadius: 16,
      padding: "13px 15px",
      display: "flex", alignItems: "center", gap: 12,
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
    }}>
      <span style={{ fontSize: 24 }}>{icon}</span>
      <div>
        <div style={{
          fontSize: 10, color: C.creamMute, letterSpacing: 1.5,
          textTransform: "uppercase", fontWeight: 700,
        }}>{label}</div>
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontStyle: "italic",
          fontSize: 16, color: C.cream,
        }}>{value}</div>
      </div>
    </div>
  );
}
