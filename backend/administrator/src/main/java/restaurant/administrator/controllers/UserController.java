package restaurant.administrator.controllers;



import com.fasterxml.jackson.annotation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;
import restaurant.administrator.exceptions.*;
import restaurant.administrator.model.*;
import restaurant.administrator.model.dao.*;
import restaurant.administrator.model.dto.*;
import restaurant.administrator.services.*;
import restaurant.administrator.util.*;

import javax.validation.*;
import javax.validation.constraints.*;

import java.util.*;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/createUser")
    public ResponseEntity<Object> createUser(@Valid @NotNull(message = AdministratorConstants.USER_CAN_T_BE_NULL) @RequestBody UserDto userDto) throws UserAlreadyExistsException {

        UserDao userDao = userService.createUser(userDto);

        return ResponseEntity.ok(userDao);
    }

    @PostMapping("/updateUser")
    public ResponseEntity<Object> updateUser(@Valid @NotNull(message = AdministratorConstants.USER_CAN_T_BE_NULL) @RequestBody UserDto userDto) throws UserNotFoundException {

        UserDao userDao = userService.updateUser(userDto);

        return ResponseEntity.ok(userDao);
    }

    @PostMapping("/deleteUser")
    public ResponseEntity<Object> deleteUser(@Valid @NotNull(message = AdministratorConstants.USER_CAN_T_BE_NULL) @RequestBody UserDto userDto) throws UserNotFoundException {

        userService.deleteUser(userDto);

        return ResponseEntity.ok("User successfully deleted");
    }

    @GetMapping("/getUser")
    public ResponseEntity<Object> getUser(@NotNull(message = AdministratorConstants.USER_CAN_T_BE_NULL) @RequestParam(name = "username") String username) throws UserNotFoundException {

        UserDao user = userService.getUserByUsername(username);

        CustomUserDetails userDetails = new CustomUserDetails(user);

        return ResponseEntity.ok(userDetails);
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<Object> getAllUsers() {

        List<UserDto> allUsers = userService.getAllUsers();

        return ResponseEntity.ok().body(allUsers);
    }

    @GetMapping("/getUserCredentials")
    public ResponseEntity<Object> getUserCredentials(@NotNull(message = AdministratorConstants.USERNAME_CAN_T_BE_NULL) @RequestParam(name = "username") String username) throws UserNotFoundException {

        UserCredentialsDao credentials = userService.getCredentialsByUsername(username);

        return ResponseEntity.ok(credentials);
    }

    @GetMapping("/getAllProjectsByUser/{username}")
    public ResponseEntity<Object> getProjectsByUser(@NotNull @PathVariable("username") String username) throws UserNotFoundException {

        List<RestaurantDao> allProjects = userService.getProjectsByUser(username);

        return ResponseEntity.ok(allProjects);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<Object> changePassword(@NotNull(message = AdministratorConstants.USERNAME_CAN_T_BE_NULL) @RequestParam(name = "password") String password,
                                                 @NotNull(message = AdministratorConstants.USERNAME_CAN_T_BE_NULL) @RequestParam(name = "username") String username ) throws UserNotFoundException {

        userService.changePassword(username, password);

        return ResponseEntity.ok("User password successfully changed!");
    }

    @PostMapping("/changeRole")
    public ResponseEntity<Object> changeRole(@NotNull(message = AdministratorConstants.USER_CAN_T_BE_NULL) @RequestParam(name = "username") String username,
                                             @NotNull(message = AdministratorConstants.ROLE_CAN_T_BE_NULL) @RequestParam(name = "role") String role) throws UserNotFoundException {

        UserCredentialsDao credentials = userService.changeRole(username, role);

        return ResponseEntity.ok(credentials);
    }
}
