import Widget from './Widget'

const { random, floor } = Math

export default function factory () {
  const randNumber = 3 // floor(random() * 6)
  return new Widget(randNumber)
}
