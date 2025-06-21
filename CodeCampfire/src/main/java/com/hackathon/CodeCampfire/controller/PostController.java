package com.hackathon.CodeCampfire.controller;

import java.io.IOException;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.CodeCampfire.Repo.PostRepo;
import com.hackathon.CodeCampfire.modelData.AuthDTO;
import com.hackathon.CodeCampfire.modelData.LoginDTO;
import com.hackathon.CodeCampfire.modelData.Users;

import jakarta.servlet.http.HttpServletResponse;


@RestController
public class PostController {

    @Autowired
    PostRepo prepo;;

    //перенаправление при обращении к корню проекта
    @RequestMapping(value="/")
    public void redirect(HttpServletResponse response) throws IOException{
        response.sendRedirect("/swagger-ui.html");
    }

    
    //Получение всех данных
    @GetMapping("/getAuth")
    public List<Users> getAuthData(){
        return prepo.findAll();
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


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
        Users user = prepo.findByEmail(dto.getEmail());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        boolean passwordMatches = BCrypt.checkpw(dto.getPassword(), user.getPasswordHash());
        if (!passwordMatches) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        return ResponseEntity.ok("Login successful");
    }



}
