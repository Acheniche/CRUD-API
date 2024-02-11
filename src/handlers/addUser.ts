import http from 'http';
import { User } from '../user';
import { v4 as uuidv4 } from 'uuid';

export const validation = (user: User): string[] => {
    const errors: string[] = [];
    if (!user.Username) {
      errors.push('Username');
    }
    if (!user.Age) {
      errors.push('Age');
    }
    if (!user.Hobbies) {
      errors.push('Hobbies');
    }
    return errors;
  };

export const addUser = ( requestData: User, response: http.ServerResponse, data: User[] ) => {
    if (validation(requestData).length === 0) {
      const newUser: User = { Id: uuidv4(), ...requestData };
      data.push(newUser);
      response.writeHead(201, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(newUser));
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
