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

        results[0].address_components.forEach((component: any) => {
          if (component.types.includes('locality')) {
            addressComponents.city = component.long_name;
          } else if (component.types.includes('administrative_area_level_1')) {
            addressComponents.state = component.long_name;
          } else if (component.types.includes('administrative_area_level_2')) {
            addressComponents.county = component.long_name;
          } else if (component.types.includes('country')) {
            addressComponents.country = component.long_name;
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
    <div>
      <DialogTitle className={classes.dialogTitle}>
        Where do you live?
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
          // NOTE: actually need the parentheses around 'regions'
          // https://developers.google.com/places/supported_types#table3
          searchOptions={{ types: ['(cities)'] }}
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
            <div>
              <TextField
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: grey['600'], cursor: 'pointer' }
                    : { backgroundColor: '#424242', cursor: 'pointer' };
                  return (
                    <div
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
            </div>
          )}
        </PlacesAutocomplete>
      </DialogContent>
    </div>
  );
};
