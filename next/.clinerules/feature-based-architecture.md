# Architecture du Projet Sabiane Gestion UI V2

## Principes Fondamentaux

1. **Organisation par Type/Concern** : Structure claire séparant composants, fonctions, routes et types
2. **Modularité** : Chaque module a une responsabilité claire et bien définie
3. **Séparation des Préoccupations** : Code organisé par fonctionnalité technique plutôt que par feature métier
4. **Réutilisabilité** : Composants et fonctions partagés accessibles globalement

## Structure Globale

```bash
sabiane-gestion-ui-v2/
├── public/                  # Ressources statiques
├── src/
│   ├── assets/             # Ressources visuelles et médias
│   ├── components/         # Tous les composants UI
│   │   ├── Commons/        # Composants partagés et génériques
│   │   │   ├── MonitoringLayout.tsx
│   │   │   ├── QueryState/
│   │   │   ├── Tables/
│   │   │   └── ...         # Autres composants réutilisables
│   │   │
│   │   └── pages/          # Composants de pages par domaine fonctionnel
│   │       ├── follow/     # Suivi (enquêteurs, sites, etc.)
│   │       │   ├── interviewer/
│   │       │   │   ├── Interviewer.tsx
│   │       │   │   ├── AdvancementSurvey.tsx
│   │       │   │   ├── CollectSurvey.tsx
│   │       │   │   └── ...
│   │       │   ├── site/
│   │       │   │   ├── FollowCampaignTable.tsx
│   │       │   │   └── ...
│   │       │   └── survey/
│   │       │       └── ...
│   │       └── ...         # Autres domaines fonctionnels
│   │
│   ├── functions/          # Fonctions utilitaires et hooks personnalisés
│   │   ├── columnDefinitions.ts
│   │   ├── fetch.ts
│   │   ├── formatValue.ts
│   │   ├── getCollectRow.ts
│   │   ├── getFollowRow.ts
│   │   ├── hasPermission.ts
│   │   ├── interviewerTab.ts
│   │   ├── surveyTab.ts
│   │   ├── titleManager.tsx
│   │   ├── useInterviewerTitle.ts
│   │   ├── usePagination.ts
│   │   ├── useTableSort.ts
│   │   └── ...             # Autres utilitaires
│   │
│   ├── gen/                # Code généré automatiquement
│   │   └── pilotageApi/    # Clients API générés par Orval
│   │
│   ├── libs/               # Bibliothèques internes
│   │   └── i18n/           # Internationalisation
│   │       ├── locales/
│   │       └── ...
│   │
│   ├── routes/             # Définition des routes
│   │   ├── root.tsx
│   │   ├── follow/         # Routes de suivi
│   │   │   ├── interviewer/
│   │   │   │   └── index.tsx
│   │   │   └── ...
│   │   ├── informations-utiles/
│   │   ├── my-surveys/
│   │   └── ...             # Autres routes
│   │
│   ├── tests/              # Configuration et utilitaires de test
│   │   ├── setup.ts
│   │   └── tests.tsx
│   │
│   ├── types/              # Types TypeScript
│   │   ├── follow/         # Types pour le suivi
│   │   ├── home/           # Types pour l'accueil
│   │   └── ...             # Autres types par domaine
│   │
│   ├── index.css
│   ├── main.tsx            # Point d'entrée
│   ├── oidc.ts             # Configuration keycloak
│   ├── router.tsx          # Configuration principale du routage
│   ├── theme.tsx           # Thème de l'application
│   └── vite-env.d.ts
│
└── ...                     # Autres fichiers de configuration
```

## Bonnes Pratiques

1. **Organisation des Composants** :
   - `components/Commons/` : Composants UI génériques et réutilisables
   - `components/pages/` : Composants spécifiques aux pages, organisés par domaine fonctionnel
   - Chaque composant de page est autonome et peut utiliser des sous-composants

2. **Fonctions Utilitaires** :
   - `functions/` : Contient tous les hooks personnalisés et fonctions utilitaires
   - Les hooks suivent la convention `useXxx` (ex: `useInterviewerTitle`)
   - Les fonctions utilitaires sont organisées par domaine fonctionnel

3. **Gestion des Routes** :
   - Utilisation de TanStack Router pour un routage déclaratif
   - Les routes sont organisées par domaine fonctionnel
   - Chaque route définit son composant et ses métadonnées

4. **Gestion d'État** :
   - État local : `useState` et `useMemo` dans les composants
   - État distant : TanStack Query pour les appels API
   - État de routage : TanStack Router pour la navigation

5. **Internationalisation** :
   - Utilisation de react-i18next pour la gestion des traductions
   - Fichiers de traduction organisés dans `libs/i18n/locales/`

6. **Typage** :
   - Types TypeScript organisés par domaine dans `types/`
   - Interfaces et types partagés accessibles globalement

## Patterns Recommandés

1. **Hooks Personnalisés** :

```typescript
// Exemple de hook personnalisé
export const useInterviewerTitle = (page: string, id: string | undefined) => {
  const { t } = useTranslation()
  const { data: interviewers } = useGetListInterviewers()

  const fullName = useMemo(() => {
    const interviewer = interviewers?.find((i) => i.id === id)
    if (!interviewer) return null

    return `${interviewer.interviewerFirstName ?? ''} ${interviewer.interviewerLastName ?? ''}`.trim()
  }, [interviewers, id])

  // Effet secondaire pour mettre à jour le titre de la page
  useEffect(() => {
    // ... logique de mise à jour du titre
  }, [fullName, id, t])

  return { fullName }
}
```

2. **Composants de Page** :

```typescript
// Exemple de composant de page
export const InterviewerCollectSurvey = () => {
  const { t } = useTranslation()
  const { id } = interviewerCollectSurveyByIdRoute.useParams()
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())

  const {
    data: campaigns,
    isLoading,
    isError,
  } = useGetInterviewerCampaignsCollection(id, {
    day: selectedDate?.format('YYYY-MM-DD') ?? '',
  })

  useInterviewerTitle(t('menu.monitor.collectPerSurvey'), id)

  const columns = getCollectSurveyColumns(t)

  const onChangeDate = (date: Dayjs | null) => {
    setSelectedDate(date)
  }

  const rows: CollectSurveyRowType[] = useMemo(() => {
    return (
      campaigns?.map((d) => ({
        campaignLabel: formatString(d.campaignLabel),
        ...getCollectRow(d),
      })) ?? []
    )
  }, [campaigns])

  return (
    <TableContainer title={t('collect.title')} titleType={'h2'}>
      <CollectTable
        rows={rows}
        isLoading={isLoading}
        isError={isError}
        date={selectedDate}
        onChangeDate={onChangeDate}
        searchParam="campaignLabel"
        columns={columns}
      />
    </TableContainer>
  )
}
```

3. **Définition de Routes** :

```typescript
// Exemple de définition de route
export const interviewerAdvancementRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/enqueteur',
  component: Interviewer,
  staticData: {
    titleKey: 'menu.monitor.titlePageInterviewer',
  },
})
```

## Avantages

- **Clarté** : Organisation logique et intuitive du code
- **Maintenabilité** : Séparation claire des responsabilités
- **Scalabilité** : Facile à ajouter de nouvelles fonctionnalités
- **Réutilisabilité** : Composants et fonctions facilement réutilisables
- **Testabilité** : Modules bien définis faciles à tester

## Gestion des API

Le projet utilise Orval pour générer automatiquement les clients API à partir de la spécification OpenAPI. Les clients générés sont disponibles dans `gen/pilotageApi/` et sont utilisés directement dans les composants et hooks.

Exemple d'utilisation :

```typescript
import { useGetListInterviewers } from '../gen/pilotageApi/04-interviewers'

const { data, isLoading, error } = useGetListInterviewers()
```

## Conclusion

Cette architecture basée sur une organisation par type/concern offre une excellente maintenabilité et scalabilité pour l'application Sabiane Gestion UI V2. Elle permet une organisation claire du code tout en restant flexible et adaptable aux évolutions futures, tout en tirant parti des meilleures pratiques modernes de développement React et TypeScript.
