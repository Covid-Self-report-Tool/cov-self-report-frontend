import { signUp } from '../../src/utils/firebase';
// This doesn't work for some reason, it's following this:
// https://github.com/hibiken/react-places-autocomplete/issues/189
const setupGoogleMock = () => {
  /*** Mock Google Maps JavaScript API ***/
  const google = {
    maps: {
      Marker: class {},
      Map: class {
        setTilt() {}
        fitBounds() {}
      },
      LatLngBounds: class {},
      places: {
        Autocomplete: class {
          predictions: [{ description: 'fake place, CA, USA' }];
        },
        AutocompleteService: class {
          predictions: [{ description: 'fake place, CA, USA' }];
        },
        AutocompletionService: class {
          predictions: [{ description: 'fake place, CA, USA' }];
        },
        PlacesServiceStatus: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
        PlacesAutocomplete: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
      },

      MarkerClusterer: class {},
      Geocoder: class {},
    },
  };
  return google;
};

describe('symptoms form test', () => {
  afterEach(() => {
    cy.logout();
  });

  it('goes through the submission form and sees success modal', () => {
    cy.server();

    cy.route({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/place/js/*',
      response: [],
    });

    cy.route({
      method: 'GET',
      url: `${Cypress.env('REACT_APP_BACKEND_URL')}/countries`,
      response: {
        data: {
          countries: [
            {
              country_code: 'US',
              country_name: 'United States of America',
              country_slug: 'united-states',
              date: '2020-05-01T20:25:06Z',
              new_confirmed: 29324,
              new_deaths: 2027,
              new_recovered: 33227,
              total_confirmed: 1067883,
              total_deaths: 62952,
              total_recovered: 153947,
            },
          ],
        },
        error: null,
      },
    });

    cy.route({
      method: 'GET',
      url: `${Cypress.env('REACT_APP_BACKEND_URL')}/self_report`,
      response: {
        data: {
          locations: [
            {
              address: 'Missoula, Montana',
              lat: 0,
              lng: 0,
              city: 'Missoula',
              state: 'Montana',
              country: 'USA',
              county: null,
              date: null,
            },
          ],
        },
        error: null,
      },
    });

    cy.route({
      method: 'POST',
      url: `${Cypress.env('REACT_APP_BACKEND_URL')}/self_report`,
      response: {
        data: {
          message: 'Saved user data',
        },
        error: null,
      },
    }).as('post');

    cy.visit('/', {
      onBeforeLoad(win) {
        // need to test that this works
        // cy.stub('signUp', () => {
        //   console.log('called creation');
        // });
        if (win.window.google) {
          cy.stub(win.window, 'google').returns(setupGoogleMock());
        }
      },
    });

    cy.get('[data-cy=add-symptoms-splash]').click();

    cy.get('[data-cy=next-button]').click();

    cy.get('[data-cy=tested-covid-no]').click();

    cy.get('[data-cy=seen-physician-no]').click();

    cy.get('[data-cy=next-button]').click();

    global.window.google = setupGoogleMock();

    cy.window().then(window => {
      global.window.google = setupGoogleMock();
      cy.stub(window.google.maps.places, 'AutocompleteService').returns(() => {
        predictions: [];
      }); //, setupGoogleMock()['maps']['places']['AutocompletionService'];
      cy.stub(window.window, 'google').returns(setupGoogleMock()); //, setupGoogleMock()['maps']['places']['AutocompletionService'];
    });

    cy.get('[data-cy=location]').type('Berkeley, CA, USA');

    cy.get('[data-cy=location-suggestion]').click();

    cy.get('[data-cy=next-button]').click();

    cy.get('[data-cy=register-email]').click();

    cy.get('[data-cy=register-email-field]').type('dev@covidselfreport.org');

    cy.get('[data-cy=register-password-field]').type('password');

    cy.get('[data-cy=register-password2-field]').type('password');

    cy.login(Cypress.env('TEST_UID'));

    // it's enabled because on login, this account has already agreed to terms
    // cy.get('[data-cy=submit-button]').should('be.disabled');

    // this needs to be conditional and check if it's already checked
    // cy.get('[data-cy=has-agreed-to-terms')
    //   .wait(1000)
    //   .click();

    cy.get('[data-cy=submit-button]').should('be.enabled');

    cy.get('[data-cy=submit-button]').click();

    cy.get('[data-cy=successful-submission]');

    cy.get('@post')
      .its('request.body')
      .then(body => {
        expect(body).to.include({
          address: 'Berkeley, CA, USA',
          email: 'dev@covidselfreport.org',
          tested: false,
          seenPhysician: false,
          hasAgreedToTerms: true,
        });

        expect(Object.keys(body)).to.include('symptoms', 'location');
      });
  });
});
