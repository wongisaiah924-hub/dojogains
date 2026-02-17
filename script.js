        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('nav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Animate on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const start = 0;
                const increment = target / (duration / 16);
                let current = start;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString() + '+';
                    }
                };

                updateCounter();
            });
        }

        // Trigger counter animation when hero is visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    heroObserver.unobserve(entry.target);
                }
            });
        });

        heroObserver.observe(document.querySelector('.hero'));

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    function closePopup(){document.getElementById('leadPopup').style.display='none'}
    function submitLead(){
      var n=document.getElementById('leadName').value.trim(),e=document.getElementById('leadEmail').value.trim(),p=document.getElementById('leadPhone').value.trim();
      if(!n||!e)return alert('Please enter your name and email.');
      var b=document.getElementById('leadSubmit');b.disabled=true;b.textContent='Sending...';
      fetch('https://api.dojogains.com/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,email:e,phone:p})})
      .then(function(){document.getElementById('popupForm').style.display='none';document.getElementById('popupSuccess').style.display='block'})
      .catch(function(){alert('Something went wrong. Please try again.');b.disabled=false;b.textContent='Claim My Discount'});
    }
    /* Popup disabled — re-enable for special sales by uncommenting below
    if(!localStorage.getItem('dojo_lead_shown')){
      setTimeout(function(){document.getElementById('leadPopup').style.display='flex';localStorage.setItem('dojo_lead_shown','1')},5000);
    }
    */
