module.exports = {
  content :`import { useTranslation } from 'react-i18next';
  import './place-holder.component.scss';
  import Template from './place-holder.template.jsx';
  import titlize from '../../../common/utilities/string';

  function PlaceHolderComponent() {
    return (
      <div className="container-fluid">
        <div class="gw-TitleBarWidget gw-styleTag--CenterPanelWidget gw-isScreenTitle gw-heading-1">
          <div class="gw-TitleBar--titles--container">
            <div class="gw-TitleBar--title">{titlize('place-holder')}</div>
          </div>
        </div>
        <div class="gw-InputDividerWidget"></div>
        <Template />
      </div>
    );
  }

  export default PlaceHolderComponent;`
}