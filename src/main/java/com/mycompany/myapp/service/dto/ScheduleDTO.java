package com.mycompany.myapp.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mycompany.myapp.domain.Presentation;
import com.mycompany.myapp.domain.Schedule;

import java.time.ZonedDateTime;

public class ScheduleDTO {
    @JsonProperty
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
    private ZonedDateTime startTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
    private ZonedDateTime endTime;

    @JsonProperty
    private Presentation presentation;

    public ScheduleDTO() {

    }

    public ScheduleDTO(Schedule schedule) {
        this.id = schedule.getId();
        this.startTime = schedule.getStartTime();
        this.endTime = schedule.getEndTime();
        this.presentation = schedule.getPresentation();
    }
}
