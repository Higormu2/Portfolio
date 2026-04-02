describe('Formulário de consultoria', () => {

    beforeEach('Start e Login',()=>{
        cy.start()
        cy.login('papito@webdojo.com', 'katana123')

    })
    
    it('Deve solicitar consultoria individual ', () => {

        cy.goTo('Formulários', 'Consultoria')

    })

    it('Deve ser redirecionado para página tabela',()=>{

        cy.goTo('Tabela','Perfis do GitHub')

    })
    
    it('Deve ser redirecionado para página Video', ()=>{

        cy.goTo('Video', 'Video')

    })

    it('Deve ser redirecionado para página Integração',()=>{

        cy.goTo('Integração', 'Consulta de CEP')

    })

    it('Deve ser redirecionado para página Kanban',()=>{

        cy.goTo('Kanban','Kanban Board')
    })

    it('Deve ser redirecionado para página Alertas JS',()=>{

        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })

        

        

})

