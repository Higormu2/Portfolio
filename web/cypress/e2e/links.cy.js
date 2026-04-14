describe('Links abrindo nova guia/janela',()=>{

    beforeEach('Acessar e logar',()=>{
        cy.start()
        cy.login('papito@webdojo.com','katana123')
    })

    it('Validando o atributo do link do Instagram',()=>{

        cy.get('[data-cy="instagram-link"]')
            .should('have.attr','href','https://www.instagram.com/qapapito')
            .and('have.attr','target','_blank')

    })

    it('Acessa link de termos de uso removendo o target blank',()=>{

        cy.goTo('Formulários','Consultoria')
        cy.contains('a','termos de uso')
            .invoke('removeAttr','target')
            .click()
        cy.contains('h2','1. Aceitação dos Termos')
            .should('be.visible')

    })

})