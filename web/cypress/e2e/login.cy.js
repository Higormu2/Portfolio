describe('Tela de login', () => {

  const acesso = {
    email: 'papito@webdojo.com',
    emailInvalido: 'higord@gmail.com',
    senhaInvalida: 'espada123',
    senhaValida: 'katana123'
  }

  it('Realizar login com sucesso', () => {


    cy.start()
    cy.login('papito@webdojo.com', 'katana123')
    cy.get('[data-cy="user-name"]')
      .should('have.text', 'Fernando Papito')

  })

  it('Erro ao realizar o login com senha invalida', () => {


    cy.start()
    cy.get('[placeholder="Digite seu e-mail"]')
      .type(acesso.email)
    cy.get('[placeholder="Digite sua senha"]')
      .type(acesso.senhaInvalida)
    cy.contains('button', 'Entrar')
      .click()
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

  it('Erro ao realizar o login com email invalido', () => {
    cy.start()
    cy.get('[placeholder="Digite seu e-mail"]')
      .type(acesso.emailInvalido)
    cy.get('[placeholder="Digite sua senha"]')
      .type(acesso.senhaValida)
    cy.contains('button', 'Entrar')
      .click()
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })


})