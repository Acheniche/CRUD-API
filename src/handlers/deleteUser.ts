import http from 'http';
import { User } from '../user';
import { validate } from 'uuid';

export const deleteUser = (
    uuid: string, response: http.ServerResponse, data: User[] ) => {
    if (validate(uuid)) {
      const userIndex: number = data.findIndex((user) => user.id === uuid);
      if (userIndex !== -1) {
        response.writeHead(204, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'User Deleted' }));
        return userIndex;
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'User not found' }));
      }
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Not uuid' }));
    }
    return false;
  };