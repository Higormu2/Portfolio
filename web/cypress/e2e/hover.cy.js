describe('Simulando Mouseover', ()=>{

    beforeEach('Acessar e login',()=>{
        cy.start()
        cy.login('papito@webdojo.com','katana123')
    })
    
    it('Deve mostrar um texto ao passar o mouse em cima do link do instagram',()=>{
        
        cy.contains('Isso é Mouseover!')
            .should('not.exist')
        cy.contains('a','@qapapito')
            .trigger('mouseover')
        cy.contains('Isso é Mouseover!')
            .should('exist')
            

    })
})