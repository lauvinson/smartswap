import { Pool } from '@/pools'
import React, { useMemo } from 'react'
import { Button, Card, CardFooter, CardHeader, Image, Link, Skeleton } from '@nextui-org/react'
import { useAllTokenData } from '@/state/tokens/hooks'
import { getEtherscanLink, notEmpty } from '@/utils'
import { useSavedTokens, useSliderAnimation } from '@/state/user/hooks'
import { useActiveNetworkVersion } from '@/state/application/hooks'
import { useThemeModeValue } from '@/providers/NextUI'
import { InView } from 'react-intersection-observer'
import CurrencyLogo from '@/components/CurrencyLogo'
import clsx from 'clsx'
import { PiBellFill, PiBellRingingFill, PiPauseFill, PiPlayFill } from 'react-icons/pi'
import { formatDollarAmount } from '@/utils/numbers'
import Percent from '@/components/Percent'
import Slider from '@/components/layout/Slider'
import { LinkComponent } from '@/components/layout/LinkComponent'

const CardSkeleton: React.FC = () => {
  return (
    <div className="max-w-full w-full flex items-center gap-3">
      {Array.from({ length: 3 }, (_, i) => {
        return <Skeleton key={i} className="flex rounded-lg w-1/3 h-24" />
      })}
    </div>
  )
}

export function TokensBanner() {
  const allTokens = useAllTokenData()
  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((t) => t.data)
      .filter(notEmpty)
  }, [allTokens])
  const [savedTokens, addSavedToken] = useSavedTokens()
  const [activeNetwork] = useActiveNetworkVersion()
  const [effect, switchEffect] = useSliderAnimation('tokens')
  const actionColor = useThemeModeValue('#a1a1aa', '#3f3f46')

  const MakeLogo = function (i: Pool) {
    return (
      <div className={'align-middle'}>
        <Image className={'object-contain -mt-10'} draggable={false} width={60} height={60} src={i.token0.icon} alt={i.token0.name} />
        <Image className={'object-contain -ml-10 mt-10'} draggable={false} width={60} height={60} src={i.token1.icon} alt={i.token1.name} />
        <p className={'ml-5 whitespace-nowrap'}>
          {i.token0.name} <span className={'font-light opacity-50'}>/</span> {i.token1.name}
        </p>
      </div>
    )
  }

  const TokensFeed = useMemo(() => {
    if (!formattedTokens) {
      return <></>
    }
    return formattedTokens.map((t, i) => {
      return (
        <div key={i}>
          <Card className="max-w-[auto] cursor-pointer bg-background/30 backdrop-blur-lg hover:scale-105">
            <CardHeader className="justify-between">
              <div className="flex gap-2">
                <InView triggerOnce={true}>
                  {({ inView, ref }) => (
                    <div ref={ref}>{inView && <CurrencyLogo address={t.address} className="flex-shrink-0" size="sm" alt={t.name} />}</div>
                  )}
                </InView>
                <div className="flex flex-col gap-1 items-start justify-center overflow-hidden text-ellipsis whitespace-nowrap w-28">
                  <h4 className="text-small font-semibold leading-none text-default-600" title={t.name}>
                    {t.name}
                  </h4>
                </div>
              </div>
              <Link
                className={clsx('cursor-pointer p-2')}
                style={savedTokens.includes(t.address) ? { color: activeNetwork.primaryColor } : {}}
                color={'foreground'}
                isExternal
                showAnchorIcon
                title={savedTokens.includes(t.address) ? 'Watched' : 'To Watch'}
                anchorIcon={savedTokens.includes(t.address) ? <PiBellRingingFill size={'16'} /> : <PiBellFill color={actionColor} size={'16'} />}
                onClick={(e) => {
                  addSavedToken(t.address)
                }}
              />
            </CardHeader>
            <CardFooter className="gap-3">
              <a className="flex gap-1" href={getEtherscanLink(1, t.address, 'address', activeNetwork)}>
                <p className="font-semibold text-small text-green-400">{formatDollarAmount(Math.abs(t.priceUSD))}</p>
                <p className=" text-default-400 text-small">Price</p>
              </a>
              <a className="flex gap-1" href={getEtherscanLink(1, t.address, 'address', activeNetwork)}>
                <p className="font-semibold text-small text-pink-400">{<Percent value={t.priceUSDChange} fontWeight={400} />}</p>
                <p className="text-default-400 text-small">Change</p>
              </a>
            </CardFooter>
          </Card>
        </div>
      )
    })
  }, [actionColor, activeNetwork, addSavedToken, formattedTokens, savedTokens])
  return (
    <div className={'overflow-hidden'}>
      {formattedTokens.length > 0 ? (
        <div className="flex flex-col">
          <span className="flex justify-between">
            <span className="font-bold text-large flex flex-row items-center">
              Tokens{' '}
              {effect ? (
                <PiPauseFill size={18} color={actionColor} className={'cursor-pointer mx-1'} onClick={switchEffect} />
              ) : (
                <PiPlayFill size={18} color={actionColor} className={'cursor-pointer mx-1'} onClick={switchEffect} />
              )}
            </span>
            <Button
              className={'hidden md:flex p-0 justify-start items-center'}
              as={LinkComponent}
              href={'#'}
              color="default"
              variant="light"
              size={'sm'}>
              View All
            </Button>
          </span>
          <Slider>
            <div className={'flex gap-[1.5rem] w-auto'}>{TokensFeed}</div>
            <div className={'flex gap-[1.5rem] w-auto'}>{TokensFeed}</div>
          </Slider>
        </div>
      ) : (
        <CardSkeleton />
      )}
    </div>
  )
}
