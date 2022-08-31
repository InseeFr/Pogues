# Difficultés

Cette partie va permettre de documenter les difficultés et point d'attention à avoir par rapport au développement de l'application au 01/09/2022.

## Dépendance à gillespie59-react-rte

Le composant [RichTextEditor](../../../../src/forms/controls/control-with-suggestions/components/rich-textarea-with-suggestions.jsx) utilise une librairie qui n'était plus maintenant et qui faisait planter le build. La question s'est posée de refondre ce composant ou de forker la librairie en question pour patcher la librairie.

On a décidé de patcher la librairie, car ce composant doit disparaître à court-terme au profit de l'éditeur VTL.

Cette dépendance est à enlever dès que possible.

## Composant VTL pas encore complètement fonctionnel

Pour le moment le composant n'est que partiellement fonctionnel. Les erreur s de syntaxe sont mal/pas signalées dans le champ de saisie. Ces difficultés sont présentes dans le package npm de [VTL Editor](https://github.com/eurostat/vtl-editor) et la correction semble dépendre de correction dans monaco editor. Pour de plus amples informations voir avec les équipes en charge de VTL Editor.

## Component.js et Components.js

Deux composants au nom similaire et avec beaucoup de duplication de code. A diagnostiquer si les deux composants sont indispensables : si c'est le cas à refactorer pour supprimer la duplication de code, sinon n'en garder qu'un seul.
