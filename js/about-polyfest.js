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
      role: 'Co-Founder & Workshop Facilitator',
      bio: `Ficho (he/him) discovered polyamory about five years ago, when he and his long-term partner decided to open up their relationship. What started the new begining in their lives, and turned it 180 degrees.

This also has led him to organize and facilitate community events such as Poly Speed Dating, KiezBurn and Poly Fest, as well as workshops around Emotional Intelligence and interpersonal connection. As a 'big hater' on dating apps, he organises, with his partner-in-crime Akela, DuckDatingApps - a connection platform that defies the Tinderisation of the dating world. And forces people not to judge on pictures, but on values.

With a background in event management, film production, community building and facilitation - he loves bringing friends and strangers together, as he strongly believes it enhances his and their lifes.

As Co-Founder and Workshop Facilitator of Poly Fest, he hopes to create an open, welcoming space for curiosity, honest conversations and personal/relationships growth of all participants.`,
      img: 'images/presenters/ficho.jpg'
    },
    {
      name: 'Sarah',
      role: 'Co-founder & Relationship coach',
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
