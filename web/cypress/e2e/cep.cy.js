import address from '../fixtures/cep'
describe('CEP', ()=>{

    beforeEach(()=>{
        cy.start()
        cy.login()
        cy.goTo('Integração','Consulta de CEP')
    })

    it('Validar busca de CEP valido', ()=>{
       
       cy.intercept('GET',`https://viacep.com.br/ws/${address.cep}/json/`, {
            statusCode: 200,
            body: {
                logradouro: address.street,
                bairro: address.neighborhood,
                localidade: address.city,
                uf: address.state
            }
       }).as('getCep')
       
        cy.get('#cep')
        .type(address.cep)
        .should('be.visible')

        cy.contains('button','Buscar')
        .click()

        cy.wait('@getCep')
        
        cy.get('#street')
        .should('have.value', address.street)

        cy.get('#neighborhood')
        .should('have.value', address.neighborhood)

        cy.get('#city')
        .should('have.value', address.city)

        cy.get('#state')
        .should('have.value', address.state)
        

    })
})