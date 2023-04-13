import React, { ReactNode } from 'react'
import { SnackData } from '../interfaces/SnackData'
import { getBurgers, getDrinks, getIceCreams, getPizzas } from '../services/api'

interface SnackContextProps {
  burgers: SnackData[]
  pizzas: SnackData[]
  drinks: SnackData[]
  iceCreams: SnackData[]
}

interface SnackProviderProps {
  children: ReactNode
}

export const SnackContext = React.createContext({} as SnackContextProps)

export function SnackProvider({ children }: SnackProviderProps) {
  const [burgers, setBurgers] = React.useState<SnackData[]>([])
  const [pizzas, setPizzas] = React.useState<SnackData[]>([])
  const [drinks, setDrinks] = React.useState<SnackData[]>([])
  const [iceCreams, seticeCreams] = React.useState<SnackData[]>([])

  React.useEffect(() => {
    ;(async () => {
      try {
        const burgersRequest = await getBurgers()
        const pizzasRequest = await getPizzas()
        const drinksRequest = await getDrinks()
        const iceCreamsRequest = await getIceCreams()

        const requests = [burgersRequest, pizzasRequest, drinksRequest, iceCreamsRequest]

        const [
          { data: burgersResponse },
          { data: pizzasResponse },
          { data: drinksResponse },
          { data: iceCreamsResponse },
        ] = await Promise.all(requests)

        setBurgers(burgersResponse)
        setPizzas(pizzasResponse)
        setDrinks(drinksResponse)
        seticeCreams(iceCreamsResponse)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <SnackContext.Provider value={{ burgers, pizzas, drinks, iceCreams }}>
      {children}
    </SnackContext.Provider>
  )
}
