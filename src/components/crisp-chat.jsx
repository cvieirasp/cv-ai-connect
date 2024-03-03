'use client'

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

const CrispChat = ({ websiteId }) => {
  useEffect(() => {
    Crisp.configure(websiteId)
  }, [websiteId])

  return null
}

export default CrispChat
