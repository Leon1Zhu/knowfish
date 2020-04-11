/**
 * @desc getInfo
 */

import * as defs from '../../baseClass';
import { PontCore } from '../../pontCore';

export class Params {}

export const init = new defs.Result();

export function request(params, options = {}) {
  return PontCore.fetch(PontCore.getUrl('/api/getInfo.do', params, 'GET'), {
    method: 'GET',

    ...options,
  });
}
