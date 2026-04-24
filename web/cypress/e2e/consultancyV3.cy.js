import {personal, company} from '../fixtures/massaDoConsultancy.json'

describe('Formulário de consultoria', () => {

    beforeEach('Start e Login', () => {
        cy.start()
        cy.login()
    })

    it('Deve solicitar consultoria individual ', () => {

         cy.goTo('Formulários', 'Consultoria')

        //input[@placeholder="Digite seu nome completo"]
        cy.get('[placeholder="Digite seu nome completo"]')
            .type(personal.name)

        cy.get('[placeholder="Digite seu email"]')
            .type(personal.email)

        cy.get('input[placeholder="(00) 00000-0000')
            .type(personal.phone)
            .should('have.value', '(11) 97753-1730')

        //label[text()="Tipo de Consultoria"]/..//select
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(personal.consultancyType)


        if (personal.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física')
                .should('have.text', 'Pessoa Física')
                .find('input')
                .check()

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')

        }

        if (personal.personType === 'cnpj') {
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
            .type(personal.document)
            .should('be.visible')



        personal.discoveryChannels.forEach((channel) => {

            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')


        })

        cy.get('input[type="file"')
            .selectFile(personal.file, { force: true })

        cy.contains('label', 'Mais Detalhes')
            .parent()
            .find('textarea')
            .type(personal.description)


        personal.tecnologic.forEach((tech) => {

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


        if (personal.terms === true) {
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

        cy.goTo('Formulários', 'Consultoria')

        //input[@placeholder="Digite seu nome completo"]
        cy.get('[placeholder="Digite seu nome completo"]')
            .type(company.name)

        cy.get('[placeholder="Digite seu email"]')
            .type(company.email)

        cy.get('input[placeholder="(00) 00000-0000')
            .type(company.phone)
            .should('have.value', '(11) 97753-1730')

        //label[text()="Tipo de Consultoria"]/..//select
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(company.consultancyType)


        if (company.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física')
                .should('have.text', 'Pessoa Física')
                .find('input')
                .check()

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')

        }

        if (company.personType === 'cnpj') {
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
            .type(company.document)
            .should('be.visible')



        company.discoveryChannels.forEach((channel) => {

            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')


        })

        cy.get('input[type="file"')
            .selectFile(company.file, { force: true })

        cy.contains('label', 'Mais Detalhes')
            .parent()
            .find('textarea')
            .type(company.description)


        company.tecnologic.forEach((tech) => {

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


        if (company.terms === true) {
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

