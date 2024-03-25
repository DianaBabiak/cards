import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledRadioGroup } from '@/components/ui/controlled/controledRadioGroup/ControledRadioGroup'
import { Icon } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'
import { Header } from '@/features/header'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './learnDeck.module.scss'

type LearnDeckProps = {
  answer: string
  deckName: string
  imageAnswer?: string
  imageQuestion?: string
  numberAttempts: number
  question: string
}

const LearnDeckFormSchema = z.object({
  grade: z.string(),
})

export type LearnDeckFormValues = z.infer<typeof LearnDeckFormSchema>
export const LearnDeck = ({
  answer,
  deckName,
  imageAnswer,
  imageQuestion,
  numberAttempts,
  question,
}: LearnDeckProps) => {
  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const optionsRadioGroup = [
    {
      label: 'Did not know',
      value: '0',
    },
    {
      label: 'Forgot',
      value: '1',
    },
    {
      label: 'A lot of thought',
      value: '2',
    },
    {
      label: 'Сonfused',
      value: '3',
    },
    {
      label: 'Knew the answer',
      value: '4',
    },
  ]

  const showAnswerHandler = () => {
    setIsShowAnswer(true)
  }

  const {
    control,
    formState: {},
    handleSubmit,
  } = useForm<LearnDeckFormValues>({
    resolver: zodResolver(LearnDeckFormSchema),
  })
  const onSubmit = (data: LearnDeckFormValues) => {
    console.log(data, 'jjjjjj')
  }

  return (
    <>
      <Header />
      <div className={s.container}>
        <a className={s.link}>
          <Icon height={'16'} iconId={'backArrow'} viewBox={'0 0 16 16'} width={'16'}></Icon>
          <Typography variant={'body2'}>Back to Decks List</Typography>
        </a>
        <Card className={s.containerCard}>
          <Typography variant={'h1'}>Learn {deckName}</Typography>
          <ItemLearnCard image={imageQuestion} label={'Question: '} text={question} />
          <div className={s.containerText}>
            <Typography colorTheme={'dark'} variant={'body2'}>
              Количество попыток ответов на вопрос:
            </Typography>
            <Typography colorTheme={'dark'} variant={'subtitle2'}>
              {numberAttempts}
            </Typography>
          </div>
          {!isShowAnswer && (
            <Button isFullWidth onClick={showAnswerHandler}>
              Show Answer
            </Button>
          )}
          {isShowAnswer && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ItemLearnCard image={imageAnswer} label={'Answer: '} text={answer} />
              <div className={s.containerRadio}>
                <Typography variant={'subtitle1'}>Rate yourself:</Typography>
                <DevTool control={control} />
                <ControlledRadioGroup
                  control={control}
                  defaultValue={'0'}
                  name={'grade'}
                  options={optionsRadioGroup}
                />
              </div>
              <Button isFullWidth>Next Question</Button>
            </form>
          )}
        </Card>
      </div>
    </>
  )
}

type ItemLearnCardProps = {
  image?: string
  label: string
  text: string
}
export const ItemLearnCard = ({ image, label, text }: ItemLearnCardProps) => {
  return (
    <>
      <div className={s.containerText}>
        <Typography variant={'subtitle1'}>{label} </Typography>
        <Typography variant={'body1'}> {text}</Typography>
      </div>
      {image && <img alt={'imgQuestion'} className={s.img} src={image} />}
    </>
  )
}
