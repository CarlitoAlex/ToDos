package com.todomy.example.service;


import com.todomy.example.model.Role;
import com.todomy.example.model.User;
import com.todomy.example.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService{

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MailSender mailSender;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username);
    }


    public User saveUser(String username, String password, String email) {
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setUsername(username);
        user.setActive(true);
        user.setRoles(Collections.singleton(Role.USER));
        user.setEmail(email);
        user.setPassword(password);
        user.setActivationCode(UUID.randomUUID().toString());

        String message = String.format(
                "Hello, %s! \n" +
                        "Welcome to VRadiuse!\n" +
                        "Please, visit next link: http://localhost:8082/activate/%s",
                user.getUsername(),
                user.getActivationCode()
        );

        mailSender.send(user.getEmail(), "Confirmation email", message);

        userRepo.save(user);
        return user;
    }

    public User findUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public User findUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public boolean checkEmail(String email, String nick) {

        if (userRepo.findByEmail(email) == null) {
            User user = findUserByUsername(nick);
            user.setEmail(email);
            user.setActivationCode(UUID.randomUUID().toString());
            String message = String.format(
                    "Hello, %s! \n" +
                            "Welcome to myTodo!\n" +
                            "Please, visit next link: http://localhost:8081/activate/%s",
                    user.getUsername(),
                    user.getActivationCode()
            );
            mailSender.send(user.getEmail(), "Confirmation email", message);
            userRepo.save(user);
            return false;
        }
        return true;
    }

    public boolean checkUsername(String nick, String oldNick) {

        if (findUserByUsername(nick) == null) {
            User user = findUserByUsername(oldNick);
            user.setUsername(nick);
            userRepo.save(user);
            return false;
        }

        return true;
    }

    public void savePassword(String nick, String password) {
        User user = findUserByUsername(nick);
        user.setPassword(password);
        userRepo.save(user);
    }

    public void deleteUser(UUID user_id) {
        userRepo.delete(userRepo.findByUserId(user_id));
    }

    public boolean activateUser(String code) {
        User user = userRepo.findByActivationCode(code);

        if (user == null) {
            return false;
        }

        user.setActivationCode(null);

        userRepo.save(user);

        return true;
    }

}
