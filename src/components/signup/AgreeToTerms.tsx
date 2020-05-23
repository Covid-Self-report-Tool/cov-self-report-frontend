import React, { FC, useState } from 'react';
import { Checkbox, FormControlLabel, Link } from '@material-ui/core';

// TODO: break out About stuff into sub-directory
import { SimpleModal, AboutSection } from 'components';

type AgreeToTermsTypes = {
  hasAgreedToTerms: boolean;
  dispatchForm: any;
};

export const AgreeToTerms: FC<AgreeToTermsTypes> = ({
  hasAgreedToTerms,
  dispatchForm,
}) => {
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <>
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
              href="#"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                setShowTermsModal(true);
              }}
            >
              terms of service
            </Link>
            .
          </span>
        }
      />
      {showTermsModal && (
        <SimpleModal
          title="Terms of service"
          onClose={() => {
            setShowTermsModal(false);
            return null;
          }}
        >
          <AboutSection width="100%" filename="terms-of-service.html" />
        </SimpleModal>
      )}
    </>
  );
};
