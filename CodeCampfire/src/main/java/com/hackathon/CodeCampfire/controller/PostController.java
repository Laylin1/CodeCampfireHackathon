package com.hackathon.CodeCampfire.controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.CodeCampfire.Repo.PostRepo;
import com.hackathon.CodeCampfire.Repo.PostRepoProjects;
import com.hackathon.CodeCampfire.modelData.AuthDTO;
import com.hackathon.CodeCampfire.modelData.LoginDTO;
import com.hackathon.CodeCampfire.modelData.ProjectsTable;
import com.hackathon.CodeCampfire.modelData.Users;

import jakarta.servlet.http.HttpServletResponse;


@RestController
public class PostController {

    @Autowired
    PostRepo prepo;

    @Autowired
    PostRepoProjects preroProj;

    //перенаправление при обращении к корню проекта
    @RequestMapping(value="/")
    public void redirect(HttpServletResponse response) throws IOException{
        response.sendRedirect("/swagger-ui.html");
    }

    
    //Получение человека по Id
   @GetMapping("/getAuth/{id}")
    public ResponseEntity<Users> getAuthData(@PathVariable String id) {
        Optional<Users> userOpt = prepo.findById(id);

        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    //Отправка всех данных
    @PostMapping("/postAllData")
    public Users postAllData(@RequestBody Users post){
        return prepo.save(post);
    }


    //Отправка данных для авторизации
    @PostMapping("/postAuthData")
    public Users postAuth(@RequestBody AuthDTO dto){

        Users user = new Users();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPasswordHash(dto.getPasswordHash());

        return prepo.save(user);
    }


    // отправляет данные от логина
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO dto) {
        Users user = prepo.findByEmail(dto.getEmail());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        if (!dto.getPassword().equals(user.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
        }

        return ResponseEntity.ok("Login successful!");
    }



    @PostMapping("/ProjectsTable")
    public ProjectsTable postproj(@RequestBody ProjectsTable post){
        return preroProj.save(post);
    }

}
