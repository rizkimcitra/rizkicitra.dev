'use client'

import { CustomTooltip } from '@/components/CustomTooltip'

import { TbClockRecord, TbQuestionCircle } from 'react-icons/tb'
import { type ReadTimeResults } from 'reading-time'
import { P, match } from 'ts-pattern'

type Props = {
  est_read?: ReadTimeResults
  tooltipId: string
  iconSize?: number
}

export const BlogReadingTime = (props: Props) => {
  const estReadTime = (value: ReadTimeResults) => {
    return match(Math.floor(value.minutes))
      .with(P.gte(11), () => `10+ mins. read`)
      .with(P.gte(2), (m) => `${m} mins. read`)
      .with(P.lt(1), () => 'A brief read')
      .otherwise((m) => `${m} min. read`)
  }

  return match(props.est_read)
    .with({}, (value) => (
      <span className='flex items-center'>
        <TbClockRecord size={props?.iconSize ?? 18} />
        <span className='mx-1'>{estReadTime(value)}</span>
        <TbQuestionCircle
          data-tooltip-id={props.tooltipId}
          size={14}
          className='self-start cursor-help'
        />

        <CustomTooltip place='bottom' id={props.tooltipId} clickable>
          <p className='text-sm text-white'>
            This post has <strong>{value.words} words</strong>, reading time is calculated using{' '}
            <strong>225WPM reading speeds</strong>.
          </p>
        </CustomTooltip>
      </span>
    ))
    .otherwise(() => null)
}
