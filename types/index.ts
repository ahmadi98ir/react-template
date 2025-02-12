export interface Post {
  id: string | number;
  title: string;
  content?: string;
  excerpt?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
  status: number;
}