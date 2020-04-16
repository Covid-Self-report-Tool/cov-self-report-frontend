import React, { FC } from 'react';
import { DialogTitle, DialogContent, TextField } from '@material-ui/core';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { grey } from '@material-ui/core/colors';

import { SymptomForm, Location, DispatchFormType } from 'types/submission';
import 'date-fns';

type LocationDetailsStepType = {
  formState: SymptomForm;
  dispatchForm: DispatchFormType;
};

export const LocationDetailsStep: FC<LocationDetailsStepType> = ({
  formState,
  dispatchForm,
}) => {
  const handleSelectAddress = (newAddress: string) => {
    geocodeByAddress(newAddress)
      .then((results: any) => getLatLng(results[0]))
      .then((latLng: Location) => {
        dispatchForm({ type: 'SET_ADDRESS', payload: newAddress });
        dispatchForm({ type: 'SET_LOCATION', payload: latLng });
      })
      .catch(alert); // better than console error for now
  };

  return (
    <div>
      <DialogTitle>Where do you live?</DialogTitle>
      <DialogContent>
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
          searchOptions={{ types: ['(regions)'] }}
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
