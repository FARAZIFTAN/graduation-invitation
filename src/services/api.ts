import API_BASE_URL from '@/config/api';

// Token management
export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

// API helper
const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'API request failed');
  }

  return data;
};

// Authentication API
export const authAPI = {
  login: async (accessCode: string) => {
    const response = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ accessCode }),
    });
    
    // Store token
    if (response.success && response.data.token) {
      setToken(response.data.token);
    }
    
    return response.data;
  },

  verifySession: async () => {
    const response = await fetchAPI('/auth/session');
    return response.data;
  },

  logout: () => {
    removeToken();
  },
};

// Wisudawan API
export const wisudawanAPI = {
  getAll: async () => {
    const response = await fetchAPI('/wisudawan');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await fetchAPI(`/wisudawan/${id}`);
    return response.data;
  },
};

// Invitations API
export const invitationsAPI = {
  getAll: async (wisudawanId: string) => {
    const response = await fetchAPI(`/invitations?wisudawanId=${wisudawanId}`);
    return response.data;
  },

  create: async (wisudawanId: string, tamu: string) => {
    const response = await fetchAPI('/invitations', {
      method: 'POST',
      body: JSON.stringify({ wisudawanId, tamu }),
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await fetchAPI(`/invitations/${id}`, {
      method: 'DELETE',
    });
    return response.data;
  },

  validate: async (wisudawanId: string, tamuSlug: string) => {
    const response = await fetchAPI(
      `/invitations/validate?wisudawanId=${wisudawanId}&tamuSlug=${tamuSlug}`
    );
    return response.data;
  },
};

// Quota API
export const quotaAPI = {
  get: async (wisudawanId: string) => {
    const response = await fetchAPI(`/quota?wisudawanId=${wisudawanId}`);
    return response.data;
  },
};
