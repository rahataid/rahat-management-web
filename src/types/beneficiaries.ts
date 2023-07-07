export type BeneficiariesTableFilters = {
    distributionPoint: string[];
    status: string[];
    tokenAssignedStatus: string[];
    tokenClaimedStatus: string[];
    cnicNumber: string;
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
}

export type BeneficiariesList = BeneficiariesItem[];

export type DistributionPoint = string[];

export type StatusFilterOptions = string[];

export type TokenAssignedFilterOptions = string[];

export type TokenClaimedFilterOptions = string[];
