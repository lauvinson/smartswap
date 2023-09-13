import React, { useMemo } from 'react'
import { Pool } from '@/pools'
import { Card, CardFooter, CardHeader, Image, Link, Skeleton } from '@nextui-org/react'
import { useAllTokenData } from '@/state/tokens/hooks'
import { getEtherscanLink, notEmpty } from '@/utils'
import Slider from '@/components/layout/Slider'
import CurrencyLogo from '@/components/CurrencyLogo'
import { formatDollarAmount } from '@/utils/numbers'
import Percent from '@/components/Percent'
import clsx from 'clsx'
import { useSavedTokens, useSliderAnimation } from '@/state/user/hooks'
import { useActiveNetworkVersion } from '@/state/application/hooks'
import { Bell, BellOff, Pause, Play } from 'react-feather'
import { InView } from 'react-intersection-observer'

interface Props {
  className?: string
  title?: React.ReactNode | string
  intro?: React.ReactNode | string
  items: Pool[]
}

function isPoolConfig(item: Pool): item is Pool {
  return (item as Pool).token0 !== undefined
}

const CardSkeleton: React.FC = () => {
  return (
    <div className="max-w-full w-full flex items-center gap-3">
      {Array.from({ length: 3 }, (_, i) => {
        return <Skeleton key={i} className="flex rounded-lg w-1/3 h-24" />
      })}
    </div>
  )
}

export function CardList(props: Props) {
  const allTokens = useAllTokenData()
  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((t) => t.data)
      .filter(notEmpty)
  }, [allTokens])
  const [savedTokens, addSavedToken] = useSavedTokens()
  const [activeNetwork] = useActiveNetworkVersion()
  const [effect, switchEffect] = useSliderAnimation('tokens')

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
          <Card className="max-w-[auto]">
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
                  {/*<h5 className="max-w-1/4 overflow-hidden whitespace-nowrap text-overflow-ellipsis text-small tracking-tight text-default-400">*/}
                  {/*  {t.address}*/}
                  {/*</h5>*/}
                </div>
              </div>
              <Link
                className={clsx(savedTokens.includes(t.address) ? 'text-pink-400' : '', 'cursor-pointer p-2 hover:text-pink-400')}
                color={'foreground'}
                isExternal
                showAnchorIcon
                title={savedTokens.includes(t.address) ? 'Watched' : 'To Watch'}
                anchorIcon={savedTokens.includes(t.address) ? <BellOff size={'16'} /> : <Bell size={'16'} />}
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
  }, [activeNetwork, addSavedToken, formattedTokens, savedTokens])
  return (
    <div className={'overflow-hidden'}>
      {formattedTokens.length > 0 ? (
        <div className="flex flex-col">
          <span className="font-bold text-large flex flex-row items-center">
            Tokens{' '}
            {effect ? (
              <Pause size={18} className={'cursor-pointer mx-1'} color={activeNetwork.primaryColor} onClick={switchEffect} />
            ) : (
              <Play size={18} className={'cursor-pointer mx-1'} color={activeNetwork.primaryColor} onClick={switchEffect} />
            )}
          </span>
          <Slider>
            <div className={'flex gap-[1.5rem] w-auto'}>{TokensFeed}</div>
            <div className={'flex gap-[1.5rem] w-auto'}>{TokensFeed}</div>
          </Slider>
        </div>
      ) : (
        <CardSkeleton />
      )}
      {/*<Card>*/}
      {/*  {props.title && <CardHeader borderBottomWidth={1}>{props.title}</CardHeader>}*/}
      {/*  <CardBody>*/}
      {/*    <TableContainer>*/}
      {/*      <Table variant="simple">*/}
      {/*        {props.intro && <TableCaption>{props.intro}</TableCaption>}*/}
      {/*        <Thead>*/}
      {/*          <Tr>*/}
      {/*            <Th>Name</Th>*/}
      {/*            <Th>Fee</Th>*/}
      {/*            <Th isNumeric>APR</Th>*/}
      {/*          </Tr>*/}
      {/*        </Thead>*/}
      {/*        <Tbody>*/}
      {/*          {props.items.map((i, index) => {*/}
      {/*            if (isPoolConfig(i)) {*/}
      {/*              return (*/}
      {/*                <LinkBox*/}
      {/*                  fontWeight="bold"*/}
      {/*                  as="tr"*/}
      {/*                  key={`${index}_${i.token0.name}`}*/}
      {/*                  _hover={{*/}
      {/*                    bg: tdHoverBgColor,*/}
      {/*                    textColor: tdHoverTextColor,*/}
      {/*                  }}>*/}
      {/*                  <Td borderRadius={['md', '0', '0', 'md']}>*/}
      {/*                    <LinkComponent href={'/applications/pool/' + i.id}>*/}
      {/*                      <LinkOverlay _hover={{ textDecoration: 'none' }}>{MakeLogo(i)}</LinkOverlay>*/}
      {/*                    </LinkComponent>*/}
      {/*                  </Td>*/}
      {/*                  <Td>*/}
      {/*                    <LinkComponent href={'/applications/pool/' + i.id}>*/}
      {/*                      <LinkOverlay _hover={{ textDecoration: 'none' }} textDecoration="underline dotted">*/}
      {/*                        {i.fee / 10000}%*/}
      {/*                      </LinkOverlay>*/}
      {/*                    </LinkComponent>*/}
      {/*                  </Td>*/}
      {/*                  <Td isNumeric borderRadius={['0', 'md', 'md', '0']}>*/}
      {/*                    <LinkComponent href={'/applications/pool/' + i.id}>*/}
      {/*                      <LinkOverlay _hover={{ textDecoration: 'none' }} textDecoration="underline dotted">*/}
      {/*                        {i.apr}%*/}
      {/*                      </LinkOverlay>*/}
      {/*                    </LinkComponent>*/}
      {/*                  </Td>*/}
      {/*                </LinkBox>*/}
      {/*              )*/}
      {/*            }*/}
      {/*          })}*/}
      {/*        </Tbody>*/}
      {/*      </Table>*/}
      {/*    </TableContainer>*/}
      {/*  </CardBody>*/}
      {/*</Card>*/}
    </div>
  )
}
