/**
 * @desc Identify
 */

import * as defs from '../../baseClass';
import { PontCore } from '../../pontCore';

export class Params {
  /** type */
  type;
}

export const init = new defs.Result();

export function request(params, form, body, options = {}) {
  return PontCore.fetch(PontCore.getUrl('/api/identify.do', params, 'POST'), {
    method: 'POST',
    body: form,
    body,
    ...options,
  });
}
