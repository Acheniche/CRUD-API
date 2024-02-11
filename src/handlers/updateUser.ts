import http from 'http';
import { User } from '../user';
import { validate } from 'uuid';

export const updateUser = async (
    updatedInfo: User, uuid: string, response: http.ServerResponse, data: User[] ) => {
    if (validate(uuid)) {
      const userIndex: number = data.findIndex((user) => user.id === uuid);
      if (userIndex !== -1) {
        data[userIndex] = { ...data[userIndex], ...updatedInfo };
        data[userIndex] = { ...data[userIndex], age: Number(data[userIndex].age),
        };
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(data[userIndex]));
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'User not found' }));
        if (process.send) {
        process.send(data);
        }
      }
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Not uuid' }));
    }
  };