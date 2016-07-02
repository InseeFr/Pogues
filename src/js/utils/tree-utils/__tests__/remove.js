import { expect } from 'chai'
import { createQuestionnaireFromText } from '../../tests-tree-utils'
import { removeComponent } from '../remove'
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
`)

deepFreeze(qIni)

describe('tree utils', () => {

  describe('removeComponent', () => {

    describe('basic operations', () => {
      const qAfter = removeComponent('root', 'Q1B1', qIni)

      it('should remove the component from the dictionary', () => {
        expect(qAfter['Q1B1']).to.be.undefined
      })

      it('should remove the component from its parent children list', () => {
        expect(qAfter['SSEQ1B'].childCmpnts).to.deep.equal(['Q1B2'])
      })
    })

    describe('remove subsequence', () => {

      it('should add its children to the last open sequence', () => {
        const qAfter = removeComponent('root', 'SSEQ1B', qIni)
        expect(qAfter['SSEQ1A'].childCmpnts).to.deep.equal(['Q1B1', 'Q1B2'])
      })

    })

    describe('remove first level sequence', () => {

      it('should add its children to the last open sequence', () => {
        const qAfter = removeComponent('root', 'SEQ2', qIni)

        expect(qAfter.SEQ2).to.be.undefined

        expect(qAfter['SEQ1'].childCmpnts).to.deep.equal(
          ['Q11', 'SSEQ1A', 'SSEQ1B', 'SSEQ1C', 'SSEQ2A'])
        })
      })

      it('should add its children to root if no opened sequence', () => {
        const qAfter = removeComponent('root', 'SEQ1', qIni)

        expect(qAfter.root.childCmpnts).to.deep.equal(
          ['Q11', 'SSEQ1A', 'SSEQ1B', 'SSEQ1C', 'SEQ2'])
      })
  })
})