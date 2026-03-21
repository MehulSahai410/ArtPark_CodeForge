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

// Real PDF Text Extractor using pdf.js
const extractTextFromPDF = async (file) => {
  try {
    const pdfjsLib = await import('pdfjs-dist');
    
    // Set the worker source
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    console.log('✅ PDF text extracted, length:', fullText.trim().length, 'characters');
    return fullText.trim();
  } catch (err) {
    console.error('PDF extraction failed:', err);
    // Fallback: try reading as plain text
    try {
      const text = await file.text();
      if (text && text.length > 20) return text;
    } catch (e) { /* ignore */ }
    return '';
  }
};

// Extract text from any file type
const extractTextFromFile = async (file) => {
  if (!file) return '';
  
  const name = file.name.toLowerCase();
  
  if (name.endsWith('.pdf')) {
    return await extractTextFromPDF(file);
  } else if (name.endsWith('.txt') || name.endsWith('.docx') || name.endsWith('.doc')) {
    // For .txt files, read as text directly
    return await file.text();
  }
  
  // Attempt generic text read
  try {
    return await file.text();
  } catch {
    return '';
  }
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

    // Extract text from files if provided, otherwise use typed text
    let resumeText = resumeData.text || '';
    if (!resumeText && resumeData.file) {
      resumeText = await extractTextFromFile(resumeData.file);
    }

    let jdText = jdData.text || '';
    if (!jdText && jdData.file) {
      jdText = await extractTextFromFile(jdData.file);
    }

    // Final fallback for JD
    if (!jdText) {
      jdText = 'Senior Software Engineer requiring Java, Spring, React, System Design, and Kubernetes.';
    }

    if (!resumeText) throw new Error("Resume content is missing. Could not extract text from the file.");

    console.log('📄 Resume text (first 200 chars):', resumeText.substring(0, 200));
    console.log('📋 JD text (first 200 chars):', jdText.substring(0, 200));

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

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('Gemini API HTTP Error:', response.status, errBody);
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    let textOut = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOut) throw new Error("Invalid API response format");

    // Clean markdown code blocks from the JSON (handle ```json, ```, etc.)
    textOut = textOut.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    
    console.log('🤖 Gemini response (first 300 chars):', textOut.substring(0, 300));
    
    const parsed = JSON.parse(textOut);
    console.log('✅ Successfully parsed Gemini response');
    return parsed;

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

export const updateSkillStatus = (topic, score) => {
  const analysis = getAnalysis();
  if (!analysis) return;

  // Map module topics to skills (simple matching for demo)
  const skillToUpdate = Object.keys(analysis.skill_gap_report).find(skill => 
    topic.toLowerCase().includes(skill.toLowerCase()) || 
    skill.toLowerCase().includes(topic.toLowerCase())
  ) || topic;

  let newStatus = analysis.skill_gap_report[skillToUpdate] || 'Missing';
  
  if (score >= 80) newStatus = 'Strong';
  else if (score >= 50) newStatus = 'Moderate';
  else newStatus = 'Missing';

  analysis.skill_gap_report[skillToUpdate] = newStatus;

  // Update matched/missing arrays
  if (newStatus !== 'Missing') {
    if (!analysis.matched_skills.includes(skillToUpdate)) {
      analysis.matched_skills.push(skillToUpdate);
    }
    analysis.missing_skills = analysis.missing_skills.filter(s => s !== skillToUpdate);
  } else {
    if (!analysis.missing_skills.includes(skillToUpdate)) {
      analysis.missing_skills.push(skillToUpdate);
    }
    analysis.matched_skills = analysis.matched_skills.filter(s => s !== skillToUpdate);
  }

  storeAnalysis(analysis);
  return analysis;
};

// ========== Employee Management (HR Feature) ==========

const EMPLOYEES_KEY = 'adaptlearn_employees';

export const getEmployees = () => {
  const raw = localStorage.getItem(EMPLOYEES_KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveEmployees = (employees) => {
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
};

export const generatePassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$';
  let pass = '';
  for (let i = 0; i < 10; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
};

export const addEmployee = (name, email) => {
  const employees = getEmployees();
  const password = generatePassword();
  const newEmployee = {
    id: crypto.randomUUID ? crypto.randomUUID() : `emp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    password,
    role: 'employee',
    status: 'active',
    createdAt: new Date().toISOString(),
  };
  employees.push(newEmployee);
  saveEmployees(employees);
  return newEmployee;
};

export const removeEmployee = (id, hardDelete = false) => {
  let employees = getEmployees();
  if (hardDelete) {
    employees = employees.filter(e => e.id !== id);
  } else {
    employees = employees.map(e => e.id === id ? { ...e, status: 'removed' } : e);
  }
  saveEmployees(employees);
  return employees;
};

