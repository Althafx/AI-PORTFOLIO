import Groq from 'groq-sdk';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';

// Function to build context from database
async function buildContext() {
    try {
        const profile = await Profile.findOne();
        const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
        const skills = await Skill.find().sort({ category: 1 });
        const experiences = await Experience.find().sort({ startDate: -1 });

        let context = `You are an AI assistant named Eve for a portfolio website.you are made by Althaf the website owner. your design is based on character Eve from Wall E. Answer questions about the portfolio owner based on the following information:\n\n`;

        // Add profile information
        if (profile) {
            context += `PERSONAL INFORMATION:\n`;
            context += `Name: ${profile.name}\n`;
            context += `Title: ${profile.title}\n`;
            context += `Bio: ${profile.bio}\n`;
            context += `Email: ${profile.email}\n`;
            if (profile.location) context += `Location: ${profile.location}\n`;
            if (profile.github) context += `GitHub: ${profile.github}\n`;
            if (profile.linkedin) context += `LinkedIn: ${profile.linkedin}\n`;
            context += `\n`;
        }

        // Add skills
        if (skills.length > 0) {
            context += `SKILLS:\n`;
            const skillsByCategory = skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill.name);
                return acc;
            }, {});

            Object.entries(skillsByCategory).forEach(([category, skillList]) => {
                context += `${category}: ${skillList.join(', ')}\n`;
            });
            context += `\n`;
        }

        // Add projects
        if (projects.length > 0) {
            context += `PROJECTS:\n`;
            projects.forEach((project, index) => {
                context += `${index + 1}. ${project.title}\n`;
                context += `   Description: ${project.description}\n`;
                if (project.technologies.length > 0) {
                    context += `   Technologies: ${project.technologies.join(', ')}\n`;
                }
                if (project.liveUrl) context += `   Live URL: ${project.liveUrl}\n`;
                if (project.githubUrl) context += `   GitHub: ${project.githubUrl}\n`;
                context += `\n`;
            });
        }

        // Add experience
        if (experiences.length > 0) {
            const workExperience = experiences.filter(exp => exp.type === 'work');
            const education = experiences.filter(exp => exp.type === 'education');

            if (workExperience.length > 0) {
                context += `WORK EXPERIENCE:\n`;
                workExperience.forEach((exp, index) => {
                    context += `${index + 1}. ${exp.title} at ${exp.organization}\n`;
                    if (exp.description) context += `   ${exp.description}\n`;
                    context += `\n`;
                });
            }

            if (education.length > 0) {
                context += `EDUCATION:\n`;
                education.forEach((edu, index) => {
                    context += `${index + 1}. ${edu.title} at ${edu.organization}\n`;
                    if (edu.description) context += `   ${edu.description}\n`;
                    context += `\n`;
                });
            }
        }

        context += `\nPlease provide helpful, friendly, and professional responses about this person. If asked about something not in the information above, politely say you don't have that information but encourage them to reach out directly via the contact information provided.`;

        return context;
    } catch (error) {
        console.error('Error building context:', error);
        return 'You are an AI assistant for a portfolio website. your name is Eve. Please answer questions professionally.';
    }
}

// Function to chat with Groq
export async function chatWithGroq(userMessage) {
    try {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey || apiKey === 'your_groq_api_key_here') {
            throw new Error('GROQ_API_KEY is missing or invalid');
        }

        const groq = new Groq({ apiKey });

        // Build context from database
        const context = await buildContext();

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: context
                },
                {
                    role: "user",
                    content: userMessage
                }
            ],
            model: "llama-3.1-8b-instant",
        });

        return completion.choices[0]?.message?.content || "I couldn't generate a response.";
    } catch (error) {
        console.error('Groq API Error:', error);
        console.error('Error message:', error.message);
        console.error('Error response:', error.response?.data || error.error);
        console.error('Error status:', error.status);
        throw new Error('Failed to get response from AI');
    }
}
