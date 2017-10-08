import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Room } from './room.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RoomService {

    private resourceUrl = SERVER_API_URL + 'api/rooms';

    constructor(private http: Http) { }

    create(room: Room): Observable<Room> {
        const copy = this.convert(room);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(room: Room): Observable<Room> {
        const copy = this.convert(room);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Room> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryWithPresentations(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(SERVER_API_URL + 'api/rooms/presentations', options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(room: Room): Room {
        const copy: Room = Object.assign({}, room);
        return copy;
    }
}
