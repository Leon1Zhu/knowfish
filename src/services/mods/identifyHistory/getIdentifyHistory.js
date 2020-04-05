/**
 * @desc getIdentifyHistory
 */

import * as defs from '../../baseClass';
import { PontCore } from '../../pontCore';

export class Params {}

export const init = new defs.Result();

export function request(params, body, options = {}) {
  return PontCore.fetch(
    PontCore.getUrl('/api/getIdentifyHistory', params, 'GET'),
    {
      method: 'GET',

      body,
      ...options,
    },
  );
}
