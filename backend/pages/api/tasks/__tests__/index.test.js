// backend/pages/api/tasks/__tests__/index.test.js
import { createMocks } from 'node-mocks-http';
import handler from '../index';
import connectDB from '../../../db';
import { authenticateToken } from '../../../middleware/auth'; // Adjust path if needed

jest.mock('../../../db');
jest.mock('../../../middleware/auth'); // Mock the authentication middleware

describe('Task API Routes', () => {
  let connectionMock;

  beforeAll(async () => {
    connectionMock = {
      client: {
        close: jest.fn(),
        db: jest.fn(() => ({
          collection: jest.fn(() => ({
            find: jest.fn(),
            insertOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
          })),
        })),
      },
    };
    connectDB.mockResolvedValue(connectionMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/tasks', () => {
    it('should return 401 if not authenticated', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      authenticateToken.mockImplementation((req, res, next) => {
        res.status(401).json({ message: 'Unauthorized' });
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(401);
      expect(res._getJSONData()).toEqual({ message: 'Unauthorized' });
    });

    it('should return 200 and a list of tasks if authenticated', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });
      const mockTasks = [{ _id: '1', title: 'Task 1' }, { _id: '2', title: 'Task 2' }];

      authenticateToken.mockImplementation((req, res, next) => {
        req.userId = 'testUserId';
        next();
      });
      connectionMock.client.db().collection().find.mockReturnValue({
        toArray: jest.fn().mockResolvedValue(mockTasks),
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(res._getJSONData()).toEqual(mockTasks);
    });
  });

  describe('POST /api/tasks', () => {
    it('should return 401 if not authenticated', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: { title: 'New Task', completed: false },
      });

      authenticateToken.mockImplementation((req, res, next) => {
        res.status(401).json({ message: 'Unauthorized' });
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(401);
      expect(res._getJSONData()).toEqual({ message: 'Unauthorized' });
    });

    it('should return 201 and create a new task if authenticated', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: { title: 'New Task', completed: false },
      });

      authenticateToken.mockImplementation((req, res, next) => {
        req.userId = 'testUserId';
        next();
      });
      connectionMock.client.db().collection().insertOne.mockResolvedValue({
        insertedId: 'newTaskId',
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(201);
      expect(res._getJSONData()).toEqual({
        message: 'Task created',
        taskId: 'newTaskId',
      });
    });
  });

  // Add similar test cases for PUT and DELETE methods
});
