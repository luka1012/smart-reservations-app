package restaurant.administrator.controllers;



import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;
import restaurant.administrator.exceptions.*;
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
@RequestMapping("/v1/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping("/createRestaurant")
    public ResponseEntity<Object> createRestaurant(@Valid @NotNull(message = AdministratorConstants.RESTAURANT_CAN_T_BE_NULL) @RequestBody RestaurantDto restaurant) throws RestaurantAlreadyExistsException {

        RestaurantDao result = restaurantService.createRestaurant(restaurant);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/updateRestaurant")
    public ResponseEntity<Object> updateRestaurant(@Valid @NotNull(message = AdministratorConstants.RESTAURANT_CAN_T_BE_NULL) @RequestBody RestaurantDto restaurant) throws RestaurantNotFoundException {

        RestaurantDao result = restaurantService.updateRestaurant(restaurant);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/deleteRestaurant")
    public ResponseEntity<Object> deleteRestaurant(@Valid @NotNull(message = AdministratorConstants.RESTAURANT_CAN_T_BE_NULL) @RequestBody RestaurantDto restaurant) throws RestaurantNotFoundException {

        restaurantService.deleteRestaurant(restaurant);

        return ResponseEntity.ok("Restaurant successfully deleted");
    }

    @PostMapping("/assignUser/{restaurantName}")
    public ResponseEntity<Object> assignUser(@Valid @NotNull(message = AdministratorConstants.RESTAURANT_CAN_T_BE_NULL) @RequestBody UserDto user, @NotNull @PathVariable("restaurantName") String restaurantName) throws RestaurantNotFoundException {

        restaurantService.assignUser(user, restaurantName);

        return ResponseEntity.ok("User assigned to restaurant");
    }

    @GetMapping("/getAllRestaurants")
    public ResponseEntity<Object> getRestaurants() {

        List<RestaurantDao> allRestaurants = restaurantService.getAllRestaurants();

        return ResponseEntity.ok(allRestaurants);
    }


    @GetMapping("/getRestaurant")
    public ResponseEntity<Object> getRestaurant(@NotNull(message = AdministratorConstants.RESTAURANT_NAME_CAN_T_BE_NULL) @RequestParam(name = "restaurantName") String restaurantName) throws RestaurantNotFoundException {

        RestaurantDao restaurant = restaurantService.getRestaurantByName(restaurantName);

        return ResponseEntity.ok(restaurant);
    }

    @GetMapping("/getRestaurants")
    public ResponseEntity<Object> getRestaurantsByManager(@NotNull(message = AdministratorConstants.RESTAURANT_NAME_CAN_T_BE_NULL) @RequestParam(name = "manager") String manager) throws RestaurantNotFoundException {

        List<RestaurantDao> restaurants = restaurantService.getRestaurantsByManager(manager);

        return ResponseEntity.ok(restaurants);
    }
}
