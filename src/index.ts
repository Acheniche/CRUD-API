import http from 'http';
import 'dotenv/config';
import { User } from './user';
import { getUsers } from './handlers/getUsers';

const PORT = process.env.PORT || 4000;

const mainData: User[] = [
  {
    id: 'test-test-test-test',
    username: 'Ache',
    age: 20,
    hobbies: ['js', 'ts'],
  },
];

 http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
    if(request.url) {
    const urlArray: string[] = request.url.split('/');
    }
    if (request.url === '/api/users' && request.method === 'GET') {
        getUsers(response, mainData);
      }
  })
  .listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });