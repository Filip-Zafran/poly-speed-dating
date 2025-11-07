
const handleSubscribe = (event) => {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const interests = Array.from(form.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value).join(', ');
  
  // For now, use mailto until we implement proper backend
  window.location.href = `mailto:polyspeeddating@gmail.com?subject=PSD+Subscription&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AInterests: ${encodeURIComponent(interests)}`;
  
  document.getElementById('subscribe-success').style.display = 'block';
  form.reset();
};

document.addEventListener('DOMContentLoaded', () => {
// Generate random CSS variables if none are set
    if(!getComputedStyle(document.documentElement).getPropertyValue('--primary') || 
       getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() === '') {
        
        const randomHue = Math.floor(Math.random() * 360);
        document.documentElement.style.setProperty('--primary', `hsl(${randomHue}, 80%, 60%)`);
    }
    
    if(!getComputedStyle(document.documentElement).getPropertyValue('--secondary') || 
       getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim() === '') {
        
        // Secondary color is 120 degrees apart from primary
        const primaryHue = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--primary').split(',')[0].replace('hsl(', ''));
        const secondaryHue = (primaryHue + 120) % 360;
        document.documentElement.style.setProperty('--secondary', `hsl(${secondaryHue}, 80%, 60%)`);
    }

  // ===== Mini Calendar (current month; render all days; highlight Poly Fest if this month) =====
document.addEventListener('DOMContentLoaded', () => {
  const POLYFEST_DATE = '2025-11-22'; // YYYY-MM-DD
  const POLYFEST_COLOR = '#FF7A00';

  const grid  = document.getElementById('miniCalGrid');
  const label = document.getElementById('miniCalMonth');
  if (!grid || !label) return;

  const today      = new Date();
  const year       = today.getFullYear();
  const month      = today.getMonth();               // 0..11
  const monthStart = new Date(year, month, 1);
  const monthEnd   = new Date(year, month + 1, 0);   // last day of current month
  const daysInMonth = monthEnd.getDate();

  // Label: "Month YYYY"
  label.textContent = today.toLocaleString(undefined, { month: 'long', year: 'numeric' });

  // EU week: Monday=0..Sunday=6
  const firstDayIndex = (monthStart.getDay() + 6) % 7;

  // Clear grid
  grid.innerHTML = '';

  // Leading blanks from previous month to align the first row
  for (let i = 0; i < firstDayIndex; i++) {
    const cell = document.createElement('div');
    cell.className = 'mini-cal__cell mini-cal__cell--muted';
    grid.appendChild(cell);
  }

  // Add all days of current month
  const [pfY, pfM, pfD] = POLYFEST_DATE.split('-').map(Number);
  const polyfestIsThisMonth = (pfY === year && (pfM - 1) === month);

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('div');
    cell.className = 'mini-cal__cell';

    const num = document.createElement('div');
    num.className = 'mini-cal__day';
    num.textContent = d;
    cell.appendChild(num);

    if (polyfestIsThisMonth && d === pfD) {
      cell.classList.add('mini-cal__cell--event');
      cell.style.setProperty('--event-orange', POLYFEST_COLOR);
      cell.title = 'Poly Fest Berlin';
    }

    grid.appendChild(cell);
  }

  // (Optional) trailing blanks so the last row is complete
  const totalCells = firstDayIndex + daysInMonth;
  const trailing = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < trailing; i++) {
    const cell = document.createElement('div');
    cell.className = 'mini-cal__cell mini-cal__cell--muted';
    grid.appendChild(cell);
  }
});

// Add some fun effects
    const elements = document.querySelectorAll('*:not(script):not(style)');
    elements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(Math.random() > 0.8) {
                el.classList.add('undefined-pulse');
                setTimeout(() => {
                    el.classList.remove('undefined-pulse');
                }, 2000);
            }
        });
    });

   // calendar generation
(() => {
  const grid  = document.getElementById('miniCalGrid');
  const label = document.getElementById('miniCalMonth');
  if (!grid || !label) return;

  const POLYFEST_DATE = '2025-11-22';
  const POLYFEST_COLOR = '#FF7A00';

  const today      = new Date();
  const year       = today.getFullYear();
  const month      = today.getMonth();              // 0..11
  const monthStart = new Date(year, month, 1);
  const monthEnd   = new Date(year, month + 1, 0);
  const daysIn     = monthEnd.getDate();

  label.textContent = today.toLocaleString(undefined, { month:'long', year:'numeric' });

  const lead = (monthStart.getDay() + 6) % 7; // Mon-first
  grid.innerHTML = '';

  // leading blanks
  for (let i = 0; i < lead; i++) {
    const c = document.createElement('div');
    c.className = 'mini-cal__cell mini-cal__cell--muted';
    grid.appendChild(c);
  }

  // days
  const [pfY, pfM, pfD] = POLYFEST_DATE.split('-').map(Number);
  const isPFMonth = (pfY === year && (pfM - 1) === month);

  for (let d = 1; d <= daysIn; d++) {
    const c = document.createElement('div');
    c.className = 'mini-cal__cell';

    const n = document.createElement('div');
    n.className = 'mini-cal__day';
    n.textContent = d;
    c.appendChild(n);

    if (isPFMonth && d === pfD) {
      c.classList.add('mini-cal__cell--event');
      c.style.setProperty('--event-orange', POLYFEST_COLOR);
      c.title = 'Poly Fest Berlin';
    }

    grid.appendChild(c);
  }

  // trailing blanks (complete last row)
  const total = lead + daysIn;
  const tail = (7 - (total % 7)) % 7;
  for (let i = 0; i < tail; i++) {
    const c = document.createElement('div');
    c.className = 'mini-cal__cell mini-cal__cell--muted';
    grid.appendChild(c);
  }
})();

});