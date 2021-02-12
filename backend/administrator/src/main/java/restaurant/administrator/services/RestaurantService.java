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

    @Autowired
    private ImageRepository imageRepository;

    @Log
    public RestaurantDao createRestaurant(RestaurantDto restaurant) throws RestaurantAlreadyExistsException {

        String restaurantName = restaurant.getName();

        Optional<RestaurantDao> byName = restaurantRepository.findByName(restaurantName);

        if (byName.isPresent())
            throw new RestaurantAlreadyExistsException(AdministratorConstants.RESTAURANT_ALREADY_EXISTS);

        RestaurantDao restaurantDao = new RestaurantDao();

        restaurantDao.setName(restaurant.getName());
        restaurantDao.setAddress(restaurant.getAddress());
        restaurantDao.setManager(restaurant.getManager());

        restaurant.getImages().forEach(image -> {
            ImageDao imageDao = new ImageDao();
            imageDao.setRestaurant(restaurantName);
            imageDao.setData(image.getBytes());

            imageRepository.save(imageDao);
        });

        return restaurantRepository.save(restaurantDao);
    }

    @Log
    public RestaurantDao updateRestaurant(RestaurantDto restaurant) throws RestaurantNotFoundException {

        String restaurantName = restaurant.getName();

        Optional<RestaurantDao> byName = restaurantRepository.findByName(restaurantName);

        if (byName.isPresent()) {

            RestaurantDao restaurantDao = byName.get();

            restaurantDao.setAddress(restaurant.getAddress());
            restaurantDao.setName(restaurant.getName());
            restaurantDao.setManager(restaurant.getManager());

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
    public RestaurantDao getRestaurantByName(String restaurantName) throws RestaurantNotFoundException {

        Optional<RestaurantDao> byName = restaurantRepository.findByName(restaurantName);

        if (byName.isPresent())
            return byName.get();
        else
            throw new RestaurantNotFoundException();
    }

    @Log
    public List<RestaurantDto> getAllRestaurants() {

        List<RestaurantDao> all = restaurantRepository.findAll();

        List<RestaurantDto> restaurants = new ArrayList<>();

        all.forEach(item -> {
            RestaurantDto restaurantDto = new RestaurantDto();

            restaurantDto.setAddress(item.getAddress());
            restaurantDto.setManager(item.getManager());
            restaurantDto.setName(item.getName());

            Optional<List<ImageDao>> byRestaurant = imageRepository.findByRestaurant(item.getName());

            if(byRestaurant.isPresent())
            {
                List<ImageDao> imageDaos = byRestaurant.get();

                List<String> images = new ArrayList<>();

                imageDaos.forEach(image -> {
                    images.add(new String(image.getData()));
                });

                restaurantDto.setImages(images);
            }
            restaurants.add(restaurantDto);
        });

        return restaurants;
    }

    @Log
    public List<RestaurantDto> getRestaurantsByManager(String manager) throws RestaurantNotFoundException {

        Optional<List<RestaurantDao>> byManager = restaurantRepository.findByManager(manager);

        if(byManager.isEmpty())
            throw new RestaurantNotFoundException();

        List<RestaurantDao> all = byManager.get();

        List<RestaurantDto> restaurants = new ArrayList<>();

        all.forEach(item -> {
            RestaurantDto restaurantDto = new RestaurantDto();

            restaurantDto.setAddress(item.getAddress());
            restaurantDto.setManager(item.getManager());
            restaurantDto.setName(item.getName());

            Optional<List<ImageDao>> byRestaurant = imageRepository.findByRestaurant(item.getName());

            if(byRestaurant.isPresent())
            {
                List<ImageDao> imageDaos = byRestaurant.get();

                List<String> images = new ArrayList<>();

                imageDaos.forEach(image -> {
                    images.add(new String(image.getData()));
                });

                restaurantDto.setImages(images);
            }
            restaurants.add(restaurantDto);
        });

        return restaurants;
    }
}
