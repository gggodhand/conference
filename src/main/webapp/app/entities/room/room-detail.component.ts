import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Room } from './room.model';
import { RoomService } from './room.service';

@Component({
    selector: 'jhi-room-detail',
    templateUrl: './room-detail.component.html'
})
export class RoomDetailComponent implements OnInit, OnDestroy {

    room: Room;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private roomService: RoomService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRooms();
    }

    load(id) {
        this.roomService.find(id).subscribe((room) => {
            this.room = room;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRooms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'roomListModification',
            (response) => this.load(this.room.id)
        );
    }
}
