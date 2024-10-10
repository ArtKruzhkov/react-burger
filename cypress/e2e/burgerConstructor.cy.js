describe('Burger Constructor', () => {
    beforeEach(() => {
        cy.viewport(1440, 1072);
        cy.visit('http://localhost:3000');
        cy.wait(500);
    });

    it('it should load ingredients', () => {
        cy.get('#ingredients-container').should('have.length.greaterThan', 0);
        cy.get('[data-testid="ingredient-bun"]').should('exist');
        cy.get('[class^="burger-constructor_droppableArea__"]').should('exist');
        cy.get('[class^="burger-constructor_containerScrollConstructor__"]').should('exist');
    });

    it('should open and close ingredient modal', () => {
        cy.get('[data-testid="ingredient-bun"]').first().as('ingredientBun');
        cy.get('@ingredientBun').click();
        cy.get('[class^="modal_modal__"]').should('be.visible');
        cy.get('[class^="modal_modal__"]').contains('Детали ингредиента');
        cy.get('[class^="modal_closeButton__"]').click();
        cy.get('[class^="modal_modal__"]').should('not.exist');
    });

    it('it should drag and drop ingredients', () => {
        const dragAndDrop = (source, target) => {
            cy.get(source).trigger('dragstart').then(() => {
                cy.get(target).trigger('drop');
            });
        };
        cy.get('[class^="burger-constructor_droppableArea__"]').as('burgerConstructorDroppableArea');
        cy.get('[data-testid="ingredient-bun"]').first().as('draggableBun');
        cy.get('[data-testid="ingredient-sauce"]').first().as('draggableSauce');
        cy.get('[data-testid="ingredient-main"]').first().as('draggableMain');

        dragAndDrop('@draggableBun', '@burgerConstructorDroppableArea');
        dragAndDrop('@draggableSauce', '@burgerConstructorDroppableArea');
        dragAndDrop('@draggableMain', '@burgerConstructorDroppableArea');

        cy.get('[class^="burger-constructor_ingredientsContainer__"]').should('have.length', 4);
    });

    it('should create an order, show order modal and close order modal on click', () => {
        cy.visit('http://localhost:3000/login');
        cy.wait(500);
        cy.get('input[type="email"]').type('artkruzhkov@gmail.com');
        cy.get('input[type="password"]').type('11111Qq');
        cy.get('button').contains('Войти').click();

        cy.url().should('eq', 'http://localhost:3000/');

        cy.get('[class^="burger-constructor_droppableArea__"]').as('burgerConstructorDroppableArea');
        cy.get('[data-testid="ingredient-bun"]').first().as('draggableBun');
        cy.get('[data-testid="ingredient-sauce"]').first().as('draggableSauce');
        cy.get('[data-testid="ingredient-main"]').first().as('draggableMain');

        cy.get('@draggableBun').trigger('dragstart').then(() => {
            cy.get('@burgerConstructorDroppableArea').trigger('drop');
        });
        cy.get('@draggableSauce').trigger('dragstart').then(() => {
            cy.get('@burgerConstructorDroppableArea').trigger('drop');
        });
        cy.get('@draggableMain').trigger('dragstart').then(() => {
            cy.get('@burgerConstructorDroppableArea').trigger('drop');
        });

        cy.get('button').contains('Оформить заказ').click();
        cy.wait(20000);

        cy.get('[class^="modal_modal__"]').should('be.visible');
        cy.get('[class^="modal_modal__"]').contains('идентификатор заказа');
        // cy.get('[class^="modal_modal__"]').trigger('keydown', { key: 'Escape' });
        cy.get('[class^="modal_closeButton__"]').click();
        cy.get('[class^="modal_modal__"]').should('not.exist');
    });
});
