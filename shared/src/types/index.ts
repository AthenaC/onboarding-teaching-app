// Common types used across platforms
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Example entity types
export interface Example {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Request types
export interface CreateExampleRequest {
  name: string;
  description?: string;
}

export interface UpdateExampleRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
} 