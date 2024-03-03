import CrispChat from '@/components/crisp-chat'

const CrispProvider = () => {
  const websiteId = process.env.CRISP_WEBSITE_ID
  return <CrispChat websiteId={websiteId} />
}

export default CrispProvider
