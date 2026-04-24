describe('iFrame',()=>{

    beforeEach('Acessar e Logar',()=>{
        cy.start()
        cy.login()
        cy.goTo('Video','Video')
    })
    
    it('Deve poder tocar o video de exemplo',()=>{

        cy.get('iframe[title="Video Player"]')
            .its('0.contentDocument.body') // pega todo o conteudo dentro do iframe > O body está dentro do iframe > o 0 informa a ordem do array que estou buscando, pois o seletor pode buscar mais de um, então é necessario buscar po numero
            .then(cy.wrap) //wrap busca o elemento, objeto ou array e transforma em um objeto cypress, podendo usar outros comando cypress dentro desse objeto
            .as('iFramePlayer') // grava tudo que estiver em cima em um AS (elias)

        cy.get('@iFramePlayer') //chamo o iframeplayer que está no AS e manipulo 
            .find('.play-button')
            .click()

        cy.get('@iFramePlayer')
            .find('.pause-button')
            .should('be.visible')

    })


})