/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Part } from 'lit-html';
import { css } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSContentBlock from '../content-block/content-block';
import styles from './content-block-cards.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Content block cards.
 *
 * @element dds-content-block-cards
 */
class DDSContentBlockCards extends StableSelectorMixin(DDSContentBlock) {
  /**
   * The CSS class list for the container (grid) node.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _getContainerClasses(): string | ((part: Part) => void) {
    return `${prefix}--content-layout ${prefix}--content-layout--card-group`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-block-cards`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

if (!customElements.get(`${ddsPrefix}-content-block-cards`)) {
  customElements.define(`${ddsPrefix}-content-block-cards`, DDSContentBlockCards);
}

export default DDSContentBlockCards;
