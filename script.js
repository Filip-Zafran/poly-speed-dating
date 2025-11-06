
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
});