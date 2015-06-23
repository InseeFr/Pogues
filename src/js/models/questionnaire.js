/**
The class for a Questionnaire
*/
import SequenceModel from './sequence.js';
import SurveyModel from './survey.js';
import ComponentGroupModel from './component-group.js';
import CodeList from './code-list';

class QuestionnaireModel extends SequenceModel {
  constructor(object) {
    super(object);
    if (object) {
      this._agency = object._agency;
      this._survey = new SurveyModel(object._survey);
      this._componentGroups = object._componentGroups.map(function(group) {
        return new ComponentGroupModel(group);
      })
      this._codeLists = {}
    } else {
      this._agency = 'fr.insee';
      // This is temporary
      var popoSurvey = new SurveyModel();
      popoSurvey.name = 'POPO';
      this._survey = popoSurvey;
      this._componentGroups = [];
      this._codeLists = {};
    }
  }

  get agency() {
    return this._agency;
  }

  get survey() {
    return this._survey;
  }

  set survey(survey) {
    if (!(survey instanceof SurveyModel)) {
      throw new Error('The argument must be a Survey');
    }
    this._survey = survey;
  }

  get componentGroups() {
    return this._componentGroups;
  }

  set agency(agency) {
    if (typeof agency === 'string') {
      throw new Error('The parameter must be a string');
    }
    this._agency = agency;
  }

  addCodeList(codeList) {
    if (!(codeList instanceof CodeListModel)) {
      throw new Error('The argument must be a CodeList');
    }
    this._codeLists.push(codeList)
  }

  removeCodeListById(id) {
    delete this._codeLists[id]
  }

  getCodeListById(id) {
    return this._codeLists[id]
  }

  addComponentGroup(group) {
    if (!(group instanceof ComponentGroupModel)) {
      throw new Error('The argument must be a ComponentGroup');
    }
    this._componentGroups.push(group);
  }

  removeComponentGroup(group) {
    var index = this._componentGroups.indexOf(group);
    if (index > -1) {
      this._componentGroups.splice(index, 1);
    } else {
      throw new Error('The group does not exist in the questionnaire');
    }
  }

  addComponentGroups(groups) {
    if (!(Array.isArray(groups))) throw new Error('The argument must be an array');
    // Save current size in case something goes wrong
    var initialSize = this._componentGroups.length;
    try {
      groups.map(function(group) {
        this.addComponentGroup(group);
      });
    } catch (e) {
      this._componentGroups.length(initialSize);
      throw new Error('All arguments must be of type ComponentGroup');
    }
  }

  set componentGroups(groups) {
    if (!(Array.isArray(groups))) throw new Error('The argument must be an array');
    groups.map(function(group) {
      if (!(group instanceof ComponentGroupModel)) {
        throw new Error('All arguments must be of type ComponentGroup');
      }
    });
    this._componentGroups = groups;
  }
}

export default QuestionnaireModel;
