import Widget from './Widget'

const { random, floor } = Math

export default function factory (model) {
  const randNumber = floor(random() * 6)
  return new Widget(randNumber, model)
}
