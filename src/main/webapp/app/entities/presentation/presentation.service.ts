import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Presentation } from './presentation.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PresentationService {

    private resourceUrl = SERVER_API_URL + 'api/presentations';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(presentation: Presentation): Observable<Presentation> {
        const copy = this.convert(presentation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(presentation: Presentation): Observable<Presentation> {
        const copy = this.convert(presentation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Presentation> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.startTime = this.dateUtils
            .convertDateTimeFromServer(entity.startTime);
        entity.endTime = this.dateUtils
            .convertDateTimeFromServer(entity.endTime);
    }

    private convert(presentation: Presentation): Presentation {
        const copy: Presentation = Object.assign({}, presentation);

        copy.startTime = this.dateUtils.toDate(presentation.startTime);

        copy.endTime = this.dateUtils.toDate(presentation.endTime);
        return copy;
    }
}
