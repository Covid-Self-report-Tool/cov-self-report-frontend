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
  it('goes through the submission form and sees success modal', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        //debugger;
        if (win.window.google) {
          cy.stub(win.window, 'google').returns(setupGoogleMock());
        }
      },
    });

    // App.start();

    cy.server();

    cy.route({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/place/js/*',
      response: [],
    });

    cy.get('[data-cy=add-symptoms-splash]').click();

    cy.get('[data-cy=next-button]').click();

    cy.get('[data-cy=tested-covid-no]').click();

    cy.get('[data-cy=seen-physician-no]').click();

    cy.get('[data-cy=next-button]').click();

    global.window.google = setupGoogleMock();

    cy.window().then(window => {
      // debugger;
      global.window.google = setupGoogleMock();
      cy.stub(window.google.maps.places, 'AutocompleteService').returns(() => {
        predictions: [];
      }); //, setupGoogleMock()['maps']['places']['AutocompletionService'];
      cy.stub(window.window, 'google').returns(setupGoogleMock()); //, setupGoogleMock()['maps']['places']['AutocompletionService'];
    });

    // cy.login(Cypress.env('TEST_UID'));

    cy.on('window:before:load', win => {
      debugger;

      //Object.defineProperty(win.window, 'google', setupGoogleMock());
    });

    console.log(window);

    cy.get('[data-cy=location]').type('Berkeley, CA, USA');

    cy.get('[data-cy=location-suggestion]').click();

    cy.get('[data-cy=next-button]').click();

    cy.get('[data-cy=register-email]').click();

    cy.get('[data-cy=register-email-field]').type('dev@covidselfreport.org');

    cy.get('[data-cy=register-password-field]').type('password');

    cy.get('[data-cy=register-password2-field]').type('password');

    cy.get('[data-cy=submit-button]').should('be.disabled');

    cy.get('[data-cy=has-agreed-to-terms').click();
  });
});
