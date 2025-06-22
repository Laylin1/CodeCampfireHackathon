package com.hackathon.CodeCampfire.Repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.hackathon.CodeCampfire.modelData.ProjectsTable;

public interface PostRepoProjects extends MongoRepository<ProjectsTable, String> {
    List<ProjectsTable> findByAuthor(String author);
}
