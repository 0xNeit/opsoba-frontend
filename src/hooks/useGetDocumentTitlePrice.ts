import { useEffect } from 'react'
import { useSobaBusdPrice } from 'hooks/useBUSDPrice'

const useGetDocumentTitlePrice = () => {
  const sobaPriceBusd = useSobaBusdPrice()
  useEffect(() => {
    const sobaPriceBusdString = sobaPriceBusd ? sobaPriceBusd.toFixed(2) : ''
    document.title = `Soba Swap - ${sobaPriceBusdString}`
  }, [sobaPriceBusd])
}
export default useGetDocumentTitlePrice
