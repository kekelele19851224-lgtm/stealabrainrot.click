// Steal a Brainrot Website JavaScript
// Modern Apple-inspired interactions and functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    initializeCodeCopy();
    initializeScrollEffects();
    initializeAnimations();
    initializeEmailSignup();
    initializeAccessibility();
});

// Navigation Functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('wiki-search');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        // Search input focus effects
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.classList.add('focused');
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.classList.remove('focused');
        });

        // Search functionality
        function performSearch() {
            const query = searchInput.value.toLowerCase().trim();
            if (query.length < 2) return;

            // Highlight matching content on page
            highlightSearchTerms(query);
            
            // Scroll to first match
            const firstMatch = document.querySelector('.search-highlight');
            if (firstMatch) {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Clear search highlights when input changes
        searchInput.addEventListener('input', () => {
            clearSearchHighlights();
        });
    }
}

// Search highlighting functionality
function highlightSearchTerms(query) {
    clearSearchHighlights();
    
    const walker = document.createTreeWalker(
        document.querySelector('.wiki-main') || document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.nodeValue.toLowerCase().includes(query)) {
            textNodes.push(node);
        }
    }

    textNodes.forEach(textNode => {
        const parent = textNode.parentNode;
        if (parent.tagName !== 'SCRIPT' && parent.tagName !== 'STYLE') {
            const regex = new RegExp(`(${query})`, 'gi');
            const newHTML = textNode.nodeValue.replace(regex, '<mark class="search-highlight">$1</mark>');
            
            const wrapper = document.createElement('span');
            wrapper.innerHTML = newHTML;
            parent.replaceChild(wrapper, textNode);
        }
    });
}

function clearSearchHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

// Code Copy Functionality (merged with advanced version below)

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#30d158' : '#007aff'};
        color: white;
        padding: 12px 20px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll Effects
function initializeScrollEffects() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-blue);
        color: white;
        border: none;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: var(--shadow-soft);
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.transform = 'translateY(100px)';
        }
    });
}

// Animation System
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Stagger animation for grid items
                if (entry.target.classList.contains('features-grid') || 
                    entry.target.classList.contains('codes-grid') ||
                    entry.target.classList.contains('stats-grid')) {
                    const items = entry.target.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('fade-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .update-card, .stat-card, .code-card, .tool-card, .method-card, .wiki-section'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    // Quick nav pills interaction
    const pills = document.querySelectorAll('.pill');
    pills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            // Remove active class from all pills
            pills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            pill.classList.add('active');
        });
    });
}

// Email Signup Functionality
function initializeEmailSignup() {
    const emailForm = document.querySelector('.email-form');
    const emailInput = document.querySelector('.email-input');
    const subscribeBtn = document.querySelector('.subscribe-btn');
    
    if (emailForm && emailInput && subscribeBtn) {
        subscribeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate subscription (in real implementation, this would call an API)
            subscribeBtn.textContent = 'Subscribing...';
            subscribeBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Successfully subscribed to code alerts!', 'success');
                emailInput.value = '';
                subscribeBtn.textContent = 'Subscribe';
                subscribeBtn.disabled = false;
            }, 1500);
        });

        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Accessibility Features
function initializeAccessibility() {
    // Keyboard navigation for custom elements
    document.addEventListener('keydown', (e) => {
        // Skip to content on Tab key
        if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
            const firstFocusable = document.querySelector('a, button, input, [tabindex]');
            if (firstFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });

    // Add focus indicators for mouse users
    let usingMouse = false;
    
    document.addEventListener('mousedown', () => {
        usingMouse = true;
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            usingMouse = false;
        }
    });
    
    document.addEventListener('focusin', (e) => {
        if (usingMouse) {
            e.target.style.outline = 'none';
        }
    });

    // Announce dynamic content changes for screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Expose function globally for use in other functions
    window.announceToScreenReader = announceToScreenReader;
}

// Advanced Code Copy with Analytics
function initializeCodeCopy() {
    const copyButtons = document.querySelectorAll('.copy-code, .copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const code = button.getAttribute('data-code');
            const success = await copyToClipboard(code);
            
            if (success) {
                // Visual feedback
                animateButtonSuccess(button);
                
                // Show success notification
                showNotification(`Code "${code}" copied to clipboard!`, 'success');
                
                // Analytics tracking (placeholder for future implementation)
                trackCodeCopy(code);
                
                // Accessibility announcement
                if (window.announceToScreenReader) {
                    window.announceToScreenReader(`Code ${code} copied to clipboard`);
                }
            } else {
                showNotification('Failed to copy code. Please try selecting and copying manually.', 'error');
            }
        });
    });
}

// Enhanced clipboard functionality
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers or non-HTTPS
            return fallbackCopyTextToClipboard(text);
        }
    } catch (err) {
        console.error('Failed to copy: ', err);
        return fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    let successful = false;
    try {
        successful = document.execCommand('copy');
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
    return successful;
}

// Button animation for successful copy
function animateButtonSuccess(button) {
    const originalText = button.textContent;
    const originalBg = button.style.background;
    
    button.textContent = 'Copied!';
    button.style.background = '#30d158';
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = originalBg;
    }, 2000);
}

// Analytics placeholder (for future implementation)
function trackCodeCopy(code) {
    // This would integrate with analytics services
    console.log(`Code copied: ${code}`);
    
    // Example: Google Analytics event
    // gtag('event', 'code_copy', {
    //     'event_category': 'engagement',
    //     'event_label': code
    // });
}

// Scroll-triggered animations and effects
function initializeScrollEffects() {
    // Progressive loading for performance
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));
}

// Counter animation
function animateCounter(element) {
    const finalValue = element.textContent;
    const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(numericValue * easeOutCubic);
        
        // Format the number based on original format
        if (finalValue.includes('K')) {
            element.textContent = (currentValue / 1000).toFixed(1) + 'K+';
        } else if (finalValue.includes('M')) {
            element.textContent = (currentValue / 1000000).toFixed(1) + 'M';
        } else {
            element.textContent = currentValue.toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = finalValue;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Enhanced card interactions
function initializeAnimations() {
    // Card hover effects with 3D transforms
    const cards = document.querySelectorAll('.feature-card, .code-card, .tool-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) rotateX(5deg)';
            card.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });

    // Staggered animations for grids
    const grids = document.querySelectorAll('.features-grid, .codes-grid, .stats-grid, .tools-grid');
    
    grids.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// Dark mode toggle (optional feature)
function initializeDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--surface-elevated);
        backdrop-filter: blur(20px);
        border: 1px solid var(--border-light);
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        
        // Save preference
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Load saved preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log(`Page loaded in ${loadTime}ms`);
            
            // Track Core Web Vitals (placeholder for analytics)
            if ('PerformanceObserver' in window) {
                try {
                    const po = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            console.log(entry.name, entry.value);
                        }
                    });
                    po.observe({ entryTypes: ['measure', 'navigation'] });
                } catch (e) {
                    console.log('Performance Observer not supported');
                }
            }
        }
    });
}

// Initialize performance monitoring in production
if (window.location.hostname !== 'localhost') {
    initializePerformanceMonitoring();
}

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        copyToClipboard,
        isValidEmail,
        showNotification
    };
}