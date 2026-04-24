Cypress.Commands.add('fillConsultancyForm', (form) => {

    cy.goTo('Formulários', 'Consultoria')

    //input[@placeholder="Digite seu nome completo"]
    cy.get('[placeholder="Digite seu nome completo"]')
        .type(form.name)

    cy.get('[placeholder="Digite seu email"]')
        .type(form.email)

    cy.get('input[placeholder="(00) 00000-0000')
        .type(form.phone)
        .should('have.value', '(11) 97753-1730')

    //label[text()="Tipo de Consultoria"]/..//select
    cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select(form.consultancyType)


    if (form.personType === 'cpf') {
        cy.contains('label', 'Pessoa Física')
            .should('have.text', 'Pessoa Física')
            .find('input')
            .check()

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('div', 'CPF')
            .should('have.text', 'CPF')
            .find('input')
            .type(form.document)
            .should('be.visible')

    }

    if (form.personType === 'cnpj') {
        cy.contains('label', 'Pessoa Jurídica')
            .should('have.text', 'Pessoa Jurídica')
            .find('input')
            .check()

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')

        cy.contains('div', 'CNPJ')
            .should('have.text', 'CNPJ')
            .find('input')
            .type(form.document)
            .should('be.visible')
    }






    form.discoveryChannels.forEach((channel) => {

        cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')


    })

    cy.get('input[type="file"')
        .selectFile(form.file, { force: true })

    cy.contains('label', 'Mais Detalhes')
        .parent()
        .find('textarea')
        .type(form.description)


    form.tecnologic.forEach((tech) => {

        cy.contains('label', 'Tecnologias')
            .parent()
            .find('input')
            .type(tech)
            .type('{enter}')

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')

    })


    if (form.terms === true) {
        cy.contains('label', 'termos de uso')
            .find('input')
            .click()
    }


})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains('span', 'Li e aceito os')
        .parent()
        .find('input')
        .check()

    cy.contains('button', 'Enviar formulário')
        .click()
        .wait(7000)
    cy.contains('h3', 'Sucesso!')
        .should('be.visible')

})