export default (numberOfAdditionalContact) => (`<span tabindex=0 class="contact-show-more-contacts-btn">
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8" r="7.5" stroke="#9873FF" />
<text style="font-weight: 600; font-size: 8px; line-height: 11px;" class="svg-text" x="3" y="11" fill="#000">+${numberOfAdditionalContact}</text>
</svg>
</span>`);
