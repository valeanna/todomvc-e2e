/// <reference types="Cypress" />

import TodoMvcPage from './todomvc.page'

const todoMvcPage = new TodoMvcPage()

describe('ToDoMvc application', () => {
  beforeEach(() => {
    todoMvcPage.visit()
  })

  afterEach(() => {
    cy.clearLocalStorage()
  })

  describe('Create new item', () => {
    it('Creates new item in todo list with valid name', () => {
      todoMvcPage.createNewToDoItem('item1')

      todoMvcPage.getToDoItemLabel(0)
        .should('have.text', 'item1')
    })
    it('Does not create new item in todo list with whitespace name', () => {
      todoMvcPage.createNewToDoItem(' ')

      todoMvcPage.getToDoItems()
        .should('have.length', 0)
    })
    it('Creates multiple items in todo list', () => {
      todoMvcPage.createNewToDoItem('item1')
      todoMvcPage.createNewToDoItem('item2')
      todoMvcPage.createNewToDoItem('item3')

      todoMvcPage.getToDoItems()
        .should('have.length', 3)
    })
    it('Renders HTML tags as text when creating new item', () => {
      todoMvcPage.createNewToDoItem('XSS <script>alert("Boom!")</script>')

      todoMvcPage.getToDoItemLabel(0)
        .should('have.text', 'XSS <script>alert("Boom!")</script>')
    })
  })

  describe('Edit existing item', () => {
    it('Updates item name with valid data', () => {
      todoMvcPage.createNewToDoItem('item1')
      todoMvcPage.createNewToDoItem('item2')
      todoMvcPage.updateToDoItemName(1, 'item2 updated')

      todoMvcPage.getToDoItemLabel(1)
        .should('have.text', 'item2 updated')
    })
    it('Renders HTML tags as text when updating existing item', () => {
      todoMvcPage.createNewToDoItem('item1')
      todoMvcPage.updateToDoItemName(0, 'XSS <script>alert("Boom!!!!")</script>')

      todoMvcPage.getToDoItemLabel(0)
        .should('have.text', 'XSS <script>alert("Boom!!!!")</script>')
    })
    it('Does not leave empty items after entering empty value', () => {
      todoMvcPage.createNewToDoItem('item1')
      todoMvcPage.updateToDoItemName(0, '{backspace}')

      todoMvcPage.getToDoItems()
        .should('have.length', 0)
    })
  })

  describe('Complete existing item', () => {
    it('Marks item as completed', () => {
      todoMvcPage.createNewToDoItem('item1')
      todoMvcPage.createNewToDoItem('item2')
      todoMvcPage.getToDoItemToggle(1)
        .click()

      todoMvcPage.getToDoItem(1)
        .should('have.class', 'completed')
      todoMvcPage.getToDoItem(0)
        .should('not.have.class', 'completed')
    })
  })

  describe('Delete existing item', () => {
    it('Deletes existing item marked as completed', () => {
      todoMvcPage.createNewToDoItem('item1')
      todoMvcPage.getToDoItemToggle(0)
        .click()
      todoMvcPage.deleteToDoItem(0)

      todoMvcPage.getToDoItems()
        .should('have.length', 0)
    })
    it('Deletes existing item not marked as completed', () => {
      todoMvcPage.createNewToDoItem('item1')
      todoMvcPage.deleteToDoItem(0)

      todoMvcPage.getToDoItems()
        .should('have.length', 0)
    })
  })
})
