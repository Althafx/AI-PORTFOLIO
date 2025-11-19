// Seed data for initial portfolio setup
export const seedProfile = {
    name: 'Your Name',
    title: 'Full Stack Developer & AI Enthusiast',
    bio: 'Passionate developer with expertise in building modern web applications using the MERN stack. I love creating innovative solutions that combine cutting-edge technology with great user experience.',
    email: 'your.email@example.com',
    location: 'Your City, Country',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    website: 'https://yourwebsite.com'
};

export const seedProjects = [
    {
        title: 'AI Portfolio Website',
        description: 'A stunning portfolio website with AI-powered chatbot and admin panel',
        longDescription: 'Built a full-stack portfolio website featuring an animated CSS character that follows the mouse, integrated Gemini AI for answering visitor questions, and a comprehensive admin dashboard with analytics.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Gemini AI', 'JWT'],
        featured: true,
        order: 1
    },
    {
        title: 'E-Commerce Platform',
        description: 'Modern e-commerce solution with payment integration',
        longDescription: 'Developed a complete e-commerce platform with product management, shopping cart, payment processing, and order tracking.',
        technologies: ['React', 'Redux', 'Node.js', 'MongoDB', 'Stripe'],
        featured: true,
        order: 2
    },
    {
        title: 'Task Management App',
        description: 'Collaborative task management with real-time updates',
        longDescription: 'Created a task management application with real-time collaboration features, drag-and-drop interface, and team management.',
        technologies: ['React', 'Socket.io', 'Node.js', 'PostgreSQL'],
        order: 3
    }
];

export const seedSkills = [
    // Frontend
    { name: 'React', category: 'Frontend', proficiency: 90, order: 1 },
    { name: 'JavaScript', category: 'Frontend', proficiency: 95, order: 2 },
    { name: 'TypeScript', category: 'Frontend', proficiency: 85, order: 3 },
    { name: 'HTML/CSS', category: 'Frontend', proficiency: 95, order: 4 },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 85, order: 5 },

    // Backend
    { name: 'Node.js', category: 'Backend', proficiency: 90, order: 1 },
    { name: 'Express', category: 'Backend', proficiency: 90, order: 2 },
    { name: 'Python', category: 'Backend', proficiency: 80, order: 3 },
    { name: 'RESTful APIs', category: 'Backend', proficiency: 95, order: 4 },

    // Database
    { name: 'MongoDB', category: 'Database', proficiency: 85, order: 1 },
    { name: 'PostgreSQL', category: 'Database', proficiency: 80, order: 2 },
    { name: 'Redis', category: 'Database', proficiency: 70, order: 3 },

    // DevOps & Tools
    { name: 'Git', category: 'Tools', proficiency: 90, order: 1 },
    { name: 'Docker', category: 'DevOps', proficiency: 75, order: 1 },
    { name: 'AWS', category: 'DevOps', proficiency: 70, order: 2 },
    { name: 'CI/CD', category: 'DevOps', proficiency: 75, order: 3 }
];

export const seedExperience = [
    {
        type: 'work',
        title: 'Senior Full Stack Developer',
        organization: 'Tech Company Inc.',
        location: 'Remote',
        startDate: new Date('2022-01-01'),
        current: true,
        description: 'Leading development of web applications using MERN stack. Mentoring junior developers and implementing best practices.',
        achievements: [
            'Improved application performance by 40%',
            'Led team of 5 developers',
            'Implemented CI/CD pipeline'
        ],
        order: 1
    },
    {
        type: 'work',
        title: 'Full Stack Developer',
        organization: 'Startup XYZ',
        location: 'City, Country',
        startDate: new Date('2020-06-01'),
        endDate: new Date('2021-12-31'),
        current: false,
        description: 'Developed and maintained multiple web applications. Collaborated with design team to create user-friendly interfaces.',
        achievements: [
            'Built 3 production applications',
            'Reduced load time by 50%'
        ],
        order: 2
    },
    {
        type: 'education',
        title: 'Bachelor of Science in Computer Science',
        organization: 'University Name',
        location: 'City, Country',
        startDate: new Date('2016-09-01'),
        endDate: new Date('2020-05-31'),
        current: false,
        description: 'Focused on software engineering, algorithms, and web development.',
        order: 1
    }
];
