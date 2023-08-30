import React from 'react'
import { Image, Text, Box, Card, CardBody, Flex, useColorModeValue, Tag } from '@chakra-ui/react'
import { LinkComponent } from './LinkComponent'
import { HeadingComponent } from './HeadingComponent'
import { SECOND_COLOR_SCHEME, THEME_COLOR_SCHEME } from '../../utils/config'
import { Pool } from '../../pools'
import { motion } from 'framer-motion'

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
  title?: string
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
        <Flex>
          <Image draggable={false} objectFit="contain" maxW="60px" src={i.token0.icon} alt={i.token0.name} mt="-10px" />
          <Image draggable={false} objectFit="contain" maxW="60px" src={i.token1.icon} alt={i.token1.name} ml="-10px" mt="10px" />
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
      borderRadius="lg"
      boxShadow="lg"
      p="6"
      borderWidth="1px"
      borderColor={useColorModeValue(`${THEME_COLOR_SCHEME}.200`, `${THEME_COLOR_SCHEME}.700`)}
      overflow="hidden"
      className={className}>
      {props.title && <HeadingComponent as="h1">{props.title}</HeadingComponent>}
      {props.intro && (
        <Text as="h3" fontSize="xl">
          {props.intro}
        </Text>
      )}
      <Flex direction="column" gap={4}>
        {props.items.map((i, index) => {
          if (isPoolConfig(i)) {
            return (
              <LinkComponent key={i.id} href={'/applications/pool/' + i.id}>
                <Card
                  key={`${index}_${i.token0.name}`}
                  variant="outline"
                  size="sm"
                  _hover={{
                    borderColor: `${SECOND_COLOR_SCHEME}.500`,
                  }}>
                  <CardBody>
                    <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
                      <Flex px={{ base: 0, sm: 4 }}>{MakeLogo(i)}</Flex>

                      <Flex direction="column">
                        {i.id && <HeadingComponent as="h4">{i.token0.name + '/' + i.token1.name}</HeadingComponent>}

                        <Text mt={0}>
                          <Flex gap="2">
                            <Tag colorScheme="green">{i.apr}% APR</Tag>
                            <Tag colorScheme="red">{i.fee / 10000}% Fee</Tag>
                          </Flex>
                        </Text>
                      </Flex>
                    </Flex>
                  </CardBody>
                </Card>
              </LinkComponent>
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
      </Flex>
    </MotionBox>
  )
}
