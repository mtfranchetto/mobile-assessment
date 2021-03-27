import { IHTTPClient, HTTPClient } from '../HttpClient';

describe('Given an http client', () => {
  let axios: any;
  let subject: IHTTPClient;

  beforeEach(() => {
    axios = {
      get: jest.fn(() => Promise.resolve({ data: { result: 'ok' } })),
      post: jest.fn(Promise.resolve),
      put: jest.fn(Promise.resolve),
      delete: jest.fn(Promise.resolve),
      head: jest.fn(Promise.resolve),
    };
    subject = new HTTPClient(axios);
  });

  describe('when performing a get request', () => {
    it('should call the corresponding method', async () => {
      await subject.get('/test', { headers: {} });

      expect(axios.get).toHaveBeenCalledWith('/test', { headers: {} });
    });
  });

  describe('when performing a post request', () => {
    it('should call the corresponding method', async () => {
      await subject.post('/test', { foo: 'bar' }, { headers: {} });

      expect(axios.post).toHaveBeenCalledWith('/test', { foo: 'bar' }, { headers: {} });
    });
  });

  describe('when performing a put request', () => {
    it('should call the corresponding method', async () => {
      await subject.put('/test', { foo: 'bar' }, { headers: {} });

      expect(axios.put).toHaveBeenCalledWith('/test', { foo: 'bar' }, { headers: {} });
    });
  });

  describe('when performing a delete request', () => {
    it('should call the corresponding method', async () => {
      await subject.delete('/test', { headers: {} });

      expect(axios.delete).toHaveBeenCalledWith('/test', { headers: {} });
    });
  });

  describe('when performing a head request', () => {
    it('should call the corresponding method', async () => {
      await subject.head('/test', { headers: {} });

      expect(axios.head).toHaveBeenCalledWith('/test', { headers: {} });
    });
  });
});
