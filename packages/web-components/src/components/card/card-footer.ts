/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, internalProperty, query, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import DDSLinkWithIcon, { ICON_PLACEMENT } from '../link-with-icon/link-with-icon';
import { BASIC_COLOR_SCHEME } from '../../globals/defs';
import styles from './card.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card footer.
 *
 * @element dds-card-footer
 */
class DDSCardFooter extends DDSLinkWithIcon {
  /**
   * The non-link container node, used when the link of parent `<dds-card>` should be used.
   */
  @query(`.${ddsPrefix}-ce--card__footer--static`)
  private _staticNode?: HTMLSpanElement;

  /**
   * `true` if there is copy content.
   */
  @internalProperty()
  protected _hasCopy = false;

  /**
   * `true` if the link of parent `<dds-card>` should be used.
   */
  protected get _shouldUseParentLink() {
    const { href, parentHref } = this;
    return Boolean(parentHref) && (!href || parentHref === href);
  }

  /**
   * Handles `slotchange` event on the default `<slot>`.
   */
  protected _handleSlotChange({ target }: Event) {
    if (!(target as HTMLSlotElement).name) {
      const hasContent = (target as HTMLSlotElement)
        .assignedNodes()
        .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
      this._hasCopy = hasContent;
    }
  }

  /**
   * @returns The main content.
   */
  protected _renderContent(): TemplateResult | string | void {
    const { _hasCopy: hasCopy } = this;
    return html`
      <span ?hidden="${!hasCopy}" class="${prefix}--card__cta__copy">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </span>
    `;
  }

  protected _renderInner() {
    return this.iconPlacement === ICON_PLACEMENT.LEFT
      ? html`
          ${this._renderIcon()}${this._renderContent()}
        `
      : html`
          ${this._renderContent()}${this._renderIcon()}
        `;
  }

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = BASIC_COLOR_SCHEME.REGULAR;

  /**
   * The `href` in parent `<dds-card>`.
   * `<dds-card>` sets this automatically.
   */
  @property({ attribute: 'parent-href', reflect: true })
  parentHref?: string;

  /**
   * The slot in parent `<dds-card>`.
   */
  @property({ reflect: true })
  slot = 'footer';

  updated() {
    super.updated();

    if (!this.hasAttribute('aria-hidden') && this._shouldUseParentLink) {
      this.setAttribute('aria-hidden', 'true');
    }

    const { iconPlacement, _staticNode: staticNode, _linkNode: linkNode } = this;
    const targetNode = linkNode ?? staticNode;
    targetNode!.classList.add(`${prefix}--card__footer`);
    targetNode!.classList.add(`${ddsPrefix}-ce--card__footer`);
    targetNode!.classList.toggle(`${prefix}--card__footer__icon-left`, iconPlacement === ICON_PLACEMENT.LEFT);
  }

  render() {
    const { _shouldUseParentLink: shouldUseParentLink } = this;
    return shouldUseParentLink
      ? html`
          <span class="${ddsPrefix}-ce--card__footer--static">${this._renderInner()}</span>
        `
      : super.render();
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-footer`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

if (!customElements.get(`${ddsPrefix}-card-footer`)) {
  customElements.define(`${ddsPrefix}-card-footer`, DDSCardFooter);
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCardFooter;
