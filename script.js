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

// Blog data with full Bangla content
const blogData = {
    'UI Design Trends': {
        title: 'The Future of UI Design: Trends to Watch in 2025',
    titleBangla: 'UI ডিজাইনের ভবিষ্যৎ: ২০২৫ সালে যে ট্রেন্ডগুলো দেখার জন্য প্রস্তুত থাকুন',
    category: 'UI Design',
        content: `
            <h3>UI ডিজাইনের ভবিষ্যৎ: ২০২৫ সালে যে ট্রেন্ডগুলো দেখার জন্য প্রস্তুত থাকুন</h3>
            
            <p>UI ডিজাইনের জগত ক্রমাগত পরিবর্তনশীল এবং ২০২৫ সালে আমরা কিছু অসাধারণ পরিবর্তন দেখতে যাচ্ছি। প্রযুক্তির উন্নতির সাথে সাথে ব্যবহারকারীদের প্রত্যাশাও বাড়ছে।</p>
            
            <h4>১. ইমার্সিভ 3D ইন্টারফেস</h4>
            <p>থ্রিডি ডিজাইন এখন আর শুধু গেমিং এর মধ্যে সীমাবদ্ধ নেই। ওয়েবসাইট এবং অ্যাপ্লিকেশনগুলোতে 3D এলিমেন্ট ব্যবহার করে আরো ইন্টারেক্টিভ এবং আকর্ষণীয় ইউজার এক্সপেরিয়েন্স তৈরি করা হচ্ছে। WebGL এবং Three.js এর মতো টেকনোলজি এই ট্রান্সফরমেশনকে সম্ভব করে তুলছে।</p>
            
            <h4>২. AI-পাওয়ারড পার্সোনালাইজেশন</h4>
            <p>আর্টিফিশিয়াল ইন্টেলিজেন্স ব্যবহার করে প্রতিটি ইউজারের জন্য কাস্টমাইজড ইন্টারফেস তৈরি করা হচ্ছে। AI ইউজারের আচরণ বিশ্লেষণ করে এবং তাদের পছন্দ অনুযায়ী কন্টেন্ট ও ডিজাইন পরিবর্তন করে।</p>
            
            <h4>৩. মাইক্রো-ইন্টারঅ্যাকশন</h4>
            <p>ছোট ছোট অ্যানিমেশন এবং ট্রানজিশন যা ইউজারের অ্যাকশনের ফিডব্যাক দেয়। এগুলো UI কে আরো লাইভলি এবং রেসপন্সিভ মনে হতে সাহায্য করে।</p>
            
            <h4>৪. ডার্ক মোড অপটিমাইজেশন</h4>
            <p>ডার্ক মোড শুধু একটি অপশন নয়, এটি এখন একটি স্ট্যান্ডার্ড হয়ে উঠছে। ২০২৫ সালে আমরা আরো পরিশীলিত ডার্ক মোড ডিজাইন দেখব যা চোখের জন্য আরামদায়ক এবং ব্যাটারি সাশ্রয়ী।</p>
            
            <h4>৫. ভয়েস ইউজার ইন্টারফেস (VUI)</h4>
            <p>ভয়েস কমান্ড এবং ভয়েস নেভিগেশন ক্রমশ জনপ্রিয় হচ্ছে। ডিজাইনারদের এখন ভিজ্যুয়াল এবং ভয়েস দুটোর জন্যই ডিজাইন করতে হচ্ছে।</p>
            
            <h4>উপসংহার</h4>
            <p>২০২৫ সালে UI ডিজাইনের ভবিষ্যৎ অত্যন্ত উজ্জ্বল। প্রযুক্তি এবং সৃজনশীলতার মিশ্রণে আমরা এমন ইন্টারফেস দেখব যা শুধু সুন্দর নয়, বরং অত্যন্ত কার্যকর এবং ইউজার-ফ্রেন্ডলি।</p>
        `
    },
    '3D Web Design': {
        title: 'Creating Immersive 3D Experiences on the Web',
    titleBangla: 'ওয়েবে ইমার্সিভ 3D এক্সপেরিয়েন্স তৈরি করা',
    category: '3D Design',
        content: `
            <h3>ওয়েবে ইমার্সিভ 3D এক্সপেরিয়েন্স তৈরি করা</h3>
            
            <p>Three.js এবং WebGL ব্যবহার করে ওয়েবে 3D অভিজ্ঞতা তৈরি করা এখন আগের চেয়ে সহজ এবং শক্তিশালী। এই আর্টিকেলে আমরা জানব কীভাবে আকর্ষণীয় 3D ওয়েব এক্সপেরিয়েন্স ডিজাইন করা যায়।</p>
            
            <h4>Three.js কী?</h4>
            <p>Three.js হলো একটি জাভাস্ক্রিপ্ট লাইব্রেরি যা WebGL ব্যবহার করে ব্রাউজারে 3D গ্রাফিক্স রেন্ডার করতে সাহায্য করে। এটি জটিল WebGL কোড লেখার পরিবর্তে সহজ API প্রদান করে।</p>
            
            <h4>3D ওয়েব ডিজাইনের মূল উপাদান</h4>
            <ul>
                <li><strong>Scene (দৃশ্য):</strong> সমস্ত 3D অবজেক্ট যেখানে রাখা হয়</li>
                <li><strong>Camera (ক্যামেরা):</strong> দৃশ্যকে কোন দৃষ্টিকোণ থেকে দেখা হবে</li>
                <li><strong>Renderer (রেন্ডারার):</strong> দৃশ্যকে স্ক্রিনে আঁকে</li>
                <li><strong>Objects (অবজেক্ট):</strong> জ্যামিতিক আকৃতি এবং মডেল</li>
                <li><strong>Lighting (আলো):</strong> দৃশ্যকে আলোকিত করে</li>
            </ul>
            
            <h4>পারফরম্যান্স অপটিমাইজেশন</h4>
            <p>3D ওয়েব অ্যাপ্লিকেশন তৈরি করার সময় পারফরম্যান্স অত্যন্ত গুরুত্বপূর্ণ। কিছু টিপস:</p>
            <ul>
                <li>পলিগন কাউন্ট কম রাখুন</li>
                <li>টেক্সচার সাইজ অপটিমাইজ করুন</li>
                <li>LOD (Level of Detail) ব্যবহার করুন</li>
                <li>ফ্রাস্টাম কালিং প্রয়োগ করুন</li>
            </ul>
            
            <h4>ব্যবহারিক প্রয়োগ</h4>
            <p>3D ওয়েব ডিজাইন বিভিন্ন ক্ষেত্রে ব্যবহার করা হয়:</p>
            <ul>
                <li>পোর্টফোলিও ওয়েবসাইট</li>
                <li>প্রোডাক্ট ভিজ্যুয়ালাইজেশন</li>
                <li>ভার্চুয়াল শোরুম</li>
                <li>ইন্টারঅ্যাক্টিভ প্রেজেন্টেশন</li>
                <li>গেমিং এক্সপেরিয়েন্স</li>
            </ul>
            
            <h4>শেষ কথা</h4>
            <p>3D ওয়েব ডিজাইন শেখা একটি উত্তেজনাপূর্ণ যাত্রা। ধৈর্য এবং অনুশীলনের মাধ্যমে আপনি অসাধারণ ইমার্সিভ অভিজ্ঞতা তৈরি করতে পারবেন।</p>
        `
    },
    'UX Research': {
        title: 'User Research in the Digital Age',
    titleBangla: 'ডিজিটাল যুগে ইউজার রিসার্চ',
    category: 'UX Research',
        content: `
            <h3>ডিজিটাল যুগে ইউজার রিসার্চ</h3>
            
            <p>ইউজার রিসার্চ হলো UX ডিজাইনের ভিত্তি। ব্যবহারকারীদের বুঝে তাদের জন্য সঠিক সমাধান তৈরি করাই একজন ডিজাইনারের প্রধান কাজ।</p>
            
            <h4>ইউজার রিসার্চ কেন গুরুত্বপূর্ণ?</h4>
            <p>ইউজার রিসার্চ ছাড়া ডিজাইন করা মানে অন্ধকারে তীর ছোড়ার মতো। রিসার্চ আমাদের সাহায্য করে:</p>
            <ul>
                <li>ইউজারদের প্রকৃত সমস্যা বুঝতে</li>
                <li>তাদের আচরণ এবং প্রত্যাশা জানতে</li>
                <li>ডাটা-ড্রিভেন ডিসিশন নিতে</li>
                <li>ডিজাইন ভ্যালিডেট করতে</li>
            </ul>
            
            <h4>রিসার্চ মেথড</h4>
            
            <h5>১. কোয়ালিটেটিভ রিসার্চ</h5>
            <ul>
                <li><strong>ইউজার ইন্টারভিউ:</strong> সরাসরি কথোপকথনের মাধ্যমে গভীর ইনসাইট পাওয়া</li>
                <li><strong>ফোকাস গ্রুপ:</strong> একসাথে একাধিক ইউজারের মতামত নেওয়া</li>
                <li><strong>ইউজেবিলিটি টেস্টিং:</strong> প্রোডাক্ট ব্যবহারের সময় সমস্যা চিহ্নিত করা</li>
            </ul>
            
            <h5>২. কোয়ান্টিটেটিভ রিসার্চ</h5>
            <ul>
                <li><strong>সার্ভে:</strong> বড় সংখ্যক ইউজার থেকে ডাটা সংগ্রহ</li>
                <li><strong>অ্যানালিটিক্স:</strong> ওয়েবসাইট/অ্যাপ ব্যবহারের ডাটা বিশ্লেষণ</li>
                <li><strong>A/B টেস্টিং:</strong> দুটি ভার্সনের তুলনা করা</li>
            </ul>
            
            <h4>রিসার্চ প্রসেস</h4>
            <ol>
                <li><strong>গোল সেট করা:</strong> কী জানতে চান তা স্পষ্ট করা</li>
                <li><strong>পার্টিসিপ্যান্ট নির্বাচন:</strong> সঠিক টার্গেট অডিয়েন্স খুঁজে বের করা</li>
                <li><strong>ডাটা সংগ্রহ:</strong> বিভিন্ন মেথড ব্যবহার করে তথ্য সংগ্রহ</li>
                <li><strong>বিশ্লেষণ:</strong> ডাটা থেকে প্যাটার্ন এবং ইনসাইট খুঁজে বের করা</li>
                <li><strong>ইমপ্লিমেন্টেশন:</strong> ফাইন্ডিংস ডিজাইনে প্রয়োগ করা</li>
            </ol>
            
            <h4>টুলস এবং টেকনিক</h4>
            <p>আধুনিক রিসার্চের জন্য বিভিন্ন টুলস পাওয়া যায়:</p>
            <ul>
                <li>UserTesting, Hotjar - ইউজেবিলিটি টেস্টিং</li>
                <li>Google Analytics, Mixpanel - অ্যানালিটিক্স</li>
                <li>SurveyMonkey, Typeform - সার্ভে</li>
                <li>Optimal Workshop - ইনফরমেশন আর্কিটেকচার</li>
            </ul>
            
            <h4>উপসংহার</h4>
            <p>ইউজার রিসার্চ একটি চলমান প্রক্রিয়া। নিয়মিত রিসার্চ করে এবং ইউজারদের কাছ থেকে ফিডব্যাক নিয়ে আমরা আরো ভাল প্রোডাক্ট তৈরি করতে পারি।</p>
        `
    },
    'Design Systems': {
        title: 'Building Scalable Design Systems',
    titleBangla: 'স্কেলেবল ডিজাইন সিস্টেম তৈরি করা',
    category: 'Design Systems',
        content: `
            <h3>স্কেলেবল ডিজাইন সিস্টেম তৈরি করা</h3>
            
            <p>ডিজাইন সিস্টেম হলো একটি সম্পূর্ণ প্যাকেজ যেখানে রিইউজেবল কম্পোনেন্ট, স্ট্যান্ডার্ড, এবং গাইডলাইন থাকে যা প্রোডাক্ট ডিজাইনকে সুসংগত এবং দক্ষ করে তোলে।</p>
            
            <h4>ডিজাইন সিস্টেম কেন প্রয়োজন?</h4>
            <ul>
                <li><strong>কনসিস্টেন্সি:</strong> সমস্ত প্ল্যাটফর্মে একই ভিজ্যুয়াল ল্যাঙ্গুয়েজ</li>
                <li><strong>দক্ষতা:</strong> দ্রুত ডিজাইন এবং ডেভেলপমেন্ট</li>
                <li><strong>স্কেলেবিলিটি:</strong> প্রোডাক্ট বাড়লেও সিস্টেম কাজ করে</li>
                <li><strong>কোলাবোরেশন:</strong> ডিজাইনার এবং ডেভেলপারদের মধ্যে ভাল যোগাযোগ</li>
            </ul>
            
            <h4>ডিজাইন সিস্টেমের মূল উপাদান</h4>
            
            <h5>১. ডিজাইন টোকেন</h5>
            <p>কালার, টাইপোগ্রাফি, স্পেসিং ইত্যাদির ভ্যারিয়েবল যা পুরো সিস্টেমে ব্যবহৃত হয়।</p>
            <pre>
// উদাহরণ
colors: {
  primary: '#667eea',
  secondary: '#764ba2',
  text: '#2c1810'
}
            </pre>
            
            <h5>২. কম্পোনেন্ট লাইব্রেরি</h5>
            <p>বাটন, ইনপুট ফিল্ড, কার্ড ইত্যাদি রিইউজেবল UI এলিমেন্ট।</p>
            
            <h5>৩. প্যাটার্ন এবং টেমপ্লেট</h5>
            <p>কমন ইউজ কেসের জন্য প্রি-ডিজাইন করা সমাধান।</p>
            
            <h5>৪. ডকুমেন্টেশন</h5>
            <p>কীভাবে কম্পোনেন্ট ব্যবহার করতে হয় তার বিস্তারিত নির্দেশিকা।</p>
            
            <h4>ডিজাইন সিস্টেম তৈরির ধাপ</h4>
            
            <h5>ধাপ ১: অডিট এবং ইনভেন্টরি</h5>
            <p>বর্তমান প্রোডাক্টে কী কী UI এলিমেন্ট ব্যবহৃত হচ্ছে তা চিহ্নিত করুন।</p>
            
            <h5>ধাপ ২: ভিজ্যুয়াল ল্যাঙ্গুয়েজ ডিফাইন করা</h5>
            <p>কালার প্যালেট, টাইপোগ্রাফি, আইকন স্টাইল ইত্যাদি নির্ধারণ করুন।</p>
            
            <h5>ধাপ ৩: কম্পোনেন্ট তৈরি</h5>
            <p>মৌলিক কম্পোনেন্ট থেকে শুরু করে ধীরে ধীরে জটিল কম্পোনেন্ট তৈরি করুন।</p>
            
            <h5>ধাপ ৪: ডকুমেন্টেশন</h5>
            <p>প্রতিটি কম্পোনেন্টের ব্যবহার এবং ভ্যারিয়েশন ডকুমেন্ট করুন।</p>
            
            <h5>ধাপ ৫: ইমপ্লিমেন্টেশন</h5>
            <p>ডিজাইন টিম এবং ডেভেলপমেন্ট টিমে সিস্টেম রোল আউট করুন।</p>
            
            <h5>ধাপ ৬: মেইনটেনেন্স</h5>
            <p>নিয়মিত আপডেট এবং উন্নতি করুন।</p>
            
            <h4>জনপ্রিয় ডিজাইন সিস্টেম</h4>
            <ul>
                <li><strong>Material Design</strong> - Google</li>
                <li><strong>Human Interface Guidelines</strong> - Apple</li>
                <li><strong>Fluent Design</strong> - Microsoft</li>
                <li><strong>Carbon</strong> - IBM</li>
                <li><strong>Ant Design</strong> - Alibaba</li>
            </ul>
            
            <h4>টুলস</h4>
            <ul>
                <li><strong>Figma</strong> - ডিজাইন এবং প্রোটোটাইপিং</li>
                <li><strong>Storybook</strong> - কম্পোনেন্ট ডকুমেন্টেশন</li>
                <li><strong>Zeroheight</strong> - ডিজাইন সিস্টেম ডকুমেন্টেশন</li>
            </ul>
            
            <h4>সফলতার টিপস</h4>
            <ul>
                <li>ছোট থেকে শুরু করুন, ধীরে ধীরে বাড়ান</li>
                <li>স্টেকহোল্ডারদের সাথে কোলাবরেট করুন</li>
                <li>ফ্লেক্সিবল থাকুন, রিজিড নয়</li>
                <li>নিয়মিত ফিডব্যাক নিন</li>
                <li>ডকুমেন্টেশনকে প্রায়োরিটি দিন</li>
            </ul>
            
            <h4>উপসংহার</h4>
            <p>একটি ভাল ডিজাইন সিস্টেম প্রোডাক্ট ডেভেলপমেন্টকে অনেক দ্রুত এবং সুসংগত করে তোলে। এটি একটি দীর্ঘমেয়াদী বিনিয়োগ যা টিমের প্রোডাক্টিভিটি এবং প্রোডাক্ট কোয়ালিটি উভয়ই বৃদ্ধি করে।</p>
        `
    },
    'Mobile UX': {
        title: 'Mobile-First Design Strategies',
    titleBangla: 'মোবাইল-ফার্স্ট ডিজাইন স্ট্র্যাটেজি',
    category: 'Mobile UX',
        content: `
            <h3>মোবাইল-ফার্স্ট ডিজাইন স্ট্র্যাটেজি</h3>
            
            <p>মোবাইল-ফার্স্ট ডিজাইন মানে প্রথমে মোবাইল ডিভাইসের জন্য ডিজাইন করা এবং তারপর বড় স্ক্রিনের জন্য সেটি বিস্তৃত করা। এটি আধুনিক ওয়েব ডিজাইনের একটি মৌলিক নীতি।</p>
            
            <h4>মোবাইল-ফার্স্ট কেন?</h4>
            <ul>
                <li>বিশ্বব্যাপী ৫০%+ ট্রাফিক মোবাইল থেকে আসে</li>
                <li>সীমিত স্ক্রিন স্পেস বেটার ডিজাইন ডিসিশন নিতে বাধ্য করে</li>
                <li>পারফরম্যান্স এবং স্পিড উন্নত হয়</li>
                <li>SEO-তে ভাল র‍্যাংক পাওয়া যায়</li>
            </ul>
            
            <h4>মূল নীতিমালা</h4>
            
            <h5>১. কন্টেন্ট প্রায়োরিটাইজেশন</h5>
            <p>মোবাইলে স্থান সীমিত, তাই সবচেয়ে গুরুত্বপূর্ণ কন্টেন্ট প্রথমে রাখুন।</p>
            
            <h5>২. টাচ-ফ্রেন্ডলি ডিজাইন</h5>
            <ul>
                <li>বাটন সাইজ কমপক্ষে ৪৪×৪৪ পিক্সেল</li>
                <li>পর্যাপ্ত স্পেসিং</li>
                <li>সহজ নেভিগেশন</li>
            </ul>
            
            <h5>৩. সিম্পলিসিটি</h5>
            <p>অপ্রয়োজনীয় এলিমেন্ট বাদ দিন। সহজ এবং ক্লিন ইন্টারফেস তৈরি করুন।</p>
            
            <h5>৪. পারফরম্যান্স</h5>
            <ul>
                <li>ইমেজ অপটিমাইজেশন</li>
                <li>কম CSS এবং JavaScript</li>
                <li>লেজি লোডিং</li>
                <li>ক্যাশিং</li>
            </ul>
            
            <h4>রেসপন্সিভ ডিজাইন প্যাটার্ন</h4>
            
            <h5>১. মোস্টলি ফ্লুইড</h5>
            <p>কলামগুলি ছোট স্ক্রিনে স্ট্যাক হয় এবং বড় স্ক্রিনে পাশাপাশি থাকে।</p>
            
            <h5>২. কলাম ড্রপ</h5>
            <p>যখন স্ক্রিন ছোট হয়, কলামগুলি নিচে নেমে আসে।</p>
            
            <h5>৩. লেআউট শিফটার</h5>
            <p>বিভিন্ন ব্রেকপয়েন্টে সম্পূর্ণ লেআউট পরিবর্তন হয়।</p>
            
            <h4>মোবাইল নেভিগেশন প্যাটার্ন</h4>
            <ul>
                <li><strong>হ্যামবার্গার মেনু:</strong> স্পেস সাশ্রয়ী কিন্তু ডিসকভারেবিলিটি কম</li>
                <li><strong>বটম নেভ বার:</strong> থাম্ব-ফ্রেন্ডলি এবং সহজে অ্যাক্সেসযোগ্য</li>
                <li><strong>ট্যাব বার:</strong> iOS স্ট্যান্ডার্ড, ভাল ইউজেবিলিটি</li>
                <li><strong>প্রায়োরিটি+:</strong> গুরুত্বপূর্ণ আইটেম সবসময় দৃশ্যমান</li>
            </ul>
            
            <h4>টাইপোগ্রাফি</h4>
            <ul>
                <li>মিনিমাম ১৬px ফন্ট সাইজ ব্যবহার করুন</li>
                <li>পর্যাপ্ত লাইন হাইট (১.৫ বা বেশি)</li>
                <li>রিডেবল ফন্ট সিলেক্ট করুন</li>
                <li>কন্ট্রাস্ট মেইনটেইন করুন</li>
            </ul>
            
            <h4>ফর্ম ডিজাইন</h4>
            <ul>
                <li>একটি কলামে ইনপুট রাখুন</li>
                <li>সঠিক ইনপুট টাইপ ব্যবহার করুন</li>
                <li>অটোফিল সাপোর্ট করুন</li>
                <li>ইনলাইন ভ্যালিডেশন দিন</li>
                <li>বড় এবং স্পষ্ট সাবমিট বাটন</li>
            </ul>
            
            <h4>টেস্টিং</h4>
            <p>বিভিন্ন ডিভাইসে টেস্ট করুন:</p>
            <ul>
                <li>বিভিন্ন স্ক্রিন সাইজ</li>
                <li>বিভিন্ন OS (iOS, Android)</li>
                <li>বিভিন্ন নেটওয়ার্ক স্পিড</li>
                <li>রিয়েল ডিভাইসে টেস্ট করুন, শুধু এমুলেটরে নয়</li>
            </ul>
            
            <h4>টুলস</h4>
            <ul>
                <li><strong>Chrome DevTools</strong> - মোবাইল ভিউ সিমুলেশন</li>
                <li><strong>BrowserStack</strong> - ক্রস-ব্রাউজার টেস্টিং</li>
                <li><strong>Google PageSpeed Insights</strong> - পারফরম্যান্স চেক</li>
            </ul>
            
            <h4>বেস্ট প্র্যাকটিস</h4>
            <ul>
                <li>থাম জোন মনে রাখুন - গুরুত্বপূর্ণ এলিমেন্ট নাগালের মধ্যে রাখুন</li>
                <li>অরিয়েন্টেশন (পোর্ট্রেট এবং ল্যান্ডস্কেপ) সাপোর্ট করুন</li>
                <li>অফলাইন ফাংশনালিটি বিবেচনা করুন</li>
                <li>ব্যাটারি এবং ডাটা ব্যবহার অপটিমাইজ করুন</li>
            </ul>
            
            <h4>উপসংহার</h4>
            <p>মোবাইল-ফার্স্ট ডিজাইন শুধু একটি ট্রেন্ড নয়, এটি এখন একটি প্রয়োজনীয়তা। সঠিক স্ট্র্যাটেজি এবং প্র্যাকটিস অনুসরণ করে আমরা এমন অভিজ্ঞতা তৈরি করতে পারি যা সব ডিভাইসে নির্বিঘ্নে কাজ করে।</p>
        `
    },
    'AI in Design': {
        title: 'AI Tools in the Designer\'s Toolkit',
    titleBangla: 'ডিজাইনার টুলকিটে AI টুলস',
    category: 'AI & Design',
        content: `
            <h3>ডিজাইনার টুলকিটে AI টুলস</h3>
            
            <p>আর্টিফিশিয়াল ইন্টেলিজেন্স (AI) ডিজাইন ইন্ডাস্ট্রিতে বিপ্লব ঘটাচ্ছে। AI টুলস ডিজাইনারদের আরো সৃজনশীল এবং দক্ষ হতে সাহায্য করছে।</p>
            
            <h4>AI ডিজাইনে কীভাবে পরিবর্তন আনছে</h4>
            
            <h5>১. অটোমেশন</h5>
            <p>পুনরাবৃত্তিমূলক কাজগুলো AI করে দিচ্ছে, ডিজাইনাররা ক্রিয়েটিভ কাজে ফোকাস করতে পারছেন।</p>
            
            <h5>২. পার্সোনালাইজেশন</h5>
            <p>AI প্রতিটি ইউজারের জন্য কাস্টমাইজড এক্সপেরিয়েন্স তৈরি করতে পারে।</p>
            
            <h5>৩. প্রেডিক্টিভ ডিজাইন</h5>
            <p>ইউজার বিহেভিয়ার প্রেডিক্ট করে সেই অনুযায়ী ডিজাইন সাজেস্ট করে।</p>
            
            <h4>জনপ্রিয় AI ডিজাইন টুলস</h4>
            
            <h5>১. Midjourney</h5>
            <p>টেক্সট থেকে অত্যাশ্চর্য ইমেজ জেনারেট করে। কনসেপ্ট আর্ট এবং ইন্সপিরেশনের জন্য দুর্দান্ত।</p>
            
            <h5>২. DALL-E</h5>
            <p>OpenAI এর ইমেজ জেনারেশন টুল। ইউনিক এবং ক্রিয়েটিভ ভিজ্যুয়াল তৈরি করতে পারে।</p>
            
            <h5>৩. Figma AI</h5>
            <p>Figma-তে AI ফিচার যা অটো-লেআউট, কম্পোনেন্ট সাজেশন ইত্যাদি করে।</p>
            
            <h5>৪. Adobe Firefly</h5>
            <p>Adobe এর AI টুল যা ইমেজ এডিটিং এবং জেনারেশনে সাহায্য করে।</p>
            
            <h5>৫. ChatGPT</h5>
            <p>কন্টেন্ট রাইটিং, কপি জেনারেশন, এবং আইডিয়া ব্রেইনস্টর্মিংয়ে অসাধারণ।</p>
            
            <h5>৬. Uizard</h5>
            <p>হ্যান্ড স্কেচ থেকে ডিজিটাল মকআপ তৈরি করে। দ্রুত প্রোটোটাইপিংয়ের জন্য দুর্দান্ত।</p>
            
            <h4>AI এর ব্যবহার ক্ষেত্র</h4>
            
            <h5>লোগো ডিজাইন</h5>
            <p>টুলস: Looka, Brandmark - মিনিটেই প্রফেশনাল লোগো তৈরি করে।</p>
            
            <h5>কালার প্যালেট</h5>
            <p>টুলস: Khroma - AI আপনার পছন্দ শিখে কাস্টম কালার স্কিম তৈরি করে।</p>
            
            <h5>টাইপোগ্রাফি</h5>
            <p>টুলস: Fontjoy - AI-পাওয়ারড ফন্ট পেয়ারিং।</p>
            
            <h5>ইমেজ এনহান্সমেন্ট</h5>
            <p>টুলস: Topaz Labs, Remini - কম রেজোলিউশনের ইমেজ উন্নত করে।</p>
            
            <h5>ব্যাকগ্রাউন্ড রিমুভাল</h5>
            <p>টুলস: Remove.bg - সেকেন্ডেই ব্যাকগ্রাউন্ড রিমুভ করে।</p>
            
            <h4>AI এর সুবিধা</h4>
            <ul>
                <li><strong>স্পিড:</strong> দ্রুত আউটপুট জেনারেশন</li>
                <li><strong>ভ্যারাইটি:</strong> অসংখ্য ভার্সন তৈরি করে</li>
                <li><strong>ইন্সপিরেশন:</strong> নতুন আইডিয়া পেতে সাহায্য করে</li>
                <li><strong>অ্যাক্সেসিবিলিটি:</strong> নন-ডিজাইনাররাও ডিজাইন করতে পারে</li>
                <li><strong>কস্ট-ইফেক্টিভ:</strong> রিসোর্স বাঁচায়</li>
            </ul>
            
            <h4>AI এর সীমাবদ্ধতা</h4>
            <ul>
                <li>ক্রিয়েটিভিটি এবং ইমোশনাল কানেকশন সীমিত</li>
                <li>কনটেক্সট এবং নুয়ান্স বুঝতে পারে না সবসময়</li>
                <li>ইউনিক ব্র্যান্ড আইডেন্টিটি তৈরি করা কঠিন</li>
                <li>ইথিক্যাল কনসার্ন - কপিরাইট, ওরিজিনালিটি</li>
            </ul>
            
            <h4>AI এবং ডিজাইনারের ভবিষ্যৎ</h4>
            <p>AI ডিজাইনারদের রিপ্লেস করবে না, বরং তাদের সহায়ক হিসেবে কাজ করবে। ডিজাইনাররা যারা AI টুলস শিখবে এবং ব্যবহার করবে, তারাই ভবিষ্যতে এগিয়ে থাকবে।</p>
            
            <h4>শুরু করার টিপস</h4>
            <ol>
                <li><strong>এক্সপেরিমেন্ট করুন:</strong> বিভিন্ন টুলস ট্রাই করুন</li>
                <li><strong>প্রম্পট রাইটিং শিখুন:</strong> ভাল প্রম্পট = ভাল রেজাল্ট</li>
                <li><strong>ক্রিটিকাল থিংকিং:</strong> AI রেজাল্ট ব্লাইন্ডলি ফলো করবেন না</li>
                <li><strong>ইটারেট করুন:</strong> প্রথম রেজাল্টই ফাইনাল নয়</li>
                <li><strong>হিউম্যান টাচ যোগ করুন:</strong> AI আউটপুট কাস্টমাইজ এবং রিফাইন করুন</li>
            </ol>
            
            <h4>ইথিক্যাল কনসিডারেশন</h4>
            <ul>
                <li>AI দিয়ে কপিরাইটেড কন্টেন্ট কপি করবেন না</li>
                <li>AI এর ব্যবহার ট্রান্সপারেন্ট রাখুন</li>
                <li>ইউজার ডাটা প্রাইভেসি মেইনটেইন করুন</li>
                <li>বায়াস এবং ডিসক্রিমিনেশন এড়িয়ে চলুন</li>
            </ul>
            
            <h4>শেষ কথা</h4>
            <p>AI টুলস ডিজাইনের ল্যান্ডস্কেপ পরিবর্তন করছে। এগুলোকে সঠিকভাবে ব্যবহার করে আমরা আরো ভাল, দ্রুত, এবং ইনোভেটিভ ডিজাইন তৈরি করতে পারি। মনে রাখবেন, AI হলো একটি টুল - আসল ক্রিয়েটিভিটি আসে ডিজাইনারের ভিশন এবং এক্সপার্টিজ থেকে।</p>
        `
    }
};

// Project data
const projectData = {
    'TenMinuteSchool': {
        title: 'Ten Minute School',
        description: '10 Minute School (Bengali: ১০ মিনিট স্কুল, abbreviated as 10MS) is an online educational platform in Bangladesh created in 2015 by Ayman Sadiq.',
        technologies: ['Figma', 'Principle', 'After Effects'],
        figmaLink: 'https://www.figma.com/file/YourFigmaFileLink', // optional Figma link
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
        figmaLink: 'https://www.figma.com/file/YourFigmaFileLink', // optional Figma link
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
        figmaLink: 'https://www.figma.com/file/YourFigmaFileLink', // optional Figma link
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
        figmaLink: 'https://www.figma.com/file/YourFigmaFileLink', // optional Figma link
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
        figmaLink: 'https://www.figma.com/file/YourFigmaFileLink', // optional Figma link
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
        figmaLink: 'https://www.figma.com/file/YourFigmaFileLink', // optional Figma link
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
        figmaLink: 'https://www.figma.com/file/YourFigmaFileLink', // optional Figma link
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
        figmaLink: 'https://www.figma.com/file/YourFigmaFileLink', // optional Figma link
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
        figmaLink: 'https://www.figma.com/file/YourFigmaFileLink', // optional Figma link
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
        figmaLink: 'https://www.figma.com/file/YourFigmaFileLink', // optional Figma link
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
            const headingText = blogPost ? blogPost.querySelector('h3').textContent.trim() : 'Blog Post';
            const datasetKey = blogPost ? blogPost.dataset.blog : null;
            let blogContent = datasetKey ? blogData[datasetKey] : null;

            if (!blogContent && blogPost) {
                for (const key in blogData) {
                    const entry = blogData[key];
                    if (entry.title === headingText || entry.titleBangla === headingText || key === headingText) {
                        blogContent = entry;
                        break;
                    }
                }
            }

            // Fallback content if blog not found
            const content = blogContent ? blogContent.content : `
                <h3>${headingText}</h3>
                <p>এই ব্লগ পোস্টের বিস্তারিত কন্টেন্ট শীঘ্রই যুক্ত করা হবে।</p>
                <p>আমরা নিয়মিত নতুন কন্টেন্ট যুক্ত করছি। অনুগ্রহ করে পরে আবার চেক করুন।</p>
            `;

            // Create a blog modal with Bangla content
            const blogModal = document.createElement('div');
            blogModal.className = 'modal';
            blogModal.style.display = 'block';
            blogModal.innerHTML = `
                <div class="modal-content blog-modal-content">
                    <span class="close">&times;</span>
                    <div class="blog-full-content">
                        ${content}
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
    
    /* Blog modal styles */
    .blog-modal-content {
        max-width: 800px;
        max-height: 85vh;
        overflow-y: auto;
    }
    
    .blog-full-content {
        padding: 1rem 0;
        line-height: 1.8;
        color: #2c1810;
    }
    
    .blog-full-content h3 {
        color: #2c1810;
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        font-weight: 700;
    }
    
    .blog-full-content h4 {
        color: #4c3221;
        font-size: 1.4rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-weight: 600;
    }
    
    .blog-full-content h5 {
        color: #654321;
        font-size: 1.2rem;
        margin-top: 1.5rem;
        margin-bottom: 0.8rem;
        font-weight: 600;
    }
    
    .blog-full-content p {
        margin-bottom: 1.2rem;
        text-align: justify;
    }
    
    .blog-full-content ul,
    .blog-full-content ol {
        margin-bottom: 1.2rem;
        padding-left: 2rem;
    }
    
    .blog-full-content li {
        margin-bottom: 0.5rem;
    }
    
    .blog-full-content pre {
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 8px;
        overflow-x: auto;
        margin: 1rem 0;
        border-left: 4px solid #8b4513;
    }
    
    .blog-full-content strong {
        color: #8b4513;
        font-weight: 600;
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
        .blog-modal-content {
            max-width: 95%;
            max-height: 90vh;
        }
        .blog-full-content h3 {
            font-size: 1.5rem;
        }
        .blog-full-content h4 {
            font-size: 1.2rem;
        }
        .blog-full-content h5 {
            font-size: 1.1rem;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

