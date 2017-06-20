import { expect } from 'chai'
import { createQuestionnaireFromText } from '../../tests-tree-utils'
import { moveComponent } from '../move'
//We use deep freeze to check that nothing is mutated in the intial
//questionnaire.
import deepFreeze from 'deep-freeze'

const qIni = createQuestionnaireFromText(`
s/SEQ1/Séquence sur le thème 1
 q/Q11/Plutôt 1a ou 1b ?
 s/SSEQ1A/Sous-séquence sur le sujet 1a
 s/SSEQ1B/Sous-séquence sur le sujet 1b
  q/Q1B1/Est-ce que 1b1 ?
  q/Q1B2/Est-ce que 1b2 ?
 s/SSEQ1C/Sous-séquence sur le sujet 1c
s/SEQ2/Séquence sur le thème 2
 s/SSEQ2A/Sous-séquence sur le sujet 2a
  q/Q2A1/Est-ce que 2a1 ?
  q/ Q2A2/Est-ce que 2a2 ?
 s/SSEQ2B/Sous-séquence sur le sujet 2b
  q/Q2B1/Est-ce que 2b1 ?
  q/Q2B2/Est-ce que 2b2 ?
`)

deepFreeze(qIni)

describe('tree utils', () => {

  describe('move question', () => {

    it('should be inserted after if dest is after origin', () => {
      const qAfter = moveComponent(qIni, 'root', 'Q1B1', 'Q1B2')
      expect(qAfter.SSEQ1B.childCmpnts).to.deep.equal(['Q1B2', 'Q1B1'])
    })

    it('should be inserted before if dest is before origin', () => {
      const qAfter = moveComponent(qIni, 'root', 'Q1B2', 'Q1B1')
      expect(qAfter.SSEQ1B.childCmpnts).to.deep.equal(['Q1B2', 'Q1B1'])
    })
  })

  describe.only('move sequence', () => {

    it('should be move with all its children', () => {
      const qAfter = moveComponent(qIni, 'root', 'SSEQ2B', 'SEQ2')
      expect(qAfter.SEQ1.childCmpnts).to.deep.equal([
        'Q11', 'SSEQ1A', 'SSEQ1B', 'SSEQ1C', 'SSEQ2B'])
      expect(qAfter.SSEQ2B.childCmpnts).to.deep.equal([
        'Q2B1', 'Q2B2'
      ])
    })

    it('should break existing sequences to keep the same depth', () => {
      const qAfter = moveComponent(qIni, 'root', 'SSEQ2A', 'Q1B2')
      expect(qAfter.SEQ1.childCmpnts).to.deep.equal([
        'Q11', 'SSEQ1A', 'SSEQ1B', 'SSEQ2A', 'SSEQ1C'
      ])
      expect(qAfter.SSEQ1B.childCmpnts).to.deep.equal(['Q1B1'])
    })

    it('should adapt if we move before first sequence', () => {
    // in practice, we won't allow to move a subsequence or a question before
    // the first sequence of a questionnaire, but it will be handle by the UI,
    // and for now, it should fail safely.
      const qAfter = moveComponent(qIni, 'root', 'SSEQ2A', 'SEQ1')
      expect(qAfter.root.childCmpnts).to.deep.equal([
        'SSEQ2A', 'SEQ1', 'SEQ2'
      ])
    })
  })

})