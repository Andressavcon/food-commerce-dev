import React from 'react'
import { useCart } from '../../../hooks/useCart'
import { TableDesktop } from './TableDesktop'
import { TableMobile } from './TableMobile'
import { EmptyCart } from '../../../components/EmptyCart'

export function Table() {
  const [windowWidth, setWindowWidth] = React.useState(document.documentElement.clientWidth)

  const { cart } = useCart()

  React.useEffect(() => {
    function updateTableComponentBaseWindowWidth(){
      const currentWidth = document.documentElement.clientWidth
      setWindowWidth(currentWidth)
    }

    window.addEventListener('resize', updateTableComponentBaseWindowWidth)

    return () => {
      window.removeEventListener('resize', updateTableComponentBaseWindowWidth)
    }
  }, [])

  if (cart.length === 0) return <EmptyCart title='Ops! Parece que você não tem pedidos, peça já!' />
  return windowWidth > 768 ? <TableDesktop /> : <TableMobile />
}
