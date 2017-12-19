# Redux Forms

La libraire [Redux Forms](http://redux-form.com/7.0.3/) permet de gérer l'état de votre formulaire via `Redux`.

Les trois parties primordiales pour configurer Redux Forms dans notre application sont :

* l'utilisation de la méthode `reduxForm` permettant de détecter automatiquement les intéractions avec le formulaire, et d'appeler les actions `Redux` associées.
* l'utilisation des composants `Field` ou `FieldArray` afin de construire le formulaire. Ces composants peuvent s'utiliser avec des éléments HTML natifs de formulaire (`input`, `textarea`), mais également avec nos propres composants. Une interface devra est respectée, et sera présentée plus loin dans cette documentation.
* l'utilisation du reducer de la librairie afin de pouvoir gérer les différentes actions émises. Dans notre projet, cette configuration est définie dans le fichier [src/reducers/index.js](https://github.com/InseeFr/Pogues/blob/zenika-dev/src/reducers/index.js)

```
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

export default integrityChecker(
  combineReducers({
    form,
  }),
);
```

## reduxForm

Afin de connecter votre formulaire au `store` `Redux`, il sera nécessaire d'exporter le composant retourné par la méthode [`reduxForm`](http://redux-form.com/7.0.3/docs/api/ReduxForm.md/). Ceci permettra à Redux Forms de détecter toutes les intéractions que l'utilisateur aura, afin de mettre à jour le `store`. Vous pouvez par exemple regarder [le formulaire utilisé pour la création d'un questionaire](https://github.com/InseeFr/Pogues/blob/zenika-dev/src/questionnaire/components/component/component-new-edit.jsx)

```
export default reduxForm({
  form: 'component',
})(QuestionNewEdit);
```

Cette méthode prend un objet avec un seul paramètre obligatoire, le nom du formulaire, qui sera utilisé pour nommer les données de votre formulaire dans le store.

Les données insérées seront passées en paramètres de la méthode exécutée lorsque l'événement `submit` du formulaire sera émis. Par exemple, toujours pour le formulaire de création d'un questionnaire, voici la méthode gérant l'événement `submit` (définie dans le composant [ComponentNewContainer](https://github.com/InseeFr/Pogues/blob/zenika-dev/src/questionnaire/containers/component/component-new.jsx))

```
const submit = values => {
    createComponent(values, parentId, weight, type).then(updateParentChildren).then(orderComponents).then(result => {
        const { payload: { id } } = result;
        setSelectedComponentId(id);
        if (onSuccess) onSuccess(id);
    });
};
```

Voici des exemples d'actions gérées par Redux Forms. A chaque action, Redux Forms mettre à jour le store, et régénérera le rendu du formulaire : `FOCUS`, `CHANGE`, `BLUR`, `SUBMIT`, ...

## Composants Custom

Il est nécessaire d'utiliser le composant [`Field`](http://redux-form.com/7.0.3/docs/api/Field.md/) afin de connecter notre champs au `store`.

Ce composant peut être utilisé avec des champs HTML, mais également avec nos propres composants, si nous désirons factoriser notre code. Ces composant sont situés dans le répertoire `src/layout/forms/controls`. Ces composants permettent par exemple d'uniformiser la gestion du style, des labels ou encore des messages d'erreurs.

Ces composants doivent respectés une certaine interface afin de pouvoir bénéficier de Redux Forms.
Si vous n'avez pas de manipulations à réaliser sur la données insérées, il suffit de passer la propriété `input` valorisée par le composant `Field` et de la passer comme `props` à l'élément HTML/React. Vous pouvez par exemple regarder l'implémentation du composant `input.jsx`

[include](../../../../src/forms/controls/input.jsx)

Si vous devez faire des manipulation de la donnée, avant de synchroniser le `store`, lors de l'initialisation de votre composant, vous pouvez utiliser la propriété passée en paramètre `props.input.value` afin d'accéder à la valeur par défaut de votre champ, et lorsque que l'utilisateur a inséré une donnée, vous devez manuellement appeler la méthode `props.input.onChange`.

Pour passer le composant à utiliser par `Field`, vous devez utiliser le paramètre `component` :

```html
<Field
    name="name"
    type="text"
    component={Input}
    required
    />
```

Grâce à la propriété `meta`, vous pouvez également récupérer des métadonnées gérées automatiquement par Redux Forms, comme par exemple l'état de validité du champ, est-ce que celui-ci a déjà eu le focus... Ces propriétés sont mis à jour lorsque les actions définies précédemment (`FOCUS`, ...) sont émises par la librairie.

## Validations des données

La validations des données peut se faire de deux manières.

* Soit en définissant une méthode de validation en paramètre de la méthode `reduxForm`. Cette méthode prendra en paramètre les différentes valeurs du formulaire, et devra retourner un objet correspondant aux différentes erreurs.

Voici un example de validation d'un formulaire utilisant cette syntaxe :

```
import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
}

const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error &&
          <span>
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>

const SyncValidationForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
      />
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field name="age" type="number" component={renderField} label="Age" />
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'syncValidation',
  validate,
})(SyncValidationForm)
```

* La deuxième syntaxe pour valider un formulaire est en définissant un tableau de fonctions de validation pour chaque champ du formulaire. Redux Form ne propose pas de validateur par défaut, vous devez créer ces fonctions manuellement. Dans notre application, ces fonctions de validation sont définies dans le fichier [validation-rules.js](https://github.com/InseeFr/Pogues/blob/zenika-dev/src/layout/forms/validation-rules.js).

Vous trouverez un exemple d'utilisation de cette deuxième syntaxe dans le composant [questionnaire-new-edit](https://github.com/InseeFr/Pogues/blob/zenika-dev/src/home/components/questionnaire-new-edit.jsx).
