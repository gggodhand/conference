package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Schedule;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the Schedule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findAllByRoom_id(Long id);

    @Query("select s from Schedule s where (s.endTime >= ?1 and s.startTime <= ?1) or (s.endTime <= ?1 and s.startTime >= ?2)")
    Optional<Schedule> findByTimeInterval(ZonedDateTime startTime, ZonedDateTime endTime);
}
