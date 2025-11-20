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
    room: "Workshop Room",
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
    title: "Community Mapping Lab",
    room: "Ballroom",
    time: "11:00h",
    image: "images/workshops/community-mapping.jpg",
   presenterImage: "images/presenters/margherita.jpg",
    presenterBio: `Margherita has six years of experience as a volunteer trainer for various student associations and she's recently started working as a professional consultant trainer for the Council of Europe, alongside her full time job as a Robotics Software Engineer. She is passionate about educating young people about topics at the intersection of technological development, human rights and democracy, and helping them become agents of change in their own local communities. Since she's moved to Berlin a year ago, she's still looking for her own local community.`,
    description: `Community mapping is a tool that analyses the resources, environment and needs of a community. It is normally used by policymakers and community organisers to identify the priorities, strengths and pressing issues of a community. Together, we can learn to use community mapping to explore the resources , environment and needs of Berlin's poly community!`
  },
  {
    slug: "polyamorie-und-sicherheit",
    presenter: "Katharina (she/her)",
    type: "Workshop (interactive)",
    title: "Polyamorie & Sicherheit",
    room: "Ballroom",
    time: "13:30h",
    image: "images/workshops/sicherheit.jpg",
    presenterImage: "images/presenters/katharina.png",
    presenterBio: `Katharina (she/her) ist Spezialistin für Gesundheitsförderung (B.A.), Polyamorie Coach und Yogalehrerin. Ihre persönliche Reise mit Polyamorie begann vor 8 Jahren, angetrieben vom Wunsch nach sexueller Freiheit und emotionaler Bindung. Ihre Überzeugung: Der Schlüssel zur erfüllten Polyamorie ist eine gesunde Beziehung mit mir selbst. Mit Achtsamkeit und Embodiment-Methoden unterstützt sie polyamore Menschen dabei, die Beziehung zu sich selbst zu nähren und starke Wurzeln für sichere und verbundene Polybeziehungen zu entwickeln. `,
    description: `Wenn wir uns in unseren Beziehungen unsicher oder überfordert fühlen, scheint es manchmal unmöglich, wirklich präsent zu sein – mit uns selbst oder unseren Partnermenschen.
Doch was, wenn es Wege gibt, auf sichere Weise in Verbindung zu bleiben?


In meinem  Workshop lade ich dich ein, diese Wege neugierig zu erforschen und Sicherheit und Verbundenheit zu erfahren – durch Reflexion, Körperwahrnehmung und achtsame (Selbst-)Begegnung.


Was dich erwartet:
Meditationen
Journaling & Austausch
Achtsame Körperübungen
Kurzinput zum Nervensystem
Partnerübungen: Achtsamer Kontakt & Wahrnehmung von Grenzen


Ich freue mich auf dich!
www.wholeypoly.de
IG: wholeypoly


** workshop will be held in german **`
  },
  {
    slug: "gutes-an-schlechtem-sex",
    presenter: "Stephanie Kossow & Tobi",
    type: "Workshop (interactive)",
    title: "„Das Gute an (schl)echtem Sex“ — Reading & Sharing",
    room: "Kitchen",
    time: "15:15h",
    image: "images/workshops/gutes-an-schlechtem-sex.jpg",
       presenterImage: "images/presenters/steph.jpg",
      presenterImage2: "images/presenters/tobi.jpg",
    presenterBio: ` Dr. Stephanie Kossow (sie/ihr) is a medical doctor and psychotherapist, specialized in sexual medicine. As an author, she writes from a feminist perspective on sexuality, relationships and kink/BDSM. <br> <br> Tobi is a cinematographer, editor, director and communication enthusiast. 
ENM and Kink are intertwined with almost all aspects of his live, professionally and privately.
`,
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
  title: "Embracing Jealousy: A Path to Growth",
  room: "Workshop room",
  time: "11:00h",
  image: "images/workshops/new-to-enm.png",
  presenterImage: "images/presenters/ficho.jpg",
  presenterBio: `
A very active community builder and the initiator of Poly Speed Dating and Poly Fest Berlin.
Passionate about creating spaces that spark connection, authenticity, and emotional honesty. <br><br>

Opening up four years ago with his primary partner, he quickly became poly at heart and deeply passionate about creating spaces that 
celebrate connection, communication, and openness — also events like KiezBurn and BurnHalla, to leading workshops on Emotional Intelligence, Fostering Social Connections 
and other community projects. In his free time, he designs poly-themed art and merch, driven by a love for breaking social norms and 
inspiring others to explore non-monogamy grounded in transparency, authenticity, and healthy communication. <br>

`.trim(),
  description: `
This workshop offers a supportive space to explore jealousy as a natural and insightful emotion within polyamorous and ethical non-monogamous relationships. Participants will learn practical tools for understanding jealousy triggers, communicating openly with partners, and transforming jealousy into personal growth and deeper connection. Through reflection, discussion, and mindfulness techniques, attendees will embrace jealousy as a pathway to emotional resilience and stronger relationships.
`.trim(),
},

  {
    slug: "erotic-brain",
    presenter: "Maria Botan",
    type: "Workshop (interactive)",
    title: "Igniting The Erotic Brain & Communicating Desire",
    room: "Kitchen",
    time: "17:00h",
    image: "images/workshops/erotic-brain.png",
      presenterImage: "images/presenters/maria.jpg",
    presenterBio: `
...is an ENM and Relationship Coach based in Berlin. She creates safe spaces where couples and individuals feel fully supported to explore, grow, and connect from a place of trust and hope. Maria believes that the way we build families and long-term relationships in the 21st century needs an update. Her coaching helps people unlearn outdated patterns, practise emotional intelligence, and build conscious, fulfilling relationships rooted in authenticity and choice. 
<br><br>Connect via: www.enmcoaching.de
<br>IG: @enmcoaching
<br><br> Looking forward to it!
<br>Love,
<br><br>Maria
`,
    description: `Igniting the Erotic Brain and Communicating Desire <br>
Join this fun and empowering 90-minute workshop to explore how your brain shapes desire, pleasure, and connection. You’ll learn how to balance arousal and inhibition, understand your unique desire style, and practise communication tools that help you express what you want with clarity and confidence.
It’s a safe, light-hearted space to learn, laugh, and dive deeper into understanding your sensuality. You’ll leave feeling more confident, more connected, and ready to communicate your needs with ease.
`
  },
  {
    slug: "love-is-political",
    presenter: "Sarah",
    type: "Panel Discussion",
    title: "Why the way we love is political",
    room: "Theater Room",
    time: "17:00h",
    image: "images/workshops/love-more.jpg",
      presenterImage: "images/presenters/sarah.jpeg",
    presenterBio: `Sarah (she/they) started exploring non-monogamy 10 years ago when she lived in Brooklyn and stumbled upong polyamorous Burners at a festival outside of NYC. She immediately felt like this was the answer to all of her relationship problems. Of course it wasn't. But it also kind of was.

Since then she has made a lot of mistakes and has been talking about them in her newsletter: monogamish as well as on Instagram under the account monogamish_me. She is also a systemic coach for individuals and couples, helping them relate more honestly and in a way that truly serves them, their values, and their goals.

In her free time, she dances, does yoga, and most recently took a stab at comedy improv and loves it!`,
    description: `This session features a concise keynote talk followed by a curated panel discussion with diverse voices from within the community. Together, we will explore how relationship structures intersect with culture, autonomy, identity, and society at large, offering a multifaceted look at why the ways we love are inherently political.`
  },
  {
    slug: "poly-speed-dating",
    presenter: "Jay & Akela",
    type: "Speed Dating / Social Activity",
    title: "Poly Speed Dating",
    room: "BallRoom",
    time: "15:15h",
    image: "images/workshops/speed-dating.png", // you said your file is .png
      presenterImage: "images/presenters/jay.jpg",
      presenterImage2: "images/presenters/akela.png",
    presenterBio: `
Jay and Akela are community facilitators passionate about authentic connection, consent culture,
and helping people meet face-to-face in playful, pressure-free ways.
`.trim(),
    description: `
Step into a lively round of Poly Speed Dating — a playful, in-person antidote to endless swiping.
Around twenty participants will be randomly chosen from those who sign up. We’ll start with quick
introductions and lighthearted ice-breakers before moving through several five-minute rounds with
different partners. This format lets you meet people face-to-face and feel real chemistry.
Afterwards, the after-party offers space to continue conversations and explore any spark that appears.<br><br>

<b>Registration for the workshop: Only open till 13:30h</b> <i>(more info at the Opening ceremony)</i><br>
Workshop duration: cca 2,5h 
<br><br>
#FuckOnlineDating :)
`.trim()
  },
  {
    slug: "poly-pub-quiz",
    presenter: "Sara ohne H ;)",
    type: "Pub Quiz",
    title: "Poly Pub Quiz",
    room: "Theater Room",
    time: "21:30h",
    image: "images/workshops/pub.jpg",
    presenterImage: "images/presenters/sara.jpg", // optional,
    presenterBio: `After 11 years of polyamory, Sara (she/her) is trying out new ways of emotional and physical relating to people. She is primarily interested in exploring alternatives to families-by-blood, and wants to work towards building communities of mutual accountability and aid. For her dayjob she is writing a phd in linguistics.`,
    description: `Join the Poly Pub Quiz and expand your knowledge about polyamory! While the quiz follows the traditional, competitive format of pub quizzes, the aim of this one is to learn a good deal about polyamory, see new resources and get to know curious tid-bits about poly in media and history. Everybody comes out as a winner, but only one team gets a (symbolic) prize. ;-) <br>In her free time, Sara is a trashdruid-seamstress who can make a trendy raincoat out of trashbags.`
  },
  {
    slug: "attachment-style",
    presenter: "Noly",
    type: "Talk / Lecture",
    title: "Attachment Style Workshop",
    room: "Kitchen",
    time: "11:00h",
    image: "images/workshops/attachment.png",
    presenterImage: "images/presenters/noly.jpg", // optional,
    presenterBio: `Hello, I'm Noly: solo-polyamorous, relationship anarchist with a thing for Kitchen Table (KTP). I'm a tattoo artist and the founder of the Polyamory Berlin Community, an online space for non-monogamous folk to find support and meet other people who share similar values. I regularly host meet ups for the community, often with educational goals in mind. I currently offer peer-support for NM people as well.`,
    description: `Attachment: How It Shapes Your Relationships & What You Can Do to Navigate It <br>
How does attachment shape the way we love in non-monogamous relationships? How can we recognise our patterns, break unhealthy cycles, and build secure, fulfilling connections? In this 90 minutes workshop, we will talk about what attachment is, how it is formed and what we can do to deal with it better. Together we will explore the connection between attachment and codependency, and tools to navigate your emotional patterns with confidence. 
You will receive a 25 pages digital presentation containing information on attachment theory and 3 activities you can do at home to learn more about yourself and your own attachment. By the end of the workshop, you should be able to identify your own relationship style and have a better idea of how it impacts your relationships.`
  },
    {
    slug: "constallation-game",
    presenter: "Victor & Noly",
    type: "Game",
    title: "Constellations - The Card Game",
    room: "Theater Room",
    time: "All day",
    image: "images/workshops/constalations.png",
    presenterImage: "images/presenters/noly.jpg", // optional,
    presenterBio: `Hello, I'm Noly: solo-polyamorous, relationship anarchist with a thing for Kitchen Table (KTP). I'm a tattoo artist and the founder of the Polyamory Berlin Community, an online space for non-monogamous folk to find support and meet other people who share similar values. I regularly host meet ups for the community, often with educational goals in mind. I currently offer peer-support for NM people as well.`,
    description: `Everyone has relationship goals. But only here you get the chance to play cards to make (or break!) them, while navigating the chaos that a roll of a die can throw into things...
Come check out this new card game made by polyamorous creators, for polyamorous gamers (and everyone else!).`
  },
      {
    slug: "craft-and-chat",
    presenter: "Noly",
    type: "Activity",
    title: "Poly Crafting: Craft and Chat!",
    room: "Theater Room",
    time: "13:30h",
    image: "images/workshops/crafting.png",
    presenterImage: "images/presenters/noly.jpg", // optional,
    presenterBio: `Hello, I'm Noly: solo-polyamorous, relationship anarchist with a thing for Kitchen Table (KTP). I'm a tattoo artist and the founder of the Polyamory Berlin Community, an online space for non-monogamous folk to find support and meet other people who share similar values. I regularly host meet ups for the community, often with educational goals in mind. I currently offer peer-support for NM people as well.`,
    description: `Welcome to this special edition of Poly Crafting: Craft and Chat! <br>
Whether you draw, embroider, paint or tricot, this meet up is for you. All kinds of crafts are welcome at Poly Crafting, a get-together for artists and creatives who practice non-monogamy, in any of its forms. Bring your crafting tools and your questions, and meet me at the Poly Fest for making art and connecting with community. Let's talk non-monogamy! `
  },

  {
    slug: "open-mic-poly-stories",
    presenter: "Ficho (he/him)",
    type: "Community Sharing",
    title: "Open Mic: Short Poly Stories",
    room: "BallRoom",
    time: "21:30h",
    image: "images/workshops/open-mic-poly-stories.png",
    presenterImage: "images/presenters/ficho.jpg", // optional
    presenterBio: `
A very active community builder and the initiator of Poly Speed Dating and Poly Fest Berlin.
Passionate about creating spaces that spark connection, authenticity, and emotional honesty. <br><br>


Opening up four years ago with his primary partner, he quickly became poly at heart and deeply passionate about creating spaces that 
celebrate connection, communication, and openness — also events like KiezBurn, BurnHalla, to leading workshops on Emotional Intelligence, Fostering Social Connections 
and other community projects. In his free time, he designs poly-themed art and merch, driven by a love for breaking social norms and 
inspiring others to explore non-monogamy grounded in transparency, authenticity, and healthy communication. 

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
    slug: "relationship-smorgasbord",
    presenter: "Fraeya Whiffin",
    type: "Workshop (interactive)",
    title: "Relationship Smorgasbord",
    room: "Kithchen",
    time: "13:30h",
    image: "images/workshops/smorgasbord.jpg",
        presenterImage: "images/presenters/freya.jpg", // optional
    presenterBio: `Fraeya Whiffin, IFS therapist `,
    description: `In the monosphere and polysphere alike, new partners often make assumptions about what their relationship should be like, with little intentionality, often ending up just doing what society expects. This workshop presents a worksheet to help you co-create your poly relationships. Even if you are unpartnered, you can benefit from thinking about, for example, how often you wish to communicate or to what extent you would wish to combine finances.`
  }
];

/* ========== Helpers ========== */

function timeToMinutes(t) {
  if (!t) return 9999;
  const s = String(t).trim().toLowerCase();

  // "all day" goes to the end
  if (s.startsWith("all")) return 9999;

  // If it's a range like "10:00–11:30" → take the first part
  const firstPart = s.split(/[–-]/)[0];

  // Remove anything that's not digit or colon (e.g. "h")
  const cleaned = firstPart.replace(/[^\d:]/g, "");

  const match = cleaned.match(/(\d{1,2}):(\d{2})/);
  if (!match) return 9999;

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  return hours * 60 + minutes;
}


function renderList(items) {
  const elList = document.getElementById("ws-list");
  if (!elList) return;

  elList.innerHTML = "";

  const sorted = items.slice().sort((a, b) => {
    const ta = timeToMinutes(a.time);
    const tb = timeToMinutes(b.time);

    if (ta === tb) {
      // tie-breaker: sort alphabetically by title
      return a.title.localeCompare(b.title);
    }
    return ta - tb;
  });

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