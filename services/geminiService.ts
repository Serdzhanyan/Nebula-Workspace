import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Safely initialize the client only when needed to avoid early failures if key is missing during render
const getClient = () => {
  if (!apiKey) {
    console.warn("API Key is missing. AI features will return mock data.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

const parseJsonSafe = (text: string | undefined): any[] => {
  if (!text) return [];
  try {
    // 1. Try to find the JSON array pattern first (most robust for this use case)
    const arrayMatch = text.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      return JSON.parse(arrayMatch[0]);
    }
    
    // 2. Fallback: Manual cleanup if regex didn't match (unlikely for valid array)
    let clean = text.trim();
    if (clean.startsWith('```json')) {
      clean = clean.replace(/^```json/, '').replace(/```$/, '');
    } else if (clean.startsWith('```')) {
      clean = clean.replace(/^```/, '').replace(/```$/, '');
    }
    return JSON.parse(clean.trim());
  } catch (e) {
    console.error("JSON Parse Error:", e);
    return []; // Return empty array on failure so UI handles it gracefully
  }
};

// Robust error checker for Quota (429), Server (500), or Network (Unknown/XHR) errors
const isRecoverableError = (error: any) => {
  const code = error?.status || error?.code;
  const msg = (error?.message || '').toLowerCase();
  
  return (
    code === 429 || 
    code === 500 || 
    code === 503 || 
    error?.status === "UNKNOWN" ||
    msg.includes('quota') || 
    msg.includes('resource_exhausted') || 
    msg.includes('xhr error') || 
    msg.includes('fetch failed') ||
    msg.includes('overloaded')
  );
};

const getMockNews = (count: number) => {
  const mocks = [
    { title: "Q3 Goals Exceeded", summary: "The team has surpassed all quarterly targets by 15%.", category: "Company" },
    { title: "New Office Opening", summary: "We are expanding to a new location in downtown next month.", category: "Company" },
    { title: "AI Integration Initiative", summary: "Nebula is adopting new AI tools to streamline workflows.", category: "Industry" },
    { title: "Annual Tech Summit", summary: "Join us for the biggest tech conference of the year this Friday.", category: "Event" },
    { title: "Wellness Week Starts", summary: "Free yoga and meditation sessions available for all employees.", category: "Company" },
    { title: "Market Share Growth", summary: "Our latest product line has captured 5% more market share.", category: "Industry" },
    { title: "Sustainability Award", summary: "Nebula has been recognized for its eco-friendly office practices.", category: "Company" },
    { title: "Global Hackathon", summary: "Teams from all offices will compete in a 48-hour coding challenge.", category: "Event" },
    { title: "New CTO Appointed", summary: "Welcoming Sarah Jenkins as our new Chief Technology Officer.", category: "Company" }
  ];
  return Array.from({ length: count }, (_, i) => mocks[i % mocks.length]);
};

export const generateCompanyNews = async (count: number = 3): Promise<{ title: string; summary: string; category: string }[]> => {
  const client = getClient();
  if (!client) {
    return getMockNews(count);
  }

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate ${count} short, professional, positive, fictional company news headlines and a 1-sentence summary for each. Assign a category (Company, Industry, or Event) to each. Return strictly valid JSON array of objects with keys 'title', 'summary', and 'category'. Do not include markdown formatting.`,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    return parseJsonSafe(response.text);
  } catch (error) {
    if (isRecoverableError(error)) {
        console.warn("Gemini API temporary issue (Quota/Server). Using mock news data.");
    } else {
        console.error("Failed to generate news:", error);
    }
    return getMockNews(count);
  }
};

export const generateNewsContent = async (title: string, summary: string): Promise<string> => {
  const client = getClient();
  const mockContent = `
    <p><strong>(Note: AI content generation is currently unavailable due to high traffic or connection limits. Showing placeholder content.)</strong></p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>This is a placeholder article for: <strong>${title}</strong>.</p>
  `;

  if (!client) return mockContent;

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Write a 3-paragraph professional internal company blog post based on this headline: "${title}" and summary: "${summary}". Use HTML paragraph tags <p> for the paragraphs. Do not use a main title <h1>.`
    });
    return response.text || mockContent;
  } catch (error) {
    console.warn("Gemini API failed to generate article content (Quota/Server). Using placeholder.");
    // Fallback to mock content for ANY error to ensure UI doesn't break
    return mockContent;
  }
};

export const analyzePerformance = async (metrics: any[]): Promise<string> => {
  const client = getClient();
  const defaultInsight = "Keep up the consistent work! Your trajectory looks stable.";

  if (!client) return defaultInsight;

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze these performance metrics and give a one-sentence encouraging summary: ${JSON.stringify(metrics)}`
    });
    return response.text || defaultInsight;
  } catch (error) {
    if (isRecoverableError(error)) console.warn("Gemini API temporary issue for performance analysis.");
    return defaultInsight;
  }
};

export const generateAboutUs = async (): Promise<string> => {
   const client = getClient();
   const defaultAbout = "Nebula Workspace is dedicated to fostering innovation and collaboration across all departments.";
   
   if (!client) return defaultAbout;
   
   try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Write a short, inspiring 2-sentence 'About Us' description for a futuristic tech company called Nebula Workspace."
    });
    return response.text || "Nebula Workspace: Innovating for tomorrow.";
   } catch (e) {
     if (isRecoverableError(e)) console.warn("Gemini API temporary issue for about us.");
     return "Nebula Workspace: Where ideas take flight.";
   }
};

export const generateTaskSuggestions = async (): Promise<{ title: string; priority: 'low' | 'medium' | 'high' }[]> => {
  const client = getClient();
  const mockTasks: { title: string; priority: 'low' | 'medium' | 'high' }[] = [
      { title: "Draft Q4 Roadmap", priority: "high" },
      { title: "Review Pull Requests", priority: "medium" },
      { title: "Update Team Calendar", priority: "low" }
  ];

  if (!client) {
    return mockTasks;
  }

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 3 specific, actionable work tasks for a tech professional (Productivity/Development/Management). Assign a priority (low, medium, high) to each. Return strictly valid JSON array of objects with keys 'title' and 'priority'. Do not include markdown formatting.`,
      config: {
        responseMimeType: "application/json"
      }
    });
    return parseJsonSafe(response.text);
  } catch (error) {
    if (isRecoverableError(error)) console.warn("Gemini API temporary issue for task suggestions.");
    return mockTasks;
  }
};

export const getChatResponse = async (message: string): Promise<string> => {
  const client = getClient();
  if (!client) return "I am currently in offline mode. Please add your API key to enable chat.";

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: "You are 'Nebula AI', a helpful, professional, and concise workplace assistant integrated into a dashboard. Your goal is to help employees with productivity, summaries, and motivation. Keep answers short and relevant to a business context.",
      }
    });
    return response.text || "I'm not sure how to respond to that right now.";
  } catch (error) {
    if (isRecoverableError(error)) return "I'm receiving too many requests right now. Please try again in a moment.";
    return "Sorry, I encountered an error processing your request.";
  }
};