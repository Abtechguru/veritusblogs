import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-5bb3fa81`;

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

const makeRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken || publicAnonKey}`,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

// Auth API
export const authAPI = {
  signup: async (email: string, password: string, name: string, role: string = 'reader') => {
    return makeRequest<any>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role }),
    });
  },

  signin: async (email: string, password: string) => {
    const response = await makeRequest<any>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (response.session?.access_token) {
      setAuthToken(response.session.access_token);
    }
    return response;
  },

  getSession: async () => {
    return makeRequest<any>('/auth/session', {
      method: 'GET',
    });
  },

  signout: async () => {
    const response = await makeRequest<any>('/auth/signout', {
      method: 'POST',
    });
    setAuthToken(null);
    return response;
  },
};

// Profile API
export const profileAPI = {
  get: async (id: string) => {
    return makeRequest<any>(`/profiles/${id}`, {
      method: 'GET',
    });
  },

  update: async (id: string, data: any) => {
    return makeRequest<any>(`/profiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Admin API
export const adminAPI = {
  getUsers: async () => {
    return makeRequest<any[]>('/admin/users', {
      method: 'GET',
    });
  },

  updateUserStatus: async (userId: string, status: 'approved' | 'rejected' | 'pending') => {
    return makeRequest<any>(`/admin/users/${userId}/status`, {
      method: 'POST',
      body: JSON.stringify({ status }),
    });
  },

  deleteUser: async (userId: string) => {
    return makeRequest<any>(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  },

  getAnalytics: async () => {
    return makeRequest<any[]>('/admin/analytics', {
      method: 'GET',
    });
  },

  getNewsletterSubscribers: async () => {
    return makeRequest<any[]>('/admin/newsletter/subscribers', {
      method: 'GET',
    });
  },

  broadcast: async (subject: string, message: string, recipients: string) => {
    return makeRequest<any>('/admin/broadcast', {
      method: 'POST',
      body: JSON.stringify({ subject, message, recipients }),
    });
  },
};

// Article API
export const articleAPI = {
  getAll: async (params?: { category?: string; featured?: boolean; author?: string; status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.set('category', params.category);
    if (params?.featured !== undefined) queryParams.set('featured', String(params.featured));
    if (params?.author) queryParams.set('author', params.author);
    if (params?.status) queryParams.set('status', params.status);
    
    const query = queryParams.toString();
    return makeRequest<any[]>(`/articles${query ? `?${query}` : ''}`, {
      method: 'GET',
    });
  },

  get: async (id: string) => {
    return makeRequest<any>(`/articles/${id}`, {
      method: 'GET',
    });
  },

  create: async (data: any) => {
    return makeRequest<any>('/articles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return makeRequest<any>(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return makeRequest<any>(`/articles/${id}`, {
      method: 'DELETE',
    });
  },
};

// Comment API
export const commentAPI = {
  getForArticle: async (articleId: string) => {
    return makeRequest<any[]>(`/articles/${articleId}/comments`, {
      method: 'GET',
    });
  },

  create: async (articleId: string, content: string, parentId?: string) => {
    return makeRequest<any>(`/articles/${articleId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, parent_id: parentId }),
    });
  },
};

// Newsletter API
export const newsletterAPI = {
  subscribe: async (email: string) => {
    return makeRequest<any>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

// Analytics API
export const analyticsAPI = {
  track: async (eventType: string, articleId?: string, metadata?: any) => {
    return makeRequest<any>('/analytics/track', {
      method: 'POST',
      body: JSON.stringify({ event_type: eventType, article_id: articleId, metadata }),
    });
  },
};

// Storage API
export const storageAPI = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const headers: HeadersInit = {
      Authorization: `Bearer ${authToken || publicAnonKey}`,
    };

    const response = await fetch(`${API_BASE_URL}/storage/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  },
};
