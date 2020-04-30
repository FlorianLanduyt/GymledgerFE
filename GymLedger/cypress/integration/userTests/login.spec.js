// describe('The Login Page', () => {
//     beforeEach(() => {
//       // reset and seed the database prior to every test
//       //cy.exec('npm run db:reset && npm run db:seed')

//       // seed a user in the DB that we can control from our tests
//       // assuming it generates a random password for us
//       cy.request('POST', '/user/register', 
//         { 
//             email: 'paul.peters@hotmail.com', 
//             password: "P@ssword111", 
//             isCoach: false,
//             firstName: "paul",
//             lastName: "peters",
//             birthDay: "2020-04-30T15:02:06.780Z"
//         })
//         .its('body')
//         .as('currentUser')
//     })

//     it('sets auth cookie when logging in via form submission', function () {
//         // destructuring assignment of the this.currentUser object
//         const { username, password } = this.currentUser

//         cy.visit('/')

//         cy.get('[data-cy=username]').type(username)

//         // {enter} causes the form to submit
//         cy.get('[data-cy=password]').type(`${password}{enter}`)

//         cy.url().should('include', '/gymnast')

//         // our auth cookie should be present
//         cy.getCookie('your-session-cookie').should('exist')

//         // UI should reflect this user being logged in
//         //cy.get('h1').should('contain', 'jane.lane')
//       })
//     })

describe('Load page', () => {
    it('successfully loads', () => {
      cy.visit('') // change URL to match your dev URL
    })
  })
describe('Login', function () {
  beforeEach(() => {
    cy.visit(''); 
  })

  it('when login with right credentials you visit gymnast page ', function () {
    const correctEmail = "florian.landuyt@hotmail.com"
    const password = "P@ssword111"

    cy.get('[data-cy=username]').type(correctEmail);
    cy.get('[data-cy=password]').type(password);
    cy.get('[data-cy=loginButton]').click();
    cy.url().should("contain", "gymnast")
  });


  it('login button default disabled', function () {
    cy.get('[data-cy=loginButton]').should('be.disabled');
  });

  it('login button enabled when two fields are filled in', function () {
    const correctEmail = "florian.landuyt@hotmail.com"
    const password = "P@ssword111"

    cy.get('[data-cy=username]').type(correctEmail);
    cy.get('[data-cy=password]').type(password);
    cy.get('[data-cy=loginButton]').should('be.enabled');

  });

  it('error when login with nonexisting email', function () {
    const wrongEmail = "paul.paul@hotmail.com";
    const password = "P@ssword111"

    cy.get('[data-cy=username]').type(wrongEmail);
    cy.get('[data-cy=password]').type(password);
    cy.get('[data-cy=loginButton]').click();
    cy.get('[data-cy=form]').find('mat-error');
  });






});
