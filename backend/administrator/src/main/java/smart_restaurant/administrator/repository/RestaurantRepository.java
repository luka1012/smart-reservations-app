package smart_restaurant.administrator.repository;


import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import smart_restaurant.administrator.model.dao.RestaurantDao;

import java.util.*;


@Component
public interface RestaurantRepository extends JpaRepository<RestaurantDao, Long> {

    Optional<RestaurantDao> findByName(String name);

    Optional<List<RestaurantDao>> findByManager(String manager);

    @Override
    List<RestaurantDao> findAll();
}
