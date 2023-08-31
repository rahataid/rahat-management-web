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
    alternateMatches: ['Full Name', 'First Name', 'Last Name', 'Customer Name', 'firstname'],
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
    alternateMatches: ['Wallet ID', 'Wallet', 'Address'],
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
    alternateMatches: ['Ownership', 'Phone', 'Phone Owner', 'email'],
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
    alternateMatches: ['Status', 'Bank', 'Account Status', 'lastname'],
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
    alternateMatches: ['Sex', 'years'],
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
    alternateMatches: ['Birth Date', 'DOB', 'manager'],
  },
  {
    label: 'Latitude',
    key: 'latitude',
    fieldType: {
      type: 'input',
    },
    alternateMatches: ['Lat'],
  },
  {
    label: 'Longitude',
    key: 'longitude',
    fieldType: {
      type: 'input',
    },
    alternateMatches: ['Lon', 'Long', 'team'],
  },
];
