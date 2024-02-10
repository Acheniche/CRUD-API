import { User } from '../user';
import http from 'http';

export const getUsers = async(response: http.ServerResponse, data: User[]) => {
    try {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(data));
    } catch (e) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Not found' }));
    }
}