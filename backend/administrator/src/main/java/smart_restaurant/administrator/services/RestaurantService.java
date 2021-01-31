package smart_restaurant.administrator.services;
//package agile.administrator.services;


import smart_restaurant.administrator.aspects.*;
import smart_restaurant.administrator.exceptions.*;
import smart_restaurant.administrator.model.dao.*;
import smart_restaurant.administrator.model.dto.*;
import smart_restaurant.administrator.repository.*;
import smart_restaurant.administrator.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class RestaurantService {
    @Autowired
    private RestaurantRepository restaurantrepository;
    @Autowired
    private UserRepository userrepository;

    @Log
    public RestaurantDao createRestaurant(RestaurantDto project) throws RestaurantAlreadyExistsException {
        String projectName = project.getName();
        Optional<RestaurantDao> byName = restaurantrepository.findByName(project);
        if (byName.isPresent())
            throw new RestaurantAlreadyExistsException(AdministratorConstants.RESTAURANT_ALREADY_EXISTS);
        RestaurantDao projectDao = new RestaurantDao();

        projectDao.setName(project.getName());
        projectDao.setKeyword(project.getKeyword());
        projectDao.setManager(project.getManager());

        return restaurantrepository.save(projectDao);

    }

    @Log
    public RestaurantDao updateRestaurant(RestaurantDto project) throws ProjectNotFoundException {
        String projectName = project.getName();
        Optional<RestaurantDao> byName = restaurantrepository.findByName(project);
        if (byName.isPresent()) {

            RestaurantDao projectDao = byName.get();
            projectDao.setManager(project.getManager());
            projectDao.setKeyword(project.getKeyword());
            projectDao.setName(project.getName());
            return restaurantrepository.save(projectDao);
        } else
            throw new RestaurantNotFoundException(AdministratorConstants.RESTAURANT_NOT_EXISTS);
    }

    public void deleteRestaurant(RestaurantDto project) throws RestaurantNotFoundException {

        String projectName = project.getName();
        Optional<RestaurantDao> byName = restaurantrepository.findByName(projectName);
        if (byName.isPresent()) {
            RestaurantDao projectDao = byName.get();
            restaurantrepository.delete(projectDao);
        } else
            throw new RestaurantNotFoundException(AdministratorConstants.RESTAURANT_NOT_EXISTS);
    }


    @Log
    public void assignUser(UserDto userDto, String projectName) throws RestaurantNotFoundException {

        Optional<RestaurantDao> byName = restaurantrepository.findByName(projectName);
        Optional<UserDao> byUsername = userrepository.findByUsername(userDto.getUsername());
        if (byName.isPresent()) {

            RestaurantDao projectDao = byName.get();

            UserDao userDao = new UserDao();

            userDao.setUsername(userDto.getUsername());
            userDao.setFirstname(userDto.getFirstname());
            userDao.setLastname(userDto.getLastname());
            userDao.setEmail(userDto.getEmail());
            List<UserDao> participants = projectDao.getParticipants();
            participants.add(userDao);
            restaurantrepository.save(projectDao);
            if (byUsername.isPresent()) {

                UserDao user = byUsername.get();

                user.getEnrolledProjects().add(projectDao);

                userRepository.save(user);
            }
        } else
            throw new RestaurantNotFoundException();
    }


    @Log
    public RestaurantDao getRestaurantByName(String restaurantName) throws RestaurantNotFoundException {

        Optional<RestaurantDao> byName = restaurantrepository.findByName(restaurantName);
        //dohvat restorana preko imena
        if (byName.isPresent())
            return byName.get();
        else
            throw new RestaurantNotFoundException();
    }

    @Log
    public List<RestaurantDao> getAllProjects() {

        return restaurantrepository.findAll();
    }

    @Log
    public List<RestaurantDao> getRestaurantByManager(String manager) throws RestaurantNotFoundException {
        Optional<List<RestaurantDao>> byManager = restaurantrepository.findByManager(manager);

        if (byManager.isPresent())
            return byManager.get();

        else
            throw new RestaurantNotFoundException();
    }
}

