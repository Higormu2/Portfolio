describe('Formulário de consultoria', () => {

    beforeEach('Start e Login', () => {
        cy.start()
        cy.login('papito@webdojo.com', 'katana123')

    })

    it('Deve solicitar consultoria individual ', () => {

        cy.goTo('Formulários', 'Consultoria')

        //input[@placeholder="Digite seu nome completo"]
        cy.get('[placeholder="Digite seu nome completo"]')
            .type('Higor Damasceno Stella')

        cy.get('[placeholder="Digite seu email"]')
            .type('higor@gmail.com')

        cy.get('input[placeholder="(00) 00000-0000')
            .type('11977531730')
            .should('have.value', '(11) 97753-1730')

        //label[text()="Tipo de Consultoria"]/..//select
            cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('In Company')

    })







})

