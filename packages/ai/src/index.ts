import { GoogleGenAI } from '@google/genai';

export interface AIServiceConfig {
  apiKey: string;
}

export class AIService {
  private ai: GoogleGenAI | null = null;

  constructor(config?: AIServiceConfig) {
    const key = config?.apiKey || process.env.AI_API_KEY;
    if (key) {
      this.ai = new GoogleGenAI({ apiKey: key });
    }
  }

  /**
   * AI Chat Assistant for public chatbot conversation
   */
  async chat(message: string, history: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>): Promise<string> {
    if (!this.ai) {
      return `[Mock AI Response]: Hello! You asked: "${message}". AI_API_KEY is not configured.`;
    }

    try {
      const chat = this.ai.chats.create({
        model: 'gemini-1.5-flash',
        config: {
          systemInstruction: 'You are a helpful assistant for Algoguido Technologies Private Limited. Assist visitors on our products, enterprise services, internships, and cloud hosting.',
        },
        history: history,
      });

      const response = await chat.sendMessage({ message });
      return response.text || 'No response generated.';
    } catch (error: any) {
      console.error('Error in AI Chat:', error);
      throw new Error(`AI Chat failed: ${error.message}`);
    }
  }

  /**
   * Smart Lead Scoring: Scores a lead out of 100 based on details
   */
  async scoreLead(leadDetails: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject?: string;
    message: string;
  }): Promise<{ score: number; explanation: string }> {
    if (!this.ai) {
      // Mock scoring logic
      let score = 20;
      if (leadDetails.company) score += 30;
      if (leadDetails.phone) score += 20;
      if (leadDetails.message.length > 50) score += 30;
      return {
        score,
        explanation: 'Mock lead score based on profile completion.',
      };
    }

    try {
      const prompt = `Analyze the following lead details and assign a quality score from 0 to 100 based on interest level, purchase intent, and company details.
Lead Details:
${JSON.stringify(leadDetails, null, 2)}

Provide the response strictly in JSON format matching this schema:
{
  "score": number,
  "explanation": "string describing why the score was assigned"
}`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const result = JSON.parse(response.text || '{}');
      return {
        score: typeof result.score === 'number' ? result.score : 50,
        explanation: result.explanation || 'Analyzed by Gemini.',
      };
    } catch (error: any) {
      console.error('Error in Lead Scoring:', error);
      return { score: 50, explanation: `Lead scoring failed: ${error.message}` };
    }
  }

  /**
   * AI SEO Optimizer: Suggests title, description, and keywords
   */
  async optimizeSEO(content: string): Promise<{ title: string; description: string; keywords: string[] }> {
    if (!this.ai) {
      return {
        title: 'Optimized Title Placeholder',
        description: 'Optimized description placeholder.',
        keywords: ['tech', 'algoguido'],
      };
    }

    try {
      const prompt = `Analyze this blog post content and generate optimal SEO metadata (title, description, keywords).
Content:
${content}

Provide response strictly in JSON format:
{
  "title": "SEO Optimized Title",
  "description": "Meta description (max 160 chars)",
  "keywords": ["keyword1", "keyword2", ...]
}`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const result = JSON.parse(response.text || '{}');
      return {
        title: result.title || 'Optimized Title',
        description: result.description || 'Optimized Meta Description',
        keywords: result.keywords || [],
      };
    } catch (error: any) {
      console.error('Error in SEO optimization:', error);
      return { title: '', description: '', keywords: [] };
    }
  }

  /**
   * AI Resume Screening: Matches a resume text with a job track description
   */
  async screenResume(resumeText: string, trackDescription: string): Promise<{
    matchPercentage: number;
    skillsIdentified: string[];
    summary: string;
    recommendation: 'SHORTLIST' | 'REVIEW' | 'REJECT';
  }> {
    if (!this.ai) {
      return {
        matchPercentage: 75,
        skillsIdentified: ['React', 'TypeScript'],
        summary: 'Mock screening summary.',
        recommendation: 'REVIEW',
      };
    }

    try {
      const prompt = `Screen the candidate's resume text against the requirements of the track.
Resume:
${resumeText}

Track requirements:
${trackDescription}

Provide response strictly in JSON format:
{
  "matchPercentage": number,
  "skillsIdentified": ["skill1", "skill2"],
  "summary": "short summary of the match",
  "recommendation": "SHORTLIST" | "REVIEW" | "REJECT"
}`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const result = JSON.parse(response.text || '{}');
      return {
        matchPercentage: result.matchPercentage || 50,
        skillsIdentified: result.skillsIdentified || [],
        summary: result.summary || 'Screening complete.',
        recommendation: result.recommendation || 'REVIEW',
      };
    } catch (error: any) {
      console.error('Error in Resume Screening:', error);
      return {
        matchPercentage: 0,
        skillsIdentified: [],
        summary: `Screening failed: ${error.message}`,
        recommendation: 'REVIEW',
      };
    }
  }

  /**
   * AI Proposal Generator: Generates professional proposal outline from enterprise inquiry details
   */
  async generateProposal(inquiryDetails: {
    company: string;
    industry: string;
    requirements: string;
    budget?: string;
    timeline?: string;
  }): Promise<string> {
    if (!this.ai) {
      return `Proposal for ${inquiryDetails.company} Operations Upgrade... (Configure AI key to generate content)`;
    }

    try {
      const prompt = `Generate a structured, professional proposal outline for ${inquiryDetails.company} based on their enterprise inquiry:
Industry: ${inquiryDetails.industry}
Requirements: ${inquiryDetails.requirements}
Budget: ${inquiryDetails.budget || 'TBD'}
Timeline: ${inquiryDetails.timeline || 'TBD'}

Include sections:
1. Executive Summary
2. Proposed Solution Architectures
3. Timeline and Milestones
4. Budget and Commercials (estimate based on inputs)
5. Service Level Agreement and Support (AMC)`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
      });

      return response.text || 'Failed to generate proposal.';
    } catch (error: any) {
      console.error('Error generating proposal:', error);
      return `Failed to generate proposal: ${error.message}`;
    }
  }

  /**
   * AI OCR & Document Parsing: Extract key details from document text
   */
  async parseDocument(documentText: string): Promise<Record<string, any>> {
    if (!this.ai) {
      return { info: 'OCR data parsing placeholder' };
    }

    try {
      const prompt = `Extract all key structured information, entities, dates, numbers, and names from the raw document text.
Document Text:
${documentText}

Provide response strictly in JSON format as a flat key-value object of extracted fields.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      return JSON.parse(response.text || '{}');
    } catch (error: any) {
      console.error('Error parsing document:', error);
      return { error: error.message };
    }
  }

  /**
   * AI Recommendation Engine: Suggests products or services based on visitor browsing history
   */
  async recommend(history: string[], availableEntities: Array<{ id: string; name: string; description: string; type: string }>): Promise<Array<{ entityId: string; score: number; reason: string }>> {
    if (!this.ai) {
      return availableEntities.slice(0, 3).map((e) => ({
        entityId: e.id,
        score: 0.9,
        reason: 'Featured offering matching general interest.',
      }));
    }

    try {
      const prompt = `Recommend the top 3 items from the available offerings list that match the visitor interest history.
History (Recent items visited):
${JSON.stringify(history)}

Available Offerings:
${JSON.stringify(availableEntities)}

Provide response strictly in JSON format as a list:
[
  { "entityId": "string", "score": number (0 to 1), "reason": "short explanation of recommendation" }
]`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      return JSON.parse(response.text || '[]');
    } catch (error: any) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }
}
