import React, { useMemo, useState } from 'react'
import { Pool } from '@/pools'
import { Button, Card, CardFooter, CardHeader, Image, Skeleton } from '@nextui-org/react'
import { useAllTokenData } from '@/state/tokens/hooks'
import { notEmpty } from '@/utils'
import Slider from '@/components/layout/Slider'
import CurrencyLogo from '@/components/CurrencyLogo'
import { formatDollarAmount } from '@/utils/numbers'
import Percent from '@/components/Percent'

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
      {Array.from({ length: 3 }, (i) => {
        // eslint-disable-next-line react/jsx-key
        return <Skeleton className="flex rounded-lg w-1/3 h-24" />
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
  const [followedMap, setFollowedMap] = useState<{ [id: string]: boolean }>({})
  function updateFollowedStatus(id: string, isFollowed: boolean) {
    setFollowedMap((prev) => ({ ...prev, [id]: isFollowed }))
  }

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

  return (
    <div className={'overflow-hidden'}>
      {formattedTokens.length > 0 ? (
        <div className="flex flex-col gap-4">
          <span className="font-bold text-large">Tokens</span>
          <Slider>
            {formattedTokens.map((t, i) => {
              return (
                <div key={i}>
                  <Card className="max-w-[auto]">
                    <CardHeader className="justify-between">
                      <div className="flex gap-5">
                        <CurrencyLogo address={t.address} className="flex-shrink-0" size="sm" alt={t.name} />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">{t.name}</h4>
                          {/*<h5 className="max-w-1/4 overflow-hidden whitespace-nowrap text-overflow-ellipsis text-small tracking-tight text-default-400">*/}
                          {/*  {t.address}*/}
                          {/*</h5>*/}
                        </div>
                      </div>
                      <Button
                        className={followedMap[t.address] ? 'bg-transparent text-pink-400 border-default-200' : ''}
                        color={'default'}
                        radius="full"
                        size="sm"
                        variant={followedMap[t.address] ? 'bordered' : 'flat'}
                        onPress={() => updateFollowedStatus(t.address, !followedMap[t.address])}>
                        {followedMap[t.address] ? 'Unwatch' : 'Watch'}
                      </Button>
                    </CardHeader>
                    <CardFooter className="gap-3">
                      <div className="flex gap-1">
                        <p className="font-semibold text-small text-green-400">{formatDollarAmount(Math.abs(t.priceUSD))}</p>
                        <p className=" text-default-400 text-small">Price</p>
                      </div>
                      <div className="flex gap-1">
                        <p className="font-semibold text-small text-pink-400">{<Percent value={t.priceUSDChange} fontWeight={400} />}</p>
                        <p className="text-default-400 text-small">Change</p>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              )
            })}
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
