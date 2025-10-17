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
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
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
                        <p>This would be the full blog post content. In a real application, this would load the complete article with detailed information about ${title.toLowerCase()}.</p>
                        <p>The post would include comprehensive insights, examples, and practical tips related to UI/UX design and modern web development practices.</p>
                        <p>Topics covered might include design principles, user experience research, accessibility guidelines, and the latest trends in digital design.</p>
                        <p>Thank you for your interest in reading more about our design insights and perspectives on creating better user experiences.</p>
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
        gap: 0.5rem;
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
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

