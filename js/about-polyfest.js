document.addEventListener('DOMContentLoaded', function() {
  // Target the "About Us" sidebar list
  const aboutList = document.querySelectorAll('.workshops-sidebar h2')[1].nextElementSibling;
  const aboutDetail = document.querySelectorAll('.ws-detail')[1];

  // Add a class so we can style these items as "links"
  aboutList.classList.add('about-list');

  const team = [
    {
      name: 'Team',
      role: 'PolyFest Community',
      bio: 'PolyFest Berlin is built by a passionate community dedicated to creating safe, inclusive spaces for connection and celebration. Our team brings together diverse expertise, perspectives, and a shared commitment to fostering understanding, support, and connection within the polyamorous and ethical non-monogamy communities. We work together to make PolyFest an unforgettable celebration of relationship diversity and authentic human connection.',
      img: 'images/polyfest-small.png'
    },
    {
      name: 'Ficho',
      role: 'Event Manager & Workshop Facilitator',
      bio: 'Opening up four years ago with his primary partner, Ficho (he/him) quickly became poly at heart and deeply passionate about creating spaces that celebrate connection, communication, and openness, from events like Poly Speed Dating, KiezBurn, and Poly Fest to Emotional Intelligence workshops and other community.',
      img: 'images/presenters/ficho.jpg'
    },
    {
      name: 'Sarah',
      role: 'Relationship Coach & Workshop Facilitator',
      bio: 'Sarah (she/they) started exploring non-monogamy 10 years ago when she lived in Brooklyn and stumbled upong polyamorous Burners at a festival outside of NYC. She immediately felt like this was the answer to all of her relationship problems. Of course it wasnt. But it also kind of was. Since then she has made a lot of mistakes and has been talking about them in her newsletter: monogamish as well as on Instagram under the account monogamish_me. She is also a systemic coach for individuals and couples, helping them relate more honestly and in a way that truly serves them, their values, and their goals. In her free time, she dances, does yoga, and most recently took a stab at comedy improv and loves it!',
      img: 'images/presenters/sarah.jpeg'
    },
  ];

  // Populate sidebar list
  aboutList.innerHTML = '';
  team.forEach((member, idx) => {
    const li = document.createElement('li');
    li.textContent = member.name;
    li.setAttribute('data-index', idx);
    aboutList.appendChild(li);
  });

  // Show details on click
  aboutList.addEventListener('click', function(e) {
    const li = e.target.closest('li');
    if (!li) return;

    const idx = li.getAttribute('data-index');
    if (idx == null) return;

    const member = team[idx];
    aboutDetail.querySelector('#ws-title').textContent = member.name;
    aboutDetail.querySelector('#ws-presenter').textContent = member.role;
    aboutDetail.querySelector('#ws-presenter-bio').textContent = member.bio;
    aboutDetail.querySelector('#ws-presenter-img-1').src = member.img;
    aboutDetail.querySelector('#ws-presenter-img-2').style.display = 'none'; // Hide second image
  });

  // Optionally, show default info
  if (team.length && aboutList.firstChild) {
    aboutList.firstChild.click();
  }
});
