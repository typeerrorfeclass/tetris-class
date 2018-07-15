import Widget from './Widget'

const { random, floor } = Math

export default function factory () {
  const randNumber = floor(random() * 5)
  return new Widget(randNumber)
}
