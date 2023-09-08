import React from 'react'
import { Pool } from '@/pools'
import { Image } from '@nextui-org/react'

interface Props {
  className?: string
  title?: React.ReactNode | string
  intro?: React.ReactNode | string
  items: Pool[]
}

function isPoolConfig(item: Pool): item is Pool {
  return (item as Pool).token0 !== undefined
}

export function CardList(props: Props) {
  // const tbBgColor = useThemeModeValue(`${THEME_COLOR_SCHEME}.50`, `${THEME_COLOR_SCHEME}.800`)

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
      <div className="table w-full ...">
        <div className="table-header-group ...">
          <div className="table-row">
            <div className="table-cell text-left ...">Song</div>
            <div className="table-cell text-left ...">Artist</div>
            <div className="table-cell text-left ...">Year</div>
          </div>
        </div>
        <div className="table-row-group">
          <div className="table-row">
            <div className="table-cell ...">The Sliding Mr. Bones (Next Stop, Pottersville)</div>
            <div className="table-cell ...">Malcolm Lockyer</div>
            <div className="table-cell ...">1961</div>
          </div>
          <div className="table-row">
            <div className="table-cell ...">Witchy Woman</div>
            <div className="table-cell ...">The Eagles</div>
            <div className="table-cell ...">1972</div>
          </div>
          <div className="table-row">
            <div className="table-cell ...">Shining Star</div>
            <div className="table-cell ...">Earth, Wind, and Fire</div>
            <div className="table-cell ...">1975</div>
          </div>
        </div>
      </div>
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
