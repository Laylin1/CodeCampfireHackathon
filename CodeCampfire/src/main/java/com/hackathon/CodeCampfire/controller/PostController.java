package com.hackathon.CodeCampfire.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hackathon.CodeCampfire.Repo.PostRepo;
import com.hackathon.CodeCampfire.Repo.PostRepoChallenges;
import com.hackathon.CodeCampfire.Repo.PostRepoProjects;
import com.hackathon.CodeCampfire.modelData.AuthDTO;
import com.hackathon.CodeCampfire.modelData.ChallengeCreateDTO;
import com.hackathon.CodeCampfire.modelData.Challenges;
import com.hackathon.CodeCampfire.modelData.LoginDTO;
import com.hackathon.CodeCampfire.modelData.ProjectCreateDTO;
import com.hackathon.CodeCampfire.modelData.ProjectsTable;
import com.hackathon.CodeCampfire.modelData.Users;

import jakarta.servlet.http.HttpServletResponse;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    @Autowired
    PostRepo prepo;

    @Autowired
    private PasswordEncoder passwordEncoder;
    

    @Autowired
    PostRepoProjects preroProj;

    @Autowired
    PostRepoChallenges preroChallenges;

    //перенаправление при обращении к корню проекта
    @RequestMapping(value="/")
    public void redirect(HttpServletResponse response) throws IOException{
        response.sendRedirect("/swagger-ui.html");
    }

    
    //Получение человека по Id
    @GetMapping("/getUser/{id}")
    @CrossOrigin
    public ResponseEntity<Users> getUserData(@PathVariable String id) {
        Optional<Users> userOpt = prepo.findById(id);

        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
        

    //Отправка данных для авторизации
    @PostMapping("/postAuthData")
    @CrossOrigin
    public Users postAuth(@RequestBody AuthDTO dto) {
        Users user = new Users();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPasswordHash(passwordEncoder.encode(dto.getPasswordHash())); // 🔐 ВАЖНО!

        return prepo.save(user);
    }

    // отправляет данные от логина
    @PostMapping("/login")
    @CrossOrigin
    public ResponseEntity<String> login(@RequestBody LoginDTO dto) {
        Optional<Users> userOpt = prepo.findByEmail(dto.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        Users user = userOpt.get();

    if (!passwordEncoder.matches(dto.getPassword(), user.getPasswordHash())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
    }

    
        return ResponseEntity.ok(userOpt.get().getId());
    }


    @GetMapping("/users")
    @CrossOrigin
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = prepo.findAll();
        return ResponseEntity.ok(users);
    }


    @PostMapping("/createProject")
    @CrossOrigin
    public ProjectsTable postproj(@RequestBody ProjectCreateDTO post){
        return preroProj.save(post.toProjectsTable());
    }


    @GetMapping("/projects")
    @CrossOrigin
    public ResponseEntity<List<ProjectsTable>> getAllProjects() 
    {
        List<ProjectsTable> projects = preroProj.findAll();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/getUserProjects/{id}")
    @CrossOrigin
    public ResponseEntity<List<ProjectsTable>> getUserProjects(@PathVariable String id) {
        List<ProjectsTable> projects = preroProj.findByAuthor(id);
        return ResponseEntity.ok(projects);
    }


    @PostMapping("/createChallenge")
    @CrossOrigin
    public ResponseEntity<String> createChallenge(@RequestBody ChallengeCreateDTO challenge) {
        preroChallenges.save(challenge.toChallenges());
        return ResponseEntity.ok("Challenge created successfully!");
    }

    @GetMapping("/challenges")
    @CrossOrigin
    public ResponseEntity<List<Challenges>> getAllChallenges() 
    {
        List<Challenges> challenges = preroChallenges.findAll();
        return ResponseEntity.ok(challenges);
    }

    @GetMapping("/getUserChallenges/{id}")
    @CrossOrigin
    public ResponseEntity<List<Challenges>> getUserChallenges(@PathVariable String id) {
        List<Challenges> challenges = preroChallenges.findByAuthor(id);
        return ResponseEntity.ok(challenges);
    }

}
