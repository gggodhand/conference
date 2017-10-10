package com.mycompany.myapp.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mycompany.myapp.domain.Presentation;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class PresentationDTO {
    @JsonProperty
    private Long id;

    @JsonProperty
    private String name;

    @JsonProperty
    private String category;

    @JsonProperty
    private Set<UserDTO> users = new HashSet<>();

    public PresentationDTO() {

    }

    public PresentationDTO(Presentation presentation) {
        this.id = presentation.getId();
        this.name = presentation.getName();
        this.category = presentation.getCategory();
        this.users = presentation.getUsers().stream().map(u -> new UserDTO(u)).collect(Collectors.toSet());
    }
}
