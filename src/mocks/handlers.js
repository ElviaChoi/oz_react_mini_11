import { http, HttpResponse } from 'msw';

const FAKE_URL = "https://fake.supabase.co";

// Mock user data
const mockUser = {
  id: 'a7a7e782-de2b-449a-a403-564b0b98b46a',
  email: 'mock.user@example.com',
  user_metadata: {
    user_name: 'Mock User',
    avatar_url: 'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_1280.png'
  }
};

// Mock session data
const mockSession = {
  access_token: 'fake-access-token',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'fake-refresh-token',
  user: mockUser
};

export const handlers = [
  // Mock for email signup
  http.post(`${FAKE_URL}/auth/v1/signup`, (req) => {
    // const { email, password } = await req.json(); // Removed for debugging
    return HttpResponse.json(
      { ...mockSession, user: { ...mockUser, email: 'mock.user@example.com' } },
      { status: 200 }
    );
  }),

  // Mock for email login
  http.post(`${FAKE_URL}/auth/v1/token?grant_type=password`, (req) => {
    // const body = await req.json(); // Removed for debugging
    return HttpResponse.json(mockSession, { status: 200 });
  }),

  // Mock for getting user
  http.get(`${FAKE_URL}/auth/v1/user`, (req) => {
    const authHeader = req.headers.get('Authorization');
    if (authHeader === `Bearer fake-anon-key`) {
      return HttpResponse.json(mockUser, { status: 200 });
    } else {
      return HttpResponse.json(
        { error: 'invalid_token', error_description: 'Invalid token' },
        { status: 401 }
      );
    }
  }),
];
