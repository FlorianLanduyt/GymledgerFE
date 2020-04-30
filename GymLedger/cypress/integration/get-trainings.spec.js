// it('mock training get', function() {
//     cy.server({ delay: 1000 });
//     cy.route({
//       method: 'GET',
//       url: 'http://localhost:4200/api/Trainings',
//       status: 200,
//       response: 'fixture:trainingsen.json'
//     });
//     cy.visit('http://localhost:4200/Trainings');
//     cy.get('[data-cy=trainingCard]').should('have.length', 4);


// cy.request('http://localhost:4200/Trainings')
//     .then((response)=>{
//         expect(response.body).to.have.length(4);
//     });
//   });

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
})
  
