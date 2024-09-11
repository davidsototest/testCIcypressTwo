Feature: Test back API localhost

    Pruebas de api en localhost

    @WebInterface @Authentication @Critical
    Scenario: Validación del estado de la respuesta - UNO
        When el usuario realiza una solicitud GET a "/users"
        Then la respuesta debe tener un estado 200

    Scenario: validacion del estado de la respuesta  - DOS
        When el usuario realiza una solicitud GET a "/users"
        Then la respuesta debe tener un estado 200 otro metodo

    Scenario: validacion del tipo de contenido de la respuesta - UNO
        When el usuario realiza una solicitud GET a "/users"
        Then la respuesta debe tener un tipo de contenido "text/html"

    Scenario: validacion del tipo de contenido de la respuesta - DOS
        When el usuario realiza una solicitud GET a "/users"
        Then la respuesta debe tener un tipo de contenido, otro metodo "text/html"

    Scenario: validacion de la estructura de la respuesta - UNO
        When el usuario realiza una solicitud GET a "/users/3"
        Then La respuesta debe tener los siguientes elementos "id" "name" "email" "status"

    @Critical
    Scenario: validacion de la estrctura de la respuesta - DOS
        When el usuario realiza una solicitud GET a "/users/3"
        Then La respuesta debe tener los siguientes elementos "id" "name" "email" "status" otro metodo

    Scenario: validacion de datos especificos de la respuesta - UNO
        When el usuario realiza una solicitud GET a "/users/3"
        Then La respuesta debe tener los siguientes elementos y datos "3" "David Soto" "davidsoto@example.com" "active"

    Scenario: validacion de datos especificos de la respuesta - DOS
        When el usuario realiza una solicitud GET a "/users/3"
        Then La respuesta debe tener los siguientes elementos y datos "3" "David Soto" "davidsoto@example.com" "active" otro metodo

    @Authentication
    Scenario: validacion de datos especificos de la respuesta - TRES
        When el usuario realiza una solicitud GET a "/users/3"
        Then La respuesta debe tener los siguientes elementos y datos "3" "David Soto" "davidsoto@example.com" "active" otro metodo tres

    Scenario: validacion de actualizacion de resursos - UNO
        When el usuario realiza una solicitud PUT a "/users/1" y cambia el nombre a "Roberto"
        Then Debe actualizar y tener dentro de la respuesta el nombre "Roberto"

    Scenario: validacion de creacion de recursos - UNO
        When el usuario realiza una solicitud POST a "/users" con los datos "Carlos"
        Then Crea un nuevo usuario con los datos proporcionados

    Scenario: validacion de creacion de recursos - DOS
        When el usuario realiza una solicitud POST a "/users" con los datos "Juan"
        Then Crea un nuevo usuario con los datos proporcionados, otro metodo
    
    Scenario: validación de eliminación de recursos - UNO
        When el usuario realiza una solicitud GET a "/users" y obtiene el ID del ultimo usuario registrado
        Then se valida que el ID existe

        When el usuario realiza una solicitud DELETE a "/users" con el ID obtenido
        Then se valida que la respuesta sea un 200

        When el usuario realiza una solicitud GET a "/users/" con el ID eliminado
        Then se valida que la respuesta es un 404 Not Found "@apiResponse404"
    
    Scenario: validacion de errores - UNO
        When el usuario realiza una solicitud GET a "/users/idQueNoExiste2024"
        Then se valida que la respuesta es un 404 Not Found "@apiResponse"
    
    Scenario: validacion de errores - DOS
        When el usuario realiza una solicitud GET a "/users/idQueNoExiste2024"
        Then se valida que la respuesta es un 404 Not Found "@apiResponse" otro metodo
    
    Scenario: validacion de rendimiento - UNO
        When el usuario realiza una solicitud GET a "/users"
        Then se valida que la duracion de la respuesta sea inferior a 10
    
    Scenario: validacion de rendimiento - DOS
        When el usuario realiza una solicitud GET a "/users"
        Then se valida que la duracion de la respuesta sea inferior a 10 otro metodo