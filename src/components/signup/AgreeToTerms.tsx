import React, { FC } from 'react';
import { Checkbox, FormControlLabel, Link } from '@material-ui/core';

type AgreeToTermsTypes = {
  hasAgreedToTerms: boolean;
  dispatchForm: any;
};

export const AgreeToTerms: FC<AgreeToTermsTypes> = ({
  hasAgreedToTerms,
  dispatchForm,
}) => (
  <FormControlLabel
    control={
      <Checkbox
        name="checkedB"
        color="primary"
        data-cy="has-agreed-to-terms"
        checked={!!hasAgreedToTerms}
        onChange={() => {
          dispatchForm({ type: 'TOGGLE_AGREED' });
        }}
      />
    }
    label={
      <span>
        I agree to the{' '}
        <Link
          className="obvious-link"
          href="/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of service
        </Link>
        .
      </span>
    }
  />
);
