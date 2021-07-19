/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import settings from 'carbon-components/es/globals/js/settings';
import DDSContentItem from '../content-item/content-item';
import styles from './pictogram-item.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Pictogram item.
 *
 * @element dds-pictogram-item
 * @slot pictogram - The pictogram content.
 * @slot heading - The heading content.
 * @slot footer - The footer (CTA) content.
 */
class DDSPictogramItem extends StableSelectorMixin(DDSContentItem) {
  render() {
    return html`
      <div class="${prefix}--pictogram-item__row">
        <div class="${prefix}--pictogram-item__wrapper">
          <slot class="${prefix}--pictogram-item__pictogram" name="pictogram"></slot>
        </div>
        <div class="${prefix}--pictogram-item__content">
          <div class="${prefix}--content-item">
            ${super.render()}
          </div>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pictogram-item`;
  }

  static styles = styles;
}

if (!customElements.get(`${ddsPrefix}-pictogram-item`)) {
  customElements.define(`${ddsPrefix}-pictogram-item`, DDSPictogramItem);
}

export default DDSPictogramItem;
