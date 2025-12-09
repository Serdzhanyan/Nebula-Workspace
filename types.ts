
export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: 'Company' | 'Industry' | 'Event';
  content?: string;
  likes?: number;
  comments?: Comment[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  description?: string;
  createdAt?: string;
}

export interface TaskAttachment {
  name: string;
  size: string;
  type: string;
  id?: string;
}

export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  description?: string;
  subtasks?: SubTask[];
  assignee?: { name: string; avatar: string };
  tags?: string[];
  attachments?: TaskAttachment[];
  comments?: Comment[];
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  department: string;
}

export interface PerformanceMetric {
  month: string;
  score: number;
  tasksCompleted: number;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'sheet';
  date: string;
}

export interface TrainingLesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  isLocked?: boolean;
}

export interface TrainingModule {
  id: string;
  title: string;
  progress: number; // 0 to 100
  dueDate: string;
  lastAccessed?: string;
  instructor?: string;
  thumbnail?: string;
  category?: string;
  duration?: string;
  description?: string;
  syllabus?: TrainingLesson[];
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  rating?: number;
  reviewsCount?: number;
  outcomes?: string[];
  requirements?: string[];
  lastUpdated?: string;
  language?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'alert' | 'info' | 'success';
}

export interface ChatContact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string; // 'me' or user ID
  timestamp: Date;
}

// SME Types
export interface SMEShareholder {
    name: string;
    type: 'Individual' | 'Entity';
    share: number;
    role?: string;
}

export interface SMEDocument {
    name: string;
    status: 'Approved' | 'Pending' | 'Expired' | 'Missing' | 'Current';
    date?: string;
}

export interface SMEChangeRequest {
    id: string;
    type: string;
    date: string;
    status: 'Approved' | 'Pending' | 'Rejected';
    oldValue?: string;
    newValue?: string;
    requestor: string;
}

export interface SMECompany {
    id: string;
    name: string;
    tin: string;
    joined: string;
    status: 'Active' | 'Pending' | 'Suspended';
    risk: 'Low' | 'Medium' | 'High';
    industry: string;
    employees: number;
    revenue: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    ceo: string;
    legalStructure: string;
    description: string;
    shareholders: SMEShareholder[];
    kyc: {
        status: 'Verified' | 'Pending' | 'Failed';
        lastCheck: string;
        nextReview: string;
        amlStatus: 'Clear' | 'Flagged';
        riskScore: number;
        documents: SMEDocument[];
    };
    changeHistory: SMEChangeRequest[];
    directors?: { name: string; role: string; appointed: string }[];
    beneficiaries?: { name: string; share: number; verified: boolean }[];
    corporateDocuments?: SMEDocument[];
}