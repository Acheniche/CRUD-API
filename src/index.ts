import http from 'http';
import 'dotenv/config';
import { User } from './user';
import { getUsers } from './handlers/getUsers';
import { getUser } from './handlers/getUser';
import { addUser } from './handlers/addUser';
import { updateUser } from './handlers/updateUser';
import { deleteUser } from './handlers/deleteUser';

const PORT = process.env.PORT || 4000;

let mainData: User[] = [];

 http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
    if(request.url) {
    const urlArray: string[] = request.url.split('/');
    if (request.url === '/api/users' && request.method === 'GET') {
        getUsers(response, mainData);
      } else if (
        urlArray.length > 3 &&
        urlArray.length < 5 &&
        request.method === 'GET'
      ) {
        getUser(response, mainData, urlArray[3]);
      } else if (request.url === '/api/users' && request.method === 'POST') {
        let data: string = '';
        request.on('data', (bit) => {
          data += bit;
        });
        request.on('end', () => {
          try {
            addUser(JSON.parse(data.toString()), response, mainData);
          } catch (e) {
            console.log(e);
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'Server error' }));
          }
        });
    } else if (urlArray.length < 5 && request.method === 'PUT') {
        let data: string = '';
        request.on('data', (bit) => {
          data += bit;
        });
        request.on('end', () => {
          try {
            updateUser(JSON.parse(data.toString()), urlArray[3], response, mainData);
          } catch (e) {
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'Server error' }));
          }
        });
    } else if (urlArray.length < 5 && request.method === 'DELETE') {
        const index = deleteUser(urlArray[3], response, mainData);
        if (index !== false) {
          mainData.splice(index, 1);
        }
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Not found' }));
      }
    }
  })
  .listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}, process id is ${process.pid}`);
  });
