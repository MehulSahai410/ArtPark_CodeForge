// Mock Authentication Helper — localStorage-based, no backend needed.

export const mockAuth = {
  login(email, role) {
    const user = { email, role };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  signup(email, role) {
    const user = { email, role };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('analysis');
  },

  getUser() {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  },

  getRole() {
    const user = this.getUser();
    return user ? user.role : null;
  },

  isLoggedIn() {
    return !!this.getUser();
  }
};

// Mock PDF Extractor
const extractMockResumeText = async (file) => {
  await new Promise(r => setTimeout(r, 500));
  return "Experienced Full-Stack Developer with 5 years in Java, Spring Boot, React, and SQL. Built multiple REST APIs and frontend dashboards. No experience with distributed systems or Kubernetes.";
};

// Generic API call to Gemini
export const analyzeProfileWithGemini = async (resumeData, jdData) => {
  try {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    
    // Fall back to dummy data if no key is provided to prevent breaking the flow
    if (!GEMINI_API_KEY) {
      console.warn('VITE_GEMINI_API_KEY is missing. Falling back to dummy response.');
      return getDummyResponse();
    }

    const resumeText = resumeData.text || (resumeData.file ? await extractMockResumeText(resumeData.file) : '');
    const jdText = jdData.text || 'Senior Software Engineer requiring Java, Spring, React, System Design, and Kubernetes.';

    if (!resumeText) throw new Error("Resume content is missing.");
    if (!jdText) throw new Error("Job Description content is missing.");

    const prompt = `
You are an AI career coach.

Given:
1. Candidate Skills / Resume Text: 
${resumeText}

2. Job Description: 
${jdText}

Perform the following:
1. Identify relevant skills required for the job
2. Compare candidate skills with required skills
3. Identify skill gaps
4. Generate a learning roadmap from beginner to expert
5. Create a module-based learning structure
6. Recommend:
   - YouTube videos (relevant links)
   - Detailed learning notes
   - External resources (blogs, docs, courses)

7. Generate a skill gap report with levels (Strong, Moderate, Missing)

Return the response STRICTLY as a valid JSON object with EXACTLY the following format, no markdown formatting blocks outside it:
{
  "matched_skills": ["Java", "SQL"],
  "missing_skills": ["System Design", "Distributed Systems"],
  "roadmap": [
    { "level": "Beginner", "topics": ["System Design Basics", "Networking"] }
  ],
  "modules": [
    {
      "title": "System Design Basics",
      "youtube_link": "https://youtube.com/watch?v=...",
      "notes": "Detailed explanation...",
      "resources": ["https://blog.com/article"]
    }
  ],
  "skill_gap_report": {
    "Java": "Strong",
    "SQL": "Moderate",
    "System Design": "Missing"
  },
  "summary": "Candidate is strong in backend but lacks scalability knowledge."
}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const data = await response.json();
    let textOut = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOut) throw new Error("Invalid API response format");

    // Clean markdown code blocks from the JSON
    textOut = textOut.replace(/^```json/m, '').replace(/^```/m, '').trim();
    return JSON.parse(textOut);

  } catch (err) {
    console.error("Gemini API Error:", err);
    return getDummyResponse();
  }
};

const getDummyResponse = () => {
  return new Promise((resolve) => setTimeout(() => resolve({
    matched_skills: ["Java", "React", "SQL"],
    missing_skills: ["System Design", "Distributed Systems", "Kubernetes"],
    roadmap: [
      { level: "Beginner", topics: ["System Design Basics", "Containerization Intro"] },
      { level: "Intermediate", topics: ["Caching", "Kubernetes Pods & Services"] },
      { level: "Advanced", topics: ["Distributed Databases", "K8s Architecture"] }
    ],
    modules: [
      {
        title: "System Design Basics",
        youtube_link: "https://youtube.com/watch?v=bU_oYQFxgTE",
        notes: "Learn the fundamentals of scalability, horizontal vs vertical scaling, and microservices.",
        resources: ["https://github.com/donnemartin/system-design-primer"]
      },
      {
        title: "Kubernetes for Beginners",
        youtube_link: "https://youtube.com/watch?v=X48VuDVv0do",
        notes: "Introduction to Pods, Deployments, and Services in K8s.",
        resources: ["https://kubernetes.io/docs/home/"]
      }
    ],
    skill_gap_report: {
      "Java": "Strong",
      "React": "Strong",
      "SQL": "Moderate",
      "System Design": "Missing",
      "Kubernetes": "Missing"
    },
    summary: "Strong full-stack foundation with Java and React. High priority gaps identified in System Design and Kubernetes which are essential for the targeted Senior role."
  }), 1500));
};

// Store & retrieve analysis results
export const storeAnalysis = (data) => {
  localStorage.setItem('analysis', JSON.stringify(data));
};

export const getAnalysis = () => {
  const raw = localStorage.getItem('analysis');
  return raw ? JSON.parse(raw) : null;
};
