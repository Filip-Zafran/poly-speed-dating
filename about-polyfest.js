document.addEventListener('DOMContentLoaded', function() {
  // Target the "About Us" sidebar list
  const aboutList = document.querySelectorAll('.workshops-sidebar h2')[1].nextElementSibling;
  const aboutDetail = document.querySelectorAll('.ws-detail')[1];

  // Example data structure: replace with your actual team info!
  const team = [
    {
      name: 'The Community',
      role: 'Founders & Advocates for PolyFest',
      bio: 'United by a shared passion for polyamory and community, our three founders first connected at a Pub Quiz during a Poly Speed Dating event in 2025. Their journey together continued through unforgettable experiences at KiezBurn, inspiring them to launch a non-profit dedicated to polyamory education and resources. Together, they are committed to fostering understanding, support, and connection within the poly and ENM communities.',
      img: 'images/polyfest.png'
    },
    {
      name: 'Sarah',
      role: 'Relationship Coach & Workshop Facilitator',
      bio: 'Sarah (she/they) started exploring non-monogamy 10 years ago when she lived in Brooklyn and stumbled upong polyamorous Burners at a festival outside of NYC. She immediately felt like this was the answer to all of her relationship problems. Of course it wasnt. But it also kind of was.Since then she has made a lot of mistakes and has been talking about them in her newsletter: monogamish as well as on Instagram under the account monogamish_me. She is also a systemic coach for individuals and couples, helping them relate more honestly and in a way that truly serves them, their values, and their goals. In her free time, she dances, does yoga, and most recently took a stab at comedy improv and loves it!',
      img: 'images/presenters/sarah.jpeg'
    },
     {
      name: 'Ficho',
      role: 'Event Manager & Workshop Facilitator',
      bio: 'Opening up four years ago with his primary partner, Ficho (he/him) quickly became poly at heart and deeply passionate about creating spaces that celebrate connection, communication, and openness — from events like Poly Speed Dating, KiezBurn, and Poly Fest to Emotional Intelligence workshops and other community.',
      img: 'images/presenters/ficho.jpg'
    },
       {
      name: 'Sara ohne H',
      role: 'PolyFest Co-Organizer and PubQuizler',
      bio: 'After 11 years of polyamory, Sara (she/her) is trying out new ways of emotional and physical relating to people. She is primarily interested in exploring alternatives to families-by-blood, and wants to work towards building communities of mutual accountability and aid. For her dayjob she is writing a phd in linguistics. In her free time, Sara is a trashdruid-seamstress who can make a trendy raincoat out of trashbags.',
      img: 'images/presenters/sara.jpg'
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
    const idx = e.target.getAttribute('data-index');
    if (idx !== null) {
      const member = team[idx];
      aboutDetail.querySelector('#ws-title').textContent = member.name;
      aboutDetail.querySelector('#ws-presenter').textContent = member.role;
      aboutDetail.querySelector('#ws-presenter-bio').textContent = member.bio;
      aboutDetail.querySelector('#ws-presenter-img-1').src = member.img;
      aboutDetail.querySelector('#ws-presenter-img-2').style.display = 'none'; // Hide second image unless needed
    }
  });

  // Optionally, show default info
  if(team.length) {
    aboutList.firstChild.click();
  }
});
