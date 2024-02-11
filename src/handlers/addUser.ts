import http from 'http';
import { User } from '../user';
import { v4 as uuidv4 } from 'uuid';

export const validation = (user: User): string[] => {
    const errors: string[] = [];
    if (!user.username) {
      errors.push('Username');
    }
    if (!user.age) {
      errors.push('Age');
    }
    if (!user.hobbies) {
      errors.push('Hobbies');
    }
    return errors;
  };

export const addUser = ( requestData: User, response: http.ServerResponse, data: User[] ) => {
    if (validation(requestData).length === 0) {
      const newUser: User = { id: uuidv4(), ...requestData };
      data.push(newUser);
      response.writeHead(201, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(newUser));
      if (process.send) {
        process.send(data);
        }
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(
        JSON.stringify({
          message:
            'Bad request, not contain required fields: ' + validation(requestData),
        })
      );
    }
  };
