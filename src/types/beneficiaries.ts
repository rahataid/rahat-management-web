export enum InternetAccess {
    YES = 'YES',
    NO = 'NO'
}

export enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHERS = 'OTHERS'
}

export type IBeneficiariesTableFilters = {
    distributionPoint: string[];
    status: string[];
    tokenAssignedStatus: string[];
    tokenClaimedStatus: string[];
    name: string;
};

export type IBeneficiariesTableFilterValue = string | string[];

export type IBeneficiariesItem = {
    name: string;
    cnicNumber: number;
    hasInternetAccess: InternetAccess.YES;
    status: Status.ACTIVE;
    tokensAssigned: number;
    tokensClaimed: number;
    distributionPoint: string;
    address: string;
}

export type IBeneficiariesList = IBeneficiariesItem[];

export type IDistributionPoint = string[];

export type IStatusFilterOptions = string[];

export type ITokenAssignedFilterOptions = string[];

export type ITokenClaimedFilterOptions = string[];

export type IBeneficiaryDetails = {
    name: string,
    phone: number,
    gender: Gender.MALE,
    cnicNumber: number,
    district: string,
    dailyWaterConsumption: number,
    dailyDistanceCovered: number,
    status: Status.ACTIVE
}

export type IBeneficiaryClaimsDetails = {
    claimedDate: string,
    receivedDate: string,
    claimedAmount: number,
    receivedAmount: number,
    walletAddress: string
}

export type IBeneficiaryDetailsTableItem = {
    timestamp: string,
    hash: string,
    event: string,
    amount: number
}

export type IBeneficiaryDetailsTableList = IBeneficiaryDetailsTableItem[];
