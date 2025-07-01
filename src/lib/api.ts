const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

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
    
    // Fix: Use Record<string, string> untuk headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Add existing headers from options
    if (options.headers) {
      Object.assign(headers, options.headers)
    }

    // Fix: Use bracket notation untuk Authorization
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    // Fix: Better error handling
    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        errorData = { message: `HTTP error! status: ${response.status}` }
      }
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return response.json()
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
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  async getMyOrders() {
    return this.request('/orders')
  }

  async getAllOrders() {
    return this.request('/orders/admin')
  }

  async updateOrderStatus(orderId: string, status: string) {
    return this.request(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
  }
}

export const apiClient = new ApiClient()