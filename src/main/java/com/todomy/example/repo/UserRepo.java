package com.todomy.example.repo;

import com.todomy.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.UUID;

@Transactional
public interface UserRepo extends JpaRepository<User, UUID> {
    User findByUsername(String username);

    User findByEmail(String email);

    User findByUserId(UUID user_id);

    User findByActivationCode(String code);


    @Query("SELECT points from User where username=:username")
    Long findPointsByUsername(@Param("username") String username);
}