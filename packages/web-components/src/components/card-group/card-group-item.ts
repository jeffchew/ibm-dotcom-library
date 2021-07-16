/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSCardCTA from '../cta/card-cta';
import styles from './card-group.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card Group item.
 *
 * @element dds-card-group-item
 */
class DDSCardGroupItem extends DDSCardCTA {
  /**
   * `true` if the card group is using border.
   */
  @property({ type: Boolean, reflect: true })
  border = false;

  /**
   * `true` if the card group item is empty.
   */
  @property({ type: Boolean, reflect: true })
  empty = false;

  static get stableSelector() {
    return `${ddsPrefix}--card-group-item`;
  }

  static styles = styles;
}

if (!customElements.get(`${ddsPrefix}-card-group-item`)) {
  customElements.define(`${ddsPrefix}-card-group-item`, DDSCardGroupItem);
}

export default DDSCardGroupItem;
