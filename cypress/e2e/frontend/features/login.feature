Feature: Login page

    Test cucumber & gherkin

    Background:
        Given Ingreso a la web de login page
    
    Scenario: Login page
        When El usuario ingresa su userName "standard_user", y su contrasenia "secret_sauce" y hace clic en login
        Then La web permite el ingreso y muestra el catalogo de inventario