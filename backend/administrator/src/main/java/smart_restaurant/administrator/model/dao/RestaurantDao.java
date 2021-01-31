package smart_restaurant.administrator.model.dao;

import smart_restaurant.administrator.util.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "restaurants")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantDao implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Restaurant name is required!")
    private String name;
    @Keyword
    @NotNull(message = "Restaurant's keyword is required!")
    private String keyword;
    @NotNull(message = "Restaurant needs to have a manager!")
    private String manager;

    @OneToMany
    private List<UserDao> participants;

    public RestaurantDao() {
    }

    @Override
    public String toString() {
        return "ProjectDao{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", keyword='" + keyword + '\'' +
                ", manager='" + manager + '\'' +
                '}';
    }
}
