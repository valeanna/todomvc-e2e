/// <reference types="Cypress" />

export default class TodoMvcPage {
  visit () {
    cy.visit('https://todomvc.com/examples/angular2/')
  }

  getNewToDoInput () {
    return cy.get('.new-todo')
  }

  getToDoItems () {
    return cy.get('.todo-list > li')
  }

  getToDoItem (i) {
    return this.getToDoItems().eq(i)
  }

  getToDoItemLabel (i) {
    return this.getToDoItems().get('label').eq(i)
  }

  getToDoItemToggle (i) {
    return this.getToDoItems().get('.toggle').eq(i)
  }

  getToDoItemDelete (i) {
    return this.getToDoItems().get('.destroy').eq(i)
  }

  createNewToDoItem (name) {
    this.getNewToDoInput()
      .type(name)
      .type('{enter}')
  }

  updateToDoItemName (i, updatedName) {
    this.getToDoItem(i)
      .dblclick()

    this.getToDoItem(i).get('.edit')
      .type('{selectall}')
      .type(updatedName)
      .type('{enter}')
  }

  deleteToDoItem (i) {
    this.getToDoItemDelete(i)
      .invoke('show')
      .click()
  }
}
