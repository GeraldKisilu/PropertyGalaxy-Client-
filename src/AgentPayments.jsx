import React from 'react'
import ListingFee from './ListingFee'
import Payment from './Payment'

function AgentPayments() {
  return (
    <div>

        <ListingFee feeId={1}/>
        <Payment listingFeeId={1} agentId={1}/>
    </div>
  )
}

export default AgentPayments