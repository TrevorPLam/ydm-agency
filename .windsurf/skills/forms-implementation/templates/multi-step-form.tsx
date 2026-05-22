'use client'

import { useState } from 'react'

export function MultiStepForm() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({})

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div>
      {step === 0 && <Step1 data={data} setData={setData} onNext={nextStep} />}
      {step === 1 && <Step2 data={data} setData={setData} onNext={nextStep} onPrev={prevStep} />}
      {step === 2 && <Step3 data={data} onSubmit={() => console.log(data)} onPrev={prevStep} />}
    </div>
  )
}
