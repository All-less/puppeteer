import {
  zoom,
  move,
  default as reducer
} from 'routes/Home/modules/editor'

describe('(Redux Module) Editor', () => {

  describe('(Action Creator) zoom', () => {
    it('Should contain a payload', () => {
      expect(zoom(10)).to.deep.equal({
        type: 'EDITOR/ZOOM',
        payload: 10
      })
    })
  })

  describe('(Action Creator) move', () => {
    it ('Should contain an array payload', () => {
      expect(move(1, 2)).to.deep.equal({
        type: 'EDITOR/MOVE',
        payload: [1, 2]
      })
    })
  })

  describe('(Reducer)', () => {
    it('Should be a function', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initialize with zoom rate 1.0 and origin position', () => {
      expect(reducer(undefined, { type: '@@INIT' })).to.deep.equal({
        ratio: 1.0,
        pos: [0, 0]
      })
    })
  })
})
