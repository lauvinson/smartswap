import React from 'react'
import { Image, Text, Box, Card, CardBody, Flex, useColorModeValue } from '@chakra-ui/react'
import { LinkComponent } from './LinkComponent'
import { HeadingComponent } from './HeadingComponent'

interface ListItemType {
  title: string
  description: React.ReactNode | string
  image: string[]
  url?: string
}

interface Props {
  className?: string
  title?: string
  items: ListItemType[]
}

export function CardList(props: Props) {
  const className = props.className ?? ''
  const invert = useColorModeValue('20%', '80%')

  const MakeLogo = function (i: ListItemType) {
    if (i.image.length === 1) {
      return (
        <Flex ml="10px" mr="10px">
          <Image objectFit="contain" maxW="60px" src={i.image[0]} alt={i.title} filter={`invert(${invert})`} />
        </Flex>
      )
    } else {
      // 让两个图片一起显示，第二个在上面，第一个露一点，不要用px，尽量多端适配一点
      return (
        <Flex>
          <Image objectFit="contain" maxW="60px" src={i.image[0]} alt={i.title} filter={`invert(${invert})`} mt="-10px" />
          <Image objectFit="contain" maxW="60px" src={i.image[1]} alt={i.title} filter={`invert(${invert})`} ml="-20px" mt="10px" />
        </Flex>
      )
    }
  }

  return (
    <Box as="section" className={className}>
      {props.title && <HeadingComponent as="h3">{props.title}</HeadingComponent>}

      <Flex direction="column" gap={4}>
        {props.items.map((i, index) => {
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

                    <Text mt={4}>{i.description}</Text>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          )
        })}
      </Flex>
    </Box>
  )
}
