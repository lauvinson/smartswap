import React from 'react'
import { Image, Text, Box, Card, CardBody, Flex, useColorModeValue, Tag } from '@chakra-ui/react'
import { LinkComponent } from './LinkComponent'
import { HeadingComponent } from './HeadingComponent'
import { THEME_COLOR_SCHEME } from '../../utils/config'

interface ListItemType {
  title: string
  description: React.ReactNode | string
  image: string[]
  url?: string
}

interface TokenConfig {
  name: string
  address: string
  icon: string
}

interface PoolConfig {
  token0: TokenConfig
  token1: TokenConfig
  pool: string
  fee: number
  apr: number
}

interface Props {
  className?: string
  title?: string
  intro?: React.ReactNode | string
  items: PoolConfig[] | ListItemType[]
}

export function CardList(props: Props) {
  const className = props.className ?? ''
  const invert = useColorModeValue('20%', '80%')

  const MakeLogo = function (i: PoolConfig | ListItemType) {
    if (i.token0 === undefined) {
      return (
        <Flex>
          <Image objectFit="contain" maxW="55px" src={i.image[0]} alt={i.title} filter={`invert(${invert})`} />
        </Flex>
      )
    } else {
      // 让两个图片一起显示，第二个在上面，第一个露一点，不要用px，尽量多端适配一点
      return (
        <Flex>
          <Image objectFit="contain" maxW="60px" src={i.token0.icon} alt={i.token0.name} mt="-10px" />
          <Image objectFit="contain" maxW="60px" src={i.token1.icon} alt={i.token1.name} ml="-10px" mt="10px" />
        </Flex>
      )
    }
  }

  return (
    <Box
      as="section"
      borderRadius="lg"
      boxShadow="lg"
      p="6"
      borderWidth="1px"
      borderColor={useColorModeValue(`${THEME_COLOR_SCHEME}.200`, `${THEME_COLOR_SCHEME}.700`)}
      overflow="hidden"
      className={className}>
      {props.title && <HeadingComponent as="h1">{props.title}</HeadingComponent>}
      {props.intro && <Text as="h3" fontSize='xl'>{props.intro}</Text>}
      <Flex direction="column" gap={4}>
        {props.items.map((i, index) => {
          if (i.token0 !== undefined) {
            return (
              <Card key={`${index}_${i.token0.name}`} variant="outline" size="sm">
                <CardBody>
                  <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
                    <Flex px={{ base: 0, sm: 4 }}>{MakeLogo(i)}</Flex>

                    <Flex direction="column">
                      {i.id && (
                        <LinkComponent href={'/applications/pool/' + i.id}>
                          <HeadingComponent as="h4">{i.token0.name + '/' + i.token1.name}</HeadingComponent>
                        </LinkComponent>
                      )}
                      {!i.id && <HeadingComponent as="h4">{i.title}</HeadingComponent>}

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
            )
          } else {
            return (
              <Card key={`${index}_${i.title}`} variant="outline" size="sm">
                <CardBody>
                  <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
                    <Flex px={{ base: 0, sm: 4 }}>{MakeLogo(i)}</Flex>

                    <Flex direction="column">
                      {i.url && (
                        <LinkComponent href={i.url}>
                          <HeadingComponent as="h4">{i.title}</HeadingComponent>
                        </LinkComponent>
                      )}
                      {!i.url && <HeadingComponent as="h4">{i.title}</HeadingComponent>}

                      <Text mt={0}>{i.description}</Text>
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>
            )
          }
        })}
      </Flex>
    </Box>
  )
}
