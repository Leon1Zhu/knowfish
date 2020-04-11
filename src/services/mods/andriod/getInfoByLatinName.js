/**
 * @desc getInfoByLatinName
 */

import * as defs from '../../baseClass';
import { PontCore } from '../../pontCore';

export class Params {
  /** latinName */
  latinName;
}

export const init = new defs.Result();

export function request(params, options = {}) {
  return PontCore.fetch(
    PontCore.getUrl('/api/getInfoByLatinName.do', params, 'GET'),
    {
      method: 'GET',

      ...options,
    },
  );
}
