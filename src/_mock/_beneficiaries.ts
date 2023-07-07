import { BeneficiariesList, DistributionPoint, Gender, IBeneficiaryClaimsDetails, IBeneficiaryDetails, InternetAccess, Status, StatusFilterOptions, TokenAssignedFilterOptions, TokenClaimedFilterOptions } from "src/types/beneficiaries";

export const beneficiariesList: BeneficiariesList = [...Array(30)].map((_, index) => ({
  name: `Beneficiary Name ${index}`,
  cnicNumber: index,
  hasInternetAccess: InternetAccess.YES,
  status: Status.ACTIVE,
  tokensAssigned: 200,
  tokensClaimed: 300,
  distributionPoint: 'Kathmandu',
  address: '0x11111abcde'
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

export const beneficiaryDetails: IBeneficiaryDetails = {
  name: 'Cristiano Ronaldo',
  phone: 9841123456,
  gender: Gender.MALE,
  cnicNumber: 70707070707,
  district: 'Darchula',
  dailyWaterConsumption: 100,
  dailyDistanceCovered: 20,
  status: Status.ACTIVE
}

export const beneficiaryClaimsDetails: IBeneficiaryClaimsDetails = {
  claimedDate: '07/Jul/2023',
  receivedDate: '07/Jul/2023',
  claimedAmount: 200,
  receivedAmount: 100,
  walletAddress: '0x77777abcde'
}
