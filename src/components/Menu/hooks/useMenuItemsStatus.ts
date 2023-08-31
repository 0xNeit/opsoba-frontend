import { useMemo } from 'react'
import { useCompetitionStatus } from './useCompetitionStatus'


export const useMenuItemsStatus = (): Record<string, string> => {
  const competitionStatus = useCompetitionStatus()

  return useMemo(() => {
    return {
      '/competition': competitionStatus,
    }
  }, [competitionStatus])
}
