/**
 * @desc getInfoByType
 */

import * as defs from '../../baseClass';
import { PontCore } from '../../pontCore';

export class Params {
  /** type */
  type;
}

export const init = new defs.Result();

export function request(params, options = {}) {
  return PontCore.fetch(
    PontCore.getUrl('/api/getInfoByType.do', params, 'GET'),
    {
      method: 'GET',

      ...options,
    },
  );
}
