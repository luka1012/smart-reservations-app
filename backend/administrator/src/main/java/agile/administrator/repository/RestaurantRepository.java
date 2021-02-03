package agile.administrator.repository;

import agile.administrator.model.dao.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;


@Component
public interface RestaurantRepository extends JpaRepository<RestaurantDao, Long> {

    Optional<RestaurantDao> findByName(String name);

    Optional<List<RestaurantDao>> findByManager(String manager);

    @Override
    List<RestaurantDao> findAll();
}
