/**
 * @desc getInfoByBlurName
 */

import * as defs from '../../baseClass';
import { PontCore } from '../../pontCore';

export class Params {
  /** name */
  name;
}

export const init = new defs.Result();

export function request(params, options = {}) {
  return PontCore.fetch(
    PontCore.getUrl('/api/getInfoByBlurName.do', params, 'GET'),
    {
      method: 'GET',

      ...options,
    },
  );
}
