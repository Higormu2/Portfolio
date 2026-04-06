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

        cy.contains('label','Pessoa Física')
            .should('have.text','Pessoa Física')
            .find('input')
            .check()

         cy.contains('label','Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('div','CPF')
            .should('have.text','CPF')
            .find('input')
            .type('40870196839')
            .should('be.visible')

        
        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo',
        ]

        discoveryChannels.forEach((channel)=>{

             cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')


        })

        cy.contains('label','Mais Detalhes')
            .parent()
            .find('textarea')
            .type('Meu nome é Higor e estou desempregado por forças maiores, e agora estou me lascando sem dinheiro')
        
        
        
        
        const tecnolodia = [
            'Funcional',
            'Regressão',
            'Automação',
            'Javascript'
        ]
        tecnolodia.forEach((tech)=>{

            cy.contains('label','Tecnologias')
                .parent()
                .find('input')
                .type(tech)
                .type('{enter}')

        })


        
           

    })







})

