import {
  computeAuthorizationHeader,
  downloadAsJson,
  getBaseURI,
} from './utils';

type QuestionnaireData = {
  id: string;
};

type Questionnaire = {
  id: string;
  DataCollection: QuestionnaireData[];
  Name: string;
};

export const enum VisualizationKind {
  PDF,
  Spec,
  DDI,
  PoguesModel,
  HTML,
  Household,
  Business,
  QueenCAPI,
  QueenCATI,
}

const enum VisualizationContext {
  Household = 'HOUSEHOLD',
  Business = 'BUSINESS',
}

function computeDocumentPath(type: VisualizationKind): string {
  switch (type) {
    case VisualizationKind.PDF:
      return '-pdf';
    case VisualizationKind.Spec:
      return '-spec';
    case VisualizationKind.DDI:
      return '-ddi';
  }
  return '';
}

function computeURLPath(type: VisualizationKind, qr: Questionnaire): string {
  switch (type) {
    case VisualizationKind.HTML:
      return `/${qr.DataCollection[0].id}/${qr.Name}`;
    case VisualizationKind.Household:
      return `-stromae-v3/${qr.Name}`;
    case VisualizationKind.Business:
      return `-stromae-v3/${qr.Name}`;
    case VisualizationKind.QueenCAPI:
      return `-queen/${qr.Name}`;
    case VisualizationKind.QueenCATI:
      return `-queen-telephone/${qr.Name}`;
  }
  return '';
}

function computeURLContext(
  type: VisualizationKind,
): VisualizationContext | undefined {
  switch (type) {
    case VisualizationKind.Household:
      return VisualizationContext.Household;
    case VisualizationKind.Business:
      return VisualizationContext.Business;
  }
  return undefined;
}

/**
 * Call visualization endpoint and render either an url or a document depending
 * on the type of visualization called.
 */
export async function getVisualization(
  /** Type of visualisation called. */
  type: VisualizationKind,
  /** Questionnaire to visualize. */
  qr: Questionnaire,
  /** Indicate if the questionnaire contains a reference to another questionnaire. */
  ref: boolean,
  token: string,
): Promise<unknown> {
  switch (type) {
    case VisualizationKind.PDF:
    case VisualizationKind.Spec:
    case VisualizationKind.DDI:
      // document
      return postVisualization(computeDocumentPath(type), qr, ref, token).then(
        async (res) => {
          const filename = res.headers
            ?.get('content-disposition')
            ?.split(';')
            .find((n) => n.includes('filename='))
            ?.replace('filename=', '')
            .trim();
          const blob = await res.blob();
          openDocument(blob, filename);
        },
      );
    case VisualizationKind.HTML:
    case VisualizationKind.Household:
    case VisualizationKind.Business:
    case VisualizationKind.QueenCAPI:
    case VisualizationKind.QueenCATI:
      // url
      return postVisualization(
        computeURLPath(type, qr),
        qr,
        ref,
        token,
        computeURLContext(type),
      )
        .then((response) => response.text())
        .then((url) => {
          const a = document.createElement('a');
          a.href = url;
          a.setAttribute('target', '_blank');
          document.body.appendChild(a);
          a.click();
        });
    case VisualizationKind.PoguesModel:
      downloadAsJson({
        data: qr,
        filename: `pogues_${qr.id}.json`,
      });
  }

  return null;
}

/** Mutualised call of the visualization endpoints. */
const postVisualization = async (
  /** Personalized part of the endpoint address. */
  path: string,
  /** Questionnaire to visualize. */
  qr: Questionnaire,
  /** Indicate if the questionnaire contains a reference to another questionnaire. */
  ref: boolean,
  token: string,
  /** Cntext of the visualization (houseold or business). */
  context: VisualizationContext | undefined = undefined,
) => {
  const contextParam = context ? `&context=${context}` : '';
  const url = `${getBaseURI()}/transform/visualize${path}?references=${ref}${contextParam}`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', computeAuthorizationHeader(token));

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(qr),
  }).then(async (response) => {
    if (response.ok) {
      return response;
    }
    if (response.status === 500) {
      const { message } = (await response.json()) as { message: string };
      throw new Error(message);
    }
    throw new Error('The error did not directly come from Eno');
  });
};

/**
 * This method will emulate the download of file, received from a POST request.
 * We will dynamically create a A element linked to the downloaded content, and
 * will click on it programmatically.
 */
function openDocument(blob: Blob, filename?: string) {
  const downloadUrl = window.URL.createObjectURL(blob);

  if (!filename) {
    window.location.href = downloadUrl;
    return;
  }

  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}
