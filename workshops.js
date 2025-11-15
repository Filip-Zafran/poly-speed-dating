/* ========= Poly Fest Berlin — Workshops =========
   Drop-in file for your existing HTML structure.
   Expects these IDs in the DOM:
   - ws-list
   - ws-title
   - ws-meta
   - ws-presenter
   - ws-presenter-bio
   - ws-image
   - ws-presenter-img (optional portrait)
   - ws-detail
================================================= */

const WORKSHOPS = [

  {
    slug: "rethinking-relationships",
    presenter: "Mariana Cerejo & António",
    type: "Workshop (interactive)",
    title: "Rethinking Relationships — The Relationship Design Games",
    room: "Ball Room",
    time: "15:15h",
    image: "images/workshops/relationship-game.png",
    presenterImage: "images/presenters/mariana.jpeg",
      presenterImage2: "images/presenters/antonio.jpeg",
    presenterBio: `The workshop will be led by Mariana Cerejo, the creator and designer of the cards, and António, co-facilitator of the activity and a strong supporter of The Relationship Design Games project.
<br>
<br>
Website: www.therelationshipdesigngame.com`,
    description: `In the Rethink Relationships workshop, we will use the cards from The Relationship Design Games as a framework for different small-group dynamics focused on sharing thoughts and experiences as a way to reimagine relationships beyond socially imposed norms.


The Relationship Design Games are tools that invite people to consciously co-create their own relationship dynamics. 
Inspired by the principles of relationship anarchy, they encourage those involved to set boundaries, express desires
 openly, adjust expectations, and establish their own agreements.
`
  },
  {
    slug: "community-mapping-lab",
    presenter: "Margherita",
    type: "Workshop (interactive)",
    title: "Community Mapping Lab for Berlin's Poly Community",
    room: "Kitchen",
    time: "11:00h",
    image: "images/workshops/community-mapping.jpg",
    presenterImage: "",
    presenterBio: `[Placeholder bio for Margherita.]`,
    description: `[Placeholder description for this session.]`
  },
  {
    slug: "polyamorie-und-sicherheit",
    presenter: "Katharina Egger",
    type: "Workshop (interactive)",
    title: "Polyamorie & Sicherheit",
    room: "Ball Room",
    time: "13:00h",
    image: "images/workshops/poly-sicherheit.jpg",
    presenterImage: "",
    presenterBio: `[Placeholder bio for Katharina Egger.]`,
    description: `[Placeholder description for this session.]`
  },
  {
    slug: "gutes-an-schlechtem-sex",
    presenter: "Dr. Stephanie Kossow",
    type: "Workshop (interactive)",
    title: "„Das Gute an (schl)echtem Sex“ — Reading & Sharing",
    room: "Living Room",
    time: "13:00h",
    image: "images/workshops/gutes-an-schlechtem-sex.jpg",
    presenterImage: "",
    presenterBio: `[Placeholder bio for Dr. Stephanie Kossow.]`,
    description: `
Stephanie will be reading from her book “Das Gute an (schl)echtem Sex – wie Bindung, Kink und Konsens uns den Arsch retten können”,
sharing thoughts on consent and on sexual and non-monogamous relationships. Afterwards, she and her partner Tobias will host
a relaxed session where everyone can share and discuss best practices, experiences and emotional (self)regulation strategies
for consent negotiations in sexual and/or non-monogamous relationships. No prior knowledge needed – beginners very welcome!
`.trim()
  },
  {
    slug: "new-to-enm",
    presenter: "Ficho (he/him)",
    type: "Workshop (interactive)",
    title: "New to (C/E)NM",
    room: "Kitchen",
    time: "13:00h",
    image: "images/workshops/new-to-enm.png",
    presenterImage: "images/presenters/ficho.jpg",
    presenterBio: `A very active community builder and the initiator of Poly Speed Dating and Poly Fest Berlin.
Passionate about creating spaces that spark connection, authenticity, and emotional honesty. <br><br>

Opening up four years ago with his primary partner, he quickly became poly at heart and deeply passionate about creating spaces that 
celebrate connection, communication, and openness — from events like Poly Speed Dating, KiezBurn, and Poly Fest to Emotional Intelligence 
workshops and other community projects. In his free time, he designs poly-themed art and merch, driven by a love for breaking social norms and 
inspiring others to explore non-monogamy grounded in transparency, authenticity, and healthy communication — the essence of Kitchen Table Poly. He firmly believes that love, like tea; best when shared… and frequently refilled.
`,
    description: `New to Non-Monogamy? A Community Discussion Circle

Curious about ethical or consensual non-monogamy but not sure where to start?
Join us for an open and supportive circle where we’ll explore the many facets of non-monogamous life — from understanding key concepts to sharing real experiences within our Berlin community.
<br><br>
We’ll dive into topics such as:<br>

 - The differences between ENM (Ethical Non-Monogamy) and CNM (Consensual Non-Monogamy)
<br>
 - Common terminology and what these words mean in practice
<br>
 - Book recommendations and other resources to deepen your understanding
<br>
 - Events and communities in Berlin where you can connect and learn more
<br>
 - Behaviour and expectations within non-monogamous spaces
<br>
 - Dealing with metamours — navigating relationships with your partners’ partners
<br>
 - Can one get rid of jealousy, or is it something to embrace and understand?
<br><br>
Rather than a lecture, this is a knowledge-sharing circle — an open space for reflection, curiosity, and honest conversation among those exploring or already living non-monogamous lives.`
  },
  {
    slug: "erotic-brain",
    presenter: "Maria Botan",
    type: "Workshop (interactive)",
    title: "Igniting The Erotic Brain & Communicating Desire",
    room: "Living Room",
    time: "17:00h",
    image: "images/workshops/erotic-brain.jpg",
    presenterImage: "",
    presenterBio: `[Placeholder bio for Maria Botan.]`,
    description: `[Placeholder description for this session.]`
  },
  {
    slug: "love-is-political",
    presenter: "Sarah",
    type: "Panel Discussion",
    title: "Why the way we love is political",
    room: "Ball Room",
    time: "17:00h",
    image: "images/workshops/love-political.jpg",
    presenterImage: "",
    presenterBio: `[Placeholder bio for Sarah.]`,
    description: `[Placeholder description for this panel.]`
  },
  {
    slug: "poly-speed-dating",
    presenter: "Jay & Akela",
    type: "Speed Dating / Social Activity",
    title: "Poly Speed Dating",
    room: "Ball Room",
    time: "11:00h",
    image: "images/workshops/speed-dating.png", // you said your file is .png
    presenterImage: "images/presenters/jay-akela.jpg", // optional
    presenterBio: `
Jay and Akela are community facilitators passionate about authentic connection, consent culture,
and helping people meet face-to-face in playful, pressure-free ways.
`.trim(),
    description: `
Step into a lively round of Poly Speed Dating — a playful, in-person antidote to endless swiping.
Around twenty participants will be randomly chosen from those who sign up. We’ll start with quick
introductions and lighthearted ice-breakers before moving through several five-minute rounds with
different partners. This format lets you meet people face-to-face and feel real chemistry.
Afterwards, the after-party offers space to continue conversations and explore any spark that appears.
#FuckOnlineDating
`.trim()
  },
  {
    slug: "poly-pub-quiz",
    presenter: "Sara ohne H ;)",
    type: "Pub Quiz",
    title: "Poly Pub Quiz",
    room: "Living Room",
    time: "21:30h",
    image: "images/workshops/pub-quiz.jpg",
    presenterImage: "",
    presenterBio: `[Placeholder bio for Sara.]`,
    description: `[Placeholder description for this session.]`
  },
  {
    slug: "attachment-style",
    presenter: "Noly",
    type: "Talk / Lecture",
    title: "Attachment Style Workshop",
    room: "Living Room",
    time: "11:00h",
    image: "images/workshops/attachment-style.jpg",
    presenterImage: "",
    presenterBio: `[Placeholder bio for Noly.]`,
    description: `[Placeholder description for this lecture.]`
  },
  {
    slug: "constellations-card-game",
    presenter: "Noly",
    type: "Product",
    title: "Constellations Card Game",
    room: "Chill Room",
    time: "All day",
    image: "images/workshops/constellations-card-game.jpg",
    presenterImage: "",
    presenterBio: `[Placeholder bio for Noly.]`,
    description: `[Available all day — description placeholder.]`
  },
  {
    slug: "open-mic-poly-stories",
    presenter: "Ficho (he/him)",
    type: "Community Sharing",
    title: "Open Mic: Short Poly Stories",
    room: "Ball Room",
    time: "21:30h",
    image: "images/workshops/open-mic-poly-stories.png",
    presenterImage: "images/presenters/ficho.jpg", // optional
    presenterBio: `
A very active community builder and the initiator of Poly Speed Dating and Poly Fest Berlin.
Passionate about creating spaces that spark connection, authenticity, and emotional honesty. <br><br>


Opening up four years ago with his primary partner, he quickly became poly at heart and deeply passionate about creating spaces that 
celebrate connection, communication, and openness — from events like Poly Speed Dating, KiezBurn, and Poly Fest to Emotional Intelligence 
workshops and other community projects. In his free time, he designs poly-themed art and merch, driven by a love for breaking social norms and 
inspiring others to explore non-monogamy grounded in transparency, authenticity, and healthy communication — the essence of Kitchen Table Poly. <br><br>He firmly believes that love, like tea; best when shared… and frequently refilled.

`.trim(),
    description: `
A spontaneous storytelling space where anyone can step up and share a short polyamorous story — funny,
tender, awkward, or inspiring. <br><br>
 There’s no sign-up list and no spotlight pressure — just a welcoming circle
to listen, laugh, and connect through real experiences. <br><br>Come to tell your story, or simply enjoy hearing
how others navigate love, growth, and curiosity in their own ways.
`.trim()
  },
  {
    slug: "non-monogamy-possibilities",
    presenter: "Noly",
    type: "Workshop (interactive)",
    title: "The possibilities of non-monogamy as a conscious choice",
    room: "Kitchen",
    time: "15:15h",
    image: "images/workshops/non-monogamy-possibilities.jpg",
    presenterImage: "",
    presenterBio: `[Placeholder bio for Noly.]`,
    description: `[Placeholder description for this session.]`
  },
  {
    slug: "relationship-smorgasbord",
    presenter: "Fraeya Whiffin",
    type: "Workshop (interactive)",
    title: "Relationship Smorgasbord",
    room: "Living Room",
    time: "15:15h",
    image: "images/workshops/relationship-smorgasbord.jpg",
    presenterImage: "",
    presenterBio: `[Placeholder bio for Fraeya Whiffin.]`,
    description: `[Placeholder description for this session.]`
  }
];

/* ========== Helpers ========== */

function normalizeTime(t) {
  if (!t) return "99:99";
  const s = String(t).trim().toLowerCase();
  if (s === "all day" || s === "allday") return "99:99"; // push to end
  return s.replace("h", "");
}

function renderList(items) {
  const elList = document.getElementById("ws-list");
  if (!elList) return;

  elList.innerHTML = "";

  const sorted = items.slice().sort((a, b) =>
    normalizeTime(a.time).localeCompare(normalizeTime(b.time))
  );

  for (const ws of sorted) {
    const li = document.createElement("li");
    li.className = "ws-item";
    li.innerHTML = `
      <a href="#${ws.slug}" class="ws-link" data-slug="${ws.slug}">
        <span class="ws-title">${ws.title}</span>
        <span class="ws-meta-mini">${ws.presenter} • ${ws.room} • ${ws.time}</span>
      </a>
    `;
    elList.appendChild(li);
  }
}

/* ========== Show details ========== */

function showDetail(slug) {
  const ws = WORKSHOPS.find((w) => w.slug === slug) || WORKSHOPS[0];
  if (!ws) return;

  const titleEl = document.getElementById("ws-title");
  const presenterEl = document.getElementById("ws-presenter");
  const presenterBioEl = document.getElementById("ws-presenter-bio");
  const metaEl = document.getElementById("ws-meta");
  const imgEl = document.getElementById("ws-image");
  const descEl = document.getElementById("ws-desc");
  const presenterImgEl1 = document.getElementById("ws-presenter-img-1");
  const presenterImgEl2 = document.getElementById("ws-presenter-img-2");


  if (titleEl) titleEl.textContent = ws.title;
  if (presenterEl) presenterEl.textContent = ws.presenter || "—";
  if (metaEl) metaEl.textContent = `${ws.room} — ${ws.time} — ${ws.type}`;
  if (imgEl) {
    imgEl.src = ws.image || "images/placeholders/workshop-placeholder.jpg";
    imgEl.alt = `${ws.title} image`;
  }

  /* use innerHTML so <br>, <p>, <em> etc. render */
  if (descEl) descEl.innerHTML = ws.description || "—";
  if (presenterBioEl) presenterBioEl.innerHTML = ws.presenterBio || "—";

  // First presenter image (always used if available)
  if (presenterImgEl1) {
    presenterImgEl1.src =
      ws.presenterImage || "images/placeholders/presenter-placeholder.jpg";
    presenterImgEl1.alt = `${ws.presenter} portrait`;
  }

  // Second presenter image (optional)
  if (presenterImgEl2) {
    if (ws.presenterImage2) {
      presenterImgEl2.style.display = "block";
      presenterImgEl2.src = ws.presenterImage2;
      presenterImgEl2.alt = `${ws.presenter} second portrait`;
    } else {
      presenterImgEl2.style.display = "none";
    }
  }
}


/* ========== Hash handling ========== */
function handleHashChange() {
  const slug = (location.hash || "").replace("#", "");
  if (slug) showDetail(slug);
}

/* ========== Init ========== */
document.addEventListener("DOMContentLoaded", () => {
  renderList(WORKSHOPS);

  if (location.hash) {
    handleHashChange();
  } else if (WORKSHOPS.length) {
    showDetail(WORKSHOPS[0].slug);
  }

  const elList = document.getElementById("ws-list");
  if (elList) {
    elList.addEventListener("click", (e) => {
      const a = e.target.closest("a.ws-link");
      if (!a) return;
      e.preventDefault();
      const slug = a.dataset.slug;
      history.replaceState(null, "", `#${slug}`);
      showDetail(slug);
      document.getElementById("ws-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  window.addEventListener("hashchange", handleHashChange);
});