package smart_restaurant.administrator.repository;

import agile.administrator.model.dao.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import smart_restaurant.administrator.model.dao.UserCredentialsDao;

import java.util.*;


@Component
public interface UserCredentialsRepository extends JpaRepository<UserCredentialsDao, Long> {

    Optional<UserCredentialsDao> findByUsername(String username);
}
