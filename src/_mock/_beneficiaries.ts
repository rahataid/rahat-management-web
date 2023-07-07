import { BeneficiariesList, DistributionPoint, InternetAccess, Status, StatusFilterOptions, TokenAssignedFilterOptions, TokenClaimedFilterOptions } from "src/types/beneficiaries";

export const beneficiariesList: BeneficiariesList = [...Array(30)].map((_, index) => ({
  name: `Beneficiary Name ${index}`,
  cnicNumber: index,
  hasInternetAccess: InternetAccess.YES,
  status: Status.ACTIVE,
  tokensAssigned: 200,
  tokensClaimed: 300,
  distributionPoint: 'Kathmandu'
}));

export const distributionPointOptions: DistributionPoint = [
  'Kathmandu',
  'Pokhara',
  'Hetauda'
]

export const statusFilterOptions: StatusFilterOptions = [
  'ACTIVE',
  'INACTIVE'
]

export const tokenAssignedFilterOptions: TokenAssignedFilterOptions = [
  'ASSIGNED ACTIVE',
  'ASSIGNED INACTIVE'
]

export const tokenClaimedFilterOptions: TokenClaimedFilterOptions = [
  'CLAIMED ACTIVE',
  'CLAIMED INACTIVE'
]