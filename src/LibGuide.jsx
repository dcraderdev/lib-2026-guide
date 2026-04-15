import { useState } from "react";

const TABS = ["Overview", "Artists", "Packing", "Outfits", "Itinerary", "Travel"];

const ARTISTS = [
  {
    tier: "🔴 Must-See Headliners",
    acts: [
      { name: "Empire of the Sun", why: "Theatrical live spectacle — legendary set design, expect 'Walking on a Dream'. Pure magic at night.", stage: "Lightning" },
      { name: "Mau P", why: "Peak hard house energy, 'Drugs from Amsterdam' will go off. Best late-night pick.", stage: "Thunder" },
      { name: "Sara Landry", why: "Hypnotic industrial techno — relentless, dark, transcendent. Do not miss.", stage: "Lightning" },
      { name: "Zeds Dead", why: "Bass festival icons. Crowd will be massive. Bring the energy.", stage: "Thunder" },
      { name: "Chase & Status", why: "UK legends. Heavy drum & bass meets pop — anthemic and electric.", stage: "Lightning" },
    ]
  },
  {
    tier: "🟠 High Priority",
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
    tier: "🟡 Hidden Gems",
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
    color: "#f9a825",
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
    color: "#e53935",
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
    color: "#7b1fa2",
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
      background: "linear-gradient(135deg, #0a0012 0%, #0d001a 40%, #001020 100%)",
      fontFamily: "'Courier New', monospace",
      color: "#e8e0ff",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Starfield background */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 20% 20%, rgba(120,0,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(0,180,255,0.06) 0%, transparent 60%)",
        zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto", padding: "24px 16px 60px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            fontSize: 11, letterSpacing: 6, color: "#a78bfa", marginBottom: 8,
            textTransform: "uppercase"
          }}>MAY 20–24 · BUENA VISTA LAKE, CA</div>
          <h1 style={{
            fontSize: "clamp(2.2rem, 8vw, 3.8rem)",
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            fontWeight: 900,
            margin: 0,
            background: "linear-gradient(135deg, #ffffff 0%, #c4b5fd 40%, #60a5fa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
            letterSpacing: "-1px"
          }}>
            Lightning in<br/>a Bottle '26
          </h1>
          <div style={{
            marginTop: 12, fontSize: 13, color: "#94a3b8", letterSpacing: 2
          }}>YOUR FRIDAY–SUNDAY TRIP GUIDE ⚡</div>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 4, marginBottom: 28, overflowX: "auto",
          paddingBottom: 4, scrollbarWidth: "none"
        }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                border: activeTab === tab ? "1px solid #7c3aed" : "1px solid rgba(255,255,255,0.1)",
                background: activeTab === tab
                  ? "linear-gradient(135deg, #7c3aed, #2563eb)"
                  : "rgba(255,255,255,0.04)",
                color: activeTab === tab ? "#fff" : "#94a3b8",
                fontSize: 12, fontWeight: 700, letterSpacing: 1,
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "all 0.2s",
                textTransform: "uppercase",
                fontFamily: "'Courier New', monospace",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "Overview" && (
          <div>
            <Card>
              <SectionLabel>The Festival</SectionLabel>
              <p style={{ color: "#cbd5e1", lineHeight: 1.8, margin: "8px 0 0" }}>
                LIB is a transformational camping festival — not just a music event. It's 7 stages, a lake, immersive art, 
                workshops, late-night hidden spaces, and a community unlike any other. <span style={{ color: "#c4b5fd" }}>You're going 
                for Friday–Sunday (May 22–24)</span>, which is the heart of the weekend — the full headliner run, peak crowd energy, 
                and the legendary Sunday closer.
              </p>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
              <StatCard icon="⚡" label="Stages" value="7 worlds" />
              <StatCard icon="🌡️" label="Daytime Temp" value="80–100°F" />
              <StatCard icon="🌙" label="Night Temp" value="Can hit 45°F" />
              <StatCard icon="🌪️" label="Terrain" value="Dusty + Flat" />
              <StatCard icon="🚗" label="From San Diego" value="~3.5 hrs" />
              <StatCard icon="🏊" label="Lake Access" value="Yes — swim!" />
            </div>

            <Card style={{ marginTop: 12, borderColor: "rgba(249,168,37,0.3)", background: "rgba(249,168,37,0.05)" }}>
              <SectionLabel color="#f9a825">⚠️ Critical Notes for First-Timers</SectionLabel>
              <ul style={{ color: "#cbd5e1", lineHeight: 2, margin: "8px 0 0", paddingLeft: 20, fontSize: 13 }}>
                <li>Gate hours are NOT 24/7 — if you leave after gates close, you can't return until morning</li>
                <li>Temperatures swing 40–50°F from day to night — always carry a warm layer</li>
                <li>Dust storms hit without warning — bring a mask every single day</li>
                <li>Plan 2 gallons of water per person per day — seriously</li>
                <li>Stake your tent AND shade structure down tight — wind is intense</li>
                <li>Set times drop closer to the festival — download the LIB app now to get alerts</li>
              </ul>
            </Card>
          </div>
        )}

        {/* ARTISTS */}
        {activeTab === "Artists" && (
          <div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16, letterSpacing: 1 }}>
              SET TIMES NOT YET RELEASED · CHECK LIB APP FOR SCHEDULE
            </div>
            {ARTISTS.map((group, i) => (
              <Card key={i} style={{ marginBottom: 12 }}>
                <SectionLabel>{group.tier}</SectionLabel>
                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
                  {group.acts.map((act, j) => (
                    <div key={j} style={{
                      padding: "12px 14px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: 8,
                      borderLeft: "3px solid #7c3aed"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <span style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 14 }}>{act.name}</span>
                        <span style={{
                          fontSize: 10, color: "#7c3aed", background: "rgba(124,58,237,0.15)",
                          padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", marginLeft: 8, letterSpacing: 1
                        }}>{act.stage}</span>
                      </div>
                      <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4, lineHeight: 1.6 }}>{act.why}</div>
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
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16, letterSpacing: 1 }}>
              TAP ITEMS TO CHECK OFF YOUR LIST
            </div>
            {Object.entries(PACKING).map(([category, items], ci) => (
              <Card key={ci} style={{ marginBottom: 12 }}>
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
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "8px 10px", borderRadius: 6, cursor: "pointer",
                          background: checked ? "rgba(124,58,237,0.12)" : "transparent",
                          transition: "background 0.15s",
                          opacity: checked ? 0.5 : 1,
                        }}
                      >
                        <div style={{
                          width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                          border: checked ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.2)",
                          background: checked ? "#7c3aed" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10
                        }}>
                          {checked && "✓"}
                        </div>
                        <span style={{
                          fontSize: 13, color: "#cbd5e1",
                          textDecoration: checked ? "line-through" : "none"
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
              <Card key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <SectionLabel>{outfit.time}</SectionLabel>
                  <span style={{
                    fontSize: 10, letterSpacing: 2, color: "#a78bfa",
                    textTransform: "uppercase"
                  }}>{outfit.vibe}</span>
                </div>
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1, marginBottom: 6 }}>WEAR:</div>
                  {outfit.items.map((item, j) => (
                    <div key={j} style={{
                      padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
                      fontSize: 13, color: "#cbd5e1", display: "flex", gap: 8
                    }}>
                      <span style={{ color: "#7c3aed" }}>›</span>{item}
                    </div>
                  ))}
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1, marginBottom: 6 }}>BUY:</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {outfit.buy.map((b, k) => (
                        <span key={k} style={{
                          fontSize: 11, padding: "3px 10px", borderRadius: 20,
                          background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)"
                        }}>{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Card style={{ borderColor: "rgba(249,168,37,0.3)", background: "rgba(249,168,37,0.04)" }}>
              <SectionLabel color="#f9a825">👟 Footwear Rule</SectionLabel>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, margin: "8px 0 0" }}>
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
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16, letterSpacing: 1 }}>
              BASED ON KNOWN ARTISTS · ADJUST WHEN SET TIMES DROP
            </div>
            {ITINERARY.map((day, di) => (
              <Card key={di} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 20 }}>{day.emoji}</span>
                  <h3 style={{
                    margin: 0, fontSize: 15, fontWeight: 700,
                    color: day.color, fontFamily: "'Georgia', serif", fontStyle: "italic"
                  }}>{day.day}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {day.schedule.map((slot, si) => (
                    <div key={si} style={{
                      display: "grid", gridTemplateColumns: "80px 1fr",
                      gap: 12, paddingBottom: 12, paddingTop: 0,
                      borderBottom: si < day.schedule.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      marginBottom: si < day.schedule.length - 1 ? 0 : 0,
                      paddingTop: si > 0 ? 10 : 0
                    }}>
                      <div style={{
                        fontSize: 11, color: "#64748b", paddingTop: 2,
                        fontFamily: "'Courier New', monospace"
                      }}>{slot.time}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>{slot.act}</div>
                        <div style={{ fontSize: 12, color: "#64748b", marginTop: 2, lineHeight: 1.5 }}>{slot.note}</div>
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
              <Card key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 24 }}>{section.icon}</span>
                  <SectionLabel>{section.title}</SectionLabel>
                </div>
                {section.details.map((d, j) => (
                  <div key={j} style={{
                    padding: "7px 0",
                    borderBottom: j < section.details.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    fontSize: 13, color: "#cbd5e1", display: "flex", gap: 8
                  }}>
                    <span style={{ color: "#7c3aed", flexShrink: 0 }}>›</span>{d}
                  </div>
                ))}
              </Card>
            ))}
            <Card style={{ borderColor: "rgba(96,165,250,0.3)", background: "rgba(96,165,250,0.04)" }}>
              <SectionLabel color="#60a5fa">🚌 Pro Tip: Take the Lightning Bus</SectionLabel>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, margin: "8px 0 0" }}>
                LIB runs an official shuttle from San Diego directly to the campgrounds. 
                If you're going with a group that wants to drink freely, not stress about parking, or simply avoid the 
                4-hour post-festival drive while exhausted — this is the move. Book it on the LIB website, it sells out.
              </p>
            </Card>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 32, fontSize: 11, color: "#334155", letterSpacing: 2 }}>
          ⚡ LIB 2026 · MEMORIAL DAY WEEKEND · BUENA VISTA LAKE, CA ⚡
        </div>
      </div>
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 12,
      padding: "16px 18px",
      ...style
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children, color = "#a78bfa" }) {
  return (
    <div style={{
      fontSize: 11, letterSpacing: 2, color, fontWeight: 700,
      textTransform: "uppercase", marginBottom: 2
    }}>
      {children}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 10, padding: "12px 14px",
      display: "flex", alignItems: "center", gap: 10
    }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 10, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{value}</div>
      </div>
    </div>
  );
}
