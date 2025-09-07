export interface User {
  id: string;
  email: string;
  password: string; 
  username?: string; // Optional
  role: 'user' | 'admin'; 
  createdAt: Date;
}