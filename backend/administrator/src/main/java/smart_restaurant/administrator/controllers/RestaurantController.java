package smart_restaurant.administrator.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;





        import agile.administrator.exceptions.*;
        import agile.administrator.model.dao.*;
        import agile.administrator.model.dto.*;
        import agile.administrator.services.*;
        import agile.administrator.util.*;

import javax.validation.*;
        import javax.validation.constraints.*;
        import java.util.*;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/v1/projects")
public class RestaurantController {
    @Autowired
     //restaurant service-omogućuje CRUD
    private RestaurantService restaurantService;
    @PostMapping("/createRestaurant")
    public ResponseEntity<Object> createRestaurant(@Valid @NotNull(message = AdministratorConstants.RESTAURANT_CAN_T_BE_NULL) @RequestBody RestaurantDto project) throws RestaurantAlreadyExistsException {

        RestaurantDao result = restaurantService.createRestaurant(project);

        return ResponseEntity.ok(result); //restoran je napravljen
    }
    @PostMapping("/updateRestaurant")
    public ResponseEntity<Object> updateRestaurant(@Valid @NotNull(message = AdministratorConstants.RESTAURANT_CAN_T_BE_NULL) @RequestBody RestaurantDto project) throws RestaurantNotFoundException {

        RestaurantDao result = restaurantService.updateRestaurant(project);

        return ResponseEntity.ok(result); // projekt je update-an
    }
    @PostMapping("/deleteRestaurant")
    public ResponseEntity<Object> deleteRestaurant(@Valid @NotNull(message = AdministratorConstants.RESTAURANT_CAN_T_BE_NULL) @RequestBody RestaurantDto project) throws RestaurantNotFoundException {

        restaurantService.deleteRestaurant(project);

        return ResponseEntity.ok("Restaurant successfully deleted");
    }
    @PostMapping("/assignUser/{RestaurantName}")
    public ResponseEntity<Object> assignUser(@Valid @NotNull(message = AdministratorConstants.RESTAURANT_CAN_T_BE_NULL) @RequestBody UserDto user, @NotNull @PathVariable("RestaurantName") String projectName) throws RestaurantNotFoundException {

        restaurantService.assignUser(user, projectName);

        return ResponseEntity.ok("User assigned to Restaurant");
    }

    @GetMapping("/getAllRestaurants")
    public ResponseEntity<Object> getRestaurants() {

        List<RestaurantDao> allProjects = restaurantService.getAllProjects();

        return ResponseEntity.ok(allProjects);
    }

    @GetMapping("/getRestaurant")
    public ResponseEntity<Object> getRestaurantByName(@NotNull(message = AdministratorConstants.RESTAURANT_NAME_CAN_T_BE_NULL) @RequestParam(name = "RestaurantName") String projectName) throws RestaurantNotFoundException {

        RestaurantDao project = restaurantService.getRestaurantByName(projectName);

        return ResponseEntity.ok(project);
    }
    @GetMapping("/getRestaurants")
    public ResponseEntity<Object> getRestaurantsByManager(@NotNull(message = AdministratorConstants.RESTAURANT_NAME_CAN_T_BE_NULL) @RequestParam(name = "manager") String manager) throws RestaurantNotFoundException {

        List<RestaurantDao> projects = restaurantService.getRestaurantsByManager(manager);

        return ResponseEntity.ok(projects);
    }

}
