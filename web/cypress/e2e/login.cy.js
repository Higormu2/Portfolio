describe('Tela de login', () => {



  it('Realizar login com sucesso', () => {

    cy.start()
    cy.login('papito@webdojo.com','katana123')
    cy.get('[data-cy="user-name"]')
      .should('have.text', 'Fernando Papito')

  })

  it('Erro ao realizar o login com senha invalida', () => {
    cy.start()
    cy.login('papito@webdojo.com', 'katana')
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

  it('Erro ao realizar o login com email invalido', () => {
    cy.start()
    cy.login('higor@gmail.com', 'katana123')
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })


})