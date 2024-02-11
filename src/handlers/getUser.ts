import http from 'http';
import { User } from '../user';
import { validate } from 'uuid';

export const getUser = async (response: http.ServerResponse, data: User[], id: string ) => {
    if (validate(id)) {
        const user = data.find((user) => user.Id === id);
        if (user) {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(user));
          } else {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'User not found' }));
          }
        } else {
          response.writeHead(400, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ message: 'Not valid uuid',  }));
    }
}