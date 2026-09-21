import { Navigate, Route, Routes } from 'react-router-dom'
import { AssistantPanel } from './components/AssistantPanel'
import { ApplicationTracker } from './screens/ApplicationTracker'
import { BusinessProfile } from './screens/BusinessProfile'
import { DocumentChecklist } from './screens/DocumentChecklist'
import { FinancialProfile } from './screens/FinancialProfile'
import { IndicativeResult } from './screens/IndicativeResult'
import { Landing } from './screens/Landing'
import { LeadCapture } from './screens/LeadCapture'
import { ReadinessSummary } from './screens/ReadinessSummary'
import { WhatHappensNext } from './screens/WhatHappensNext'
import { useLoan } from './context/LoanContext'

function ReadyRedirect() {
  const { application } = useLoan()
  return <Navigate to={application.submitted ? '/track' : '/check/documents'} replace />
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/check/business" element={<BusinessProfile />} />
        <Route path="/check/financial" element={<FinancialProfile />} />
        <Route path="/check/result" element={<IndicativeResult />} />
        <Route path="/check/lead" element={<LeadCapture />} />
        <Route path="/check/documents" element={<DocumentChecklist />} />
        <Route path="/next-steps" element={<WhatHappensNext />} />
        <Route path="/ready" element={<ReadyRedirect />} />
        <Route path="/track" element={<ApplicationTracker />} />
        <Route path="/summary" element={<ReadinessSummary />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AssistantPanel />
    </>
  )
}
