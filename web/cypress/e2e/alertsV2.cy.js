describe('Validações de Alertas em Javascript',()=>{

    beforeEach(()=>{

        cy.start()
        cy.login()
        cy.goTo('Alertas JS','JavaScript Alerts')
    })

    it('Deve validar a mensagem de alerta',()=>{

        cy.on('window:alert',(msg)=>{
            expect(msg).to.equal('Olá QA, eu sou uma Alert Box!')
        })

        cy.contains('button','Mostrar Alert')
            .click()

    })

    it('Deve confirmar um diálogo e validar a resposta positiva', ()=>{

        cy.on('window:confirm', (msg)=>{
            expect(msg).to.equal('Aperta um botão!')
            return true;
        })

        cy.on('window:alert', (msg)=>{
            expect(msg).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm')
            .click()
    })

    it('Deve cancelar um diálogo e validar a resposta negativa', ()=>{

        cy.on('window:confirm',(msg)=>{
            expect(msg).to.equal('Aperta um botão!')
            return false;
        })

        cy.on('window:alert', (msg)=>{
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button','Mostrar Confirm')
            .click()


    })

    it('Deve interagir com um prompt, inserir um texto e validar uma mensagem', ()=>{

        cy.window().then((win) =>{ 
            cy.stub(win,'prompt').returns('Higor')
        })
            

        cy.on('window:alert',(msg)=>{
            expect(msg).to.equal('Olá Higor! Boas vindas ao WebDojo!')
        })

        cy.contains('button','Mostrar Prompt')
            .click()
    })

    it('Deve interagir com um prompt, sem inserir um texto e validar uma mensagem',()=>{

        cy.window().then((win)=>{
            cy.stub(win, 'prompt').returns('')
        })

        cy.on('window:alert', (msg)=>{
            expect(msg).to.equal('Nome não informado.')
        })

        cy.contains('button','Mostrar Prompt')
            .click()

    })

    it.only('Deve interagir com um prompt, e cancelar sem inserir um texto e validar uma mensagem',()=>{

        cy.window().then((win) =>{
            cy.stub(win, 'prompt').returns(null)
        }) 

        cy.on('window:alert', (msg)=>{
            expect(msg).to.equal('Ação Cancelada.')
        })

        cy.contains('button', 'Mostrar Prompt')
            .click()

    })

})