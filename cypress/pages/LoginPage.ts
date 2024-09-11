class LoginPage { 
    elements = {
      usernameInput: () => cy.get("#user-name"),
      passwordInput: () => cy.get("#password"),
      loginBtn: () => cy.get("#login-button"),
      errorMessage: () => cy.get('h3[data-test="error"]'),
    };
  
    typeUsername(username: string): void {
      this.elements.usernameInput().type(username);
    }
  
    typePassword(password: string): void {
      this.elements.passwordInput().type(password);
    }
  
    clickLogin(): void {
      this.elements.loginBtn().click();
    }
  
    submitLogin(username: string, password: string): void {
      this.elements.usernameInput().type(username);
      this.elements.passwordInput().type(password);
      this.elements.loginBtn().click();
    }
  
    clearInput(): void {
      this.elements.usernameInput().clear();
      this.elements.passwordInput().clear();
    }
  }
  
  export const loginPage = new LoginPage();
  