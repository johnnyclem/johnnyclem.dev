import { storage } from "./storage";
import type { ChatMessage, InsertChatMessage } from "@shared/schema";
import { openai, CHAT_MODEL } from "./openai";

export interface ChatServiceConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

const defaultConfig: ChatServiceConfig = {
  model: CHAT_MODEL,
  temperature: 0.7,
  maxTokens: 2000,
};

export async function buildContextForChat(): Promise<string> {
  const profile = await storage.getProfile();
  const experiences = await storage.getAllExperiences();
  const patents = await storage.getAllPatents();
  const projects = await storage.getAllProjects();
  const skills = await storage.getAllSkills();
  const contextDocs = await storage.getAllChatContextDocs();

  const contextParts: string[] = [];

  if (profile) {
    contextParts.push(`# About ${profile.name || "Me"}`);
    contextParts.push(`Title: ${profile.title || "N/A"}`);
    if (profile.subtitle) contextParts.push(`Subtitle: ${profile.subtitle}`);
    if (profile.bio) contextParts.push(`Bio: ${profile.bio}`);
    if (profile.location) contextParts.push(`Location: ${profile.location}`);
    if (profile.yearsExperience) contextParts.push(`Years of Experience: ${profile.yearsExperience}`);
    if (profile.patentCount) contextParts.push(`Number of Patents: ${profile.patentCount}`);
    if (profile.devicesDeployed) contextParts.push(`Devices Deployed: ${profile.devicesDeployed}`);
    contextParts.push("");
  }

  if (experiences.length > 0) {
    contextParts.push("# Work Experience");
    for (const exp of experiences) {
      contextParts.push(`## ${exp.company} - ${exp.role}`);
      contextParts.push(`Period: ${exp.period}`);
      contextParts.push(`Location: ${exp.location}`);
      if (exp.type) contextParts.push(`Type: ${exp.type}`);
      if (exp.achievements?.length) {
        contextParts.push("Achievements:");
        for (const achievement of exp.achievements) {
          contextParts.push(`- ${achievement}`);
        }
      }
      contextParts.push("");
    }
  }

  if (patents.length > 0) {
    contextParts.push("# Patents");
    for (const patent of patents) {
      contextParts.push(`## ${patent.title}`);
      contextParts.push(`Number: ${patent.number}`);
      contextParts.push(`Status: ${patent.status}`);
      contextParts.push(`Year: ${patent.year}`);
      if (patent.description) contextParts.push(`Description: ${patent.description}`);
      if (patent.category) contextParts.push(`Category: ${patent.category}`);
      contextParts.push("");
    }
  }

  if (projects.length > 0) {
    contextParts.push("# Notable Projects");
    for (const project of projects) {
      contextParts.push(`## ${project.title}`);
      contextParts.push(project.description);
      if (project.impact) contextParts.push(`Impact: ${project.impact}`);
      if (project.technologies?.length) {
        contextParts.push(`Technologies: ${project.technologies.join(", ")}`);
      }
      contextParts.push("");
    }
  }

  if (skills.length > 0) {
    contextParts.push("# Technical Skills");
    for (const skill of skills) {
      contextParts.push(`## ${skill.category}`);
      if (skill.items?.length) {
        contextParts.push(skill.items.join(", "));
      }
      if (skill.specializations?.length) {
        contextParts.push(`Specializations: ${skill.specializations.join(", ")}`);
      }
      contextParts.push("");
    }
  }

  if (contextDocs.length > 0) {
    contextParts.push("# Additional Context Documents");
    for (const doc of contextDocs) {
      contextParts.push(`## ${doc.label}`);
      contextParts.push(doc.body);
      if (doc.source) contextParts.push(`Source: ${doc.source}`);
      contextParts.push("");
    }
  }

  return contextParts.join("\n");
}

export async function createChatCompletion(
  messages: ChatMessage[],
  config: ChatServiceConfig = {}
): Promise<string> {
  const mergedConfig = { ...defaultConfig, ...config };
  
  const context = await buildContextForChat();
  
  const systemMessage = {
    role: "system" as const,
    content: `You are an AI assistant helping users learn about Jonathan Clem, a talented software engineer. Here is comprehensive information about Jonathan's professional background:

${context}

Your role is to answer questions about Jonathan's background, skills, projects, and patents. Be conversational, friendly, and informative. If asked about technical challenges or how Jonathan might approach a problem, use the context above to provide informed answers. If you're asked something that isn't covered in the context, politely let the user know.`,
  };

  const openaiMessages = [
    systemMessage,
    ...messages.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
  ];

  const response = await openai.chat.completions.create({
    model: mergedConfig.model!,
    messages: openaiMessages,
    temperature: mergedConfig.temperature,
    max_tokens: mergedConfig.maxTokens,
  });

  return response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
}

export async function sendMessage(
  conversationId: string,
  userMessage: string,
  config: ChatServiceConfig = {}
): Promise<{ userMessage: ChatMessage; assistantMessage: ChatMessage }> {
  const userMsg: InsertChatMessage = {
    conversationId,
    role: "user",
    content: userMessage,
  };
  
  const savedUserMessage = await storage.createChatMessage(userMsg);
  
  const conversationMessages = await storage.getChatMessagesByConversationId(conversationId);
  
  const assistantContent = await createChatCompletion(conversationMessages, config);
  
  const assistantMsg: InsertChatMessage = {
    conversationId,
    role: "assistant",
    content: assistantContent,
  };
  
  const savedAssistantMessage = await storage.createChatMessage(assistantMsg);
  
  return {
    userMessage: savedUserMessage,
    assistantMessage: savedAssistantMessage,
  };
}
