describe('',()=>{

    beforeEach(()=>{
        cy.start()
        cy.login()
        cy.goTo('Alertas JS','JavaScript Alerts')
    })

    it('Deve validar a mensagem de alerta',()=>{

        cy.on('window:alert',(msg) =>{
            expect(msg).to.equal('Olá QA, eu sou uma Alert Box!')
        })
        
        cy.contains('button','Mostrar Alert')
            .click()
    })

    it('Deve confirmar um diálogo e validar a resposta positiva',()=>{

        cy.on('window:confirm',(msg) =>{
            expect(msg).to.equal('Aperta um botão!')
            return true;
        })
        
        cy.on('window:alert',(msg) =>{
            expect(msg).to.equal('Você clicou em Ok!')
        })

        cy.contains('button','Mostrar Confirm')
            .click()
    })

    it('Deve cancelar um diálogo e validar a resposta negativa', ()=>{

        cy.on('window:confirm', (msg)=>{
            expect(msg).to.equal('Aperta um botão!')
            return false;
        })

        cy.on('window:alert', (msg)=>{
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button','Mostrar Confirm')
            .click()
    })

    it('Deve preencher o campo do prompt e confirma o validar a resposta positiva', ()=>{

        cy.window().then((win) =>{
            cy.stub(win,'prompt').returns('Higor')
        })

        cy.on('window:alert', (msg)=>{
            expect(msg).to.equal('Olá Higor! Boas vindas ao WebDojo!')
        })

        cy.contains('button','Mostrar Prompt')
            .click()
    })

    it('Deve apresentar mensagem de campo vazio no alerta após confirma sem preencher o campo',()=>{

        cy.window().then((win) =>{
            cy.stub(win,'prompt').returns('')
        })

        cy.on('window:alert',(msg)=>{
            expect(msg).to.equal('Nome não informado.')
        })

        cy.contains('button','Mostrar Prompt')
            .click()
    })

    it.only('Deve cancelar o prompt e confirmar o larta', ()=>{

        cy.window().then((win) =>{
            cy.stub(win,'prompt').returns(null)
        })

        cy.on('window:alert',(msg)=>{
            expect(msg).to.equal('Ação Cancelada.')
        })

        cy.contains('button','Mostrar Prompt')
            .click()

    })


})