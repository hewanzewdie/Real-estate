export interface User {
  id: string;
  email: string;
  password: string; 
  role: 'buyer' | 'seller'; 
  createdAt: Date;
}