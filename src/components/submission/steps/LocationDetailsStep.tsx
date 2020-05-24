import React, { FC, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DialogTitle, DialogContent, TextField } from '@material-ui/core';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { grey } from '@material-ui/core/colors';
import 'date-fns';

import { Location } from 'context/types';
import { UserContext } from 'context';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    padding: `4px ${theme.spacing(2)}px`,
  },
  dialogText: {
    padding: `4px ${theme.spacing(2)}px`,
  },
}));

export const LocationDetailsStep: FC = () => {
  const classes = useStyles();
  const { state: formState, dispatch: dispatchForm } = useContext(UserContext);

  const handleSelectAddress = (newAddress: string) => {
    geocodeByAddress(newAddress)
      .then((results: any) => {
        const addressComponents: {
          city: string | null;
          county: string | null;
          state: string | null;
          country: string | null;
        } = {
          city: null,
          county: null,
          state: null,
          country: null,
        };

        // Note that this is for STORING the location data, not fetching it. The
        // latter is controlled by the `searchOptions` of <PlacesAutocomplete>
        // component. So even if we want to fetch all the way down to postal
        // code level, we still need to store the data at
        // city/county/state/country levels. See additional in-code comments in
        // related methods...
        results[0].address_components.forEach((component: any) => {
          const { types, long_name } = component;

          // Docs for this mess
          // developers.google.com/maps/documentation/geocoding/intro#Types
          if (
            types.includes('locality') ||
            types.includes('neighborhood') ||
            types.includes('colloquial_area') ||
            types.includes('sublocality') ||
            types.includes('sublocality_level_1') ||
            types.includes('sublocality_level_2') ||
            types.includes('sublocality_level_3') ||
            types.includes('sublocality_level_4') ||
            types.includes('sublocality_level_5')
          ) {
            addressComponents.city = long_name;
          } else if (types.includes('administrative_area_level_1')) {
            addressComponents.state = long_name;
          } else if (types.includes('administrative_area_level_2')) {
            addressComponents.county = long_name;
          } else if (types.includes('country')) {
            addressComponents.country = long_name;
          }
        });

        dispatchForm({
          type: 'SET_ADDRESS_COMPONENTS',
          payload: addressComponents,
        });

        return results;
      })
      .then((results: any) => getLatLng(results[0]))
      .then((latLng: Location) => {
        dispatchForm({ type: 'SET_ADDRESS', payload: newAddress });
        dispatchForm({ type: 'SET_LOCATION', payload: latLng });
      })
      .catch(alert); // better than console error for now
  };

  return (
    <>
      <DialogTitle className={classes.dialogTitle}>
        Where were you when your symptoms began?
      </DialogTitle>
      <DialogContent dividers>
        <PlacesAutocomplete
          value={formState.address}
          onChange={value =>
            dispatchForm({
              type: 'SET_ADDRESS',
              payload: value,
            })
          }
          onSelect={handleSelectAddress}
          // https://developers.google.com/places/supported_types#table3
          // `geocode` basically returns everything except businesses, so it
          // must be filtered client-side. See related in-code comments for more
          // details.
          searchOptions={{ types: ['geocode'] }}
          debounce={300}
          shouldFetchSuggestions={
            !!formState.address && formState.address.length > 2
          }
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <>
              <TextField
                data-cy="location"
                {...getInputProps({
                  helperText:
                    'If you experienced no symptoms, use current city',
                  placeholder: 'Enter your city ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions
                  // Do not include overly broad or overly specific locations.
                  // This exact set cannot be accomplished using `searchOptions`
                  // in the Gmaps API, it must be filtered client-side. Note
                  // that the administrative levels mean different things in
                  // each country, but overall the below exclusions do what we
                  // want.
                  .filter(
                    suggestion =>
                      ![
                        'administrative_area_level_1', // state
                        'administrative_area_level_2', // county
                        'country',
                        'postal_code', // zip code or similar
                        'premise', // address-ish
                        'street_address', // address
                        'subpremise', // address-ish
                      ].includes(suggestion.types[0])
                  )
                  .map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';

                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: grey['600'], cursor: 'pointer' }
                      : { backgroundColor: '#424242', cursor: 'pointer' };

                    return (
                      <div
                        data-cy={`location-suggestion`}
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </PlacesAutocomplete>
      </DialogContent>
    </>
  );
};
