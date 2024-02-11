import http from 'http';
import 'dotenv/config';
import { User } from './user';
import { getUsers } from './handlers/getUsers';
import { getUser } from './handlers/getUser';
import { addUser } from './handlers/addUser';
import { updateUser } from './handlers/updateUser';
import { deleteUser } from './handlers/deleteUser';

const PORT = process.env.PORT || 4000;

// const mainData: User[] = [
//   {
//     id:'1b9d6bcd-2bfd-4b2d-9b5d-2b8dfbbd4bed',
//     username: 'Ache',
//     age: 20,
//     hobbies: ['js', 'ts'],
//   },
// ];

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



  const bodyParser = (req: http.IncomingMessage) => {
    return new Promise((resolve, reject) => {
      const body: any[] = [];
  
      req.on('data', (chunk) => body.push(chunk));
      req.on('end', () => {
        const rawData = Buffer.concat(body).toString();
        const contentType = req.headers['content-type'];
  
        if (contentType?.includes('application/json')) {
          try {
            const parsedBody = JSON.parse(rawData);
            resolve(parsedBody);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(rawData);
        }
      })
      req.on('error', (error) => {
        reject(error);
      })
    })
  }