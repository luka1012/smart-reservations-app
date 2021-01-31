package smart_restaurant.administrator.exceptions;

public class UserAlreadyExistsException extends Exception {


    public UserAlreadyExistsException() {
        super();
    }

    public UserAlreadyExistsException(String message) {
        super(message);
    }

}
