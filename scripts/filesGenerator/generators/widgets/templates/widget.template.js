import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import React, { useState } from 'react';
import './place-holder.component.scss';
import { JsonForms } from '@jsonforms/react';
import titlize from '../../../common/utilities/string';
import jsonSchema from './place-holder.json.schema';
import uiSchema from './place-holder.ui.schema';

function PlaceHolderComponent(initialData) {

  initialData = initialData | {};
  const [data, setData] = useState(initialData);
  const schema = jsonSchema;
  const uischema = uiSchema;
  const renderers = [
    ...materialRenderers
  ];

  return (
    <div className="container-fluid">
      <div class="gw-TitleBarWidget gw-styleTag--CenterPanelWidget gw-isScreenTitle gw-heading-1">
        <div class="gw-TitleBar--titles--container">
          <div class="gw-TitleBar--title">{titlize('place-holder')}</div>
        </div>
      </div>
      <div class="gw-InputDividerWidget"></div>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={materialCells}
        onChange={({errors, data}) => setData(data)}
      />
    </div>
  );
}

export default PlaceHolderComponent;