import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledRadioGroup } from '@/components/ui/controlled/controledRadioGroup/ControledRadioGroup'
import { Icon } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'
import {
  SaveGradeCard,
  useGetRandomCardQuery,
  useSaveGradeCardMutation,
} from '@/features/decksList/api'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './learnDeck.module.scss'

export type LearnDeckProps = {}

const LearnDeckFormSchema = z.object({
  grade: z.string().default('1'),
})

export type LearnDeckFormValues = z.infer<typeof LearnDeckFormSchema>
export const LearnDeck = ({}: LearnDeckProps) => {
  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const optionsRadioGroup = [
    {
      label: 'Did not know',
      value: '1',
    },
    {
      label: 'Forgot',
      value: '2',
    },
    {
      label: 'A lot of thought',
      value: '3',
    },
    {
      label: 'Сonfused',
      value: '4',
    },
    {
      label: 'Knew the answer',
      value: '5',
    },
  ]
  const location = useLocation()
  const idDeck = location.pathname.split('/').pop()

  const { data, isLoading } = useGetRandomCardQuery({ idDeck: idDeck || '' })
  const [saveGradeCard, { isError }] = useSaveGradeCardMutation()

  const showAnswerHandler = () => {
    setIsShowAnswer(true)
  }

  const {
    control,
    formState: {},
    handleSubmit,
    reset,
  } = useForm<LearnDeckFormValues>({
    resolver: zodResolver(LearnDeckFormSchema),
  })

  const onSubmit = async (dataLearnDeckForm: LearnDeckFormValues) => {
    try {
      await saveGradeCard({
        cardId: data?.id || '',
        grade: parseInt(dataLearnDeckForm.grade, 10) as SaveGradeCard['grade'],
        idDeck: idDeck || '',
      })
      if (!isError) {
        reset({ grade: '1' })
        setIsShowAnswer(false)
      }
    } catch (err) {
      console.error('Ошибка при изучении дека:', err)
    }
  }

  return (
    <div className={s.container}>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <Link className={s.link} to={'/'}>
            <Icon height={'16'} iconId={'backArrow'} viewBox={'0 0 16 16'} width={'16'}></Icon>
            <Typography variant={'body2'}>Back to Decks List</Typography>
          </Link>
          {!data ? (
            <div className={s.emptyDeck}>Deck is empty</div>
          ) : (
            <Card className={s.containerCard}>
              <Typography variant={'h1'}>Learn card</Typography>
              <ItemLearnCard
                image={data?.questionImg}
                label={'Question: '}
                text={data?.question || ''}
              />
              {!isShowAnswer && (
                <Button isFullWidth onClick={showAnswerHandler}>
                  Show Answer
                </Button>
              )}
              {isShowAnswer && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ItemLearnCard
                    image={data?.answerImg}
                    label={'Answer: '}
                    text={data?.answer || ''}
                  />
                  <div className={s.containerRadio}>
                    <Typography variant={'subtitle1'}>Rate yourself:</Typography>
                    <DevTool control={control} />
                    <ControlledRadioGroup
                      control={control}
                      defaultValue={'1'}
                      name={'grade'}
                      options={optionsRadioGroup}
                    />
                  </div>
                  <Button isFullWidth>Next Question</Button>
                </form>
              )}
            </Card>
          )}
        </>
      )}
    </div>
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
