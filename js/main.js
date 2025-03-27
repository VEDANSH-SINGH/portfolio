// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a class to the body when the page is loaded
    document.body.classList.add('loaded');
    
    // Animate handwritten elements
    const handwrittenElements = document.querySelectorAll('.handwritten');
    setTimeout(() => {
        handwrittenElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animated');
            }, index * 200);
        });
    }, 300);
    
    // SVG Animation interaction
    const heroDoodle = document.querySelector('.hero-doodle svg');
    if (heroDoodle) {
        // Enhance animation on hover
        heroDoodle.addEventListener('mouseenter', function() {
            this.classList.add('animated-hover');
            
            // Speed up central node animation
            const centralNode = this.querySelector('.central-node');
            if (centralNode) {
                const animations = centralNode.querySelectorAll('animate');
                animations.forEach(anim => {
                    anim.setAttribute('dur', anim.getAttribute('dur').replace('2s', '1s').replace('1.7s', '0.8s'));
                });
            }
        });
        
        heroDoodle.addEventListener('mouseleave', function() {
            this.classList.remove('animated-hover');
            
            // Return central node animation to normal speed
            const centralNode = this.querySelector('.central-node');
            if (centralNode) {
                const animations = centralNode.querySelectorAll('animate');
                animations.forEach(anim => {
                    anim.setAttribute('dur', anim.getAttribute('dur').replace('1s', '2s').replace('0.8s', '1.7s'));
                });
            }
        });
        
        // Add interactive "ping" effect when clicked
        heroDoodle.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const pingEffect = document.createElement('div');
            pingEffect.classList.add('ping-effect');
            pingEffect.style.left = `${x}px`;
            pingEffect.style.top = `${y}px`;
            this.appendChild(pingEffect);
            
            // Remove the ping effect after animation completes
            setTimeout(() => {
                pingEffect.remove();
            }, 1000);
            
            // Highlight text elements temporarily
            const textElements = this.querySelectorAll('.music-text, .chess-text, .code-text');
            textElements.forEach(text => {
                const originalFill = text.getAttribute('fill');
                text.setAttribute('fill', '#ff6b6b');
                text.setAttribute('font-size', '15');
                
                // Restore normal style after a delay
                setTimeout(() => {
                    text.setAttribute('fill', originalFill || '#333');
                    text.setAttribute('font-size', '12');
                }, 2000);
            });
            
            // Add a quick pulse to the central node
            const centralNode = this.querySelector('.central-node');
            if (centralNode) {
                centralNode.setAttribute('r', '15');
                setTimeout(() => {
                    centralNode.setAttribute('r', '10');
                }, 300);
            }
        });
    }
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.doodle').classList.add('animated');
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.doodle').classList.remove('animated');
        });
    });
    
    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add subtle paper movement effect
    const paper = document.querySelector('.paper');
    if (paper) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            
            paper.style.transform = `perspective(1000px) rotateX(${y * 2}deg) rotateY(${x * 2}deg)`;
        });
    }
    
    // Form submission handling
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // In a real app, you would send this to a server
                console.log('Subscription email:', email);
                
                // Show success message
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Thanks for subscribing!';
                successMessage.classList.add('success-message');
                
                // Replace the form with the success message
                this.innerHTML = '';
                this.appendChild(successMessage);
            }
        });
    }
    
    // Add some random "handwritten" doodles to empty spaces
    const addRandomDoodles = () => {
        const doodleContainer = document.createElement('div');
        doodleContainer.classList.add('random-doodles');
        
        // Create 5 random doodles
        for (let i = 0; i < 5; i++) {
            const doodle = document.createElement('div');
            doodle.classList.add('random-doodle');
            
            // Random position
            doodle.style.top = `${Math.random() * 100}%`;
            doodle.style.left = `${Math.random() * 100}%`;
            
            // Random rotation
            doodle.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            doodleContainer.appendChild(doodle);
        }
        
        // Add to the paper container
        if (paper) {
            paper.appendChild(doodleContainer);
        }
    };
    
    // Uncomment to add random doodles
    // addRandomDoodles();
}); 