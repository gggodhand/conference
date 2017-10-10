package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.Room;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class RoomDTO {
    public RoomDTO() {

    }

    public RoomDTO(Room room) {
        this.id = room.getId();
        this.name = room.getName();
        this.schedules = room.getSchedules().stream().map(s -> new ScheduleDTO(s)).collect(Collectors.toSet());
    }

    private Long id;
    private String name;
    private Set<ScheduleDTO> schedules = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ScheduleDTO> getSchedules() {
        return schedules;
    }

    public void setSchedules(Set<ScheduleDTO> schedules) {
        this.schedules = schedules;
    }
}
