/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.
// Import Routes
import { Route as rootRoute } from './routes/__root';
import { Route as LayoutImport } from './routes/_layout';
import { Route as LayoutQuestionnaireQuestionnaireIdLayoutQImport } from './routes/_layout/questionnaire.$questionnaireId/_layout-q';
import { Route as LayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdImport } from './routes/_layout/questionnaire.$questionnaireId/_layout-q/codes-list/$codesListId';
import { Route as LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexImport } from './routes/_layout/questionnaire.$questionnaireId/_layout-q/codes-lists/index';
import { Route as LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewImport } from './routes/_layout/questionnaire.$questionnaireId/_layout-q/codes-lists/new';
import { Route as LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteImport } from './routes/_layout/questionnaire.$questionnaireId/_layout-q/codes-lists/route';
import { Route as LayoutQuestionnaireQuestionnaireIdLayoutQCompositionImport } from './routes/_layout/questionnaire.$questionnaireId/_layout-q/composition';
import { Route as LayoutQuestionnaireQuestionnaireIdLayoutQDuplicateVariablesImport } from './routes/_layout/questionnaire.$questionnaireId/_layout-q/duplicate-variables';
import { Route as LayoutQuestionnaireQuestionnaireIdLayoutQIndexImport } from './routes/_layout/questionnaire.$questionnaireId/_layout-q/index';
import { Route as LayoutQuestionnaireQuestionnaireIdLayoutQMergeImport } from './routes/_layout/questionnaire.$questionnaireId/_layout-q/merge';
import { Route as LayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionImport } from './routes/_layout/questionnaire.$questionnaireId/_layout-q/tcm-composition';
import { Route as LayoutQuestionnaireQuestionnaireIdRouteImport } from './routes/_layout/questionnaire.$questionnaireId/route';
import { Route as LayoutQuestionnairesIndexImport } from './routes/_layout/questionnaires/index';
import { Route as LayoutQuestionnairesNewImport } from './routes/_layout/questionnaires/new';
import { Route as LayoutQuestionnairesRouteImport } from './routes/_layout/questionnaires/route';
import { Route as IndexImport } from './routes/index';

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const LayoutQuestionnairesRouteRoute = LayoutQuestionnairesRouteImport.update({
  id: '/questionnaires',
  path: '/questionnaires',
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutQuestionnairesIndexRoute = LayoutQuestionnairesIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutQuestionnairesRouteRoute,
} as any);

const LayoutQuestionnairesNewRoute = LayoutQuestionnairesNewImport.update({
  id: '/new',
  path: '/new',
  getParentRoute: () => LayoutQuestionnairesRouteRoute,
} as any);

const LayoutQuestionnaireQuestionnaireIdRouteRoute =
  LayoutQuestionnaireQuestionnaireIdRouteImport.update({
    id: '/questionnaire/$questionnaireId',
    path: '/questionnaire/$questionnaireId',
    getParentRoute: () => LayoutRoute,
  } as any);

const LayoutQuestionnaireQuestionnaireIdLayoutQRoute =
  LayoutQuestionnaireQuestionnaireIdLayoutQImport.update({
    id: '/_layout-q',
    getParentRoute: () => LayoutQuestionnaireQuestionnaireIdRouteRoute,
  } as any);

const LayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute =
  LayoutQuestionnaireQuestionnaireIdLayoutQIndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => LayoutQuestionnaireQuestionnaireIdLayoutQRoute,
  } as any);

const LayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute =
  LayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionImport.update({
    id: '/tcm-composition',
    path: '/tcm-composition',
    getParentRoute: () => LayoutQuestionnaireQuestionnaireIdLayoutQRoute,
  } as any);

const LayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute =
  LayoutQuestionnaireQuestionnaireIdLayoutQMergeImport.update({
    id: '/merge',
    path: '/merge',
    getParentRoute: () => LayoutQuestionnaireQuestionnaireIdLayoutQRoute,
  } as any);

const LayoutQuestionnaireQuestionnaireIdLayoutQDuplicateVariablesRoute =
  LayoutQuestionnaireQuestionnaireIdLayoutQDuplicateVariablesImport.update({
    id: '/duplicate-variables',
    path: '/duplicate-variables',
    getParentRoute: () => LayoutQuestionnaireQuestionnaireIdLayoutQRoute,
  } as any);

const LayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute =
  LayoutQuestionnaireQuestionnaireIdLayoutQCompositionImport.update({
    id: '/composition',
    path: '/composition',
    getParentRoute: () => LayoutQuestionnaireQuestionnaireIdLayoutQRoute,
  } as any);

const LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRoute =
  LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteImport.update({
    id: '/codes-lists',
    path: '/codes-lists',
    getParentRoute: () => LayoutQuestionnaireQuestionnaireIdLayoutQRoute,
  } as any);

const LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute =
  LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () =>
      LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRoute,
  } as any);

const LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute =
  LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewImport.update({
    id: '/new',
    path: '/new',
    getParentRoute: () =>
      LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRoute,
  } as any);

const LayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdRoute =
  LayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdImport.update({
    id: '/codes-list/$codesListId',
    path: '/codes-list/$codesListId',
    getParentRoute: () => LayoutQuestionnaireQuestionnaireIdLayoutQRoute,
  } as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/_layout': {
      id: '/_layout';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof LayoutImport;
      parentRoute: typeof rootRoute;
    };
    '/_layout/questionnaires': {
      id: '/_layout/questionnaires';
      path: '/questionnaires';
      fullPath: '/questionnaires';
      preLoaderRoute: typeof LayoutQuestionnairesRouteImport;
      parentRoute: typeof LayoutImport;
    };
    '/_layout/questionnaire/$questionnaireId': {
      id: '/_layout/questionnaire/$questionnaireId';
      path: '/questionnaire/$questionnaireId';
      fullPath: '/questionnaire/$questionnaireId';
      preLoaderRoute: typeof LayoutQuestionnaireQuestionnaireIdRouteImport;
      parentRoute: typeof LayoutImport;
    };
    '/_layout/questionnaires/new': {
      id: '/_layout/questionnaires/new';
      path: '/new';
      fullPath: '/questionnaires/new';
      preLoaderRoute: typeof LayoutQuestionnairesNewImport;
      parentRoute: typeof LayoutQuestionnairesRouteImport;
    };
    '/_layout/questionnaires/': {
      id: '/_layout/questionnaires/';
      path: '/';
      fullPath: '/questionnaires/';
      preLoaderRoute: typeof LayoutQuestionnairesIndexImport;
      parentRoute: typeof LayoutQuestionnairesRouteImport;
    };
    '/_layout/questionnaire/$questionnaireId/_layout-q': {
      id: '/_layout/questionnaire/$questionnaireId/_layout-q';
      path: '';
      fullPath: '/questionnaire/$questionnaireId';
      preLoaderRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQImport;
      parentRoute: typeof LayoutQuestionnaireQuestionnaireIdRouteImport;
    };
    '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists': {
      id: '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists';
      path: '/codes-lists';
      fullPath: '/questionnaire/$questionnaireId/codes-lists';
      preLoaderRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteImport;
      parentRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQImport;
    };
    '/_layout/questionnaire/$questionnaireId/_layout-q/composition': {
      id: '/_layout/questionnaire/$questionnaireId/_layout-q/composition';
      path: '/composition';
      fullPath: '/questionnaire/$questionnaireId/composition';
      preLoaderRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQCompositionImport;
      parentRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQImport;
    };
    '/_layout/questionnaire/$questionnaireId/_layout-q/duplicate-variables': {
      id: '/_layout/questionnaire/$questionnaireId/_layout-q/duplicate-variables';
      path: '/duplicate-variables';
      fullPath: '/questionnaire/$questionnaireId/duplicate-variables';
      preLoaderRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQDuplicateVariablesImport;
      parentRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQImport;
    };
    '/_layout/questionnaire/$questionnaireId/_layout-q/merge': {
      id: '/_layout/questionnaire/$questionnaireId/_layout-q/merge';
      path: '/merge';
      fullPath: '/questionnaire/$questionnaireId/merge';
      preLoaderRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQMergeImport;
      parentRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQImport;
    };
    '/_layout/questionnaire/$questionnaireId/_layout-q/tcm-composition': {
      id: '/_layout/questionnaire/$questionnaireId/_layout-q/tcm-composition';
      path: '/tcm-composition';
      fullPath: '/questionnaire/$questionnaireId/tcm-composition';
      preLoaderRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionImport;
      parentRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQImport;
    };
    '/_layout/questionnaire/$questionnaireId/_layout-q/': {
      id: '/_layout/questionnaire/$questionnaireId/_layout-q/';
      path: '/';
      fullPath: '/questionnaire/$questionnaireId/';
      preLoaderRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQIndexImport;
      parentRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQImport;
    };
    '/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId': {
      id: '/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId';
      path: '/codes-list/$codesListId';
      fullPath: '/questionnaire/$questionnaireId/codes-list/$codesListId';
      preLoaderRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdImport;
      parentRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQImport;
    };
    '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new': {
      id: '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new';
      path: '/new';
      fullPath: '/questionnaire/$questionnaireId/codes-lists/new';
      preLoaderRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewImport;
      parentRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteImport;
    };
    '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/': {
      id: '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/';
      path: '/';
      fullPath: '/questionnaire/$questionnaireId/codes-lists/';
      preLoaderRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexImport;
      parentRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteImport;
    };
  }
}

// Create and export the route tree

interface LayoutQuestionnairesRouteRouteChildren {
  LayoutQuestionnairesNewRoute: typeof LayoutQuestionnairesNewRoute;
  LayoutQuestionnairesIndexRoute: typeof LayoutQuestionnairesIndexRoute;
}

const LayoutQuestionnairesRouteRouteChildren: LayoutQuestionnairesRouteRouteChildren =
  {
    LayoutQuestionnairesNewRoute: LayoutQuestionnairesNewRoute,
    LayoutQuestionnairesIndexRoute: LayoutQuestionnairesIndexRoute,
  };

const LayoutQuestionnairesRouteRouteWithChildren =
  LayoutQuestionnairesRouteRoute._addFileChildren(
    LayoutQuestionnairesRouteRouteChildren,
  );

interface LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteChildren {
  LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute;
  LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute;
}

const LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteChildren: LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteChildren =
  {
    LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute:
      LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute,
    LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute:
      LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute,
  };

const LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteWithChildren =
  LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRoute._addFileChildren(
    LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteChildren,
  );

interface LayoutQuestionnaireQuestionnaireIdLayoutQRouteChildren {
  LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteWithChildren;
  LayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute;
  LayoutQuestionnaireQuestionnaireIdLayoutQDuplicateVariablesRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQDuplicateVariablesRoute;
  LayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute;
  LayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute;
  LayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute;
  LayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdRoute;
}

const LayoutQuestionnaireQuestionnaireIdLayoutQRouteChildren: LayoutQuestionnaireQuestionnaireIdLayoutQRouteChildren =
  {
    LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRoute:
      LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteWithChildren,
    LayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute:
      LayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute,
    LayoutQuestionnaireQuestionnaireIdLayoutQDuplicateVariablesRoute:
      LayoutQuestionnaireQuestionnaireIdLayoutQDuplicateVariablesRoute,
    LayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute:
      LayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute,
    LayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute:
      LayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute,
    LayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute:
      LayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute,
    LayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdRoute:
      LayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdRoute,
  };

const LayoutQuestionnaireQuestionnaireIdLayoutQRouteWithChildren =
  LayoutQuestionnaireQuestionnaireIdLayoutQRoute._addFileChildren(
    LayoutQuestionnaireQuestionnaireIdLayoutQRouteChildren,
  );

interface LayoutQuestionnaireQuestionnaireIdRouteRouteChildren {
  LayoutQuestionnaireQuestionnaireIdLayoutQRoute: typeof LayoutQuestionnaireQuestionnaireIdLayoutQRouteWithChildren;
}

const LayoutQuestionnaireQuestionnaireIdRouteRouteChildren: LayoutQuestionnaireQuestionnaireIdRouteRouteChildren =
  {
    LayoutQuestionnaireQuestionnaireIdLayoutQRoute:
      LayoutQuestionnaireQuestionnaireIdLayoutQRouteWithChildren,
  };

const LayoutQuestionnaireQuestionnaireIdRouteRouteWithChildren =
  LayoutQuestionnaireQuestionnaireIdRouteRoute._addFileChildren(
    LayoutQuestionnaireQuestionnaireIdRouteRouteChildren,
  );

interface LayoutRouteChildren {
  LayoutQuestionnairesRouteRoute: typeof LayoutQuestionnairesRouteRouteWithChildren;
  LayoutQuestionnaireQuestionnaireIdRouteRoute: typeof LayoutQuestionnaireQuestionnaireIdRouteRouteWithChildren;
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutQuestionnairesRouteRoute: LayoutQuestionnairesRouteRouteWithChildren,
  LayoutQuestionnaireQuestionnaireIdRouteRoute:
    LayoutQuestionnaireQuestionnaireIdRouteRouteWithChildren,
};

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren);

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute;
  '': typeof LayoutRouteWithChildren;
  '/questionnaires': typeof LayoutQuestionnairesRouteRouteWithChildren;
  '/questionnaire/$questionnaireId': typeof LayoutQuestionnaireQuestionnaireIdLayoutQRouteWithChildren;
  '/questionnaires/new': typeof LayoutQuestionnairesNewRoute;
  '/questionnaires/': typeof LayoutQuestionnairesIndexRoute;
  '/questionnaire/$questionnaireId/codes-lists': typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteWithChildren;
  '/questionnaire/$questionnaireId/composition': typeof LayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute;
  '/questionnaire/$questionnaireId/duplicate-variables': typeof LayoutQuestionnaireQuestionnaireIdLayoutQDuplicateVariablesRoute;
  '/questionnaire/$questionnaireId/merge': typeof LayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute;
  '/questionnaire/$questionnaireId/tcm-composition': typeof LayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute;
  '/questionnaire/$questionnaireId/': typeof LayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute;
  '/questionnaire/$questionnaireId/codes-list/$codesListId': typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdRoute;
  '/questionnaire/$questionnaireId/codes-lists/new': typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute;
  '/questionnaire/$questionnaireId/codes-lists/': typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute;
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute;
  '': typeof LayoutRouteWithChildren;
  '/questionnaire/$questionnaireId': typeof LayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute;
  '/questionnaires/new': typeof LayoutQuestionnairesNewRoute;
  '/questionnaires': typeof LayoutQuestionnairesIndexRoute;
  '/questionnaire/$questionnaireId/composition': typeof LayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute;
  '/questionnaire/$questionnaireId/duplicate-variables': typeof LayoutQuestionnaireQuestionnaireIdLayoutQDuplicateVariablesRoute;
  '/questionnaire/$questionnaireId/merge': typeof LayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute;
  '/questionnaire/$questionnaireId/tcm-composition': typeof LayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute;
  '/questionnaire/$questionnaireId/codes-list/$codesListId': typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdRoute;
  '/questionnaire/$questionnaireId/codes-lists/new': typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute;
  '/questionnaire/$questionnaireId/codes-lists': typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/': typeof IndexRoute;
  '/_layout': typeof LayoutRouteWithChildren;
  '/_layout/questionnaires': typeof LayoutQuestionnairesRouteRouteWithChildren;
  '/_layout/questionnaire/$questionnaireId': typeof LayoutQuestionnaireQuestionnaireIdRouteRouteWithChildren;
  '/_layout/questionnaires/new': typeof LayoutQuestionnairesNewRoute;
  '/_layout/questionnaires/': typeof LayoutQuestionnairesIndexRoute;
  '/_layout/questionnaire/$questionnaireId/_layout-q': typeof LayoutQuestionnaireQuestionnaireIdLayoutQRouteWithChildren;
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists': typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteWithChildren;
  '/_layout/questionnaire/$questionnaireId/_layout-q/composition': typeof LayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute;
  '/_layout/questionnaire/$questionnaireId/_layout-q/duplicate-variables': typeof LayoutQuestionnaireQuestionnaireIdLayoutQDuplicateVariablesRoute;
  '/_layout/questionnaire/$questionnaireId/_layout-q/merge': typeof LayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute;
  '/_layout/questionnaire/$questionnaireId/_layout-q/tcm-composition': typeof LayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute;
  '/_layout/questionnaire/$questionnaireId/_layout-q/': typeof LayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute;
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId': typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdRoute;
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new': typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute;
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/': typeof LayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | '/'
    | ''
    | '/questionnaires'
    | '/questionnaire/$questionnaireId'
    | '/questionnaires/new'
    | '/questionnaires/'
    | '/questionnaire/$questionnaireId/codes-lists'
    | '/questionnaire/$questionnaireId/composition'
    | '/questionnaire/$questionnaireId/duplicate-variables'
    | '/questionnaire/$questionnaireId/merge'
    | '/questionnaire/$questionnaireId/tcm-composition'
    | '/questionnaire/$questionnaireId/'
    | '/questionnaire/$questionnaireId/codes-list/$codesListId'
    | '/questionnaire/$questionnaireId/codes-lists/new'
    | '/questionnaire/$questionnaireId/codes-lists/';
  fileRoutesByTo: FileRoutesByTo;
  to:
    | '/'
    | ''
    | '/questionnaire/$questionnaireId'
    | '/questionnaires/new'
    | '/questionnaires'
    | '/questionnaire/$questionnaireId/composition'
    | '/questionnaire/$questionnaireId/duplicate-variables'
    | '/questionnaire/$questionnaireId/merge'
    | '/questionnaire/$questionnaireId/tcm-composition'
    | '/questionnaire/$questionnaireId/codes-list/$codesListId'
    | '/questionnaire/$questionnaireId/codes-lists/new'
    | '/questionnaire/$questionnaireId/codes-lists';
  id:
    | '__root__'
    | '/'
    | '/_layout'
    | '/_layout/questionnaires'
    | '/_layout/questionnaire/$questionnaireId'
    | '/_layout/questionnaires/new'
    | '/_layout/questionnaires/'
    | '/_layout/questionnaire/$questionnaireId/_layout-q'
    | '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists'
    | '/_layout/questionnaire/$questionnaireId/_layout-q/composition'
    | '/_layout/questionnaire/$questionnaireId/_layout-q/duplicate-variables'
    | '/_layout/questionnaire/$questionnaireId/_layout-q/merge'
    | '/_layout/questionnaire/$questionnaireId/_layout-q/tcm-composition'
    | '/_layout/questionnaire/$questionnaireId/_layout-q/'
    | '/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId'
    | '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new'
    | '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  LayoutRoute: typeof LayoutRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LayoutRoute: LayoutRouteWithChildren,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_layout"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/questionnaires",
        "/_layout/questionnaire/$questionnaireId"
      ]
    },
    "/_layout/questionnaires": {
      "filePath": "_layout/questionnaires/route.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/questionnaires/new",
        "/_layout/questionnaires/"
      ]
    },
    "/_layout/questionnaire/$questionnaireId": {
      "filePath": "_layout/questionnaire.$questionnaireId/route.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/questionnaire/$questionnaireId/_layout-q"
      ]
    },
    "/_layout/questionnaires/new": {
      "filePath": "_layout/questionnaires/new.tsx",
      "parent": "/_layout/questionnaires"
    },
    "/_layout/questionnaires/": {
      "filePath": "_layout/questionnaires/index.tsx",
      "parent": "/_layout/questionnaires"
    },
    "/_layout/questionnaire/$questionnaireId/_layout-q": {
      "filePath": "_layout/questionnaire.$questionnaireId/_layout-q.tsx",
      "parent": "/_layout/questionnaire/$questionnaireId",
      "children": [
        "/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists",
        "/_layout/questionnaire/$questionnaireId/_layout-q/composition",
        "/_layout/questionnaire/$questionnaireId/_layout-q/duplicate-variables",
        "/_layout/questionnaire/$questionnaireId/_layout-q/merge",
        "/_layout/questionnaire/$questionnaireId/_layout-q/tcm-composition",
        "/_layout/questionnaire/$questionnaireId/_layout-q/",
        "/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId"
      ]
    },
    "/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists": {
      "filePath": "_layout/questionnaire.$questionnaireId/_layout-q/codes-lists/route.tsx",
      "parent": "/_layout/questionnaire/$questionnaireId/_layout-q",
      "children": [
        "/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new",
        "/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/"
      ]
    },
    "/_layout/questionnaire/$questionnaireId/_layout-q/composition": {
      "filePath": "_layout/questionnaire.$questionnaireId/_layout-q/composition.tsx",
      "parent": "/_layout/questionnaire/$questionnaireId/_layout-q"
    },
    "/_layout/questionnaire/$questionnaireId/_layout-q/duplicate-variables": {
      "filePath": "_layout/questionnaire.$questionnaireId/_layout-q/duplicate-variables.tsx",
      "parent": "/_layout/questionnaire/$questionnaireId/_layout-q"
    },
    "/_layout/questionnaire/$questionnaireId/_layout-q/merge": {
      "filePath": "_layout/questionnaire.$questionnaireId/_layout-q/merge.tsx",
      "parent": "/_layout/questionnaire/$questionnaireId/_layout-q"
    },
    "/_layout/questionnaire/$questionnaireId/_layout-q/tcm-composition": {
      "filePath": "_layout/questionnaire.$questionnaireId/_layout-q/tcm-composition.tsx",
      "parent": "/_layout/questionnaire/$questionnaireId/_layout-q"
    },
    "/_layout/questionnaire/$questionnaireId/_layout-q/": {
      "filePath": "_layout/questionnaire.$questionnaireId/_layout-q/index.tsx",
      "parent": "/_layout/questionnaire/$questionnaireId/_layout-q"
    },
    "/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId": {
      "filePath": "_layout/questionnaire.$questionnaireId/_layout-q/codes-list/$codesListId.tsx",
      "parent": "/_layout/questionnaire/$questionnaireId/_layout-q"
    },
    "/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new": {
      "filePath": "_layout/questionnaire.$questionnaireId/_layout-q/codes-lists/new.tsx",
      "parent": "/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists"
    },
    "/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/": {
      "filePath": "_layout/questionnaire.$questionnaireId/_layout-q/codes-lists/index.tsx",
      "parent": "/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists"
    }
  }
}
ROUTE_MANIFEST_END */
