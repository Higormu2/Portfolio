import consultancyData from '../fixtures/massaDoConsultancy.json'
//import {personal, company} from '../fixtures/massaDoConsultancy.json'

describe('Formulário de consultoria', () => {

    beforeEach('Start e Login', () => {
        cy.start()
        cy.login()
    })

    it('Deve solicitar consultoria individual ', () => {

        const consultancyForm = consultancyData.personal

        cy.goTo('Formulários', 'Consultoria')

        //input[@placeholder="Digite seu nome completo"]
        cy.get('[placeholder="Digite seu nome completo"]')
            .type(consultancyForm.name)

        cy.get('[placeholder="Digite seu email"]')
            .type(consultancyForm.email)

        cy.get('input[placeholder="(00) 00000-0000')
            .type(consultancyForm.phone)
            .should('have.value', '(11) 97753-1730')

        //label[text()="Tipo de Consultoria"]/..//select
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(consultancyForm.consultancyType)


        if (consultancyForm.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física')
                .should('have.text', 'Pessoa Física')
                .find('input')
                .check()

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')

        }

        if (consultancyForm.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica')
                .should('have.text', 'Pessoa Jurídica')
                .find('input')
                .check()

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }


        cy.contains('div', 'CPF')
            .should('have.text', 'CPF')
            .find('input')
            .type(consultancyForm.document)
            .should('be.visible')



        consultancyForm.discoveryChannels.forEach((channel) => {

            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')


        })

        cy.get('input[type="file"')
            .selectFile(consultancyForm.file, { force: true })

        cy.contains('label', 'Mais Detalhes')
            .parent()
            .find('textarea')
            .type(consultancyForm.description)


        consultancyForm.tecnologic.forEach((tech) => {

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


        if (consultancyForm.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .click()
        }


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

    it('Deve solicitar consultoria In Company ', () => {

        const consultancyForm = consultancyData.company

        cy.goTo('Formulários', 'Consultoria')

        //input[@placeholder="Digite seu nome completo"]
        cy.get('[placeholder="Digite seu nome completo"]')
            .type(consultancyForm.name)

        cy.get('[placeholder="Digite seu email"]')
            .type(consultancyForm.email)

        cy.get('input[placeholder="(00) 00000-0000')
            .type(consultancyForm.phone)
            .should('have.value', '(11) 97753-1730')

        //label[text()="Tipo de Consultoria"]/..//select
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(consultancyForm.consultancyType)


        if (consultancyForm.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física')
                .should('have.text', 'Pessoa Física')
                .find('input')
                .check()

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')

        }

        if (consultancyForm.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica')
                .should('have.text', 'Pessoa Jurídica')
                .find('input')
                .check()

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }


        cy.contains('div', 'CNPJ')
            .should('have.text', 'CNPJ')
            .find('input')
            .type(consultancyForm.document)
            .should('be.visible')



        consultancyForm.discoveryChannels.forEach((channel) => {

            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')


        })

        cy.get('input[type="file"')
            .selectFile(consultancyForm.file, { force: true })

        cy.contains('label', 'Mais Detalhes')
            .parent()
            .find('textarea')
            .type(consultancyForm.description)


        consultancyForm.tecnologic.forEach((tech) => {

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


        if (consultancyForm.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .click()
        }


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

    it('Deve verificar os campos obrigatórios', () => {

        cy.goTo('Formulários', 'Consultoria')
        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('input[placeholder="Digite seu nome completo"]')
            .parent()
            .find('p')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.get('input[placeholder="Digite seu email"]')
            .parent()
            .find('p')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('span', 'Li e aceito os')
            .parent()
            .parent()
            .find('p')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')





    })







})

