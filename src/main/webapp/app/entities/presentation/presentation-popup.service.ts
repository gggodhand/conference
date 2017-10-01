import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Presentation } from './presentation.model';
import { PresentationService } from './presentation.service';

@Injectable()
export class PresentationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private presentationService: PresentationService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.presentationService.find(id).subscribe((presentation) => {
                    presentation.startTime = this.datePipe
                        .transform(presentation.startTime, 'yyyy-MM-ddTHH:mm:ss');
                    presentation.endTime = this.datePipe
                        .transform(presentation.endTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.presentationModalRef(component, presentation);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.presentationModalRef(component, new Presentation());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    presentationModalRef(component: Component, presentation: Presentation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.presentation = presentation;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
