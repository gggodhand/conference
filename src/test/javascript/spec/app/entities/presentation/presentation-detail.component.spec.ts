/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ConferenceTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PresentationDetailComponent } from '../../../../../../main/webapp/app/entities/presentation/presentation-detail.component';
import { PresentationService } from '../../../../../../main/webapp/app/entities/presentation/presentation.service';
import { Presentation } from '../../../../../../main/webapp/app/entities/presentation/presentation.model';

describe('Component Tests', () => {

    describe('Presentation Management Detail Component', () => {
        let comp: PresentationDetailComponent;
        let fixture: ComponentFixture<PresentationDetailComponent>;
        let service: PresentationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceTestModule],
                declarations: [PresentationDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PresentationService,
                    JhiEventManager
                ]
            }).overrideTemplate(PresentationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PresentationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresentationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Presentation(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.presentation).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
