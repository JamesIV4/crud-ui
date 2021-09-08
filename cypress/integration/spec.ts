it('Displays to the user list component list-view', () => {
	cy.visit('/');
	cy.get('.header').contains('User List');
});

it('Adds a new user', () => {
	cy.visit('/');
	cy.get('button[data-test="button-add"]').click();
	cy.wait(500);
	cy.get('input[data-test="user-name"]').focus().type('New testing name');
	cy.get('input[data-test="user-email"]').focus().type('testing@test.com');
	cy.wait(500);
	cy.get('button[data-test="dialog-save"]').click();
	cy.wait(1000);
	cy.get('button.mat-paginator-navigation-last').click();
	cy.wait(1000);
	cy.get('mat-table mat-row:last-of-type .mat-column-name .value').contains('New testing name');
	cy.get('mat-table mat-row:last-of-type .mat-column-email .value').contains('testing@test.com');
});

it('Edits a user', () => {
	cy.visit('/');
	cy.wait(1000);
	cy.get('button.mat-paginator-navigation-last').click();
	cy.wait(1000);
	cy.get('mat-table mat-row:last-of-type .mat-column-name .value').contains('New testing name');
	cy.get('mat-table mat-row:last-of-type .mat-column-email .value').contains('testing@test.com');
	cy.get('mat-table mat-row:last-of-type ').click();
	cy.wait(500);
	cy.get('button[data-test="button-edit"]').click();
	cy.wait(500);
	cy.get('input[data-test="user-name"]').focus().type('{selectall}').type('Edited username test');
	cy.get('input[data-test="user-email"]').focus().type('{selectall}').type('edited@test.com');
	cy.wait(500);
	cy.get('button[data-test="dialog-save"]').click();
	cy.wait(1000);
	cy.get('mat-table mat-row:last-of-type .mat-column-name .value').contains('Edited username test');
	cy.get('mat-table mat-row:last-of-type .mat-column-email .value').contains('edited@test.com');
});

it('Deletes a user', () => {
	cy.visit('/');
	cy.wait(1000);
	cy.get('button.mat-paginator-navigation-last').click();
	cy.wait(1000);
	cy.get('mat-table mat-row:last-of-type .mat-column-name .value').contains('Edited username test');
	cy.get('mat-table mat-row:last-of-type .mat-column-email .value').contains('edited@test.com');
	cy.get('mat-table mat-row:last-of-type ').click();
	cy.get('button[data-test="button-delete"]').click();
	cy.wait(1000);
	cy.get('mat-table mat-row:last-of-type .mat-column-name .value').should('not.have.text', 'Edited username test');
	cy.get('mat-table mat-row:last-of-type .mat-column-email .value').should('not.have.text', 'edited@test.com');
});