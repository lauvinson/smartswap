import React, { ReactNode } from 'react'
import {
  CardBody,
  CardHeader,
  Flex,
  Image,
  LinkBox,
  LinkOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { HeadingComponent } from './HeadingComponent'
import { SECOND_COLOR_SCHEME, THEME_COLOR_SCHEME } from '@/utils/config'
import { Pool } from '@/pools'
import { LinkComponent } from './LinkComponent'
import { useThemeModeValue } from '@/providers/NextUI'
import { Card } from '@nextui-org/react'

interface ListItemType {
  title: string
  description: React.ReactNode | string
  image: string[]
  url?: string
}

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
  const className = props.className ?? ''
  const invert = useThemeModeValue('20%', '80%')
  const tdHoverBgColor = useThemeModeValue(`${THEME_COLOR_SCHEME}.100`, `${THEME_COLOR_SCHEME}.900`)
  const tdHoverTextColor = useThemeModeValue(`${SECOND_COLOR_SCHEME}.500`, `${SECOND_COLOR_SCHEME}.300`)
  // const tbBgColor = useThemeModeValue(`${THEME_COLOR_SCHEME}.50`, `${THEME_COLOR_SCHEME}.800`)

  const MakeLogo = function (i: Pool) {
    return (
      <Flex alignItems="center">
        <Image draggable={false} objectFit="contain" maxW="60px" src={i.token0.icon} alt={i.token0.name} mt="-10px" />
        <Image draggable={false} objectFit="contain" maxW="60px" src={i.token1.icon} alt={i.token1.name} ml="-10px" mt="10px" />
        <Text ml={5} whiteSpace="nowrap">
          {i.token0.name}{' '}
          <Text as="span" fontWeight="light" opacity={0.5}>
            /
          </Text>{' '}
          {i.token1.name}
        </Text>
      </Flex>
    )
  }

  return (
    <div className={'overflow-hidden'}>
      <Card>
        {props.title && <CardHeader borderBottomWidth={1}>{props.title}</CardHeader>}
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              {props.intro && <TableCaption>{props.intro}</TableCaption>}
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Fee</Th>
                  <Th isNumeric>APR</Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.items.map((i, index) => {
                  if (isPoolConfig(i)) {
                    return (
                      <LinkBox
                        fontWeight="bold"
                        as="tr"
                        key={`${index}_${i.token0.name}`}
                        _hover={{
                          bg: tdHoverBgColor,
                          textColor: tdHoverTextColor,
                        }}>
                        <Td borderRadius={['md', '0', '0', 'md']}>
                          <LinkComponent href={'/applications/pool/' + i.id}>
                            <LinkOverlay _hover={{ textDecoration: 'none' }}>{MakeLogo(i)}</LinkOverlay>
                          </LinkComponent>
                        </Td>
                        <Td>
                          <LinkComponent href={'/applications/pool/' + i.id}>
                            <LinkOverlay _hover={{ textDecoration: 'none' }} textDecoration="underline dotted">
                              {i.fee / 10000}%
                            </LinkOverlay>
                          </LinkComponent>
                        </Td>
                        <Td isNumeric borderRadius={['0', 'md', 'md', '0']}>
                          <LinkComponent href={'/applications/pool/' + i.id}>
                            <LinkOverlay _hover={{ textDecoration: 'none' }} textDecoration="underline dotted">
                              {i.apr}%
                            </LinkOverlay>
                          </LinkComponent>
                        </Td>
                      </LinkBox>
                    )
                  }
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </div>
  )
}
