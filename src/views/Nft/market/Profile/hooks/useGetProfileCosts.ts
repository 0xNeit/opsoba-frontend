import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import { multicallv2 } from 'utils/multicall'
import profileABI from 'config/abi/pancakeProfile.json'
import { getPancakeProfileAddress } from 'utils/addressHelpers'
import useToast from 'hooks/useToast'

const useGetProfileCosts = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [costs, setCosts] = useState({
    numberSobaToReactivate: ethers.BigNumber.from(0),
    numberSobaToRegister: ethers.BigNumber.from(0),
    numberSobaToUpdate: ethers.BigNumber.from(0),
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const calls = ['numberSobaToReactivate', 'numberSobaToRegister', 'numberSobaToUpdate'].map((method) => ({
          address: getPancakeProfileAddress(),
          name: method,
        }))
        const [[numberSobaToReactivate], [numberSobaToRegister], [numberSobaToUpdate]] = await multicallv2<
          [[ethers.BigNumber], [ethers.BigNumber], [ethers.BigNumber]]
        >(profileABI, calls)

        setCosts({
          numberSobaToReactivate,
          numberSobaToRegister,
          numberSobaToUpdate,
        })
        setIsLoading(false)
      } catch (error) {
        toastError(t('Error'), t('Could not retrieve SOBA costs for profile'))
      }
    }

    fetchCosts()
  }, [setCosts, toastError, t])

  return { costs, isLoading }
}

export default useGetProfileCosts
