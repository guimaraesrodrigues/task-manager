// backend/pages/api/auth/__tests__/login.test.js
import { createMocks } from 'node-mocks-http';
import handler from '../login'; // Adjust the path if needed
import connectDB from '../../../db'; // Adjust the path if needed
import bcrypt from 'bcryptjs';

jest.mock('../../../db'); // Mock the database connection
jest.mock('bcryptjs'); // Mock bcryptjs

describe('POST /api/auth/login', () => {
  let connectionMock;

  beforeAll(async () => {
    // Mock the database connection
    connectionMock = {
      client: {
        close: jest.fn(),
        db: jest.fn(() => ({
          collection: jest.fn(() => ({
            findOne: jest.fn(),
          })),
        })),
      },
    };
    connectDB.mockResolvedValue(connectionMock); // Corrected line
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if username is not found', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { username: 'nonexistentuser', password: 'password' },
    });

    connectionMock.client.db().collection().findOne.mockResolvedValue(null);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toEqual({ message: 'Invalid credentials' });
  });

  it('should return 401 if password does not match', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { username: 'testuser', password: 'wrongpassword' },
    });

    connectionMock.client.db().collection().findOne.mockResolvedValue({
      username: 'testuser',
      password: 'hashedpassword',
    });
    bcrypt.compare.mockResolvedValue(false);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toEqual({ message: 'Invalid credentials' });
  });

  it('should return 200 and a token if credentials are valid', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { username: 'testuser', password: 'correctpassword' },
    });

    connectionMock.client.db().collection().findOne.mockResolvedValue({
      username: 'testuser',
      password: 'hashedpassword',
      _id: 'testuserid', // **Add comma here**
    });
    bcrypt.compare.mockResolvedValue(true);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toHaveProperty('token');
    expect(res._getHeaders()).toHaveProperty('Set-Cookie');
  });

  // Add more test cases as needed (e.g., for error handling, invalid input)
});
