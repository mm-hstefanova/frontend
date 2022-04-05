import * as React from 'react'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import Success from './Success'
import Unsuccess from './Unsuccess'
import { DonationStep as StepType, OneTimeDonation } from '../../../gql/donations'
import { FormikStep, FormikStepper } from './FormikStepper'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'

const steps: StepType[] = [
  {
    label: 'First Step',
    component: <FirstStep />,
  },
  {
    label: 'Second Step',
    component: <SecondStep />,
  },
  {
    label: 'Third Step',
    component: <ThirdStep />,
  },
  {
    label: 'Success',
    component: <Success />,
  },
  {
    label: 'UnSuccess',
    component: <Unsuccess />,
  },
]

const initialValues: OneTimeDonation = {
  message: '',
  anonimus: true,
  amount: '',
  anonimusDonation: true,
  name: '',
  email: '',
  phone: '',
  payment: 'bank',
}
// const sleep = (time) => new Promise((acc) => setTimeout(acc, time))

export default function VerticalLinearStepper() {
  const { t } = useTranslation('one-time-donation')
  const validate = [
    yup
      .object()
      .defined()
      .shape({
        message: yup.string().notRequired(),
        anonimus: yup.bool().required().oneOf([true], 'Message'),
      }),
    yup.object().defined().shape({
      email: yup.string().email().required(),
      name: yup.string().required(),
      phone: yup.string().required(),
    }),
    yup
      .object()
      .defined()
      .shape({
        payment: yup
          .string()
          .required()
          .oneOf([t('third-step.bank-payment')], 'Message'),
      }),
  ]
  return (
    <FormikStepper
      onSubmit={async (values) => {
        // await sleep(3000)
        console.log('values', values)
      }}
      initialValues={initialValues}>
      {steps.map((step, index) => (
        <FormikStep key={step.label} validationSchema={validate[index]}>
          {step.component}
        </FormikStep>
      ))}
    </FormikStepper>
  )
}
