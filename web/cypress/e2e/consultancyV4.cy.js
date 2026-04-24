import { personal, company } from '../fixtures/massaDoConsultancy.json'

describe('Formulário de consultoria', () => {

    beforeEach('Start e Login', () => {
        cy.start()
        cy.login()
    })

    it('Deve solicitar consultoria individual ', () => {

        cy.fillConsultancyForm(personal)
        cy.submitConsultancyForm()
    })

    it('Deve solicitar consultoria In Company ', () => {

        cy.fillConsultancyForm(company)
        cy.submitConsultancyForm()
    })

    it.only('Deve verificar os campos obrigatórios', () => {

        cy.goTo('Formulários', 'Consultoria')
        const requiredFields = [
            { label: 'Nome Completo', message: 'Campo obrigatório' },
            { label: 'Email', message: 'Campo obrigatório' },
            { label: 'termos de uso', message: 'Você precisa aceitar os termos de uso' }

        ]

        requiredFields.forEach(({ label, message }) => {
            
            cy.contains('button', 'Enviar formulário')
                .click()
            cy.contains('label', label)
                .parent()
                .find('p')
                .should('be.visible')
                .should('have.text', message)
                .and('have.class', 'text-red-400')
                .and('have.css', 'color', 'rgb(248, 113, 113)')
        })


    })

})

