package restaurant.administrator.services;


import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import restaurant.administrator.aspects.*;
import restaurant.administrator.exceptions.*;
import restaurant.administrator.model.dao.*;
import restaurant.administrator.model.dto.*;
import restaurant.administrator.repository.*;
import restaurant.administrator.util.*;

import java.util.*;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private UserRepository userRepository;

    @Log
    public RestaurantDao createRestaurant(RestaurantDto restaurant) throws RestaurantAlreadyExistsException {

        String restaurantName = restaurant.getName();

        Optional<RestaurantDao> byName = restaurantRepository.findByName(restaurantName);

        if (byName.isPresent())
            throw new RestaurantAlreadyExistsException(AdministratorConstants.RESTAURANT_ALREADY_EXISTS);

        RestaurantDao restaurantDao = new RestaurantDao();

        restaurantDao.setName(restaurant.getName());
        restaurantDao.setKeyword(restaurant.getKeyword());
        restaurantDao.setManager(restaurant.getManager());

        return restaurantRepository.save(restaurantDao);
    }

    @Log
    public RestaurantDao updateRestaurant(RestaurantDto restaurant) throws RestaurantNotFoundException {

        String restaurantName = restaurant.getName();

        Optional<RestaurantDao> byName = restaurantRepository.findByName(restaurantName);

        if (byName.isPresent()) {

            RestaurantDao restaurantDao = byName.get();

            restaurantDao.setManager(restaurant.getManager());
            restaurantDao.setKeyword(restaurant.getKeyword());
            restaurantDao.setName(restaurant.getName());

            return restaurantRepository.save(restaurantDao);

        } else
            throw new RestaurantNotFoundException(AdministratorConstants.RESTAURANT_NOT_EXISTS);
    }

    public void deleteRestaurant(RestaurantDto restaurant) throws RestaurantNotFoundException {

        String restaurantName = restaurant.getName();

        Optional<RestaurantDao> byName = restaurantRepository.findByName(restaurantName);

        if (byName.isPresent()) {

            RestaurantDao restaurantDao = byName.get();

            restaurantRepository.delete(restaurantDao);

        } else
            throw new RestaurantNotFoundException(AdministratorConstants.RESTAURANT_NOT_EXISTS);
    }

    @Log
    public void assignUser(UserDto userDto, String restaurantName) throws RestaurantNotFoundException {

        Optional<RestaurantDao> byName = restaurantRepository.findByName(restaurantName);

        Optional<UserDao> byUsername = userRepository.findByUsername(userDto.getUsername());

        if (byName.isPresent()) {

            RestaurantDao restaurantDao = byName.get();

            UserDao userDao = new UserDao();

            userDao.setUsername(userDto.getUsername());
            userDao.setFirstname(userDto.getFirstname());
            userDao.setLastname(userDto.getLastname());
            userDao.setEmail(userDto.getEmail());

            List<UserDao> participants = restaurantDao.getParticipants();

            participants.add(userDao);

            restaurantRepository.save(restaurantDao);

            if (byUsername.isPresent()) {

                UserDao user = byUsername.get();

                userRepository.save(user);
            }
        }
        else
            throw new RestaurantNotFoundException();
    }


    @Log
    public RestaurantDao getRestaurantByName(String restaurantName) throws RestaurantNotFoundException {

        Optional<RestaurantDao> byName = restaurantRepository.findByName(restaurantName);

        if (byName.isPresent())
            return byName.get();
        else
            throw new RestaurantNotFoundException();
    }

    @Log
    public List<RestaurantDao> getAllRestaurants() {

        return restaurantRepository.findAll();
    }

    @Log
    public List<RestaurantDao> getRestaurantsByManager(String manager) throws RestaurantNotFoundException {

        Optional<List<RestaurantDao>> byManager = restaurantRepository.findByManager(manager);

        if (byManager.isPresent())
            return byManager.get();

        else
            throw new RestaurantNotFoundException();
    }
}
