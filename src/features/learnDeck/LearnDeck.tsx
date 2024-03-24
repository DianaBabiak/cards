import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { RadioGroup } from '@/components/ui/radioGroup'
import { Typography } from '@/components/ui/typography'
import { Header } from '@/features/header'

import s from './learnDeck.module.scss'

type LearnDeckProps = {
  answer: string
  deckName: string
  imageAnswer?: string
  imageQuestion?: string
  numberAttempts: number
  question: string
}

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
      value: 'didNotKnow',
    },
    {
      label: 'Forgot',
      value: 'forgot',
    },
    {
      label: 'A lot of thought',
      value: 'aLotOfThought',
    },
    {
      label: 'Сonfused',
      value: 'confused',
    },
    {
      label: 'Knew the answer',
      value: 'knewTheAnswer',
    },
  ]

  const showAnswerHandler = () => {
    setIsShowAnswer(true)
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
            <>
              <ItemLearnCard image={imageAnswer} label={'Answer: '} text={answer} />
              <div className={s.containerRadio}>
                <Typography variant={'subtitle1'}>Rate yourself:</Typography>
                <RadioGroup defaultValue={'didNotKnow'} options={optionsRadioGroup} />
              </div>
              <Button isFullWidth>Next Question</Button>
            </>
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
