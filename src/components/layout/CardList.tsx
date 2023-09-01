import React from 'react'
import {
  Image,
  Text,
  Box,
  Card,
  CardBody,
  Flex,
  useColorModeValue,
  Tag,
  Link,
  LinkBox,
  CardHeader,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  LinkOverlay,
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Grid,
} from '@chakra-ui/react'
import { LinkComponent } from './LinkComponent'
import { HeadingComponent } from './HeadingComponent'
import { SECOND_COLOR_SCHEME, THEME_COLOR_SCHEME } from '../../utils/config'
import { Pool } from '../../pools'
import { motion } from 'framer-motion'
import { CheckIcon, SearchIcon } from '@chakra-ui/icons'

// 创建一个基于 Chakra UI Box 的 Framer Motion 组件
const MotionBox = motion(Box)

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
  items: Pool[] | ListItemType[]
}

function isListItemType(item: ListItemType | Pool): item is ListItemType {
  return (item as ListItemType).image !== undefined
}

function isPoolConfig(item: ListItemType | Pool): item is Pool {
  return (item as Pool).token0 !== undefined
}

export function CardList(props: Props) {
  const className = props.className ?? ''
  const invert = useColorModeValue('20%', '80%')
  const tdHoverBgColor = useColorModeValue(`${THEME_COLOR_SCHEME}.100`, `${THEME_COLOR_SCHEME}.900`)
  const tdHoverTextColor = useColorModeValue(`${SECOND_COLOR_SCHEME}.500`, `${SECOND_COLOR_SCHEME}.300`)
  const tbBgColor = useColorModeValue(`${THEME_COLOR_SCHEME}.50`, `${THEME_COLOR_SCHEME}.800`)

  const MakeLogo = function (i: Pool | ListItemType) {
    if (isListItemType(i)) {
      return (
        <Flex>
          <Image draggable={false} objectFit="contain" maxW="55px" src={i.image[0]} alt={i.title} filter={`invert(${invert})`} />
        </Flex>
      )
    } else {
      // 让两个图片一起显示，第二个在上面，第一个露一点，不要用px，尽量多端适配一点
      return (
        <Flex alignItems="center">
          <Image draggable={false} objectFit="contain" maxW="60px" src={i.token0.icon} alt={i.token0.name} mt="-10px" />
          <Image draggable={false} objectFit="contain" maxW="60px" src={i.token1.icon} alt={i.token1.name} ml="-10px" mt="10px" />
          <Text ml={5} whiteSpace="nowrap">
            {i.token0.name}{' '}
            <Text as="span" opacity={0.5}>
              /
            </Text>{' '}
            {i.token1.name}
          </Text>
        </Flex>
      )
    }
  }

  return (
    <MotionBox
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.3,
        ease: 'easeInOut',
      }}
      as="section"
      overflow="hidden"
      className={className}>
      <Card borderRadius="xl" boxShadow="base" borderWidth={1} bgColor={tbBgColor}>
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
                        as="tr"
                        key={`${index}_${i.token0.name}`}
                        _hover={{
                          bg: tdHoverBgColor,
                          textColor: tdHoverTextColor,
                        }}>
                        <Td borderRadius={['md', '0', '0', 'md']}>
                          <LinkOverlay as={Link} href={'/applications/pool/' + i.id} _hover={{ textDecoration: 'none' }}>
                            {MakeLogo(i)}
                          </LinkOverlay>
                        </Td>
                        <Td>
                          <Link as={Link} to={'/applications/pool/' + i.id} _hover={{ textDecoration: 'none' }} textDecoration="underline dashed">
                            {i.fee / 10000}%
                          </Link>
                        </Td>
                        <Td isNumeric borderRadius={['0', 'md', 'md', '0']}>
                          <Link as={Link} to={'/applications/pool/' + i.id} _hover={{ textDecoration: 'none' }} textDecoration="underline dashed">
                            {i.apr}%
                          </Link>
                        </Td>
                      </LinkBox>
                    )
                  } else if (isListItemType(i)) {
                    return (
                      <Card key={`${index}_${i.title}`} variant="outline" size="sm" borderWidth={0}>
                        <CardBody>
                          <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
                            <Flex px={{ base: 0, sm: 4 }}>{MakeLogo(i)}</Flex>

                            <Flex direction="column">
                              <HeadingComponent as="h4">{i.title}</HeadingComponent>
                              <Text mt={0}>{i.description}</Text>
                            </Flex>
                          </Flex>
                        </CardBody>
                      </Card>
                    )
                  }
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </MotionBox>
  )
}
