export const fields = [
  {
    label: 'Name',
    key: 'name',
    fieldType: {
      type: 'input',
    },
    validations: [
      {
        rule: 'required',
        errorMessage: 'Name is required',
        level: 'error',
      },
    ],
  },
  {
    label: 'Wallet Address',
    key: 'walletAddress',
    fieldType: {
      type: 'input',
    },
    validations: [
      {
        rule: 'required',
        errorMessage: 'Wallet Address is required',
        level: 'error',
      },
    ],
  },
  {
    label: 'Phone Ownership',
    key: 'phoneOwnership',
    fieldType: {
      type: 'input',
    },
    validations: [
      {
        rule: 'required',
        errorMessage: 'Phone Ownership is required',
        level: 'error',
      },
    ],
  },
  {
    label: 'Bank Status',
    key: 'bankStatus',
    fieldType: {
      type: 'input',
    },
    validations: [
      {
        rule: 'required',
        errorMessage: 'Bank Status is required',
        level: 'error',
      },
    ],
  },
  {
    label: 'Gender',
    key: 'gender',
    fieldType: {
      type: 'input',
    },
    validations: [
      {
        rule: 'required',
        errorMessage: 'Gender is required',
        level: 'error',
      },
    ],
  },
  {
    label: 'Date of Birth',
    key: 'dob',
    fieldType: {
      type: 'input',
    },
    validations: [
      {
        rule: 'required',
        errorMessage: 'Date of Birth is required',
        level: 'error',
      },
    ],
  },
  {
    label: 'Latitude',
    key: 'latitude',
    fieldType: {
      type: 'input',
    },
  },
  {
    label: 'Longitude',
    key: 'longitude',
    fieldType: {
      type: 'input',
    },
  },
];
