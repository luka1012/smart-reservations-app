package restaurant.administrator.services;


import org.modelmapper.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.Transactional;
import restaurant.administrator.aspects.*;
import restaurant.administrator.exceptions.*;
import restaurant.administrator.model.*;
import restaurant.administrator.model.dao.*;
import restaurant.administrator.model.dto.*;
import restaurant.administrator.repository.*;
import restaurant.administrator.util.*;

import javax.transaction.*;
import java.util.*;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserCredentialsRepository userCredentialsRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ModelMapper mapper;

    @Log
    @Transactional
    public UserDetails loadUserByUsername(String username) {

        if (username == null)
            throw new SecurityException(AdministratorConstants.USERNAME_CAN_T_BE_NULL);

        Optional<UserDao> userDao = userRepository.findByUsername(username);

        if (userDao.isPresent()) {

            UserDao user = userDao.get();

            Optional<UserCredentialsDao> userCredentials = userCredentialsRepository.findByUsername(user.getUsername());

            if (userCredentials.isPresent()) {

                user.setCredentials(userCredentials.get());

                return new CustomUserDetails(user);
            }

            return null;
        }
        else
            throw new SecurityException("User not found!");
    }

    @Log
    public UserDao createUser(UserDto userDto) throws UserAlreadyExistsException {

        Optional<UserDao> byUsername = userRepository.findByUsername(userDto.getUsername());

        if (byUsername.isPresent())
            throw new UserAlreadyExistsException("User already exists!");

        saveUserCredentials(userDto);

        return saveUser(userDto);
    }

    @Log
    public UserDao updateUser(UserDto userDto) throws UserNotFoundException {

        Optional<UserDao> byUsername = userRepository.findByUsername(userDto.getUsername());

        if (byUsername.isPresent()) {

            UserDao userDao = byUsername.get();

            userDao.setFirstname(userDto.getFirstname());
            userDao.setLastname(userDto.getLastname());
            userDao.setEmail(userDto.getEmail());

            Optional<UserCredentialsDao> credentials = userCredentialsRepository.findByUsername(userDto.getUsername());

            if (credentials.isPresent()) {
                UserCredentialsDao userCredentialsDao = credentials.get();

                userCredentialsDao.setPassword(userDto.getPassword());
            }

            return userRepository.save(userDao);

        } else
            throw new UserNotFoundException(AdministratorConstants.USER_NOT_EXISTS);
    }

    @Log
    public void deleteUser(UserDto userDto) throws UserNotFoundException {

        Optional<UserDao> byUsername = userRepository.findByUsername(userDto.getUsername());

        if (byUsername.isPresent()) {

            UserDao userDao = byUsername.get();

            userRepository.delete(userDao);
        } else
            throw new UserNotFoundException(AdministratorConstants.USER_NOT_EXISTS);
    }

    @Log
    public void changePassword(String username, @LogIgnore String password) throws UserNotFoundException {

        Optional<UserCredentialsDao> userCredentials = userCredentialsRepository.findByUsername(username);

        if (userCredentials.isPresent()) {

            UserCredentialsDao userCredentialsDao = userCredentials.get();

            userCredentialsDao.setPassword(password);

            userCredentialsRepository.save(userCredentialsDao);
        } else
            throw new UserNotFoundException(AdministratorConstants.USER_NOT_EXISTS);
    }

    @Log
    public UserCredentialsDao changeRole(String username, @LogIgnore String role) throws UserNotFoundException {

        Optional<UserCredentialsDao> byUsername = userCredentialsRepository.findByUsername(username);

        if (byUsername.isPresent()) {

            UserCredentialsDao credentials = byUsername.get();

            credentials.setRole(role);

            return userCredentialsRepository.save(credentials);
        }

        throw new UserNotFoundException(AdministratorConstants.USER_NOT_EXISTS);
    }

    @Log
    public List<RestaurantDao> getProjectsByUser(String username) throws UserNotFoundException {

        Optional<UserDao> byUsername = userRepository.findByUsername(username);

        if(byUsername.isPresent())
            return byUsername.get().getEnrolledProjects();

        else
            throw new UserNotFoundException();
    }

    @Log
    public UserDao getUserByUsername(String username) throws UserNotFoundException {

        Optional<UserDao> byUsername = userRepository.findByUsername(username);

        if (byUsername.isPresent())
            return byUsername.get();
        else
            throw new UserNotFoundException(AdministratorConstants.USER_NOT_EXISTS);
    }

    @Log
    public UserDto getUserData(String username) throws UserNotFoundException {

        Optional<UserDao> byUsername = userRepository.findByUsername(username);

        if (byUsername.isPresent()) {

            UserDto user = mapper.map(byUsername.get(), UserDto.class);

            Optional<ImageDao> byOwner = imageRepository.findByOwner(username);

            if (byOwner.isPresent()) {
                ImageDao imageDao = byOwner.get();

                user.setProfilePhoto(new String(imageDao.getData()));
            }

            return user;
        }
        else
            throw new UserNotFoundException("User for specified username does not exist!");
    }

    @Log
    public List<UserDto> getAllUsers() {

        List<UserDao> all = userRepository.findAll();

        List<UserDto> result = new ArrayList<>();

        all.forEach(item -> {

            String username = item.getUsername();

            Optional<UserCredentialsDao> byUsername = userCredentialsRepository.findByUsername(username);

            byUsername.ifPresent(item::setCredentials);
        });

        all.forEach(user -> {
            UserDto userDto = new UserDto();
            userDto.setFirstname(user.getFirstname());
            userDto.setLastname(user.getLastname());
            userDto.setEmail(user.getEmail());
            userDto.setRole(user.getCredentials().getRole());
            userDto.setUsername(user.getUsername());

            result.add(userDto);
        });

        return result;
    }

    @Log
    public UserCredentialsDao getCredentialsByUsername(String username) throws UserNotFoundException {

        Optional<UserCredentialsDao> byUsername = userCredentialsRepository.findByUsername(username);

        if (byUsername.isPresent())
            return byUsername.get();
        else
            throw new UserNotFoundException(AdministratorConstants.USER_NOT_EXISTS);
    }

    @Log
    private void saveUserCredentials(UserDto userDto) {

        UserCredentialsDao userCredentials = new UserCredentialsDao();
        userCredentials.setUsername(userDto.getUsername());
        userCredentials.setPassword(encoder.encode(userDto.getPassword()));
        userCredentials.setRole(userDto.getRole());

        userCredentialsRepository.save(userCredentials);
    }

    @Log
    private UserDao saveUser(UserDto userDto) {

        UserDao userDao = new UserDao();
        userDao.setUsername(userDto.getUsername());
        userDao.setFirstname(userDto.getFirstname());
        userDao.setLastname(userDto.getLastname());
        userDao.setEmail(userDto.getEmail());

        if(userDto.getProfilePhoto() != null) {
            ImageDao image = new ImageDao();
            image.setData(userDto.getProfilePhoto().getBytes());
            image.setOwner(userDto.getUsername());

            imageRepository.save(image);
        }

        return userRepository.save(userDao);
    }
}
