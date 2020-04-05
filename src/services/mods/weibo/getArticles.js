/**
 * @desc getArticles
 */

import * as defs from '../../baseClass';
import { PontCore } from '../../pontCore';

export class Params {}

export const init = new defs.Result();

export function request(params, body, options = {}) {
  return PontCore.fetch(PontCore.getUrl('/api/getArticles', params, 'GET'), {
    method: 'GET',

    body,
    ...options,
  });
}
