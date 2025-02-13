import type { Translations } from '../types';

export const translations: Translations<'fr'> = {
  commonMessage: {
    version: 'Version',
    appName: 'Pogues',
    questionnaire: 'Questionnaire',
    documentation: 'Documentation',
    legacyLink: 'Retour à la version précédente',
    docs: 'Documentation',
    loading: 'Chargement...',
    edit: 'Modifier',
    previous: 'Précédent',
    next: 'Suivant',
    close: 'Fermer',
    cancel: 'Annuler',
    complete: 'Completer',
    validate: 'Valider',
    add: 'Ajouter',
    delete: 'Supprimer',
    help: 'Aide',
    backToHome: "Retourner à l'accueil",
    retry: 'Réessayer',
    send: 'Envoyer',
    title: 'Titre',
    start: 'Commencer',
  },
  authMessage: {
    login: 'Connexion',
    logout: 'Déconnexion',
    message: 'Veuillez vous connecter',
  },
  homeMessage: {
    altImage: 'Logo de Pogues',
    label: 'Outil de conception de questionnaire.',
    transformVariables:
      'Transformez vos variables en <span className="text-orange-400">questionnaires</span>.',
    poguesIntro:
      'Pogues est aujourd\'hui le point d\'entrée principal dans les services fournis par <span className="font-bold">Bowie</span>.',
    interfaceDescription:
      'C\'est une interface graphique de conception de questionnaires permettant la création des <span className="font-bold">éléments structurels</span> (séquences, questions) et des <span className="font-bold">éléments dynamiques</span> (filtres, contrôles, boucles).',
    docsLabel: 'La réponse à toutes vos questions.',
    docsLink: 'Accéder à la documentation',
  },
  externalMessage: {
    publicEnemy: 'Public Enemy',
    publicEnemyLabel: 'Personnaliser son questionnaire.',
  },
  questionnairesMessage: {
    title: 'Questionnaires',
    create: 'Créer un questionnaire',
    lastUpdate: 'Dernière modification',
    search: 'Rechercher un questionnaire',
    stamp: 'Timbre',
  },
  codesListsMessage: {
    title: 'Listes de codes',
    create: 'Créer une liste de codes',
    new: 'Nouvelle liste de codes',
    code: 'Code',
    lastUpdate: 'Dernière modification',
    usedIn: 'Utilisée dans',
    addList: 'Ajouter une liste',
    addCode: '+ Ajouter un code',
    importCsv: 'Importer une liste de code depuis un csv',
    value: 'Valeur',
    label: 'Label',
  },
  createQuestionnaireMessage: {
    mode: 'Mode de collecte',
    create: 'Créer un questionnaire',
    dynamicField: 'Spécification dynamique',
    formulaField: 'Spécification des formules',
    createSuccess: 'Le questionnaire a été créé ',
    filter: 'Filtre',
    redirect: 'Redirect',
    titleMessage: 'Vous devez renseigner un titre',
    targetMessage: 'Vous devez sélectionner au moins un mode de collecte',
    loading: 'Chargement...',
  },
};
