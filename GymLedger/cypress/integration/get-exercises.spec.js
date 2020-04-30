// describe('Exercise Testing', function () {
//   it('Gets all trainings', function () {
//     cy.server();

//     cy.route({
//       method: 'GET',
//       url: '/api/Exercises',
//       status: 200,
//       response: 'fixture:events.json'
//     })

//     cy.request('http://localhost:4200/exercise/exercises')
//     .then((response)=>{
//         expect(response.body).to.have.length(4);
//     });
//   })
// })

describe('The Home Page', () => {
    beforeEach(() => {
      // reset and seed the database prior to every test
    })
  
    it('successfully loads', () => {
      cy.visit('/')
    })
  })

