import React, { createContext, FC, useReducer } from 'react';
import { initialFormStateType, actionType } from 'components/signup/types';
import { initialFormState, formReducer } from 'components/signup';

export const RegistrationContext = createContext<{
  state: initialFormStateType;
  dispatch: any;
}>({
  state: initialFormState,
  dispatch: null,
});

export type RegistrationProviderType = {
  children: React.ReactNode;
};

export const RegistrationProvider: FC<RegistrationProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  return (
    <RegistrationContext.Provider value={{ state, dispatch }}>
      {children}
    </RegistrationContext.Provider>
  );
};
