import { http, HttpResponse } from 'msw';

const FAKE_URL = "https://fake.supabase.co";

const mockUser = {
  id: 'a7a7e782-de2b-449a-a403-564b0b98b46a',
  email: 'mock.user@example.com',
  user_metadata: {
    user_name: 'Mock User',
    avatar_url: 'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_1280.png'
  }
};

const mockSession = {
  access_token: 'fake-access-token',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'fake-refresh-token',
  user: mockUser
};

export const handlers = [
  http.post(`${FAKE_URL}/auth/v1/signup`, (req) => {
    return HttpResponse.json(
      { ...mockSession, user: { ...mockUser, email: 'mock.user@example.com' } },
      { status: 200 }
    );
  }),

  http.post(`${FAKE_URL}/auth/v1/token`, ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('grant_type') === 'password') {
      return HttpResponse.json(mockSession, { status: 200 });
    }
    // Fallback for other grant types if needed, or return an error
    return HttpResponse.json({ error: 'unsupported_grant_type' }, { status: 400 });
  }),

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
