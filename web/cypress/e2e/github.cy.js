describe('Gerenciamento de Perfis no Github',()=>{

    beforeEach(()=>{
        cy.start()
        cy.login()
        cy.goTo('Tabela','Perfis do GitHub')
    })

    it('Deve poder cadastrar um novo perfil do github',()=>{

        cy.get('#name')
            .type('Higor Damasceno Stella')
        cy.get('#username')
            .type('Higormu3')
        cy.get('#profile')
            .type('QA')
        cy.contains('button','Adicionar Perfil')
            .click()
        
        cy.get('#name')
            .type('Higor Damasceno Stella')
        cy.get('#username')
            .type('Higormu2')
        cy.get('#profile')
            .type('QA')
        cy.contains('button','Adicionar Perfil')
            .click()


        cy.contains('table tbody tr', 'Higormu2').should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('Higor Damasceno Stella').should('be.visible')
          
        cy.get('@trProfile')
            .contains('QA').should('be.visible')


      
    })

    it('Deve poder remover um perfil do github',()=>{

        const profile = {
            name: 'Higor',
            username:'Higormu2',
            profile: 'QA'
        }

        cy.get('#name')
            .type(profile.name)
        cy.get('#username')
            .type(profile.username)
        cy.get('#profile')
            .type(profile.profile)
        cy.contains('button','Adicionar Perfil')
            .click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .find('button[title="Remover perfil"]')
            .click()
        
        cy.contains('table tbody', profile.username)
            .should('not.exist')


    })

    it.only('',()=>{

        const profile = {

            name:'Higor Damasceno Stella',
            username:'Higormu2',
            profile:'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.profile)
        cy.contains('button','Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            
            .find('a[title="Abrir perfil no GitHub"]')
            .and('have.attr', 'href', 'https://github.com/Higormu2')
            .invoke('removeAttr','target')
            .click()
            
        

    })
})