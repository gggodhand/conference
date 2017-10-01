package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.ConferenceApp;

import com.mycompany.myapp.domain.Presentation;
import com.mycompany.myapp.repository.PresentationRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PresentationResource REST controller.
 *
 * @see PresentationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConferenceApp.class)
public class PresentationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_START_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private PresentationRepository presentationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPresentationMockMvc;

    private Presentation presentation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PresentationResource presentationResource = new PresentationResource(presentationRepository);
        this.restPresentationMockMvc = MockMvcBuilders.standaloneSetup(presentationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Presentation createEntity(EntityManager em) {
        Presentation presentation = new Presentation()
            .name(DEFAULT_NAME)
            .category(DEFAULT_CATEGORY)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME);
        return presentation;
    }

    @Before
    public void initTest() {
        presentation = createEntity(em);
    }

    @Test
    @Transactional
    public void createPresentation() throws Exception {
        int databaseSizeBeforeCreate = presentationRepository.findAll().size();

        // Create the Presentation
        restPresentationMockMvc.perform(post("/api/presentations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presentation)))
            .andExpect(status().isCreated());

        // Validate the Presentation in the database
        List<Presentation> presentationList = presentationRepository.findAll();
        assertThat(presentationList).hasSize(databaseSizeBeforeCreate + 1);
        Presentation testPresentation = presentationList.get(presentationList.size() - 1);
        assertThat(testPresentation.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPresentation.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testPresentation.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testPresentation.getEndTime()).isEqualTo(DEFAULT_END_TIME);
    }

    @Test
    @Transactional
    public void createPresentationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = presentationRepository.findAll().size();

        // Create the Presentation with an existing ID
        presentation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPresentationMockMvc.perform(post("/api/presentations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presentation)))
            .andExpect(status().isBadRequest());

        // Validate the Presentation in the database
        List<Presentation> presentationList = presentationRepository.findAll();
        assertThat(presentationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = presentationRepository.findAll().size();
        // set the field null
        presentation.setName(null);

        // Create the Presentation, which fails.

        restPresentationMockMvc.perform(post("/api/presentations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presentation)))
            .andExpect(status().isBadRequest());

        List<Presentation> presentationList = presentationRepository.findAll();
        assertThat(presentationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = presentationRepository.findAll().size();
        // set the field null
        presentation.setStartTime(null);

        // Create the Presentation, which fails.

        restPresentationMockMvc.perform(post("/api/presentations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presentation)))
            .andExpect(status().isBadRequest());

        List<Presentation> presentationList = presentationRepository.findAll();
        assertThat(presentationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = presentationRepository.findAll().size();
        // set the field null
        presentation.setEndTime(null);

        // Create the Presentation, which fails.

        restPresentationMockMvc.perform(post("/api/presentations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presentation)))
            .andExpect(status().isBadRequest());

        List<Presentation> presentationList = presentationRepository.findAll();
        assertThat(presentationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPresentations() throws Exception {
        // Initialize the database
        presentationRepository.saveAndFlush(presentation);

        // Get all the presentationList
        restPresentationMockMvc.perform(get("/api/presentations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(presentation.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(sameInstant(DEFAULT_START_TIME))))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(sameInstant(DEFAULT_END_TIME))));
    }

    @Test
    @Transactional
    public void getPresentation() throws Exception {
        // Initialize the database
        presentationRepository.saveAndFlush(presentation);

        // Get the presentation
        restPresentationMockMvc.perform(get("/api/presentations/{id}", presentation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(presentation.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.startTime").value(sameInstant(DEFAULT_START_TIME)))
            .andExpect(jsonPath("$.endTime").value(sameInstant(DEFAULT_END_TIME)));
    }

    @Test
    @Transactional
    public void getNonExistingPresentation() throws Exception {
        // Get the presentation
        restPresentationMockMvc.perform(get("/api/presentations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePresentation() throws Exception {
        // Initialize the database
        presentationRepository.saveAndFlush(presentation);
        int databaseSizeBeforeUpdate = presentationRepository.findAll().size();

        // Update the presentation
        Presentation updatedPresentation = presentationRepository.findOne(presentation.getId());
        updatedPresentation
            .name(UPDATED_NAME)
            .category(UPDATED_CATEGORY)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME);

        restPresentationMockMvc.perform(put("/api/presentations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPresentation)))
            .andExpect(status().isOk());

        // Validate the Presentation in the database
        List<Presentation> presentationList = presentationRepository.findAll();
        assertThat(presentationList).hasSize(databaseSizeBeforeUpdate);
        Presentation testPresentation = presentationList.get(presentationList.size() - 1);
        assertThat(testPresentation.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPresentation.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testPresentation.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testPresentation.getEndTime()).isEqualTo(UPDATED_END_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingPresentation() throws Exception {
        int databaseSizeBeforeUpdate = presentationRepository.findAll().size();

        // Create the Presentation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPresentationMockMvc.perform(put("/api/presentations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presentation)))
            .andExpect(status().isCreated());

        // Validate the Presentation in the database
        List<Presentation> presentationList = presentationRepository.findAll();
        assertThat(presentationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePresentation() throws Exception {
        // Initialize the database
        presentationRepository.saveAndFlush(presentation);
        int databaseSizeBeforeDelete = presentationRepository.findAll().size();

        // Get the presentation
        restPresentationMockMvc.perform(delete("/api/presentations/{id}", presentation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Presentation> presentationList = presentationRepository.findAll();
        assertThat(presentationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Presentation.class);
        Presentation presentation1 = new Presentation();
        presentation1.setId(1L);
        Presentation presentation2 = new Presentation();
        presentation2.setId(presentation1.getId());
        assertThat(presentation1).isEqualTo(presentation2);
        presentation2.setId(2L);
        assertThat(presentation1).isNotEqualTo(presentation2);
        presentation1.setId(null);
        assertThat(presentation1).isNotEqualTo(presentation2);
    }
}
