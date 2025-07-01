const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor() {
    this.baseURL = API_BASE_URL
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken')
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (options.headers) {
      Object.assign(headers, options.headers)
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    let data
    try {
      data = await response.json()
    } catch {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data = {}
    }

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`)
    }

    return data
  }

  // Auth methods
  async login(credentials: { email: string; password: string }) {
    const result = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    
    if (result.data?.token) {
      this.setToken(result.data.token)
    }
    
    return result
  }

  async register(userData: { 
    email: string; 
    password: string; 
    confirm_password: string; 
    name: string 
  }) {
    const result = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
    
    if (result.data?.token) {
      this.setToken(result.data.token)
    }
    
    return result
  }

  // Menu methods
  async getMenu() {
    return this.request('/menu')
  }

  async createMenuItem(data: any) {
    return this.request('/menu', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Order methods
  async createOrder(orderData: any) {
    return this.request('/order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  async getMyOrders() {
    return this.request('/order')
  }
}

export const apiClient = new ApiClient()