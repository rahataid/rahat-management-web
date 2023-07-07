export type BeneficiariesTableFilters = {
    distributionPoint: string[];
    status: string[];
    tokenAssignedStatus: string[];
    tokenClaimedStatus: string[];
    name: string;
};

export type BeneficiariesTableFilterValue = string | string[];

export enum InternetAccess {
    YES = 'YES',
    NO = 'NO'
}

export enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export type BeneficiariesItem = {
    name: string;
    cnicNumber: number;
    hasInternetAccess: InternetAccess.YES;
    status: Status.ACTIVE;
    tokensAssigned: number;
    tokensClaimed: number;
    distributionPoint: string;
    address: string;
}

export type BeneficiariesList = BeneficiariesItem[];

export type DistributionPoint = string[];

export type StatusFilterOptions = string[];

export type TokenAssignedFilterOptions = string[];

export type TokenClaimedFilterOptions = string[];

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHERS = 'OTHERS'
}

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
