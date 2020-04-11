/**
 * @desc identifyWithBase64ByType
 */

import * as defs from '../../baseClass';
import { PontCore } from '../../pontCore';

export class Params {
  /** img */
  img;
  /** type */
  type;
}

export const init = new defs.Result();

export function request(params, body, options = {}) {
  return PontCore.fetch(
    PontCore.getUrl('/api/identifyWithBase64ByType.do', params, 'POST'),
    {
      method: 'POST',

      body,
      ...options,
    },
  );
}
