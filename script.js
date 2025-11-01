// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const viewProjectBtns = document.querySelectorAll('.view-project');
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        // Validate the selector before using it
        if (href && href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Portfolio filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Project data
const projectData = {
    'TenMinuteSchool': {
        title: 'Ten Minute School',
        description: '10 Minute School (Bengali: ১০ মিনিট স্কুল, abbreviated as 10MS) is an online educational platform in Bangladesh created in 2015 by Ayman Sadiq.',
        technologies: ['Figma', 'Principle', 'After Effects'],
        figmaLink: 'https://www.figma.com/design/Vs8sPD8PTnx3iS8bkra53Q/Ten-minute-School?node-id=0-1&p=f&t=ezzTitGox5hSRHs2-0', // optional Figma link
        features: [
            'Live Classes',
            'Recorded Courses',
            'Skill Development Programs',
            'Admission Test Preparation',
            'Job Preparation Courses',
            'Interactive Quizzes & Assignments',
            'Expert Teachers & Mentors',
            'Progress Tracking',
            'Certification',
            'Mobile App Learning'
        ],
        images: [ // instead of single image
            'project-images/ten-minute-school/3.png',
            'project-images/ten-minute-school/4.png',
            'project-images/ten-minute-school/5.png',
           
        ]
    },

    'bkash': {
        title: 'Analytics Dashboard',
        description: 'A data visualization dashboard that transforms complex analytics into actionable insights. Focus on clean information architecture and intuitive data presentation.',
        technologies: ['Figma', 'Prototype', 'Wireframe'],
        figmaLink: 'https://www.figma.com/design/V7oclJOUP4Cgf2CLfMZk92/bKash?node-id=0-1&p=f&t=wSOMny5sDi67Co7Q-0', // optional Figma link
        features: ['Money Transfer', 'Pay Bill', 'Mobile Banking', 'Mobile Reacharge'],
        images: [
            'project-images/bkash/2.png',
            'project-images/bkash/3.png',
            'project-images/bkash/1.png',
        
        ]
    },
    'pathao': {
        title: 'Ride sahre platform pathao',
        description: 'Complete e-commerce experience design focusing on conversion optimization and user engagement. Streamlined checkout process and intuitive product discovery.',
        technologies: ['Adobe XD', 'Figma', 'Hotjar'],
        figmaLink: 'https://www.figma.com/design/nK0aWc3pLlXYFQnkba0QtV/Pathao?node-id=0-1&p=f&t=iqtC211bI5ZwRu1I-0', // optional Figma link
        features: ['Ride-sharing (Bike, Car, CNG)',
            'Food Delivery',
            'Courier / Parcel Delivery',
            'Pathao Mart (Grocery & Essentials)',
            'Digital Payment (Pathao Pay)',
            'Safety & SOS Support'],
        images: [
            'project-images/pathao/2.png',
            'project-images/pathao/3.png',
            'project-images/pathao/4.png',
        
        ]
    },
    'imo': {
        title: 'imo',
        description: 'Engaging social platform design with focus on community building and content sharing. Implemented modern interaction patterns and accessibility features.',
        technologies: ['Figma', 'Framer', 'Lottie'],
        figmaLink: 'https://www.figma.com/design/I5piToaNhofNPTWidBTE86/Imo?node-id=3315-2&p=f&t=9WtlCyJrKsPVs5x9-0', // optional Figma link
        features: ['High-quality Video & Voice Calls',
           'Instant Messaging (Text, Photo, Video)',
           'Group Chat & Group Video Call',
           'Cross-platform Support (Android, iOS, Windows)',
           'Story/Status Sharing',
           'Stickers & Emojis',
           'File Sharing (Photos, Videos, Documents)',
           'Low Data Consumption']
,
        images: [
            'project-images/imo/5.png',
            'project-images/imo/3.png',
            'project-images/imo/6.png',
        
        ]
    },
    'amazon': {
        title: 'amazon',
        description: 'Amazon হলো বিশ্বের সবচেয়ে বড় e-commerce এবং technology company। এটি 1994 সালে Jeff Bezos প্রতিষ্ঠা করেন। শুরুতে শুধু অনলাইনে বই বিক্রি করলেও এখন Amazon হয়ে উঠেছে একটি global marketplace যেখানে প্রায় সবকিছুই কেনা যায়।.',
        technologies: ['Sketch', 'Principle', 'Zeplin'],
        figmaLink: 'https://www.figma.com/design/5ABNwVIbJgmWkDuXRYTG4j/amazon?node-id=0-1&p=f&t=QYKUcDRdOzcDukar-0', // optional Figma link
        features: ['Online Shopping',
           'Product Categories',
           'Fast Delivery',
           'Amazon Prime',
           'Customer Reviews',
           'Secure Payment',
           'Recommendations',
           'Easy Returns',
           'Global Shipping',
           'Seller Marketplace']
,
        images: [
            'project-images/amazon/1.png',
            'project-images/amazon/3.png',
            'project-images/amazon/2.png',
        
        ]
    },
    'bodyFitness': {
        title: 'body fitness',
        description: 'A Body Fitness App হলো এমন একটি mobile application যা ব্যবহারকারীদের স্বাস্থ্য ও ফিটনেস উন্নত করতে সাহায্য করে। সাধারণত এতে exercise plans, diet suggestions, progress tracking ইত্যাদি থাকে।',
        technologies: ['Figma', 'Abstract', 'Maze'],
        figmaLink: 'https://www.figma.com/design/NIHnM2HLRtCFCEhH30eaKZ/AI--Fitsnap?node-id=0-1&p=f&t=gbCuZrBF5i7RcvxF-0', // optional Figma link
       features: ['Workout Plans',
           'Diet & Nutrition',
           'Progress Tracking',
           'AI Personalization',
           'Reminders & Motivation']
,
        images: [
            'project-images/body-fitness/1.png',
            'project-images/body-fitness/3.png',
            'project-images/body-fitness/2.png',
        
        ]
    },
    'sobjibazar': {
        title: 'sobji bazar',
        description: 'Sobji Bazar মানে হলো অনলাইনে বা অফলাইনে সবজি কেনাবেচার বাজার। বর্তমানে অনেক e-commerce বা mobile app আছে যেগুলো তাজা শাকসবজি, ফল, মসলা ইত্যাদি বাসায় ডেলিভারি দেয়।',
        technologies: ['WordPress', 'SCSS', 'JavaScript'],
        figmaLink: 'https://www.figma.com/design/fScHWdb8DITGvWrfBo6gJG/SOBJI-BAZAR?t=gbCuZrBF5i7RcvxF-0', // optional Figma link
      features: ['Fresh Vegetables & Fruits',
           'Home Delivery Service',
           'Order Tracking',
           'Secure Digital Payment',
           'Discounts & Offers',
           'Subscription & Pre-Order Options']
,
     images: [
            'project-images/Sobji-bazar/4.png',
            'project-images/Sobji-bazar/3.png',
            'project-images/Sobji-bazar/2.png',
        
        ]
    },
    'youtube': {
        title: 'youtube',
        description: 'YouTube হলো বিশ্বের সবচেয়ে বড় video-sharing platform, যেটি 2005 সালে চালু হয় এবং বর্তমানে Google-এর মালিকানাধীন। এখানে ব্যবহারকারীরা ভিডিও upload, watch, share, like, comment এবং subscribe করতে পারে।',
        technologies: ['React', 'Three.js', 'GSAP'],
        figmaLink: 'https://www.figma.com/design/MjFzFT8HKDot2JVfiDalMx/youtube-clon?t=gbCuZrBF5i7RcvxF-0', // optional Figma link
       features: ['Video Upload & Sharing',
           'Personalized Recommendations',
           'Subscribe & Notifications',
           'Live Streaming',
           'Comments & Community',
           'Monetization for Creators',
           'YouTube Shorts',
           'Offline Download (YouTube Premium)'],
       images: [
            'project-images/youtube/1.png',
            'project-images/youtube/3.png',
            'project-images/youtube/2.png',
        
        ]
    },
    'tiktok': {
        title: 'tiktok',
        description: 'TikTok হলো একটি জনপ্রিয় short-video sharing social media app, যেখানে ব্যবহারকারীরা সাধারণত 15 সেকেন্ড থেকে 10 মিনিট পর্যন্ত ভিডিও তৈরি, এডিট ও শেয়ার করতে পারে। এটি মূলত entertainment, music, dance, comedy, lifestyle, এবং creative content এর জন্য ব্যবহৃত হয়।',
        technologies: ['React', 'Three.js', 'GSAP'],
        figmaLink: 'https://www.figma.com/design/Kk3RnvdzuB1J5lPF0jK3sx/TikTok?t=gbCuZrBF5i7RcvxF-0', // optional Figma link
      features: ['Short Video Creation & Sharing',
           'Filters, Music & Effects',
           'For You Page (Personalized Feed)',
           'Duet & Stitch Collaboration',
           'Live Streaming & Virtual Gifts',
           'Hashtags & Trends',
           'Creator Monetization',
           'In-app Editing Tools']
,
       images: [
            'project-images/tiktok/3.png',
            'project-images/tiktok/2.png',
            'project-images/tiktok/4.png',
        
        ]
    },
    'arbiLearning': {
        title: 'Arbi Learning',
        description: 'Arabic Learning (Arbi Learning) হলো এমন একটি language learning app/platform, যা ব্যবহারকারীদের আরবি ভাষা শেখার জন্য তৈরি। এটি সাধারণত reading, writing, speaking, listening, এবং Quranic Arabic শেখার সুবিধা দেয়।',
        technologies: ['React', 'Three.js', 'GSAP'],
        figmaLink: 'https://www.figma.com/design/dvKPQh7nldnismYWPFH27f/Arbi-Learning?node-id=0-1&p=f&t=rEJ4JKrIv1xbBOee-0', // optional Figma link
      features: ['Arabic Alphabet & Pronunciation',
           'Basic Grammar & Vocabulary',
           'Speaking & Listening Practice',
           'Quranic Arabic Lessons',
           'Interactive Quizzes & Flashcards',
           'Audio & Video Tutorials',
           'Progress Tracking']

,
       images: [
            'project-images/arbi-laerning/4.png',
            'project-images/arbi-laerning/3.png',
            'project-images/arbi-laerning/2.png',
        
        ]
    },



};

// Project modal functionality
viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.getAttribute('data-project');
        showProjectModal(projectId);
    });
});
function showProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // Handle multiple or single images
    let imageContent = '';
    if (project.images && project.images.length > 1) {
        imageContent = `
            <div class="slider">
                <div class="slides">
                    ${project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('')}
                </div>
            </div>
        `;
    } else {
        imageContent = `<img src="${project.image || project.images[0]}" alt="${project.title}" class="project-image">`;
    }

    modalBody.innerHTML = `
        <div class="project-detail">
            ${imageContent}
            <div class="project-info">
                <h2>${project.title}</h2>
                <p class="project-description">${project.description}</p>
                
                <div class="project-section">
                    <h3>Technologies Used</h3>
                    <div class="tech-tags">
                        <!-- Only show Figma as requested and provide an optional link button -->
                        <span class="tech-tag">Figma</span>
                        <a class="tech-tag" href="${project.figmaLink ? project.figmaLink : '#'}" target="_blank" rel="noopener noreferrer" aria-label="Open in Figma">
                            <i class="fab fa-figma" aria-hidden="true"></i>
                            <span>Open in Figma</span>
                        </a>
                    </div>
                </div>
                
                <div class="project-section">
                    <h3>Key Features</h3>
                    <ul class="feature-list">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Start auto-slide if multiple images
    if (project.images && project.images.length > 1) {
        const slides = modalBody.querySelector('.slides');
        let index = 0;
        setInterval(() => {
            index = (index + 1) % project.images.length;
            slides.style.transform = `translateX(-${index * 100}%)`;
        }, 3000);
    }
}

// Close modal
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Simulate form submission
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Intersection Observer for animations
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

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to portfolio items
    portfolioItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Add slide-in animations to other elements
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in');
        observer.observe(header);
    });

    document.querySelectorAll('.about-text').forEach(text => {
        text.classList.add('slide-in-left');
        observer.observe(text);
    });

    document.querySelectorAll('.contact-info').forEach(info => {
        info.classList.add('slide-in-left');
        observer.observe(info);
    });

    document.querySelectorAll('.contact-form').forEach(form => {
        form.classList.add('slide-in-right');
        observer.observe(form);
    });

    // Add blog read more functionality
    document.querySelectorAll('.read-more').forEach(readMoreBtn => {
        readMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const blogPost = readMoreBtn.closest('.blog-post');
            const title = blogPost.querySelector('h3').textContent;

            // Create a simple blog modal
            const blogModal = document.createElement('div');
            blogModal.className = 'modal';
            blogModal.style.display = 'block';
            blogModal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>${title}</h2>
                    <div class="blog-full-content">
                        <p>UI /UX ডিজাইন হলো এমন একটা প্রক্রিয়া যেখানে UI (User Interface) অ্যাপ বা ওয়েবসাইট কেমন দেখাবে সেটা ডিজাইন করে, ${title.toLowerCase()}.</p>
                        <p>আর UX (User Experience) নিশ্চিত করে যে ব্যবহারকারীর জন্য এটি কতটা সহজ ও সুবিধাজনকভাবে ব্যবহারযোগ্য। UI ডিজাইন.</p>
                        <p>এ যেগুলা উপাদান প্রয়োজন ১.Layout ২.Colors & Themes ৩.Typography ৪.Buttons & Icons ৫.Images & Graphics UX.</p>
                        <p>ডিজাইন এ যেগুলা উপাদান প্রয়োজন ১.User Research ২.Wireframes ৩.Prototypes ৪.Usability Testing</p>
                    </div>
                </div>
            `;

            document.body.appendChild(blogModal);
            document.body.style.overflow = 'hidden';

            // Close modal functionality
            const closeBtn = blogModal.querySelector('.close');
            const closeModal = () => {
                document.body.removeChild(blogModal);
                document.body.style.overflow = 'auto';
            };

            closeBtn.addEventListener('click', closeModal);
            blogModal.addEventListener('click', (e) => {
                if (e.target === blogModal) closeModal();
            });
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Add modal styles dynamically
const modalStyles = `
    .project-detail {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: start;
    }
    
    .project-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 8px;
        border: 2px solid rgba(139, 69, 19, 0.4);
        box-shadow: 0 4px 12px rgba(76, 50, 33, 0.3);
    }
    
    .project-info h2 {
        margin-bottom: 1rem;
        color: #2c1810;
        font-weight: 700;
        text-shadow: 0 1px 3px rgba(255, 255, 255, 0.4);
    }
    
    .project-description {
        margin-bottom: 2rem;
        line-height: 1.6;
        color: #4c3221;
        font-weight: 500;
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.2);
    }
    
    .project-section {
        margin-bottom: 2rem;
    }
    
    .project-section h3 {
        margin-bottom: 1rem;
        color: #2c1810;
        font-weight: 600;
        text-shadow: 0 1px 3px rgba(255, 255, 255, 0.3);
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
        width: 100%;
    }
    
    .tech-tag {
        background: linear-gradient(135deg, #8b4513 0%, #654321 100%);
        color: #f5e6d3;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        box-shadow: 0 2px 8px rgba(76, 50, 33, 0.3);
        flex: 0 0 auto;
        margin-right: 0.5rem;
    }

    /* Figma CTA button styles */
    .figma-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 8px 14px;
        background: linear-gradient(90deg, #FF7262 0%, #F24E79 100%);
        color: #fff;
        border-radius: 20px;
        font-size: 0.95rem;
        font-weight: 700;
        text-decoration: none;
        box-shadow: 0 8px 20px rgba(242, 78, 121, 0.18);
        transition: transform .12s ease, box-shadow .12s ease, opacity .12s ease;
        margin-left: auto; /* push to the right when space allows */
    }

    .figma-btn i {
        font-size: 1.05rem;
        line-height: 1;
    }

    .figma-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 30px rgba(242, 78, 121, 0.22);
        opacity: 0.98;
    }
    
    .feature-list {
        list-style: none;
        padding: 0;
    }
    
    .feature-list li {
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(139, 69, 19, 0.3);
        color: #4c3221;
        font-weight: 400;
    }
    
    .feature-list li:before {
        content: "✓";
        color: #8b4513;
        margin-right: 0.5rem;
        font-weight: bold;
    }
    
    @media (max-width: 768px) {
        .project-detail {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        .tech-tags {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        .figma-btn {
            width: 100%;
            justify-content: center;
            margin-left: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

